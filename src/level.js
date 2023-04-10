const map = [
    ['1', 'g', 'g', 'g', 'g', 'g', 'g', 'g', '9', 'g', 'g', 'g', 'g', 'g', 'g', '2'],
    ['|l', '.', '.', '.', '.', '.', '.', '.', '10', '.', '.', '.', '.', '.', '.', '|r'],
    ['|l', '.S', '[', ']', '.', '[', ']', '.', '11', '.', '[', ']', '.', 'b', '.S', '|r'],
    ['|l', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '|r'],
    ['|l', '.', '[', ']', '.', '[', ']', '.', 'b', '.', '[', ']', '.', 'b', '.', '|r'],
    ['|l', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '|r'],
    ['12', 'g', 'g', '2', '.', '[', 'm', 'm', 'm', 'm', ']', '.', '1', 'g', 'g', '13'],
    ['  ', ' ', ' ', '|r', '.', '.', '.', '.', '.', '.', '.', '.', '|l', ' ', ' ', ' '],
    ['k', 'k', 'k', '4', '.', '7', 'g', 't', 't', 'g', '6', '.', '3', 'k', 'k', 'k'],
    [' ', ' ', ' ', ' ', '.', '|l', 'bl', 'pi', 'r', 'o', '|r', '.', ' ', ' ', '  ', ' '],
    ['g', 'g', 'g', '2', '.', '8', 'k', 'k', 'k', 'k', '5', '.', '1', 'g', 'g', 'g'],
    ['  ', ' ', ' ', '|r', '.', '.', '.', '.', '.', '.', '.', '.', '|l', ' ', ' ', ' '],
    ['15', 'k', 'k', '4', '.', '16', '.', '[', '18', '.', '16', '.', '3', 'k', 'k', '14'],
    ['|l', '.', '.', '.', '.', '17', '.', '.', '19', '.', '19', '.', '.', '.', '.', '|r'],
    ['|l', '.', '[', '18', '.', '.', '.', '[', '20', '.', '17', '.', '[', '18', '.', '|r'],
    ['|l', '.S', '.', '19', '.', '16', '.', '.', '.', 'p', '.', '.', '.', '17', '.S', '|r'],
    ['23', '24', '.', '17', '.', '19', '.', '[', 'm', '22', 'm', ']', '.', '.', '.', '|r'],
    ['|l', '.', '.', '.', '.', '19', '.', '.', '.', '19', '.', '.', '.', '16', '.', '|r'],
    ['|l', '.', '[', 'm', 'm', '21', 'm', ']', '.', '17', '.', '[', 'm', '20', '.', '|r'],
    ['|l', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '|r'],
    ['3', 'k', 'k', 'k', 'k', 'k', 'k', 'k', 'k', 'k', 'k', 'k', 'k', 'k', 'k', '4']
] // pi r bl o
const boundaries = [];
const ghosts = [];

let dots = [];
let pacman = null;


