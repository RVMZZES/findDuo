const chooseDiff = document.querySelector('div');
const main = document.querySelector('.main');
const body = document.querySelector('body');

let counter = 0;
function addLeadingZero(number) {
    return number < 10 ? '0' + number : number;
}
function updateTimer(startDate, container) {
    // Получаем текущую дату и время
    let currentDate = new Date();
    // Вычисляем разницу между текущей датой и временем и началом события
    let timeDiff = currentDate.getTime() - startDate.getTime();
    // Вычисляем количество прошедших секунд
    let minutes = Math.floor(timeDiff / 1000/ 60);
    let seconds = Math.floor(timeDiff / 1000 % 60);
    container.textContent = `Time left: ${addLeadingZero(minutes)}:${addLeadingZero(seconds)}`;
    // Выводим таймер в консоль или в другой элемент на странице
}

let arrFound = [];
let arrPicture =
    [{id: 0, source: '/images/cat.png'},
        {id: 1, source: '/images/geomdash.png'},
        {id: 2, source: '/images/musor.png'},
        {id: 3, source: '/images/epic.png'},
        {id: 4, source: '/images/disc.png'},
        {id: 5, source: '/images/steam.png'},
        {id: 6, source: '/images/puzzle.png'},
        {id: 7, source: '/images/rockstar.png'},
        {id: 8, source: '/images/calovzdutie.png'},];

let arrQuanCards = [[3, 6], [4, 8], [4, 10], [4, 12], [5, 14], [4, 16]];

let isTwoOpened = false;

function createBtnList(arr) {
    for (let i = 0; i < arr.length; i++) {
        createQuantityCardBtn(arr[i][0], arr[i][1])
    }
}

function createQuantityCardBtn(quanCardInRows, numOfCards) {
    let card = document.createElement('button');
    card.textContent = `${numOfCards} card`;
    card.className = 'diffBtn';
    chooseDiff.appendChild(card);
    card.addEventListener('click', function () {
        body.removeChild(main);
        createGameField(quanCardInRows, numOfCards);
    });
}

function createGameField(quanCardInRows, numOfCards) {
    let div = document.createElement('div');
    let startDate = new Date();
    let timer = setInterval(()=>{updateTimer(startDate, div)}, 1000);
    let resetBtn = document.createElement('button');
    let gameField = document.createElement('table');
    let tryCounter= document.createElement('div');
    tryCounter.textContent = `${counter} try used`;
    gameField.className = 'table';
    resetBtn.textContent = `Try again`;
    resetBtn.className = 'diffBtn';
    let arrPictureCopy = [];
    shuffleArray(arrPicture);
    arrPicture.slice(0, numOfCards / 2).forEach(element => {
        arrPictureCopy.push(element, element);
    });
    shuffleArray(arrPictureCopy);
    for (let i = 0; i < numOfCards / quanCardInRows; i++) {
        let row = document.createElement('tr');
        for (let j = 0; j < quanCardInRows; j++) {
            let k = i * quanCardInRows + j;
            if (k >= numOfCards) {
                break;
            }
            let cell = document.createElement('td');
            cell.innerHTML = `
            <div class="card" data-userId="${arrPictureCopy[k].id}">
                <div class="front"><img src="${arrPictureCopy[k].source}"></div>
                <div class="back"><img src="/images/js.png"></div>
            </div>`;
            row.appendChild(cell);

            cell.addEventListener("click", function letOpen() {
                let div = cell.querySelector('.card');
                if (div.classList.contains('card-opened') || isTwoOpened === true) {
                    return;
                }
                div.classList.remove('shake');
                div.classList.toggle('card-opened');
                let opened = document.querySelectorAll('.card-opened');
                if (opened.length === 2) {
                    isTwoOpened = true;
                    tryCounter.textContent = `${++counter} try used`;
                    setTimeout(function () {
                        isTwoOpened = false;
                        if (opened[0].dataset.userid !== opened[1].dataset.userid) {
                            for (let i = 0; i < opened.length; i++) {
                                opened[i].classList.remove('card-opened');
                                opened[i].classList.add('shake');
                            }
                        } else {
                            for (let i = 0; i < opened.length; i++) {
                                arrFound.push(opened[i]);
                                opened[i].classList.remove('card')
                                opened[i].classList.replace('card-opened', 'card-found');
                                if (arrFound.length === numOfCards) {
                                    gameField.innerHTML = 'You win';
                                    clearInterval(timer);
                                    arrFound = [];
                                    counter = 0;
                                }
                            }
                        }
                    }, 2000);

                }
            });
        }
        gameField.appendChild(row);
    }
    setTimeout(function () {
        gameField.classList.add('visible');
    }, 10);

    resetBtn.addEventListener('click', function () {
        body.removeChild(resetBtn);
        body.removeChild(gameField);
        body.removeChild(tryCounter);
        body.removeChild(div);
        body.appendChild(main);
        counter = 0;
    })
    body.appendChild(gameField);
    body.appendChild(tryCounter);
    body.appendChild(div);
    body.appendChild(resetBtn);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

createBtnList(arrQuanCards)

/*
import {confetti} from "https://cdn.jsdelivr.net/npm/tsparticles-confetti/+esm";
const duration = 15 * 1000,
    animationEnd = Date.now() + duration,
    defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
}
const run = () => {
    const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) {
            return clearInterval(interval);
        }
        const particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti(
            Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
            })
        );
        confetti(
            Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
            })
        );
    }, 250);
};*/

