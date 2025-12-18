import * as fs from 'node:fs'

let input = fs.readFileSync("day6.txt", "utf8")

// console.log(input)


let part1 = (data) => {
    let calc = (symbol, a, b) => {
        if (symbol === "*") {
            return a * b
        } else {
            return a + b
        }

    }

    let total = 0;
    let result = []

    //read in all data into a 2d array

    let lines = data.split("\n")
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].split(" ")
        //remove blanks (from indenting)
        // line = line.reduce((acc, cur) => {
        //     if (cur.length > 0) {
        //         acc.push(cur)
        //     }
        //     return acc
        // },[])
        line = line.filter((cell) => cell.length > 0)
        result.push(line)
    }

    // console.log(result)

    // reduce 

    for (let i = 0; i < result[0].length; i++) {

        let col = []
        for (let j = result.length - 1; j >= 0; j--) {
            col.push(result[j][i])
        }
        let [symbol, ...nums] = col
        let rowTotal = nums.reduce((acc, cur) => calc(symbol, Number(acc), Number(cur)))
        total += rowTotal
    }

    return total
}
console.log(part1(input))


let part2 = (data) => {
    let calc = (symbol, a, b) => {
        if (symbol === "*") {
            return a * b
        } else {
            return a + b
        }

    }

    let total = 0;
    let result = []

    //read in all data into a 2d array

    let lines = data.split("\n")

    let lineTotals = new Array(lines[0].length).fill("") // this array will have digits added onto it represent the full col
    for (let i = 0; i < lines.length - 1; i++) {
        let line = lines[i]
        // loop over each character 
        for (let j = 0; j < line.length; j++) {
            lineTotals[j] += line[j]
        }

    }
    // at this point imagine line totals are now the number created when reading top to bottom for each index of the string (we skipped the last line of  symbols)

    // we now need to group our numbers per problem and discard the empty column result
    // loop over line totals and when i find a all spaces section "col seperator " create new array of those prev items
    let cur = []
    for (let i = 0; i < lineTotals.length; i++) {
        if (lineTotals[i].split("").every((val) => val == " ")) {
            // we found a divider
            // add current to result
            result.push(cur)
            cur = []
        } else {
            cur.push(Number(lineTotals[i]))
        }

    }
    // force push the last column (there will be no dividor)
    result.push(cur)


    // find symbols array
    // take the last line, split it at every character "" discard any character that is a " ", should result in just symbols
    let symbols = lines[lines.length - 1].split("").filter((v) => v != " ")
    // console.log(symbols)

    // combine the appropriately grouped problem with corresponding symbol
    for (let i = 0; i < result.length; i++) {
        let s = symbols[i]
        let nums = result[i]
        let sum = nums.reduce((acc, cur) => calc(s, acc, cur))
        // console.log("sum total:", sum)
        total += sum
    }
    return total
}
console.log(part2(input))