'use strict'
const input = document.querySelector('#mainInput');
const clearInput = document.querySelector('#clear');
const addBtn = document.querySelector('.add');
const sortBtn = document.querySelector('#sort');
const addBlock = () => {
    const itemsContainer = document.querySelector('.items-container');
    const {
        value
    } = input;
    itemsContainer.style.display = "flex";
    const item = document.createElement('div');
    item.classList.add('item');
    const text = document.createElement('p');
    if (value.length <= 22) {
        text.innerText = value;
    } else {
        alert("Cox uzun metn!")
        input.value = "";
    }
    const xMark = document.createElement('button');
    xMark.setAttribute('id', 'xMark');
    const circle = document.createElement('div');
    circle.classList.add('circle-block');
    xMark.appendChild(circle);
    const image = document.createElement('img');
    image.src = './assets/icons/close.png';
    itemsContainer.appendChild(item);
    circle.appendChild(image);
    item.appendChild(text);
    item.appendChild(xMark);
    input.value = "";
    xMark.addEventListener('click', eraseElement);
    item.dataset.dateAdded = new Date().getTime();

    function eraseElement() {
        item.remove();
        const items = itemsContainer.querySelectorAll('.item');
        if (items.length === 0) {
            itemsContainer.style.display = 'none';
        }
    }
};
const eraseValue = () => {
    input.value = "";
};
const EnterKeyPress = event => {
    if (event.key === 'Enter') {
        addBlock();
    }
};
const sortItems = () => {
    const img = document.querySelector('#sortImg');
    const itemsContainer = document.querySelector('.items-container');
    const currentDirection = itemsContainer.dataset.direction; // data-direction attribute
    const items = Array.from(itemsContainer.getElementsByClassName('item'));
    let newDirection;
    switch (currentDirection) {
        case 'forward':
            newDirection = 'backward';
            itemsContainer.dataset.direction = 'backward';
            img.setAttribute('src', "./assets/icons/sort-up-black.png");
            break;
        case 'backward':
            newDirection = 'none';
            itemsContainer.dataset.direction = 'none';
            img.setAttribute('src', "./assets/icons/sort.png");
            break;
        default:
            newDirection = 'forward';
            itemsContainer.dataset.direction = 'forward';
            img.setAttribute('src', "./assets/icons/sort-black.png");
            break;
    }
    if (newDirection === 'none') {
        items.sort((a, b) => {
            const dateA = Number(a.dataset.dateAdded);
            const dateB = Number(b.dataset.dateAdded);
            return dateA - dateB;
        });
    } else {
        items.sort((a, b) => {
            const textA = a.querySelector('p').innerText.toLowerCase();
            const textB = b.querySelector('p').innerText.toLowerCase();
            if (newDirection === 'forward') {
                return textA < textB ? -1 : 1;
            } else {
                return textA < textB ? 1 : -1;
            }
        });
    }
    items.forEach(item => {
        itemsContainer.appendChild(item);
    });
};

input.addEventListener('keypress', EnterKeyPress);
addBtn.addEventListener('click', addBlock);
clearInput.addEventListener('click', eraseValue);
sortBtn.addEventListener("click", sortItems);



