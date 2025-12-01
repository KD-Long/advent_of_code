import * as fs from "node:fs"

// format input into two lists
let input = fs.readFileSync("day1.txt", "utf8")

let part1 = (data) => {
    // console.log(data)
    let rows = data.split("\n")
    let dial = new Array(100).fill("").map((_, i) => i)  // [0 ... 99]
    let pointer = 50 // value 50 starting condition
    let zeroCount = 0

    for (let row of rows) {
        let d = row[0] == "R" ? 1 : -1 //1 is increase -1 is decrease
        let a = Number(row.slice(1)) % dial.length

        if(d == 1){
            //rotate right increasing
            pointer = (pointer + a) % dial.length
        } else{
            // rotate left decreasing 
            pointer = pointer - a < 0 ? dial.length - (a - pointer) : pointer - a
            // if its negative subtract it from the length
        }

        // console.log("d: ",d)
        // console.log("a: ",a)
        // console.log("pointer]: ",pointer)

        if(dial[pointer] == 0){
            zeroCount++
        }
    }
    return zeroCount
}

console.log("Part 1:\n" + part1(input))

let part2 = () => {
    return 0
}

console.log("Part 2:\n" + part2())

