
let getPhotosArr = () => [
    {
        imgSrc: 'img/0.jpg',
        name: 'img0'
    },
    {
        imgSrc: 'img/1.jpg',
        name: 'img1'
    },
    {
        imgSrc: 'img/2.jpg',
        name: 'img2'
    },
    {
        imgSrc: 'img/3.jpg',
        name: 'img3'
    },
    {
        imgSrc: 'img/4.jpg',
        name: 'img4'
    },
    {
        imgSrc: 'img/5.jpg',
        name: 'img5'
    },
    {
        imgSrc: 'img/0.jpg',
        name: 'img0'
    },
    {
        imgSrc: 'img/1.jpg',
        name: 'img1'
    },
    {
        imgSrc: 'img/2.jpg',
        name: 'img2'
    },
    {
        imgSrc: 'img/3.jpg',
        name: 'img3'
    },
    {
        imgSrc: 'img/4.jpg',
        name: 'img4'
    },
    {
        imgSrc: 'img/5.jpg',
        name: 'img5'
    },
]

let game = document.getElementById('game')
let menu = document.querySelector('.menu')

let livesDiv = document.createElement('div')

let lives = document.createElement('h2')
lives.innerHTML = 'Lives:'
livesDiv.append(lives)

let livesCount = document.createElement('h2')
livesCount.innerHTML = 3
livesDiv.append(livesCount)

menu.append(livesDiv)

let getRandomPhotos = () => {
    let photosArr = getPhotosArr()
    photosArr.sort(() => Math.random() - 0.5)
    return photosArr
}

let generateCard = () => {
    let cardData = getRandomPhotos()

    cardData.forEach((item) => {
        let card = document.createElement('div')
        let face = document.createElement('img')
        let back = document.createElement('div')
        card.classList = 'card'
        face.classList = 'face'
        back.classList = 'back'

        face.src = item.imgSrc
        card.setAttribute('name', item.name)
        back.innerText = 'GUESS ME'

        game.appendChild(card)
        card.appendChild(face)
        card.appendChild(back)

        card.addEventListener('click', (e) => {
            card.classList.toggle('toggleCard')
            checkCards(e)
        })
    })
}

let checkCards = (e) => {
    let clickedCard = e.target
    clickedCard.classList.add('flipped')

    let flippedCards = document.querySelectorAll('.flipped')

    if (flippedCards.length === 2) {
        if (flippedCards[0].getAttribute('name') === flippedCards[1].getAttribute('name')) {
            flippedCards.forEach(card => {
                card.classList.remove('flipped')
                card.style.pointerEvents = 'none'
            })
        } else {
            flippedCards.forEach(card => {
                card.classList.remove('flipped')
                setTimeout(() => card.classList.remove('toggleCard'), 1000);
            })
            livesCount.innerHTML -= 1
            if(livesCount.innerHTML == 0) {
                setTimeout(() => {
                    game.style.pointerEvents = 'none'
                    restart('try again')
                }, 1000)
            }
        }
    }
}

function restart(text = '') {
    let cardData = getRandomPhotos()
    let faces = document.querySelectorAll('.face')
    let cards = document.querySelectorAll('.card')
    game.style.pointerEvents = 'none'

    cardData.forEach((card, ind) => {
        cards[ind].classList.remove('toggleCard')

        setTimeout(() => {
            cards[ind].style.pointerEvents = 'all'
            faces[ind].src = card.imgSrc
            cards[ind].setAttribute('name', card.name)
            game.style.pointerEvents = 'all'
        })
    })
    livesCount.innerHTML = 3
    livesDiv.insertAdjacentHTML(
        'afterend',
        `<h3 class="try_again">${text}</h3>`
        )
    let tryAgain = document.querySelector('.try_again')
    setTimeout(() => {
        menu.removeChild(tryAgain)
    }, 2000)
}

window.addEventListener('load', generateCard)