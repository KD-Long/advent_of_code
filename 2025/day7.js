import * as fs from 'node:fs'

let input = fs.readFileSync("day7.txt", "utf8")




let part1 = (data) => {
    let count = 0

    let lines = input.split("\n")
    let prev = lines[0]

    for (let i = 1; i < lines.length; i++) {
        let cur = lines[i].split("")
        // compare character by character to see if modifications need to be made
        // checking the data we know no splitters are side by side

        //loop over each chatr of string
        //assuming all lines are same length
        for (let j = 0; j < cur.length; j++) {

            //check if beam
            if (prev[j] == "S" || prev[j] == "|") {
                //
                if (cur[j] == "^") {
                    count++
                    // its a splitter do split

                    //left
                    if (j - 1 >= 0) {
                        cur[j - 1] = "|"
                    }
                    // right
                    if (j + 1 < cur.length) {
                        cur[j + 1] = "|"
                    }

                } else {
                    // replace it with a beam
                    cur[j] = "|"
                }
            }



        }
        // console.log(cur)
        // update new prev
        prev = cur.join("")
        // update the actual array
        lines[i] = prev


    }
    lines.forEach(line => console.log(line))

    return count
}

console.log("Part 1: ", part1(input))


let part2 = (data) => {


    let lines = data.split("\n").map((line) => line.split(""))

    lines[0][lines[0].indexOf("S")] = 1
    // console.log(lines)

    let prev = lines[0]

    let isNumber = (d) => typeof d === 'number'
    // console.log("OG prev, ", prev)
    for (let i = 1; i < lines.length; i++) {
        let cur = lines[i]
        // compare character by character to see if modifications need to be made
        // checking the data we know no splitters are side by side

        //loop over each chatr of string
        //assuming all lines are same length

        for (let j = 0; j < cur.length; j++) {

            //check if beam
            if (isNumber(prev[j])) {
                // let nextDigit = "" + (Number(prev[j]) + 1)

                if (cur[j] == "^") {

                    // its a splitter do split

                    //left
                    if (j - 1 >= 0) {
                        cur[j - 1] = cur[j - 1] == "." ? Number(prev[j]) : Number(cur[j - 1]) + Number(prev[j])
                    }
                    // right
                    if (j + 1 < cur.length) {
                        cur[j + 1] = cur[j + 1] == "." ? Number(prev[j]) : Number(cur[j + 1]) + Number(prev[j])
                    }

                } else {
                    // replace it with the same digit
                    cur[j] = cur[j] == "." ? Number(prev[j]) : Number(cur[j]) + Number(prev[j])
                }
            }



        }

        // update new prev
        prev = cur
        // update the actual array
        lines[i] = prev
        console.log(cur.join(""))
        // console.log(prev)



    }
    // lines.forEach(line => console.log(line))
    // at this point our array is built
    // but instead of pipes we are inputing the ways to get that line

    // prev is lastrow
    let count = prev.reduce((acc, cur) => {
        if (isNumber(cur)) {
            return acc + cur
        }
        return acc
    })


    return count

}

console.log("Part 2: ", part2(input))