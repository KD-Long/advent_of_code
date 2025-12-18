import * as fs from 'node:fs'


let input = fs.readFileSync("day4.txt", "utf8")
let grid = []
let processData = (input) => {

    for (let line of input.split("\n")) {
        let cell = line.split("")
        grid.push(cell)
    }
}
processData(input)




let isValidCell = (row, col, grid) => {
    let count = 0;


    // loop in 3x3 grid
    let rowStart = row - 1 >= 0 ? row - 1 : row;
    let colStart = col - 1 >= 0 ? col - 1 : col;


    // assuming all rows same length
    let rowEnd = row + 1 < grid.length ? row + 1 : row;
    let colEnd = col + 1 < grid[row].length ? col + 1 : col;


    for (let i = rowStart; i <= rowEnd; i++) {
        for (let j = colStart; j <= colEnd; j++) {
            //search all 9 except the same cell!
            if (!(i == row && j == col) && grid[i][j] === "@") {
                count++
            }
        }
    }





    if (count <= 3) {
        return true
    }
    return false
}

let part1 = (grid) => {
    let temp = []
    let count = 0;
    for (let i = 0; i < grid.length; i++) {
        let tempRow = []
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] == "@") {
                if (isValidCell(i, j, grid)) {
                    count++
                    tempRow.push("x")
                } else {
                    tempRow.push("@")

                }

            } else {
                tempRow.push(".")
            }
        }
        temp.push(tempRow)
    }
    // console.log("temp: ")
    // temp.forEach(row => console.log(row.join("")));

    return count;
}

console.log("Part 1: ", part1(grid))

let part1_mod = (grid) => {
    let tempGrid = []
    let count = 0;
    for (let i = 0; i < grid.length; i++) {
        let tempRow = []
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] == "@") {
                if (isValidCell(i, j, grid)) {
                    count++
                    grid[i][j] = "x"
                } 
                // else {
                //     tempRow.push("@")

                // }

            } 
            // else {
            //     tempRow.push(".")
            // }
        }
        tempGrid.push(tempRow)
    }


    return count;
}


let part2 = (grid) => {
    let total = 0
    let newGrid = grid
    let count = 0;
    while ((count = part1_mod(newGrid)) > 0) {
        total += count;
        // console.log("Count: ", count)
    }
    return total
}
console.log("Part 2: ",part2(grid));


// console.log(grid)