const PATH = "src/assets/boundaries/";
map.forEach((row, i) => {
    i+=1.6;
    row.forEach((symbol, j) => {
        j+=.3;
        switch(symbol) {
            case "1":
                boundaries.push(new Boundary(j, i, createImage(`${PATH}pipeCorner1.png`)));
                break;
            case "2":
                boundaries.push(new Boundary(j, i, createImage(`${PATH}pipeCorner2.png`)));
                break;
            case "3":
                boundaries.push(new Boundary(j, i, createImage(`${PATH}pipeCorner3.png`)));
                break;
            case "4":
                boundaries.push(new Boundary(j, i, createImage(`${PATH}pipeCorner4.png`)));
                break;
            case "5":
                boundaries.push(new Boundary(j, i, createImage(`${PATH}pipeCorner5.png`)));
                break;
            case "6":
                boundaries.push(new Boundary(j, i, createImage(`${PATH}pipeCorner6.png`)));
                break;
            case "7":
                boundaries.push(new Boundary(j, i, createImage(`${PATH}pipeCorner7.png`)));
                break;
            case "8":
                boundaries.push(new Boundary(j, i, createImage(`${PATH}pipeCorner8.png`)));
                break;
            case "9":
                boundaries.push(new Boundary(j, i, createImage(`${PATH}pipeVertical5.png`)));
                break;
            case "10":
                boundaries.push(new Boundary(j, i, createImage(`${PATH}pipeVertical4.png`)));
                break;
            case "11":
                boundaries.push(new Boundary(j, i, createImage(`${PATH}pipeVertical3.png`)));
                break;
            case "12":
                boundaries.push(new Boundary(j, i, createImage(`${PATH}pipeCorner9.png`)));
                break;
            case "13":
                boundaries.push(new Boundary(j, i, createImage(`${PATH}pipeCorner10.png`)));
                break;
            case "14":
                boundaries.push(new Boundary(j, i, createImage(`${PATH}pipeCorner11.png`)));
                break;
            case "15":
                boundaries.push(new Boundary(j, i, createImage(`${PATH}pipeCorner12.png`)));
                break;
            case "16":
                boundaries.push(new Boundary(j, i, createImage(`${PATH}cap1.png`)));
                break;
            case "17":
                boundaries.push(new Boundary(j, i, createImage(`${PATH}cap2.png`)));
                break;
            case "18":
                boundaries.push(new Boundary(j, i, createImage(`${PATH}cap3.png`)));
                break;
            case "19":
                boundaries.push(new Boundary(j, i, createImage(`${PATH}cap4.png`)));
                break;
            case "20":
                boundaries.push(new Boundary(j, i, createImage(`${PATH}cap5.png`)));
                break;
            case "21":
                boundaries.push(new Boundary(j, i, createImage(`${PATH}cap6.png`)));
                break;
            case "22":
                boundaries.push(new Boundary(j, i, createImage(`${PATH}cap7.png`)));
                break;
            case "23":
                boundaries.push(new Boundary(j, i, createImage(`${PATH}pipeHorizontal1.png`)));
                break;
            case "24":
                boundaries.push(new Boundary(j, i, createImage(`${PATH}pipeHorizontal2.png`)));
                break;
            case "g":
                boundaries.push(new Boundary(j, i, createImage(`${PATH}pipeHorizontalTop.png`)));
                break;
            case "|r":
                boundaries.push(new Boundary(j, i, createImage(`${PATH}pipeVerticalRight.png`)));
                break;
            case "k":
                boundaries.push(new Boundary(j, i, createImage(`${PATH}pipeHorizontalBottom.png`)));
                break;
            case "|l":
                boundaries.push(new Boundary(j, i, createImage(`${PATH}pipeVerticalLeft.png`)));
                break;
            case 'b':
                boundaries.push(new Boundary(j, i, createImage(`${PATH}block.png`)));
                break;
            case '[':
                boundaries.push(new Boundary(j, i, createImage(`${PATH}capLeft.png`)));
                break;
            case ']':
                boundaries.push(new Boundary(j, i, createImage(`${PATH}capRight.png`)));
                break;
            case 'm':
                boundaries.push(new Boundary(j, i, createImage(`${PATH}capMid.png`)));
                break;
            case 't':
                boundaries.push(new Boundary(j, i, createImage(`${PATH}verticalSpawn.png`)));
                break;
            case "p":
                pacman = new Pacman(j, i);
                break;
            case "r":
                ghosts.push(new Ghost(j, i, "#de0602"));
                break;
            case "pi":
                ghosts.push(new Ghost(j, i, "#e696c2"));
                break;
            case "bl":
                ghosts.push(new Ghost(j, i, "#09b4da"));
                break;
            case "o":
                ghosts.push(new Ghost(j, i, "#e49601"));
                break;
            case ".":
                dots.push(new Dot(j, i));
                break;
            case ".S":
                dots.push(new SuperDot(j, i));
                break;
        }
    });
})

const originalDots = [...dots];
