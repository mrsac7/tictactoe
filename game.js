var human = 1,
    comp = 0;
var level = -1;
var moves = 0;

var magicsquare = [2, 7, 6, 9, 5, 1, 4, 3, 8];
var bot = [];
var player1 = [];
var player2 = [];
var occupied = [0, 0, 0, 0, 0, 0, 0, 0, 0];

function emptyAll() {
    "use strict";
    var x;
    for (var i = 1; i <= 9; i += 1) {
        x = document.getElementById(i);
        x.innerHTML = '';
    }
    for (var i = 0; i < 10; i += 1) {
        occupied[i] = 0;
    }
    bot = [];
    player1 = [];
    player2 = [];
}

function restartClicked() {
    "use strict";
    emptyAll();
    moves = 0;
    human = 1;
    comp = 0;
    var x = document.getElementById("button-o"),
        y = document.getElementById("button-x");
    x.style.backgroundColor = "#A9A9A9";
    y.style.backgroundColor = "deepPink";
}

function winCondition(list) {
    "use strict";
    for (var i = 0; i < list.length - 2; i += 1) {
        for (var j = i + 1; j < list.length - 1; j += 1) {
            for (var k = j + 1; k < list.length; k += 1) {
                if (list[i] + list[j] + list[k] === 15) {
                    return 1;
                }
            }
        }
    }
    return 0;
}

function magicToIndex(n) {
    "use strict";
    for (var i = 0; i < 9; i += 1) {
        if (n === magicsquare[i]) {
            return i;
        }
    }
    return -1;
}

function trioCheck(list) {
    "use strict";
    var z;
    for (var i = 0; i < list.length - 1; i++) {
        for (var j = i + 1; j < list.length; j++) {
            z = 15 - (list[i] + list[j]);
            if (magicToIndex(z) !== -1 && !occupied[magicToIndex(z)]) {
                return magicToIndex(z) + 1;
            }
        }
    }
    return 0;
}

function randomPosition() {
    "use strict";
    var available = [],
        item;
    for (var i = 0; i < 9; i += 1) {
        if (occupied[i] === 0) {
            available.push(i);
        }
    }
    item = available[Math.floor(Math.random() * available.length)];
    return item + 1;

}

function randomExtPosition() {
    "use strict";
    var available = [],
        item;
    for (var i = 0; i < 9; i += 2) {
        if (occupied[i] === 0) {
            available.push(i);
        }
        if (i === 2) {
            i = 4;
        }
    }
    item = available[Math.floor(Math.random() * available.length)];
    return item + 1;
}

function randomMidPosition() {
    "use strict";
    var available = [],
        item;
    for (var i = 1; i < 8; i += 2) {
        if (occupied[i] === 0) {
            available.push(i);
        }
    }
    item = available[Math.floor(Math.random() * available.length)];
    return item + 1;
}

function vsPlayer(i) {
    "use strict";
    var x = document.getElementById("button-o"),
        y = document.getElementById("button-x");
    if (moves % 2 === 1) {
        player1.push(magicsquare[i - 1]);
        x.style.backgroundColor = "deepPink";
        y.style.backgroundColor = "#A9A9A9";
    } else {
        player2.push(magicsquare[i - 1]);
        x.style.backgroundColor = "#A9A9A9";
        y.style.backgroundColor = "deepPink";
    }
    if (winCondition(player1)) {
        setTimeout(function () {
            alert("Player 1 Wins!!");
            restartClicked();
        }, 1);
        return;
    }
    if (winCondition(player2)) {
        setTimeout(function () {
            alert("Player 2 Wins!!");
            restartClicked();
        }, 1);
        return;
    }
    if (moves === 9) {
        setTimeout(function () {
            alert("It's a Tie!!");
            restartClicked();
        }, 1);
    }
}

function easy() {
    "use strict";
    if (trioCheck(bot)) {
        return trioCheck(bot);
    }
    return randomPosition();
}

