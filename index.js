let fs = require('fs')
let Kw = require('./extract_keywords.js')
let data_plants = fs.readFileSync('data_kws.json', 'utf8')
data_plants = JSON.parse(data_plants);

const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();

app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/',  (req, res) => {
    res.json("<h1>FPT final project</h1>")
})
app.get('/searchplant', (req, res) => {
    function compareArray(arr1, arr2) {
        if (arr1.length < arr2) {
            let difference = arr2.filter(x => !arr1.includes(x));
            return difference.length / arr2.length;
        } else {
            let difference = arr1.filter(x => !arr2.includes(x));
            return difference.length / arr1.length;
        }
    }
    let sentence = req.body.text
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
    let result = {}
    let plants = find_plants(sentence, 5)
    result['plants'] = plants
    res.json(result)
});
app.get('/keywords', (req, res) => {
    let sentence = req.body.text
    let extract_keywords = Kw.extract_keywords(sentence)
    let result = {}
    result[sentence] = extract_keywords
    res.json(result)
});
app.get('/searchplat_withowndatabase', (req, res) => {
    function compareArray(arr1, arr2) {
        if (arr1.length < arr2) {
            let difference = arr2.filter(x => !arr1.includes(x));
            return difference.length / arr2.length;
        } else {
            let difference = arr1.filter(x => !arr2.includes(x));
            return difference.length / arr1.length;
        }
    }
    let sentence = req.body.text
    let own_db = req.body.db
    function find_plants(sentence, k, own_db) {
        let extract_keywords = Kw.extract_keywords(sentence)
        let results = {}
        let data_new = create_list_keyword(own_db)
        for (let plant in data_new) {
            let similarity = compareArray(extract_keywords, data_new[plant])
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
    function create_list_keyword(own_db){
        let data_extract = {}
        for(let key in own_db){
            d = Object.keys(own_db[key])
            data_extract[d[0]] = Kw.extract_keywords(own_db[key][d])
        }
        return data_extract
    }
    let result = {}
    let plants = find_plants(sentence, 5, own_db)
    result['plants'] = plants
    res.json(result)
})
app.listen(app.get('port'), function () {
    console.log("running: port")
});