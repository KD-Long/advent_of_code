import * as fs from "node:fs"
// format input into two lists
let input = fs.readFileSync("day2.txt", "utf8")
let part1 = (data) => {
    // find the sum of invalid numbers
    // numbers are invalid if the can be created by smaller substring
    // note we need to check all numbers in the ranges provided
    let sum = 0
    for (let range of data.split(",")) {
        let [l, r] = range.split("-").map(Number)
        // loop over range
        for (let i = l; i <= r; i++) {
            sum += subStringOfTwo(i)
        }
    }
    return sum
}
let subStringOfTwo = (num) => {
    // split the num in half an see if each sides are equal
    let str = "" + num
    // exit early on uneven string
    if (str.length % 2 != 0) {
        return 0
    }
    let l = str.slice(0, str.length / 2)
    let r = str.slice(str.length / 2, str.length)
    if (l === r) {
        // there is a duplication
        return num
    }
    return 0
}
console.log("Part 1:\n" + part1(input))

let repeatedSubstring = (num) => {
    // if valid returns 0
    // if invalid returns number to sum
    let str = "" + num

    // loop check if strstr (minus first and last char contains original str)
    // e.g num = 123123
    // t = 1_23(123123)12_3
    // essentially this string represents all possible rotations of an array
    let t = str + str
    if (t.slice(1, t.length - 1).includes(str)) {
        return num
    } else {
        return 0
    }
}

let part2 = (data) => {
    let sum = 0
    for (let range of data.split(",")) {
        let [l, r] = range.split("-").map(Number)
        // loop over range
        for (let i = l; i <= r; i++) {
            // console.log("i: ",i)
            sum += repeatedSubstring(i)
        }
    }

    return sum
}



console.log("Part 2:\n" + part2(input))

