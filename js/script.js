
let position = 0; // начальное значение которое буду переопределять
const toShow = 3; // кол-во видимых элементов
const toScroll = 2; // кол-во прокручеваемых элементов
// переменные для обращения к элементам HTML
const container = document.querySelector('.slider-container');
const track = document.querySelector('.slider-track');
const items = document.querySelectorAll('.slider-item');
const btnPrev = document.querySelector('.prev');
const btnNext = document.querySelector('.next');
// вычисляю кол-во элементов
const itemsSum = items.length;
// вычисляю ширину каждого элемента. Делим ширину контейнера на кол-во видимых элементов
const itemWidth = container.clientWidth / toShow;
// вычисляю смещение - кол-во сдвигаемых элементов помноженное на ширину одного элемента
const movePosition = toScroll * itemWidth;
// проставляю ширину для каждого элемента
items.forEach((item) => {
    item.style.minWidth = `${itemWidth}px`;
})

btnPrev.addEventListener('click', () => {
    /* 
    добавляю проверку через абсолютное число, чтобы при добавлении или 
    удалении фото слайдер работал корректно
    */
    const itemRight = Math.abs(position) / itemWidth;
    position += itemRight >= toScroll ? movePosition : itemRight * itemWidth;
    checkBtn();
});

btnNext.addEventListener('click', () => {
    const itemLeft = itemsSum - (Math.abs(position) + toShow * itemWidth) / itemWidth;
    position -= itemLeft >= toScroll ? movePosition : itemLeft * itemWidth;
    checkBtn();


});

// проверяю позицию элемента
const setPosition = () => {
    track.style.transform = `translateX(${position}px)`;

};
// отключаю/ включаю кнопки если фото закончились
const checkBtn = () => {
    setPosition();
    btnNext.disabled = position <= -(itemsSum - toShow) * itemWidth;
    btnPrev.disabled = position === 0;
}

// const xhr = new XMLHttpRequest();

// xhr.onload = function() {
//   console.log(`Статус: ${xhr.status}; Результат: ${xhr.response}`)
// };

// xhr.onerror = function() {
//   console.log('Ошибка запроса');
// };

// xhr.open("get", "https://picsum.photos/v2/list", true);
// xhr.send();