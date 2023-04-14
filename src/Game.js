const MAX_LIFE = 1;
const MAX_SCORE = 10_000;
const POWER_UP_DURATION = 8e3; // 8 seconds
const LOGO = createImage("src/assets/logo.jpg");

let score;
let cpt;
let level;
let life;
let isDead;
let ghostKilled;
let previousPowerUpId = null;

let opacity = 1;

function initGame() {
    pacman.setToInitialPosition();
    ghosts.forEach(ghost => ghost.goToHome());
    level=1;
    score=0;
    life=MAX_LIFE;
    isDead = false;
    cpt=0;
    ghostKilled=[];

    const formElement = document.querySelector("form");
    if(formElement)
        formElement.remove();
    requestAnimationFrame(start);
}

function isLevelFinished() {
    return dots.length < 1;
}

function drawBeforeGame() {
    const size = 300;
    const {width, height} = screen.getCanvas();
    const context = screen.getContext();

    if(opacity > 0) {
        opacity-=0.02;
        screen.setBackground(COLOR.DARK_STYLE);
        context.globalAlpha = opacity;
        context.drawImage(LOGO,
            (width/2)-150,
            (height/2)-180,
            size, size
        );
    } else {
        context.globalAlpha = 1;
        initGame();
        return;
    }
    requestAnimationFrame(drawBeforeGame);
}

function drawHeader() {
    screen.drawText(`Niveau ${level}`, 15, "white", 100, 30);
    screen.drawText(`Score ${score < 10 ? `0${score}` : score}`, 15, "white", 130,  55);

    screen.drawText(`Vies ${life}`, 15, "white", 300, 40);
}

function drawLevel() {
    const context = screen.getContext();
    const gameElements = [...boundaries, ...dots];

    screen.setBackground(COLOR.DARK_STYLE);
    gameElements.forEach(element => element.draw(context));
    ghosts.forEach(ghost => ghost.draw(context));
    pacman.draw(context);
}

function drawEnd() {
    screen.setBackground(COLOR.DARK_STYLE);
    createForm();
}

function update() {
    const context = screen.getContext();

    for (const dot of dots) {
        const i = dots.indexOf(dot);
        if(dot.collideWith(pacman)) {
            if(dot.getType() === "power-up") {
                ghosts.forEach(ghost => ghost.setVulnerable(true));
                ghostKilled = [];
                if(previousPowerUpId)
                    clearTimeout(previousPowerUpId);
                previousPowerUpId = setTimeout(() => {
                    ghosts.forEach(ghost => ghost.setVulnerable(false));
                    ghostKilled = [];
                }, POWER_UP_DURATION);
            }
            score+=10;
            cpt+=10;
            dots.splice(i, 1);
            break;
        }
    }

    for (const ghost of ghosts) {
        if(ghost.collideWith(pacman)) {
            if(ghost.isVulnerable()) {
                ghost.goToHome();
                const won = 200+(ghostKilled.length+1)
                score+=won;
                cpt+=won;
                ghostKilled.push(ghost);
            } else
                isDead = true;
            break;
        }

        ghost.update(context);
        ghost.detectTeleportation();
    }
    pacman.detectTeleportation();
    pacman.update(context);
}

function start() {
    if(isLevelFinished()) {
        level++;
        dots = [...originalDots];
        pacman.setToInitialPosition();
        ghosts.forEach(ghost => ghost.goToHome());
        start();
        return;
    } else if(isDead) {
        if(life < 1) {
            drawEnd();
            return;
        }
        pacman.setToInitialPosition();
        ghosts.forEach(ghost => ghost.goToHome());
        life--;
        isDead = false;

        start();
        return;
    }

    if(cpt >= MAX_SCORE && life < MAX_LIFE) {
        cpt = 0;
        life++;
    }

    drawLevel();
    drawHeader();

    update();
    requestAnimationFrame(start);
}
