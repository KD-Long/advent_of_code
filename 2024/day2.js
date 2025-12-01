
import * as fs from "node:fs"

let input = fs.readFileSync("day2.txt", "utf8")

// returns count of safe reports
let part1 = (data) => {
    let safeTotal = 0
    let reports = data.split("\n")
    for (let report of reports) {
        let levels = report.split(" ").map(Number)

        // rules:
        // always increasing
        // OR
        // always decreasing

        // ADD
        // no more than diff 3
        // console.log(levels)
        // increasing check
        let safety = levels.every((val, i, array) => {
            // if i ==0 return true
            // check current value is greater than previous
            // check diff is <=3
            return i == 0 || (val > array[i - 1] && (Math.abs(val - array[i - 1]) <= 3))
        })
        safety ||= levels.every((val, i, array) => {
            // if i ==0 return true
            // check current value is greater than previous
            // check diff is <=3

            return i == 0 || (val < array[i - 1] && (Math.abs(val - array[i - 1]) <= 3))
        })

        if (safety) {
            safeTotal++
        }
    }

    return safeTotal
}

console.log("Part 1 (number of safe reports):\n" + part1(input))

let part2 = (data) => {
    let safeTotal = 0
    let reports = data.split("\n")
    for (let report of reports) {
        let levels = report.split(" ").map(Number)

        let safety = false 
        // try a safety check on the array with each element misssing and see if its successful
        for (let i = 0; i < levels.length; i++) {
            // levels with l removed
            let removed = levels.toSpliced(i,1)
            safety = safety || safetyCheck(removed)
        }
        if (safety) {
            safeTotal++
        }
    }
    return safeTotal
}

// returns true if safe
let safetyCheck = (arr) => {
    let safety = arr.every((val, i, array) => {
        // if i ==0 return true
        // check current value is greater than previous
        // check diff is <=3
        return i == 0 || (val > array[i - 1] && (Math.abs(val - array[i - 1]) <= 3))
    })
    safety ||= arr.every((val, i, array) => {
        // if i ==0 return true
        // check current value is greater than previous
        // check diff is <=3

        return i == 0 || (val < array[i - 1] && (Math.abs(val - array[i - 1]) <= 3))
    })

    return safety
}

console.log("Part 2 (number of safe reports tolerate 1 failure):\n" + part2(input))
