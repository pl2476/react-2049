export default class Matrix {
    constructor({ matrix }) {
        this.matrix = matrix;
        this.addRandomNumToMatrix();
    }

    /**
     * 获取空白格子的坐标
     */
    getEmptyCoordinates = () => {
        const { matrix } = this;
        const coordinates = [];

        matrix.forEach((row, i) => {
            row.forEach((value, j) => {
                if (value === 0) {
                    coordinates.push([i, j]);
                }
            });
        });

        return coordinates;
    };

    getRandom = arr => {
        return arr[Math.floor(Math.random() * arr.length)];
    };

    isBoardMoved = (preMatrix, newMatrix) => {};

    checkGameOver = matrix => {};

    addRandomNumToMatrix = () => {
        const emptyCoords = this.getEmptyCoordinates();
        if (emptyCoords.length === 0) {
            return;
        }

        const [row, col] = this.getRandom(emptyCoords);
        const newMatrix = this.matrix;
        newMatrix[row][col] = this.getRandom([2, 4]);
    };

    rotateRight = () => {
        const { matrix } = this;
        const newMatrix = [];
        const len = matrix.length;

        for (let i = 0; i < len; i++) {
            newMatrix[i] = [];
            for (let j = 0; j < len; j++) {
                // 矩阵第 x 行经向右旋转，变成新矩阵的 len - 1 - x 列
                newMatrix[i][j] = matrix[len - 1 - j][i];
            }
        }
        this.matrix = newMatrix;
    };

    rotateLeft = () => {
        const { matrix } = this;
        const newMatrix = [];
        const len = matrix.length;

        for (let i = 0; i < len; i++) {
            newMatrix[i] = [];
            for (let j = 0; j < len; j++) {
                newMatrix[i][j] = matrix[j][len - 1 - i];
            }
        }
        this.matrix = newMatrix;
    };

    shiftRight = () => {
        const { matrix } = this;
        const newMatrix = matrix.map(row => {
            const newRow = [];
            row.forEach(v => {
                if (v === 0) newRow.unshift(0);
                else newRow.push(v);
            });
            return newRow;
        });
        this.matrix = newMatrix;
    };

    shiftLeft = () => {
        const { matrix } = this;
        const newMatrix = matrix.map(row => {
            const newRow = [];
            row.reverse().forEach(v => {
                if (v === 0) newRow.push(0);
                else newRow.unshift(v);
            });
            return newRow;
        });
        this.matrix = newMatrix;
    };

    combineNumToLeft = () => {};

    combineNumToRight = () => {};

    move = callback => {
        callback();
        this.addRandomNumToMatrix();
    };

    moveUp = () => {
        this.move(() => {
            this.rotateRight();
            this.shiftRight();
            this.rotateLeft();
        });
    };

    moveDown = () => {
        this.move(() => {
            this.rotateLeft();
            this.shiftRight();
            this.rotateRight();
        });
    };

    moveLeft = () => {
        this.move(() => {
            this.shiftLeft();
        });
    };

    moveRight = () => {
        this.move(() => {
            this.shiftRight();
        });
    };
}