function medium() {
    "use strict";
    if (trioCheck(bot)) {
        return trioCheck(bot);
    }
    if (trioCheck(player1)) {
        return trioCheck(player1);
    }
    return randomPosition();
}

function hardSecond() {
    "use strict";
    if (trioCheck(bot)) {
        return trioCheck(bot);
    }
    if (trioCheck(player1)) {
        return trioCheck(player1);
    }
    if (moves === 1) {
        var first = player1[0];
        if (player1[0] === 5) {
            return randomExtPosition();
        } else if (first === 2 || first === 4 || first === 6 || first === 8) {
            return 5;
        } else {
            return (magicToIndex(10 - first) + 1);
        }
    } else if (moves === 3) {
        if (bot[0] === 5) {
            return randomMidPosition();
        }
        return randomExtPosition();
    } else {
        return randomPosition();
    }
}

function hardFirst() {
    "use strict";
    if (trioCheck(bot)) {
        return trioCheck(bot);
    }
    if (trioCheck(player1)) {
        return trioCheck(player1);
    }
    var r = Math.round(Math.random());
    if (moves === 0) {
        if (r) {
            return randomExtPosition();
        } else {
            return 5;
        }
    } else if (moves === 2) {
        if (!occupied[4]) {
            return 5;
        } else {
            return randomExtPosition();
        }
    } else {
        return randomPosition();
    }
}

// Bot plays first
function vsBotFirst() {
    var k;
    "use strict";
    if (level === 1) {
        k = easy();
    }
    if (level === 2) {
        k = medium();
    }
    if (level === 3) {
        k = hardFirst();
    }
    var x = document.getElementById(k);
    x.innerHTML = '<img src="' + comp + '.png" width="75%">';
    occupied[k - 1] = 1;
    moves += 1;
    bot.push(magicsquare[k - 1]);
    if (winCondition(bot)) {
        setTimeout(function () {
            alert("Bot Wins!!");
            restartClicked();
        }, 1);
        return;
    }
    if (moves === 9) {
        setTimeout(function () {
            alert("It's a Tie!!");
            restartClicked();
        }, 1);
    }
}


function vsBotSecond() {
    "use strict";
    var k;
    if (winCondition(player1)) {
        setTimeout(function () {
            alert("Player Wins!!");
            restartClicked();
        }, 1);
        return;
    }

    if (moves === 9) {
        setTimeout(function () {
            alert("It's a Tie!!");
            restartClicked();
        }, 1);
        return;
    }
    if (level === 1) {
        k = easy();
    }
    if (level === 2) {
        k = medium();
    }
    if (level === 3) {
        k = hardSecond();
    }

    var x = document.getElementById(k);
    x.innerHTML = '<img src="' + comp + '.png" width="75%">';
    occupied[k - 1] = 1;
    moves += 1;
    bot.push(magicsquare[k - 1]);
    if (winCondition(bot)) {
        setTimeout(function () {
            alert("Bot Wins!!");
            restartClicked();
        }, 1);
        return;
    }
}

function playareaClicked(i) {
    "use strict";
    if (level === -1) {
        alert("Select 'Vs Bot' or 'Vs Player' first");
        return;
    }
    if (occupied[i - 1]) {
        return;
    }
    occupied[i - 1] = 1;
    moves += 1;
    var x = document.getElementById(i),
        zero_one;
    if (level === 0) {
        zero_one = moves % 2;
        x.innerHTML = '<img src="' + zero_one + '.png" width="75%">';
        vsPlayer(i);
    } else {
        x.innerHTML = '<img src="' + human + '.png" width="75%">';
        player1.push(magicsquare[i - 1]);
        if (human === 1) {
            vsBotSecond();
        } else if (human === 0) {
            if (winCondition(player1)) {
                setTimeout(function () {
                    alert("Player Wins!!");
                    restartClicked();
                }, 1);
                return;
            }
            vsBotFirst();
        }
    }
}

