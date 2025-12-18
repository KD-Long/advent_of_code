import * as fs from "node:fs"

let input = fs.readFileSync("day8.txt", "utf8")

// if we have a set of points (can just be the string value)
// when we join 2 circuits together we create a new set containing those circuites
// this means when




// imagine a map with a key string of a point and value index that points to the index of an array that it should point to
// when you look a t the first distance if check the size of the array that each point indexs to and add them both to the biggest array(cicruit) 
// subsequent lookups will point  to the new array they point to

let pointMap = new Map()
let circuits = new Array()
let sortedDistances = new Array()

// takes in any number of arguments and puts them in array
let distance = (...args) => {
    // maps all args to numbers and deconstructs array into vars
    const [x, y, z, x2, y2, z2] = args.map(Number)

    return Math.sqrt(
        Math.pow(x2 - x, 2) +
        Math.pow(y2 - y, 2) +
        Math.pow(z2 - z, 2)
    )
}
let initialise = (input) => {
    let lines = input.split("\n")

    // n*(n-1)/2
    for (let i = 0; i < lines.length; i++) {
        pointMap.set(lines[i], i)
        circuits.push([lines[i]])// all circuits initial value is 1
        //sorted distances is an array of tuples [d,p1,p2]
        // lets add every combination n^2
        for (let j = i + 1; j < lines.length; j++) {
            let p1 = lines[i].split(",")
            let p2 = lines[j].split(",")
            let d = distance(...p1, ...p2)
            sortedDistances.push([d, "" + p1, "" + p2])
        }
    }
    sortedDistances.sort((a, b) => a[0] - b[0])
}
initialise(input)

let part1 = () => {
    let total = 0

    // loop through sorted list updatinmg circuit mapping and map for fast lookups
    // note we need to process the full list even if we only care about the top 3 circuits as they may get linked

    for (let i = 0; i < sortedDistances.length; i++) {
        let [_, p1, p2] = sortedDistances[i]
        console.log("p1:",p1)
        console.log("p2:",p2)
        console.log("sortedDistances[i]:",sortedDistances[i])
        let p1Idx = pointMap.get(p1)
        let p2Idx = pointMap.get(p2)

        let c1 = circuits[p1Idx]
        let c2 = circuits[p2Idx]

        // merge all of c2 into c1 note this could be optimised to merge the smaller into the larger but lets keep it simple
        console.log("c2: ",c2)
        console.log("c1: ",c1)


// TODO
// fix assignment of arrays not working (clearing c2)
// make sure that we are not calling this on the same point!

        for (let point of c2) {
            // updates all of points mapping
            pointMap.set(point, p1Idx)
            // add all of c2 to c1
            c1.push(point)
        }
        // set the merged circuit to empty
        circuits[p2Idx] = []

    }
    console.log(circuits)


    return total
}

console.log("Part1: ", part1())



let part2 = (input) => {

}

console.log("Part2: ", part2(input))