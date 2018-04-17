const dimensionsX = 20;
const dimensionsY = 20;
let gameLoopInterval;
const S_DOWN = 'sd', S_UP = 'su', S_LEFT = 'sl', S_RIGHT = 'sr'

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
        wallCoords: wallCoords
    }
}

const Snake = function (_x, _y, map) {
    this._initialX = _x;
    this._initialY = _y;
    this.tail = [];
    this.direction = S_DOWN;
    this._keyMap = { 'arrowup': S_UP, 'arrowright': S_RIGHT, 'arrowdown': S_DOWN, 'arrowleft': S_LEFT };

    this.startFromBeginning = () => {
        this.tail.forEach(t => {
            map.get(t.x, t.y).className = 'field';
        });
        this.tail = [
            { x: this._initialX, y: this._initialY },
            { x: this._initialX, y: this._initialY + 1 },
            { x: this._initialX, y: this._initialY + 2 },
            { x: this._initialX, y: this._initialY + 3 },
            { x: this._initialX, y: this._initialY + 4 },
            { x: this._initialX, y: this._initialY + 5 },
            { x: this._initialX, y: this._initialY + 6 },
        ];
        this.direction = S_DOWN;
        this._updateTail();
    }

    this.updateDirection = function (key) {
        const direction = this._keyMap[key.toLowerCase()];
        if (direction) { 
            if (this.direction === S_DOWN && direction !== S_UP) {
                this.direction = direction;
            }
            if (this.direction === S_UP && direction !== S_DOWN) {
                this.direction = direction;
            }
            if (this.direction === S_LEFT && direction !== S_RIGHT) {
                this.direction = direction;
            }
            if (this.direction === S_RIGHT && direction !== S_LEFT) {
                this.direction = direction;
            }
        }
    }
    
    this.update = (map, gameOver) => {
        const detectWallCollision = (newPos) => {
            let collision = false;
            map.wallCoords.forEach(coord => {
                if (coord.x === newPos.x && coord.y === newPos.y) {
                    collision = true;
                }
            });
            return collision;
        };
        
        const detectSelfCollision = (newPos) => {
            let collision = false;
            this.tail.forEach(coord => {
                if (coord.x === newPos.x && coord.y === newPos.y) {
                    collision = true;
                }
            });
            return collision;
        }

        const tip = this.tail[this.tail.length - 1];
        let newPost = null;
        if (this.direction === S_DOWN) { newPos = { x: tip.x, y: tip.y + 1 }; }
        if (this.direction === S_LEFT) { newPos = { x: tip.x - 1, y: tip.y }; }
        if (this.direction === S_UP) { newPos = { x: tip.x, y: tip.y - 1 }; }
        if (this.direction === S_RIGHT) { newPos = { x: tip.x + 1, y: tip.y }; }

        if (!detectWallCollision(newPos) && !detectSelfCollision(newPos)) {
            const last = this.tail.shift();
            map.get(last.x, last.y).className = 'field';
            this.tail.push(newPos);
            this._updateTail();
        } else {
            gameOver();
        }
    }

    this._updateTail = () => {
        this.tail.forEach(t => {
            map.get(t.x, t.y).className = 'snake';
        });
    }
}

const gameLoop = (map, snake) => {
    snake.update(map, gameOver);
};

const init = (element) => {
    const map = buildMap(element);
    const snake = new Snake(3, 3, map);

    document.addEventListener('keydown', (event) => {
        if (event.keyCode === 32 && !gameLoopInterval) {
            start(map, snake);
        }
        snake.updateDirection(event.key);
    });

    start(map, snake);
}

const start = (map, snake) => {
    snake.startFromBeginning();
    gameLoopInterval = setInterval(() => {
        gameLoop(map, snake);
    }, 150);
}

const gameOver = () => {
    clearInterval(gameLoopInterval);
    gameLoopInterval = null;
};

init(document.getElementById('game'));
