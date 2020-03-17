function colorFactory(value) {
    switch (value) {
        case 0:
            return [205, 193, 180];
        case 2:
            return [238, 228, 218];
        case 4:
            return [237, 224, 200];
        case 8:
            return [242, 177, 121];
        case 16:
            return [245, 149, 99];
        case 32:
            return [246, 124, 95];
        case 64:
            return [246, 94, 59];
        case 128:
            return [237, 207, 114];
        case 256:
            return [237, 204, 97];
        case 512:
            return [237, 201, 81];
        case 1024:
            return [37, 197, 63];
        case 2048:
            return [32, 191, 66];
        case 4096:
        case 8192:
        case 16384:
        case 32768:
            return [61, 58, 51];
        default:
    }
}

$(document).ready(function() {
    const GRID_SIZE = 4;
    let grid = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

    let score = 0;
    let DIRS = [-1, 0, 1, 0, -1];

    // [0, mm)
    function genRand(mm) {
        return Math.floor(Math.random() * mm);
    }

    function createSeed() {
        let pos = [];
        for (let r = 0; r < GRID_SIZE; r++) {
            for (let c = 0; c < GRID_SIZE; c++) {
                if (grid[r][c] == 0)
                    pos.push(new Array(r, c));
            }
        }
        let dest = pos[genRand(pos.length)];
        grid[dest[0]][dest[1]] = 2;
    }

    function updateView() {
        $('.scoreboard').html(score);
        for (let r = 0; r < GRID_SIZE; r++) {
            for (let c = 0; c < GRID_SIZE; c++) {
                let block = $('.ele[data-row=' + r + '][data-col=' + c + ']');
                if (grid[r][c] != 0) {
                    block.html(grid[r][c]);
                } else {
                    block.html(' ');
                }
                let color = colorFactory(grid[r][c]);
                block.css('background-color', 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')');
            }
        }
    }

    function clearAll() {
        for (let r = 0; r < GRID_SIZE; r++) {
            for (let c = 0; c < GRID_SIZE; c++) {
                grid[r][c] = 0;
            }
        }
        score = 2;
        createSeed();
        updateView();
    }

    function canMoveUp() {
        for (let c = 0; c < GRID_SIZE; c++) {
            for (let r = 1; r < GRID_SIZE; r++)
                if (grid[r][c] != 0 &&
                    (grid[r - 1][c] == 0 || grid[r - 1][c] === grid[r][c]))
                    return true;
        }
        return false;
    }
    function canMoveDown() {
        for (let c = 0; c < GRID_SIZE; c++) {
            for (let r = 0; r < GRID_SIZE - 1; r++)
                if (grid[r][c] != 0 && (grid[r + 1][c] == 0 || grid[r + 1][c] === grid[r][c]))
                    return true;
        }
        return false;
    }
    function canMoveLeft() {
        for (let r = 0; r < GRID_SIZE; r++) {
            for (let c = 1; c < GRID_SIZE; c++)
                if (grid[r][c] != 0 && (grid[r][c - 1] == 0 || grid[r][c - 1] === grid[r][c]))
                    return true;
        }
        return false;
    }
    function canMoveRight() {
        for (let r = 0; r < GRID_SIZE; r++) {
            for (let c = 0; c < GRID_SIZE - 1; c++)
                if (grid[r][c] != 0 && (grid[r][c + 1] == 0 || grid[r][c + 1] === grid[r][c]))
                    return true;
        }
        return false;
    }
    function canMove() {
        return canMoveUp() ||
               canMoveDown() ||
               canMoveLeft() ||
               canMoveRight();
    }

    function gameEnd() {
        alert('Game ended with score ' + score);
    }

    function goUp() {
        for (let c = 0; c < GRID_SIZE; c++) {
            let prev = 0;
            for (let r = 0; r < GRID_SIZE; r++) {
                if (grid[r][c] == 0 || prev == r)
                    continue;
                let cur = grid[r][c];
                grid[r][c] = 0;
                if (grid[prev][c] == 0) {
                    grid[prev][c] = cur;
                } else if (grid[prev][c] == cur) {
                    grid[prev][c] *= 2;
                    prev++;
                } else {
                    prev++;
                    grid[prev][c] = cur;
                }
            }
        }
    }

    function goDown() {
        for (let c = 0; c < GRID_SIZE; c++) {
            let prev = GRID_SIZE - 1;
            for (let r = GRID_SIZE - 1; r >= 0; r--) {
                if (grid[r][c] == 0 || prev == r)
                    continue;
                let cur = grid[r][c];
                grid[r][c] = 0;
                if (grid[prev][c] == 0) {
                    grid[prev][c] = cur;
                } else if (grid[prev][c] == cur) {
                    grid[prev][c] *= 2;
                    prev--;
                } else {
                    prev--;
                    grid[prev][c] = cur;
                }
            }
        }
    }

    function goLeft() {
        for (let r = 0; r < GRID_SIZE; r++) {
            let prev = 0;
            for (let c = 0; c < GRID_SIZE; c++) {
                if (grid[r][c] == 0 || prev == c)
                    continue;
                let cur = grid[r][c];
                grid[r][c] = 0;
                if (grid[r][prev] == 0) {
                    grid[r][prev] = cur;
                } else if (grid[r][prev] == cur) {
                    grid[r][prev] *= 2;
                    prev++;
                } else {
                    prev++;
                    grid[r][prev] = cur;
                }
            }
        }
    }

    function goRight() {
        for (let r = 0; r < GRID_SIZE; r++) {
            let prev = GRID_SIZE - 1;
            for (let c = GRID_SIZE - 1; c >= 0; c--) {
                if (grid[r][c] == 0 || prev == c)
                    continue;
                let cur = grid[r][c];
                grid[r][c] = 0;
                if (grid[r][prev] == 0) {
                    grid[r][prev] = cur;
                } else if (grid[r][prev] == cur) {
                    grid[r][prev] *= 2;
                    prev--;
                } else {
                    prev--;
                    grid[r][prev] = cur;
                }
            }
        }
    }

    function print() {
        console.log(grid);
    }

    $(document).keydown(function(e) {
        switch(e.which) {
            case 38:
            case 87:
                if (!canMoveUp())
                    return;
                goUp();
                break;
            case 40:
            case 83:
                if (!canMoveDown())
                    return;
                goDown();
                break;
            case 37:
            case 65:
                if (!canMoveLeft())
                    return;
                goLeft();
                break;
            case 39:
            case 68:
                if (!canMoveRight())
                    return;
                goRight();
                break;
            default:
                return;
        }
        print();
        score += 2;
        createSeed();
        // check if game has ended
        if (!canMove()) {
            gameEnd();
            clearAll();
            return;
        }

        updateView();
    });

    $('#restart').click(function() {
        clearAll();
    });

    clearAll();
});