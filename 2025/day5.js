
import * as fs from 'node:fs'

let input = fs.readFileSync("day5.txt", "utf8");

// returns sum of fresh and available fruit
let part1 = (data) => {
    let count = 0;
    let lines = data.split("\n");

    // find start index of available items
    let index = lines.findIndex((element) => element == "")



    // note index+1 is the index after the balnk
    for (let i = index + 1; i <= lines.length; i++) {
        if (isFresh(index, lines, Number(lines[i]))) {
            count++
        }
    }
    return count;
}
// id -> avaialble fruit
// spaceIndex is the index of the line break
// lines is the array of lines
let isFresh = (spaceIndex, lines, id) => {
    for (let i = 0; i < spaceIndex; i++) {
        let [l, r] = lines[i].split("-").map(Number);
        if (id >= l && id <= r) {
            return true
        }
    }
    return false;
}

let part2 = (data) => {
    let count = 0;
    let lines = data.split("\n")
    let idx = lines.findIndex((line) => line == "")
    let ranges = []
    for (let i = 0; i < idx; i++) {
        let [l, r] = lines[i].split("-").map(Number)
        ranges.push([l, r])
    }
    // console.log(ranges)

    // merge ranges

    ranges.sort((a, b) => a[0] - b[0])// sort by start val

    // loop over incrementing on condition
    // [Si,Ei], [Sj,Ej]
    // when Sj < Ei  (merge and set new max(Ei,Ej))

    console.log(ranges)
    let prev = ranges[0]
    let i = 1;
    let res = []

    while (i < ranges.length) {

        // check if cur can be merged repeatedy
        while (i < ranges.length && ranges[i][0] <= prev[1]) {
            // console.log(i)
            // then this is mergable
            prev = [prev[0], Math.max(ranges[i][1],prev[1])]
            i++
        }
        // at this point the i the pair is not mergable
        res.push(prev)
        // update a new staring prev
        prev = ranges[i]
        i++
    }
    if (prev) {
        res.push(prev)

    }

    
    console.log(res)

    //count the ranges Sj - Si +1

    count = res.reduce((acc, [start, end]) => acc + (end - start + 1), 0)

    return count;
}



console.log("Part 1:", part1(input))
console.log("Part 2", part2(input))