function onLoad() {
    const canvas = document.getElementsByTagName('canvas')[0];
    const context = canvas.getContext('2d');
    const MAX_SPAWN_TIME = 1000;
    const MAX_MOVEMENT_SPEED = 5;
    const MOVEMENT_SPEED_MODIFIER = 1.1
    const SPAWN_TIME_MODIFIER = 50;
    const STARTING_SPAWN_TIME = 3000;
    const ALIENS_TO_KILL = 40;
    
    var music = new Audio('./sounds/music.mp3')
    var game_over = new Audio('./sounds/gameover.mp3')
    var alien_death = new Audio('./sounds/alien_death.mp3')
    var laser = new Audio('./sounds/laser.mp3')

    var playerImage = new Image();
    playerImage.src = './images/player.png'
    var alienImage = new Image();
    alienImage.src = './images/alien.png'

    var pressedKeys = {};
    var obstacles;
    var bullets;
    var spawnTime;
    var timeToSpawn;
    var gameover;
    var temp;
    var kills;
    var won;
    var playGameOverSound;
    var inGame;
    var aliensSpawned;

    // General idea for class methods taken from assignment 4 - bubble class
    class Player {
        constructor()
        {
            this.xpos = canvas.width/2;
            this.ypos = canvas.height - 50;
            this.size = 48;
            this.movementSpeed = 5;
            this.image = new Image();
            this.image.src = './images/player.png'
            this.ammo = 100;
        }

        draw()
        {
            context.drawImage(this.image, this.xpos, this.ypos, this.size, this.size);
        }

        move()
        {
            // Left arrow key
            if (pressedKeys["37"] || pressedKeys["65"])
            {
                if (this.xpos >= 0)
                {
                    this.xpos -= this.movementSpeed;
                }
            }
            // Up arrow key
            if (pressedKeys["38"] || pressedKeys["87"])
            {
                if (this.ypos >= 0)
                {
                    this.ypos -= this.movementSpeed;
                }
            }
            // Right arrow key
            if (pressedKeys["39"] || pressedKeys["68"])
            {
                if (this.xpos + this.size <= canvas.width)
                {
                    this.xpos += this.movementSpeed;
                }
            }
            // Down arrow key
            if (pressedKeys["40"] || pressedKeys["83"])
            {
                if (this.ypos + this.size <= canvas.height)
                {
                    this.ypos += this.movementSpeed;
                }
            }
            this.draw();
        }
    }

    class Obstacle {
                
        constructor()
        {
            this.size = 48;
            this.xpos = Math.floor(Math.random() * (canvas.width - this.size * 2) + this.size/2);
            this.ypos = 0;
            this.movementSpeed = Obstacle.movementSpeed;
            this.image = new Image();
            this.image.src = './images/alien.png'
        }

        draw()
        {
            context.drawImage(this.image, this.xpos, this.ypos, this.size, this.size);
        }

        move(index)
        {
            if (this.ypos >= canvas.height - this.size/2)
            {
                obstacles.splice(index, 1);
                gameover = true;
            }
            else
            {
                this.ypos += this.movementSpeed;
            }

            // Alien / Player collision detection

            // If the left or right xpos of the alien is between the left and right xpos of the player
            if((this.xpos >= player.xpos && this.xpos <= player.xpos + player.size) || (this.xpos + this.size >= player.xpos && this.xpos + this.size <= player.xpos + player.size))
            {
                // If the top or bottom ypos of the alien is between the top and bottom ypos of the player
                if ((this.ypos + this.size >= player.ypos && this.ypos + this.size <= player.ypos + player.size) || (this.ypos >= player.ypos && this.ypos <= player.ypos + player.size))
                {
                    gameover = true;
                }
            };

            this.draw();
        }
    }

    class Bullet {
        
        constructor()
        {
            this.xpos = player.xpos + player.size/2;
            this.ypos = player.ypos;
            this.movementSpeed = 7;
            this.length = 20;
            player.ammo -= 1;
        }

        draw()
        {
            context.beginPath();
            context.moveTo(this.xpos, this.ypos);
            context.lineTo(this.xpos, this.ypos + this.length);
            context.strokeStyle = 'red';
            context.stroke();
            context.strokeStyle = '#000000';
        }

        move(index)
        {
            if (this.ypos <= 0)
            {
                bullets.splice(index, 1);
            }
            else
            {
                this.ypos -= this.movementSpeed;
            }

            temp = this;

            obstacles.forEach( function(element) 
            {
                // Bullet / alien collision
                if(temp.xpos >= element.xpos && temp.xpos <= element.xpos + element.size && temp.ypos >= element.ypos && temp.ypos <= element.ypos + element.size)
                {
                    bullets.splice(temp.index, 1);
                    obstacles.splice(element.index, 1);
                    kills += 1;
                    alien_death.pause();
                    alien_death.currentTime = 0;
                    alien_death.play();
                }
            });

            this.draw();
        }

    }

    function gameLoop()
    {
        if(!inGame) return;
        window.requestAnimationFrame(gameLoop);
        context.clearRect(0, 0, canvas.width, canvas.height);
        updateKeyPresses();
        player.move();
        spawnObstacle();
        
        obstacles.forEach( function(element, index) 
        {
            element.move(index);
        });
        
        bullets.forEach( function(element, index) 
        {
            element.move(index);
        });

        context.fillStyle = "red";
        context.fillText("AMMO: " + player.ammo, canvas.width * 0.85, canvas.height - 50);
        context.fillText("KILLS: " + kills, canvas.width * 0.15, canvas.height - 50);
    
        checkIfWon();


        if (gameover == true)
        {
            if (playGameOverSound == true)
            {
                alien_death.pause();
                alien_death.currentTime = 0;
                alien_death.play();
                game_over.play();
                playGameOverSound = false;
            }
            music.pause();
            inGame = false;
            gameOver();
        }
    }

    function updateKeyPresses()
    {
        // Code to check if keys are being held down taken from stackoverflow
        // https://stackoverflow.com/questions/1828613/check-if-a-key-is-down
        window.onkeyup = function(e) { pressedKeys[e.keyCode] = false; }
        window.onkeydown = function(e) { 
            pressedKeys[e.keyCode] = true; 
            if (pressedKeys["32"] && player.ammo > 0 && gameover == false)
            {
                bullets.push(new Bullet());
                laser.pause();
                laser.currentTime = 0;
                laser.play();
            }
        }
    }

    function checkIfWon()
    {
        if (kills == ALIENS_TO_KILL)
        {
            gameover = true;
            won = true;
        }
    }

    function spawnObstacle()
    {
        if (timeToSpawn == true && aliensSpawned < ALIENS_TO_KILL)
        {
            timeToSpawn = false;
            let spawnTimer = setTimeout(function spawn()
            {
                obstacles.push(new Obstacle());
                aliensSpawned++;
                if (spawnTime >= MAX_SPAWN_TIME)
                {
                    spawnTime -= SPAWN_TIME_MODIFIER;
                }
                timeToSpawn = true;
                if (Obstacle.movementSpeed <= MAX_MOVEMENT_SPEED)
                {
                    Obstacle.movementSpeed *= MOVEMENT_SPEED_MODIFIER;
                }
            }, spawnTime)
        }
    }

    function mainMenu()
    {
        requestAnimationFrame(mainMenu);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.font = "64px spaceFont";
        context.fillStyle = "red";
        context.textAlign = "center";
        context.fillText("NAMESPACE INVADERS", canvas.width/2, canvas.height/6);
        context.drawImage(alienImage, canvas.width * 0.25 - 15, canvas.height/6 + 50, 32, 32);
        context.drawImage(playerImage, canvas.width * 0.50 - 15, canvas.height/6 + 50, 32, 32);
        context.drawImage(alienImage, canvas.width * 0.75 - 15, canvas.height/6 + 50, 32, 32);
        context.font = "32px spaceFont";
        context.fillText("INSTRUCTIONS", canvas.width/2, canvas.height/3);
        context.fillText("SHOOT ALL OF THE INCOMING ALIENS", canvas.width/2, canvas.height/3 + 50);
        context.fillText("IF THEY REACH THE BOTTOM YOU LOSE", canvas.width/2, canvas.height/3 + 100);
        context.fillText("IF THEY TOUCH YOU YOU LOSE", canvas.width/2, canvas.height/3 + 150);
        context.fillText("WIN BY KILLING " + ALIENS_TO_KILL+ " ALIENS", canvas.width/2, canvas.height/3 + 200);
        context.fillText("Arrow keys or WASD to move", canvas.width/2, canvas.height/3 + 250);
        context.fillText("SPACE TO SHOOT", canvas.width/2, canvas.height/3 + 300);
        context.fillText("SCORE IS HOW MANY BULLETS YOU HAVE LEFT", canvas.width/2, canvas.height/3 + 350);
        context.fillText("PRESS ANY KEY TO START", canvas.width/2, canvas.height - 50);
        window.onkeydown = function() 
        { 
            music.currentTime = 0;
            music.play();
            Obstacle.movementSpeed = 2;
            player = new Player();
            inGame = true;
            pressedKeys = {};
            obstacles = [];
            bullets = [];
            spawnTime = STARTING_SPAWN_TIME;
            timeToSpawn = true;
            gameover = false;
            kills = 0;
            won = false;
            playGameOverSound = true;
            inGame = true;
            aliensSpawned = 0;
            gameLoop();
        }
    }

    function gameOver()
    {
        if(!gameover) return;
        requestAnimationFrame(gameOver);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.font = "100px spaceFont";
        context.fillStyle = "red";
        context.textAlign = "center";
        context.fillText("GAME OVER", canvas.width/2, canvas.height/6);
        context.font = "64px spaceFont";
        if (won == true)
        {
            context.fillStyle = "green";
            context.fillText("YOU WIN", canvas.width/2, canvas.height/6 + 75);
            context.font = "32px spaceFont";
            context.fillText("BULLETS LEFT (SCORE): " + player.ammo, canvas.width/2, canvas.height/3);
        }
        else
        {
            context.fillText("YOU LOSE", canvas.width/2, canvas.height/6 + 75);
        }
        context.fillStyle = "red";
        context.font = "48px spaceFont";
        context.fillText("CREDITS", canvas.width/2, canvas.height/2 - 50);
        context.font = "24px spaceFont";
        context.fillText("Programmed by me", canvas.width/2, canvas.height/2);
        context.fillText("Music produced by me", canvas.width/2, canvas.height/2 + 50);
        context.fillText("Sound effects created by me", canvas.width/2, canvas.height/2 + 100);
        context.fillText("Alien/Spaceship art by me", canvas.width/2, canvas.height/2 + 150);
        context.fillText("Space GIF via GIPHY", canvas.width/2, canvas.height/2 + 200);
        context.fillText("Background via wallpapersden", canvas.width/2, canvas.height/2 + 250);
        context.font = "32px spaceFont";
        context.fillText("PRESS Y TO PLAY AGAIN", canvas.width/2, canvas.height - 50);
        updateKeyPresses();
        if (pressedKeys["89"])
        {
            gameover = false;
        }
    }

    mainMenu();
}
