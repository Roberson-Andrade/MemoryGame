let cardsMedium = [{color: '#001f3f', id: 1, p: 1}, {color: '#001f3f', id: 1, p: 2}, { color: '#0074D9',id: 2, p: 3}, {color: '#0074D9', id: 2, p: 4}, { color: '#3D9970', id: 3, p: 5}, { color: '#3D9970', id: 3, p: 6}, { color: '#FFDC00', id: 4, p: 7}, {color: '#FFDC00', id: 4, p: 8}, {color: '#FF851B', id: 5, p: 9}, {color:'#FF851B', id: 5, p: 10}, {color: '#F012BE', id: 6, p: 11}, {color: '#F012BE',id: 6, p: 12}, {color: '#111111',id: 7, p: 13}, {color: '#111111', id: 7, p: 14}, {color: '#DDDDDD', id: 8, p: 15}, {color: '#DDDDDD',id: 8, p: 16}]
  
let gameMode = 0 

function cardsGame(arrayCard, gameMode) {
    let gameBoard = document.createElement('div')
    gameBoard.setAttribute('id', 'game-board')
    gameBoard.style.animation = 'gameBoardAnimation 2s'
    document.body.appendChild(gameBoard)

    let timer = document.createElement('div')
    timer.setAttribute('id', 'timer')
    timer.classList.add('timer')
    timer.innerHTML = '<h1>Time: 00:00</h1>' 
    document.body.appendChild(timer)
    setTimeout(clock, 2000)

    //code to shuffle the cards
    let currentIndex = arrayCard.length
    let temporaryValue 
    let randomIndex
    
    while(0 != currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--
  
      temporaryValue = arrayCard[randomIndex]
      arrayCard[randomIndex] = arrayCard[currentIndex]
      arrayCard[currentIndex] = temporaryValue
    }
  
    let firstId
    let secondId 
    let firstP
    let secondP
    
    arrayCard.forEach(x => {
        let cardContainer = document.createElement('div')
        let card = document.createElement('div')
        let frontCard = document.createElement('div')
        let backCard = document.createElement('div')
        cardContainer.style.gridRow = 'auto'
        cardContainer.style.gridColumn = 'auto'
        cardContainer.className = 'cardContainer'
        card.className = 'card'
        frontCard.className = 'thefront'
        backCard.className = 'theback'
        backCard.style.background = x.color

        if(gameMode ==='1'){
            card.classList.add('flip')
            setTimeout(easyMode, 2000)

            function easyMode() {
                card.classList.remove('flip')
            }
        } 
        setTimeout(clickCard, 2000)

        function clickCard() {
            cardContainer.addEventListener("click", function selectCard() {
                
                if(firstId !== undefined && secondId == undefined) {
                    secondP = x.p
                    if(firstP !== secondP){
                        secondId  = x.id
                        card.classList.add('flip')
                    }
                }
                if(firstId == undefined) {
                    firstId = x.id
                    firstP = x.p
                    card.classList.add('flip')
                }
        
                if(firstId !== undefined && secondId  !== undefined) {
                    if(firstId == secondId) {
                        if(card.classList.contains('flip')) {
                            setTimeout(pair, 1)
                        }
                    } else {
                        setTimeout(remove, 1000)
                    }
                }
            })
        }

        card.appendChild(frontCard)
        card.appendChild(backCard)
        cardContainer.appendChild(card)
        gameBoard.appendChild(cardContainer)
    })

    
    
    let remove = function removeFlip() {
        let cards = document.getElementsByClassName('card')
    
        for(let i = 0; i < cards.length; i++) {
            cards.item(i).classList.remove('flip')
        }
        firstId = undefined
        secondId = undefined
        
    }

    let pair = function makePair() {
        let cards = document.getElementsByClassName('card')
        let trueOrFalse = []
    
        for(let i = 0; i < cards.length; i++) {
            cards.item(i).classList.replace('flip', 'pair')
            
            trueOrFalse.push(cards.item(i).classList.contains('pair'))
        }

        let isTrue = trueOrFalse.every(function checkTrue(check) {
            if(check) {
                return true
            } else {
                return false
            }
        })
        
        if(isTrue) {
            function getTime() {
                let getTime = document.getElementById('timer').value
                setTimeout(createModal, 100, getTime)
                clearInterval(t)
            }
            getTime()
            
        }
        firstId = undefined
        secondId = undefined
        
    }
}


