(function() {
    window.jSnake = function(element, options) {
        options = options || {};
        const dimensionsX = options.width || 20;
        const dimensionsY = options.height || 20;
        let gameLoopInterval;
        const S_DOWN = 'sd', S_UP = 'su', S_LEFT = 'sl', S_RIGHT = 'sr'
        const keyCodes = { arrowUp: 38, arrowDown: 40, arrowLeft: 37, arrowRight: 39, space: 32 }
        let score = 0;

        function beep() {
            var snd = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");
            snd.play();
        }

        const buildMap = (element) => {
            const wallCoords = [];
            const table = document.createElement('table');
            table.className = 'game';

            for (let y = 0; y < dimensionsY; y++) {
                const row = document.createElement('tr');
                for (let x = 0; x < dimensionsX; x++) {
                    let className = 'field';
                    if (y === 0 || y === (dimensionsY - 1) || x === 0 || x === (dimensionsX - 1)) {
                        wallCoords.push({ x: x, y: y });
                        className = 'wall';
                    }

                    const column = document.createElement('td');
                    if (x == 0 && y == 0) {
                        const score = document.createElement('span');
                        score.className = 'score';
                        column.appendChild(score);
                    }
                    column.id = x + '-' + y;
                    column.className = className;
                    row.appendChild(column);
                }
                table.appendChild(row);
            }

            element.appendChild(table);

            return {
                get: (x, y) => {
                    return document.getElementById(x + '-' + y);
                },
                dimensions: [dimensionsX, dimensionsY],
                wallCoords: wallCoords
            }
        }

        const Snake = function (_x, _y, map) {
            this._initialX = _x;
            this._initialY = _y;
            this.tail = [];
            this.direction = S_DOWN;

            this.startFromBeginning = () => {
                this.tail.forEach(t => {
                    map.get(t.x, t.y).className = 'field';
                });
                this.tail = [
                    { x: this._initialX, y: this._initialY },
                    { x: this._initialX, y: this._initialY + 1 },
                ];
                this.direction = S_DOWN;
                this._updateTail();
            }

            this.updateDirection = function (keyCode) {
                let direction = null;
                
                if (keyCode === keyCodes.arrowDown && this.direction !== S_UP) {
                    this.direction = S_DOWN;
                }
                if (keyCode === keyCodes.arrowUp && this.direction !== S_DOWN) {
                    this.direction = S_UP;
                }
                if (keyCode === keyCodes.arrowLeft && this.direction !== S_RIGHT) {
                    this.direction = S_LEFT;
                }
                if (keyCode === keyCodes.arrowRight && this.direction !== S_LEFT) {
                    this.direction = S_RIGHT;
                }
            }

            this.update = (map, fruit, gameOver) => {
                const detectWallCollision = (newPos) => {
                    let collision = false;
                    map.wallCoords.forEach(coord => {
                        if (coord.x === newPos.x && coord.y === newPos.y) {
                            collision = true;
                            console.warn('wall collision detected');
                        }
                    });
                    return collision;
                };

                const detectSelfCollision = (newPos) => {
                    let collision = false;
                    this.tail.forEach(coord => {
                        if (coord.x === newPos.x && coord.y === newPos.y) {
                            collision = true;
                            console.warn('collision with self detected');
                        }
                    });
                    return collision;
                }

                const tip = this.tail[this.tail.length - 1];
                let newPos = null;
                if (this.direction === S_DOWN) { newPos = { x: tip.x, y: tip.y + 1 }; }
                if (this.direction === S_LEFT) { newPos = { x: tip.x - 1, y: tip.y }; }
                if (this.direction === S_UP) { newPos = { x: tip.x, y: tip.y - 1 }; }
                if (this.direction === S_RIGHT) { newPos = { x: tip.x + 1, y: tip.y }; }

                if (!detectWallCollision(newPos) && !detectSelfCollision(newPos)) {
                    this.tail.push(newPos);
                    if (fruit.coord && fruit.coord.x === newPos.x && fruit.coord.y === newPos.y) {
                        fruit.eat(this.tail);
                    } else {
                        const last = this.tail.shift();
                        map.get(last.x, last.y).className = 'field';
                    }
                    this._updateTail();
                } else {
                    gameOver();
                }
            }

            this._updateTail = () => {
                this.tail.forEach(t => map.get(t.x, t.y).className = 'snake');
            }
        }

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        const Fruit = function (map) {
            this.coord = null;

            this.startFromBeginning = function (snakeTail) {
                if (this.coord) {
                    map.get(this.coord.x, this.coord.y).className = 'field';
                }
                this._setRandomFruitPos(snakeTail);
                this._paint();
            };

            this._setRandomFruitPos = function (snakeTail) {
                let newCoord = null;
                while (!newCoord) {
                    const randomX = getRandomInt(1, map.dimensions[0] - 2);
                    const randomY = getRandomInt(1, map.dimensions[1] - 2);

                    let free = true;
                    snakeTail.forEach(t => {
                        if (t.x === randomX && t.y === randomY) {
                            free = false;
                        }
                    });
                    if (free) newCoord = { x: randomX, y: randomY };
                }
                this.coord = newCoord;
            }

            this.eat = function (snakeTail) {
                this._setRandomFruitPos(snakeTail);
                this._paint();
                score += 10;
                beep();
            };

            this._paint = function () {
                map.get(this.coord.x, this.coord.y).className = 'fruit';
            };
        };

        const gameLoop = (map, snake, fruit) => {
            snake.update(map, fruit, gameOver);
            document.getElementsByClassName('score')[0].innerHTML = score;
        };

        const init = (element) => {
            const map = buildMap(element);
            const snake = new Snake(3, 3, map);
            const fruit = new Fruit(map);
            document.addEventListener('keydown', (event) => {
                if (event.keyCode === keyCodes.space && !gameLoopInterval) {
                    start(map, snake, fruit);
                }
                snake.updateDirection(event.keyCode);
            }, false);

            start(map, snake, fruit);
        }

        const start = (map, snake, fruit) => {
            snake.startFromBeginning();
            fruit.startFromBeginning(snake.tail);

            gameLoopInterval = setInterval(() => {
                gameLoop(map, snake, fruit);
            }, 100);
        }

        const gameOver = () => {
            score = 0;
            clearInterval(gameLoopInterval);
            gameLoopInterval = null;
            beep();
        };

        init(element);
    }
})();
