let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
let nbJump = 0;
let gameOver = false;
let imageObstacle = [];

function random() {
    return Math.floor(Math.random() * 6) + 1;
}

let nb = 0;

class Character {

    constructor(posX, posY, width, height, image) {
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        this.image = new Image();
        this.image.src = image;
        this.image.width = width;
        this.image.height = height;
    }

    displayCharacter() {
        context.drawImage(this.image, this.posX, this.posY);
    }

    clearCharcter() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    jump(event) {
        if (nbJump == 0) {
            if (event.key == " ") {
                this.clearCharcter();
                this.posY -= 100;
                this.displayCharacter();
                nbJump++;
                //On regarde si on est en bas du canvas
                if (this.posY + this.width <= canvas.height) {
                    setTimeout(() => {
                        this.clearCharcter();
                        this.posY += 100;
                        this.displayCharacter();
                        nbJump--;
                    }, 1000);
                }
                // Si le personnage touche le haut du canvas alors on le remet en bas
                if (this.posY <= 0) {
                    this.posY = 550;
                }
            }
        }

    }
}

class Obstacle {

    constructor(posX, posY, width, height, image) {
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        this.image = new Image();
        this.image.src = image;
        this.image.width = width;
        this.image.height = height;
    }

    displayObstacle() {
        context.drawImage(this.image, this.posX, this.posY);
    }

    clearObstacle() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    moveObstacle() {
        this.clearObstacle();
        this.posX -= 50;
        // Character.displayCharacter();
    }

}

let imageDino = new Character(0, 500, 102, 94, './img/trex.png');

imageDino.image.onload = function () {
    imageDino.displayCharacter();
};


// Boucle du jeu
//while (!gameOver) {
    nb = random();
    for (let i = 0; i < nb; i++) {
        imageObstacle[i] = new Obstacle(500 * nb, 530, 47, 73, './img/cactus.png');
        imageObstacle[i].image.onload = function () {
            imageObstacle[i].displayObstacle();
        };

        if (imageObstacle[i].posX == imageDino.posX) {
            gameOver = true;
        } else {
            imageObstacle[i].moveObstacle();
        }
    }
//}

document.addEventListener('keydown', function (event) {
    imageDino.jump(event);
    for (let i = 0; i < nb; i++) {
        imageObstacle[i].displayObstacle();
    }
});
