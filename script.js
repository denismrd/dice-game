const player1 = document.querySelector('.player1');
const player2 = document.querySelector('.player2');
const p1_score = document.querySelector('.player1 .score .point');
const p1_current = document.querySelector('.player1 .current .point');
const p2_score = document.querySelector('.player2 .score .point');
const p2_current = document.querySelector('.player2 .current .point');
const hold = document.querySelector('.hold');
const roll = document.querySelector('.roll-dice');
const img = document.querySelector('.controls .dice-img');
const wintext = document.querySelector('.won .box .text');
const win = document.querySelector('.won');
const howbut = document.querySelector('.how');
const help = document.querySelector('.help');
const helpbox = document.querySelector('.help-box');
const wonbox = document.querySelector('.won .box');
let player_data, num, current;

//Set up new game
function new_game() {
    p1_score.textContent = 0;
    p2_score.textContent = 0;
    p1_current.textContent = 0;
    p2_current.textContent = 0;
    player_data = {
        p1: {
            ps: 0,
            cs: 0
        },
        p2: {
            ps: 0,
            cs: 0
        }
    };
    num = 1;
    current = player_data[`p${num}`];
    player1.className = 'player player1 select';
    player2.className = 'player player2';
}
new_game();

//When user clicks 'New game'
document.querySelector('.wonnew').addEventListener('click', new_game);
document.querySelector('.new').addEventListener('click', new_game);

//Show 'How to play' box
howbut.addEventListener('click', function () {
    howbut.style.animation = 'none';
    help.classList.add('show-overlay');
    helpbox.style.transform = 'translateY(0)';
});

//Hide 'how to play' box when user clicks somewhere
help.addEventListener('click', function () {
    help.classList.remove('show-overlay');
    helpbox.style.transform = 'translateY(-100vh)';
});

//Hide 'Won game' box when user clicks 'New game'
document.querySelector('.wonnew').addEventListener('click', function () {
    win.classList.remove('show-overlay');
    wonbox.style.transform = 'scale(0)';
});

hold.addEventListener('click', switchPlayer);
roll.addEventListener('click', rollHandler);

function switchPlayer() {
    current.ps += current.cs;
    eval(`p${num}_score`).textContent = current.ps;
    current.cs = 0;
    eval(`p${num}_current`).textContent = current.cs;

    //Show 'won game' box when score reaches the threshhold
    if (current.ps >= 100) {
        win.classList.add('show-overlay');
        wonbox.style.transform = 'scale(1)';
        wintext.textContent = `PLAYER-${num} won the game`;
        return;
    }

    eval(`player${num}`).classList.remove('select');
    num = num === 1 ? 2 : 1;
    current = player_data[`p${num}`];
    eval(`player${num}`).classList.add('select');
}
function rollHandler() {
    let rand = Math.floor(Math.random() * 6 + 1);

    //Show dice image based on random number
    let cls = 'zoom' + rand;
    if (img.classList.contains(cls)) {
        img.classList.toggle('zoomt' + rand);
    } else {
        img.className = `dice-img ${cls}`;
    }

    //Handle when dice hits 1
    if (rand === 1) {
        current.cs = 0;
        switchPlayer();
    } else {
        current.cs += rand;
        eval(`p${num}_current`).textContent = current.cs;
    }
}
