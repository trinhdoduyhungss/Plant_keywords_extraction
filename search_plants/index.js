let fs = require('fs')
let Kw = require('./extract_keywords.js')
let data_plants = fs.readFileSync('data_kws.json', 'utf8')
data_plants = JSON.parse(data_plants);
function compareArray(arr1, arr2) {
    if (arr1.length < arr2) {
        let difference = arr2.filter(x => !arr1.includes(x));
        return difference.length / arr2.length;
    } else {
        let difference = arr1.filter(x => !arr2.includes(x));
        return difference.length / arr1.length;
    }
}
let sentence = "đẹp da"
function find_plants(sentence, k) {
    let extract_keywords = Kw.extract_keywords(sentence)
    let results = {}
    for (let plant in data_plants) {
        let similarity = compareArray(extract_keywords, data_plants[plant])
        results[plant] = similarity
    }
    if (Object.keys(results).length > 0) {
        // Create items array
        let items = Object.keys(results).map(function (key) {
            return [key, results[key]];
        });
        // Sort the array based on the second element
        items.sort(function (first, second) {
            return second[1] - first[1];
        });
        // Choose k nearest items
        items = items.reverse()
        items = items.slice(0, k)
        return [...new Array(items.length)].map((e,i) => e = items[i][0])
    }
}
console.log(find_plants(sentence, 5))