let tab = [];
let secondTab = [];
let rowDisplay = document.querySelector("#tab")
let cellDisplay = document.querySelectorAll(".row")
let containerElement = document.querySelector("#container")
let addCount = document.querySelector("#textCount")
let count = 0;
let retry = 0;
let play = 0;
let generation = 0;


function generateGrid() {
    for (let i = 0; i < 100; i++) {
        let row = document.createElement('div')
        tab.push([])
        row.classList.add('row')
        for (let j = 0; j < 100; j++) {
            tab[i].push(0)
            let cell = document.createElement('div')
            cell.classList.add('cell')
            cell.setAttribute('onclick', 'setAlive(this)')
            cell.setAttribute('posI', i)
            cell.setAttribute('posJ', j)
            row.appendChild(cell)
        }
        containerElement.appendChild(row)

    }
}

generateGrid()
isAlive()
refresh()

function setAlive(elem) {
    let j = parseInt(elem.getAttribute('posJ'));
    let i = parseInt(elem.getAttribute('posI'));


    tab[i][j] = tab[i][j] === 0 ? 1 : 0
    refresh()
//    elem.getAttribute('posI')
}





function go() {
    setInterval(() => {
        refresh()
        isAlive()

    }, 100)
}

function refresh() {
    for (let i = 0; i < tab.length; i++) {
        let cells = document.querySelectorAll(".row")[i].querySelectorAll('.cell')
        for (let j = 0; j < tab[i].length; j++) {
            if (tab[i][j] == 1) {
                // cells[j].innerText = tab[i][j]
                cells[j].style.background = 'black';


            }
            if (tab[i][j] == 0) {
                // cells[j].innerText = tab[i][j]
                cells[j].style.background = 'white';


            }

        }

    }
    count++
    addCount.innerText = count
}

function isAlive() {
    let secondTab = []
    tab.forEach(row => {
        secondTab.push([...row])
    })

    for (let i = 0; i < tab.length - 1; i++) {
        for (let j = 0; j < tab[i].length - 1; j++) {
            if (i > 0 && j > 0 && i < secondTab.length - 1 && j < secondTab[i].length - 1) {
                let liveScore =
                    tab[i - 1][j - 1] +
                    tab[i - 1][j] +
                    tab[i - 1][j + 1] +
                    tab[i][j - 1] +
                    tab[i][j + 1] +
                    tab[i + 1][j - 1] +
                    tab[i + 1][j] +
                    tab[i + 1][j + 1]
                if (liveScore < 2 || liveScore > 3) {
                    secondTab[i][j] = 0;
                } else if (liveScore === 3) {
                    secondTab[i][j] = 1;
                }

            }
        }

    }
    tab = []
    secondTab.forEach(row => {
        tab.push([...row])
    })
}


