import * as fs from "node:fs"

// format input into two lists
let input = fs.readFileSync("day1.txt", "utf8")
let l = []
let r = []
let sp = input.split("\n")
for (let line of sp) {
    let s = line.split(" ") // "n1" , "" "" "" , n2
    l.push(s[0])
    r.push(s[s.length - 1])
}



let part1 = (left, right) => {
    left.sort((a, b) => { return a - b })
    right.sort((a, b) => { return a - b })

    // calc total
    let total = 0
    for (let i = 0; i < left.length; i++) {
        let val = Math.abs(left[i] - right[i])
        // console.log(left[i], ",", right[i])
        total += val
    }
    // part 1 solution
    return total

}
console.log("Part 1 (sum of difference of next smallest):\n" + part1(l, r))

// part 2 find similarity score
// sum of number of times id x in left appears in r

let part2 = (left, right) => {
    let m = new Map()

    // loop over every value in r building a k v mapping of id to count
    // then iterate over left and sum counts
    // O(2n) :)

    right.forEach((key) => {
        if (m.has(key)) {
            m.set(key, m.get(key) + 1)
        } else {
            m.set(key, 1)
        }
    })

    let total = 0
    for (let i = 0; i < left.length; i++) {
        let similarity = m.has(left[i]) ? m.get(left[i]) * left[i] : 0
        total += similarity
    }
    return total
}

console.log("Part 2 (sum of similarity):\n" + part2(l, r))

