const calcSlider = document.querySelectorAll('.calc__slider');
const metersField = document.querySelector('.calc__meters_field input');

calcSlider.forEach( (slider, index) => {
    const left = slider.querySelector('.calc__left');
    const right = slider.querySelector('.calc__right');
    const items = slider.querySelectorAll('p');

    const calcServiceNaming = document.querySelectorAll('.CalcServiceNaming');
    const calcTypeNaming = document.querySelectorAll('.calcTypeNaming');

    let iterator = 0;

    left.onclick = (e) => {
        iterator -= 1;
        checkIterator();
        changeClass(items, 'CalcSliderBlock');
    }

    right.onclick = (e) => {
        iterator += 1;
        checkIterator();
        changeClass(items, 'CalcSliderBlock');
    }

    calcSlider[index].onclick = () => {
        if (index == 0) {
            changeClass(calcServiceNaming, 'CalcFormInline');

            // if (iterator == 4) {
            //     document.querySelector('.calc__meters').style.display = 'block';
            // } else {
            //     document.querySelector('.calc__meters').style.display = 'none';
            //     metersField.dataset.sum = 0;
            // }
        }

        if (index == 1) {
            changeClass(calcTypeNaming, 'CalcFormInline')
        }
    }

    // metersField.addEventListener('input', () => {
    //     if (+metersField.value > 150) {
    //         metersField.dataset.quantity = +metersField.value - 150;
    //         metersField.dataset.sum = +metersField.dataset.price * metersField.dataset.quantity;
    //     }
    // })

    function checkIterator() {
        if (iterator < 0) {iterator = items.length - 1;}
        if (iterator > items.length - 1) {iterator = 0;}
    }

    function changeClass(array, cssClass) {
        for (let item of array) {item.classList.remove(cssClass);}
        array[iterator].classList.add(cssClass)
    }
})



const calcItem = document.querySelectorAll('.calc__item');
const totalItemCheck = document.querySelectorAll('.calc__form_checkList li');
calcItem.forEach( (item, index) => {
    const switcher = item.querySelector('.calc__switcher');
    const add = item.querySelector('.calc__add');
    const sub = item.querySelector('.calc__sub');
    const quantity = item.querySelector('.calc__quantityNumber');
    const quantitySimple = item.querySelector('.calc__quantitySimple');
    const TOTALSUM = document.querySelector('.calc__form_totalSum span');
    const cancel = document.querySelectorAll('.calc__form_checkList em');

    const checkListQuantity = document.querySelectorAll('.calc__form_checkListQuantity');
    const checkListSum = document.querySelectorAll('.calc__form_checkListSum');

    if (switcher) {
        switcher.onclick = () => {
            item.dataset.sum = 0;
            item.classList.toggle('CalcAdditionalActive');
            totalItemCheck[index].classList.toggle('CalcCheckListFlex');
        }
    }

    if (add) {
        add.onclick = () => {
        item.dataset.quantity = +item.dataset.quantity + 1;
        item.dataset.sum = item.dataset.price * item.dataset.quantity;
        quantity.textContent = item.dataset.quantity;
        checkListQuantity[index].textContent = item.dataset.quantity;
        checkListSum[index].textContent = item.dataset.sum;

        item.classList.add('CalcAdditionalActive');
        totalItemCheck[index].classList.add('CalcCheckListFlex');
        }
    }

    if (sub) {
        sub.onclick = () => {
            item.dataset.quantity = +item.dataset.quantity - 1;
            if (item.dataset.quantity <= 0) {
                item.dataset.quantity = 0;
                item.classList.remove('CalcAdditionalActive')
                totalItemCheck[index].classList.remove('CalcCheckListFlex');
            }

            item.dataset.sum = item.dataset.price * item.dataset.quantity;
            quantity.textContent = item.dataset.quantity;
            checkListQuantity[index].textContent = item.dataset.quantity;
            checkListSum[index].textContent = item.dataset.sum;
        }
    }

    if (quantitySimple) {
        quantitySimple.onclick = () => {
            if (item.dataset.quantity == 1) {
                item.dataset.quantity = 0;
                item.dataset.sum = item.dataset.price * item.dataset.quantity;
                if (item.dataset.percentsum) {
                    item.dataset.percentsum = 1;
                }
                item.classList.remove('CalcAdditionalActive');
                totalItemCheck[index].classList.remove('CalcCheckListFlex');
            } else {
                item.dataset.quantity = 1;
                item.dataset.sum = item.dataset.price * item.dataset.quantity;
                if (item.dataset.percentsum) {
                    item.dataset.percentsum = +item.dataset.percent * item.dataset.quantity;
                }
                item.classList.add('CalcAdditionalActive');
                totalItemCheck[index].classList.add('CalcCheckListFlex');
            }
        }
    }

    cancel[index].onclick = () => {
        calcItem[index].classList.remove('CalcAdditionalActive');
        totalItemCheck[index].classList.remove('CalcCheckListFlex');
        calcItem[index].dataset.sum = 0;
    }

    document.querySelector('.calc').onclick = () => {checkTOTALSUM()}
    metersField.oninput = () => {checkTOTALSUM()}
    document.body.onload = () => {checkTOTALSUM()} 


    function checkTOTALSUM() {
        const data = document.querySelectorAll('[data-sum]');
        const sliderPrice = document.querySelectorAll('.CalcSliderBlock');
        const percentsum = document.querySelector('[data-percentsum]');
        let sum = 0;
        data.forEach((item, index) => {
            sum += +item.dataset.sum;
        })
        sliderPrice.forEach((item, index) => {
            sum += +item.dataset.price;
        })
        sum += +metersField.dataset.sum;
        sum *= +percentsum.dataset.percentsum;
        TOTALSUM.textContent = parseInt(sum);
    }
} )