function hover() {
    "use strict";
    var y = document.getElementById("levels");
    y.style.opacity = 1;
    y.style.visibility = "visible";
    if (level <= 0) {
        var x = document.getElementById("button1");
        x.style.backgroundColor = "#808080";
    }
    else {
        var x = document.getElementById("button1");
        x.style.backgroundColor = "#C71585";
    }
}

function notHover() {
    "use strict";
    var y = document.getElementById("levels");
    y.style.opacity = 0;
    y.style.visibility = "hidden";
    if (level <= 0) {
        var x = document.getElementById("button1");
        x.style.backgroundColor = "#A9A9A9";
    }
    else {
        var x = document.getElementById("button1");
        x.style.backgroundColor = "deepPink";
    }
}

function hoverB2() {
    if (level === 0) {
        var x = document.getElementById("button2");
        x.style.backgroundColor = "#C71585";
    }
    else {
        var x = document.getElementById("button2");
        x.style.backgroundColor = "#808080";
    }
}

function notHoverB2() {
    if (level === 0) {
        var x = document.getElementById("button2");
        x.style.backgroundColor = "deepPink";
    }
    else {
        var x = document.getElementById("button2");
        x.style.backgroundColor = "#A9A9A9";
    }
}

function hoverR() {
    var x = document.getElementById("button3");
    x.style.backgroundColor = "#C71585";
}

function notHoverR() {
    var x = document.getElementById("button3");
    x.style.backgroundColor = "deepPink";
}

function easyClicked() {
    "use strict";
    restartClicked();
    var x = document.getElementById("button1"),
        y;
    x.innerHTML = "Easy";
    y = document.getElementById("levels");
    y.style.opacity = 0;
    y.style.visibility = "hidden";
    level = 1;
    x = document.getElementById("button2");
    x.style.backgroundColor = "#A9A9A9";
    y = document.getElementById("button1");
    y.style.backgroundColor = "deepPink";
    if (human === 0) {
        vsBotFirst();
    }
}

function mediumClicked() {
    "use strict";
    restartClicked();
    var x = document.getElementById("button1"),
        y;
    x.innerHTML = "Medium";
    y = document.getElementById("levels");
    y.style.opacity = 0;
    y.style.visibility = "hidden";
    level = 2;
    x = document.getElementById("button2");
    x.style.backgroundColor = "#A9A9A9";
    y = document.getElementById("button1");
    y.style.backgroundColor = "deepPink";
    if (human === 0) {
        vsBotFirst();
    }
}

function hardClicked() {
    "use strict";
    restartClicked();
    var x = document.getElementById("button1"),
        y;
    x.innerHTML = "Impossible";
    y = document.getElementById("levels");
    y.style.opacity = 0;
    y.style.visibility = "hidden";
    level = 3;
    x = document.getElementById("button2");
    x.style.backgroundColor = "#A9A9A9";
    y = document.getElementById("button1");
    y.style.backgroundColor = "deepPink";
    if (human === 0) {
        vsBotFirst();
    }
}

function initVsPlayer() {
    "use strict";
    restartClicked();
    level = 0;
    var x = document.getElementById("button2"),
        y = document.getElementById("button1");
    x.style.backgroundColor = "deepPink";
    y.style.backgroundColor = "#A9A9A9";
    y.innerHTML = "Vs Bot";
}

function switchXO(i) {
    "use strict";
    if (moves > 0) {
        return;
    }
    if (level <= 0) {
        return;
    }
    var x, y;
    if (i === 0) {
        human = 0;
        comp = 1;
        x = document.getElementById("button-o");
        y = document.getElementById("button-x");
        x.style.backgroundColor = "deepPink";
        y.style.backgroundColor = "#A9A9A9";

        vsBotFirst();
    } else {
        human = 1;
        comp = 0;
        x = document.getElementById("button-o");
        y = document.getElementById("button-x");
        x.style.backgroundColor = "#A9A9A9";
        y.style.backgroundColor = "deepPink";
    }
}
