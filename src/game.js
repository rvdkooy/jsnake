const dimensionsX = 20;
const dimensionsY = 20;
let gameLoopInterval;
const S_DOWN = 'sd', S_UP = 'su', S_LEFT = 'sl', S_RIGHT = 'sr'

const buildMap = (element) => {
    const table = document.createElement('table');
    table.className = 'game';

    for (let y = 0; y < dimensionsY; y++) {
        const row = document.createElement('tr');
        for (let x = 0; x < dimensionsX; x++) {
            let className = 'field';
            if (y === 0 || y === (dimensionsY - 1) || x === 0 || x === (dimensionsX - 1)) {
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
        }
    }
}

const createSnake = (x, y, map) => {
    const Snake = function(_x, _y, map) {
        this.tail = [ { x: _x, y: _y } ];
        this.direction = S_DOWN;
        this._keyMap = { 'arrowup': S_UP, 'arrowright': S_RIGHT, 'arrowdown': S_DOWN, 'arrowleft': S_LEFT };

        this.updateDirection = function(key) {
            this.direction = this._keyMap[key.toLowerCase()];
        }

        this.update = (map) => {
            const updateTail = (lastPos, newPos) => {
                this.tail.push(newPos);
                map.get(newPos.x, newPos.y).className = 'snake';
                map.get(lastPos.x, lastPos.y).className = 'field';
            }

            const last = this.tail.splice(-1, 1)[0];

            if (this.direction === S_DOWN) {
                updateTail(last, { x: last.x, y: last.y + 1 });
            }
            if (this.direction === S_LEFT) {
                updateTail(last, { x: last.x - 1, y: last.y });
            }
            if (this.direction === S_UP) {
                updateTail(last, { x: last.x, y: last.y - 1 });
            }
            if (this.direction === S_RIGHT) {
                updateTail(last, { x: last.x + 1, y: last.y });
            }
        }
        map.get(3, 3).className = 'snake';
    }
    
    const snake = new Snake(x, y, map);
    snake.update(map);
    return snake;
};


const gameLoop = (map, snake) => {
    snake.update(map);
};

const start = (element) => {
    const map = buildMap(element);
    const snake = createSnake(3, 3, map);

    document.addEventListener('keydown', (event) => {
        snake.updateDirection(event.key);
    });

    gameLoopInterval = setInterval(() => {
        gameLoop(map, snake);
    }, 150);
}

start(document.getElementById('game'));
