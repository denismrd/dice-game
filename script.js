let hold,
    roll,
    player1,
    player2,
    p1_score,
    p1_current,
    p2_score,
    p2_current,
    p1,
    p2,
    wintext,
    win,
    howbut,
    help,
    helpbox,
    current,
    img,
    wonbox;
hold = document.querySelector(".hold");
roll = document.querySelector(".roll-dice");
player1 = document.querySelector(".player1");
player2 = document.querySelector(".player2");
p1_score = document.querySelector(".player1 .score .point");
p1_current = document.querySelector(".player1 .current .point");
p2_score = document.querySelector(".player2 .score .point");
p2_current = document.querySelector(".player2 .current .point");
img = document.querySelector(".controls .dice-img");
wintext = document.querySelector(".won .box .text");
win = document.querySelector(".won");
howbut = document.querySelector(".how");
help = document.querySelector(".help");
helpbox = document.querySelector(".help-box");
wonbox = document.querySelector(".won .box");
function start() {
    p1_score.textContent = 0;
    p2_score.textContent = 0;
    p1_current.textContent = 0;
    p2_current.textContent = 0;
    p1 = {
        ps: 0,
        cs: 0,
    };
    p2 = {
        ps: 0,
        cs: 0,
    };
    current = p1;
    player1.className = "player player1 select";
    player2.className = "player player2";
}
start();
document.querySelector(".wonnew").addEventListener("click", start);
document.querySelector(".new").addEventListener("click", start);
howbut.addEventListener("click", function () {
    howbut.style.animation = "none";
    help.classList.add("show-overlay");
    helpbox.style.transform = "translateY(0)";
});
help.addEventListener("click", function () {
    help.classList.remove("show-overlay");
    helpbox.style.transform = "translateY(-100vh)";
});
document.querySelector(".wonnew").addEventListener("click", function () {
    win.classList.remove("show-overlay");
    wonbox.style.transform = "scale(0)";
});

hold.addEventListener("click", switchPlayer);
roll.addEventListener("click", rollHandler);

function switchPlayer() {
    if (current === p1) {
        p1.ps += p1.cs;
        p1_score.textContent = p1.ps + "";
        p1_current.textContent = 0;
        if (p1.ps >= 100) {
            win.classList.add("show-overlay");
            wonbox.style.transform = "scale(1)";
            wintext.textContent = "PLAYER-1 won the game";
            return;
        }
        p1.cs = 0;
        current = p2;
        player1.classList.remove("select");
        player2.classList.add("select");
    } else {
        p2.ps += p2.cs;
        p2_score.textContent = p2.ps + "";
        p2_current.textContent = 0;
        if (p2.ps >= 100) {
            win.classList.add("show-overlay");
            wonbox.style.transform = "scale(1)";
            wintext.textContent = "PLAYER-2 won the game";
            return;
        }
        p2.cs = 0;
        current = p1;
        player2.classList.remove("select");
        player1.classList.add("select");
    }
}
function changeCurrent() {
    if (current === p1) {
        p1_current.textContent = current.cs + "";
    } else {
        p2_current.textContent = current.cs + "";
    }
}
function rollHandler() {
    let rand = Math.floor(Math.random() * 6 + 1);
    if (rand === 1) {
        changeImage(1);
        current.cs = 0;
        changeCurrent();
        switchPlayer();
    } else {
        changeImage(rand);
        current.cs += rand;
        changeCurrent();
    }
}
function changeImage(n) {
    let cls = "zoom" + n;
    if (img.classList.contains(cls)) {
        img.classList.toggle("zoomt" + n);
    } else {
        img.className = `dice-img ${cls}`;
    }
}