const calcAccordion = document.querySelectorAll('.calc__itemAccordion');
const calcTileGrid = document.querySelectorAll('.calc__grid');
const calcTileIconDown = document.querySelectorAll('.calc__slideDowner');
calcAccordion.forEach((item, index) => {
    const borderInitial = item.style.borderBottom;
    item.onclick = () => {
        if (calcTileGrid[index].style.display == 'grid') {
            calcTileGrid[index].style.display = ''
            calcTileIconDown[index].style.transform = "rotate(0deg)";
            item.style.borderBottom = borderInitial;
        } else {
            calcTileGrid[index].style.display = 'grid'
            calcTileIconDown[index].style.transform = "rotate(180deg)";
            item.style.borderBottom = 'none'
        }
    }
})

const form = document.querySelector('.calc__formToSubmit');
const INPUTtotalSum = document.querySelector('#totalSum');
const INPUTservices = document.querySelector('#totalServices');
const INPUTbasic = document.querySelector('#basic');
const INPUTmeters = document.querySelector('#meters')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    INPUTbasic.value = '';
    INPUTtotalSum.value = '';
    INPUTservices.value = '';

    const textBasic = document.querySelectorAll('.CalcFormInline');
    const textTotalSum = document.querySelector('.calc__form_totalSum span');
    const textLiActive = document.querySelectorAll('.CalcCheckListFlex');
    const textServicesName = document.querySelectorAll('.CalcCheckListFlex .jsName');
    const textServicesQuantity = document.querySelectorAll('.CalcCheckListFlex .jsQuantity');
    const textServicesPrice = document.querySelectorAll('.CalcCheckListFlex .jsPrice');

    INPUTtotalSum.value = textTotalSum.textContent;

    textLiActive.forEach((item, index) => {
        INPUTservices.value += '%0A' + textServicesName[index].textContent + '%0A' + 'Количествово: ' + textServicesQuantity[index].textContent + '%0A' + 'На сумму: ' + textServicesPrice[index].textContent + ';' + '%0A';
    })

    textBasic.forEach((item,index) => {
        INPUTbasic.value += item.textContent + ' ';
    })

    INPUTbasic.value += INPUTmeters.value + 'кв.м.'

    form.submit();
})