function startGame(diff) {
    switch (diff) {
        case '1':
            setTimeout(cardsGame, 2000, cardsMedium, '1') 
            break;
        case '2':
            setTimeout(cardsGame, 2000, cardsMedium, '2')
            break;
    }
}

function createMenu() {
    let menu = document.createElement('div')
    menu.classList.add('menu')
    document.body.appendChild(menu)
    

    let title = document.createElement('h1')
    title.innerHTML = "Memory Game"
    menu.appendChild(title)


    let divBtn = document.createElement('div')
    divBtn.classList.add('divBtn')
    menu.appendChild(divBtn)

    
    let btnEasy = document.createElement('button')
    btnEasy.classList.add('btn', 'btnActive')
    btnEasy.value = '1'
    btnEasy.innerHTML = 'Easy'
    divBtn.appendChild(btnEasy)

    let btnMedium = document.createElement('button')
    btnMedium.classList.add('btn')
    btnMedium.value = '2'
    btnMedium.innerHTML = 'Medium'
    divBtn.appendChild(btnMedium)

    let btnStart = document.createElement('button')
    btnStart.classList.add('btn')
    btnStart.innerHTML = 'Start'
    btnStart.style.marginBottom = '-40px'
    btnStart.style.marginTop = '40px'
    menu.appendChild(btnStart)

    


    btnEasy.onclick = function() {
        if(!btnEasy.classList.contains('btnActive')){
            btnMedium.classList.remove('btnActive')
            btnEasy.classList.add( 'btnActive')
        }
    }

    btnMedium.onclick = function() {
        if(!btnMedium.classList.contains('btnActive')){
            btnEasy.classList.remove('btnActive')
            btnMedium.classList.add( 'btnActive')
        }
    }

    btnStart.onclick = function() {
        if(btnEasy.classList.contains('btnActive')) {
            startGame(btnEasy.value)
            gameMode = btnEasy.value
        } else {
            startGame(btnMedium.value)
            gameMode = btnMedium.value
        }
        setTimeout(removeMenu, 2000)
        menu.style.animation = 'menuAnimation 2s'
    }

    let removeMenu = function removeMenu() {
        menu.remove()
    }

}

function createModal(time) {
    let modalBg = document.createElement('div')
    let modal = document.createElement('div')
    let btnDiv = document.createElement('div')
    let btnMenu = document.createElement('button')
    let btnPlayAgain = document.createElement('button')
    let gameBoard = document.getElementById('game-board')
    let timer = document.getElementById('timer')



    modalBg.classList.add('modalBg')
    modal.classList.add('modalBox')
    btnMenu.classList.add('btn')
    btnPlayAgain.classList.add('btn')

    modal.innerHTML = '<h1>You Finished it!!!</h1>' + '<h2> Your '+ time + '</h2>' 
    btnMenu.innerHTML = 'Menu'
    btnPlayAgain.innerHTML = 'Play Again'
    
    btnDiv.appendChild(btnMenu)
    btnDiv.appendChild(btnPlayAgain)
    modalBg.appendChild(modal)
    modal.appendChild(btnDiv)
    document.body.appendChild(modalBg)

    btnMenu.onclick = function() {
        modalBg.remove()
        gameBoard.remove()
        timer.remove()
        createMenu()
    }

    btnPlayAgain.onclick = function() {
        modalBg.remove()
        gameBoard.remove()
        timer.remove()
        startGame(gameMode)
    }
}
    

function clock() {
    let timerr = document.getElementById('timer')
    let ss = 0
    let mm = 0
    let mn = 0

    function counting() {
        mm++ 

        if(mm == 100) {
            ss++
            mm = 0
        }
    
        if(ss === 60) {
            mn++
            ss = 0
        }
    
        let seconds = ss < 10 ? '0' + ss : ss
        let milisseconds = mm < 10 ?'0' + mm : mm
        let minutes = mn < 10 ? '0' + mn : mn
        
        timerr.innerHTML = '<h1>Time: ' + minutes + ':' + seconds + '</h1>' 
        timerr.value = 'Time: ' + minutes + ':' + seconds 
    
        t = setTimeout(counting, 10)
    }

    counting()
    
}





  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  