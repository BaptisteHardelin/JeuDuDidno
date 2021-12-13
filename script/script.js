let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
let nbJump = 0;
let gameOver = false;
let imageObstacle = [];

function random() {
    return Math.floor(Math.random() * 6) + 1;
}

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
    }

}

let nb = 5;

for (let i = 0; i < nb; i++) {
    imageObstacle[i] = new Obstacle(1000 - i * 200, 530, 47, 73, './img/cactus.png');
}
let imageDino = new Character(0, 500, 102, 94, './img/trex.png');

imageDino.image.onload = function () {
    imageDino.displayCharacter();
};

// Boucle du jeu
let jouer = setInterval(() => {

    for (let i = 0; i < nb; i++) {
        imageObstacle[i].image.onload = function () {
            imageObstacle[i].displayObstacle();
        };

        if (imageObstacle[i].posX == imageDino.posX && imageObstacle[i].posY == imageDino.posY) {
            gameOver = true;
            clearInterval(jouer);
        } else {
            imageObstacle[i].clearObstacle()
            imageObstacle[i].posX += -5
            imageObstacle[i].displayObstacle();
            imageDino.displayCharacter();
            
        }
    }

    if(gameOver) {
        clearInterval(jouer);
        context.font = '48px red';
        context.fillText('Perdu !', 10, 50);
    }else {
        context.fillText('', 10, 50); 
    }
},
100);

document.addEventListener('keydown', function (event) {
    imageDino.jump(event);
    for (let i = 0; i < nb; i++) {
        imageObstacle[i].displayObstacle();
    }
});