// Accordion questions

const itemTop = document.querySelectorAll('.questions__itemTop');
const itemBottom = document.querySelectorAll('.questions__itemBottom');

itemTop.forEach((item, index) => {
    itemTop[index].onclick = () => {
        if (itemBottom[index].style.display == '') {
            itemBottom[index].style.display = 'block';
            itemTop[index].dataset.slided = 'true';
        } else {
            itemBottom[index].style.display = '';
            itemTop[index].dataset.slided = 'false';
        }
    }
})

// Accordion questions



// Tabs subscription

const tabs = document.querySelectorAll('.subscription__tab');
const tabItems = document.querySelectorAll('.subscription__item');

tabs.forEach((item, index) => {
    item.onclick = () => {
        for (let tabItem of tabItems) {tabItem.style.display = 'none';}
        tabItems[index].style.display = 'flex'

        for (let tab of tabs) {tab.dataset.tab = ''}
        item.dataset.tab = 'active'
    }
})

// Tabs subscription



// Sliders portfolio responses discounts

$(document).ready(function(){
    $('.portfolio__slider').slick({
        infinite: true,
        arrows: true,
        slidesToShow: 3,
        slidesToScroll: 1,

        responsive: [
            {
              breakpoint: 750,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              }
            },

            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true
              }
            }
          ]

    });
    $('.responses__slider').slick({
        dots: true,
    })
    $('.discounts__slider').slick({
        dots: true,
    })

    $('.header__burger img').click(function(){
        $('.header__burger ul').slideToggle()
    })
})


// document.addEventListener('scroll', () => {
//     const portfolioItemLeft = document.querySelector('.portfolio__itemLeft');
//     const portfolioImage = document.querySelector('.portfolio .slick-current img');
//     const portfolioBtnRight = document.querySelector('.portfolio .slick-next');
//     const portfolioBntLeft = document.querySelector('.portfolio .slick-prev');
//     portfolioBtnRight.style.left = portfolioItemLeft.clientWidth  + 'px';
//     portfolioBntLeft.style.top = portfolioImage.clientHeight / 2 + 20 + 'px';
//     portfolioBtnRight.style.top = portfolioImage.clientHeight / 2 + 20 + 'px';

//     const responsesItemLeft = document.querySelector('.responses .slick-current .responses__left');
//     const responsesBtnRight = document.querySelector('.responses .slick-next');
//     const responsesBtnLeft = document.querySelector('.responses .slick-prev');
//     responsesBtnRight.style.left = responsesItemLeft.clientWidth + 'px';
//     responsesBtnLeft.style.top = responsesItemLeft.clientHeight / 2 + 20 + 'px';
//     responsesBtnRight.style.top = responsesItemLeft.clientHeight / 2 + 20 + 'px';

//     const discountItem = document.querySelector('.discounts .slick-current.discounts__item');
//     const discountItemImage = document.querySelector('.discounts .slick-current .discounts__left');
//     const discountBtnRight = document.querySelector('.discounts .slick-next');
//     const discountBtnLeft = document.querySelector('.discounts .slick-prev');
//     discountBtnRight.style.left = discountItem.clientWidth + 10 + 'px';
//     discountBtnLeft.style.top = discountItemImage.clientHeight / 2 + 20 + 'px';
//     discountBtnRight.style.top = discountItemImage.clientHeight / 2 + 20 + 'px';
//     if (document.body.clientWidth < 900) {
//         discountBtnRight.style.left = discountItemImage.clientWidth - 10 + 'px';
//     }
// })

const btn = document.querySelectorAll('.btn');
btn.forEach((item, index) => {
    item.onclick = () => document.querySelector('#contacts').scrollIntoView()
})

// Sliders portfolio responses discounts