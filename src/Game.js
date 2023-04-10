const MAX_LIFE = 0;
const MAX_SCORE = 10_000;
const POWER_UP_DURATION = 30e3; // 30 seconds

let score;
let cpt;
let level;
let life;
let isDead;
let ghostKilled;

function initGame() {
    pacman.setToInitialPosition();
    ghosts.forEach(ghost => {
        ghost.setToInitialPosition();
        ghost.goOut();
    });
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
function drawHeader() {
    screen.drawText(`Niveau ${level}`, 15, "white", 100, 30);
    screen.drawText(`Score ${score < 10 ? `0${score}` : score}`, 15, "white", 130,  55);

    screen.drawText(`Vies ${life}`, 15, "white", 300, 40);
}

function drawLevel() {
    const context = screen.getContext();
    const gameElements = [...boundaries, ...dots];

    screen.setBackground("black");
    gameElements.forEach(element => element.draw(context));
    ghosts.forEach(ghost => ghost.draw(context));
    pacman.draw(context);
}

function drawEnd() {
    screen.setBackground("black");
    screen.drawText(`Score final: ${score}`, 25, "white", 120, 370);

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
                setTimeout(() => {
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
        start();
        return;
    } else if(isDead) {
        if(life < 1) {
            drawEnd();
            return;
        }
        pacman.setToInitialPosition();
        ghosts.forEach(ghost => ghost.setToInitialPosition());
        life--;
        isDead = false;

        start();
        return;
    }
    requestAnimationFrame(start);

    if(cpt >= MAX_SCORE && life < MAX_LIFE) {
        cpt = 0;
        life++;
    }

    drawLevel();
    drawHeader();

    update();
}
