let fs = require('fs')
let NK = require('nk-vector')
let file_Vegetable_corpus_processed = fs.readFileSync('E:/Project Extract_keyword_Plant/build_vecs/VegetableReqPython_corpus_processed.txt').toString();
file_Vegetable_corpus_processed = file_Vegetable_corpus_processed.split("\n")
let example_feature_words = fs.readFileSync('VegetableReqPython_corpus_statistics.txt', 'utf-8')
example_feature_words = JSON.parse(example_feature_words)
let file_counts = {}
for(let sentence in file_Vegetable_corpus_processed){
    sentence = file_Vegetable_corpus_processed[sentence].split(' ')
    for(let word in sentence){
        if(NK.English_or_Vietnamese(sentence[word])['label'] == 'Vietnamese'){
            if(file_counts[sentence[word]] == undefined){
                file_counts[sentence[word]] = 1
            }else{
                file_counts[sentence[word]] += 1
            }
        }
    }
}
let sort_val = Object.values(file_counts).sort(function(a, b){return b - a})
console.log(sort_val[0], Math.max(...sort_val))
let copy_sort_val = sort_val.map( num => num )
sort_val = sort_val.slice(0,120)
let neg_example = copy_sort_val.slice(copy_sort_val.length-140, copy_sort_val.length)
console.log(neg_example.length)
let statistics = {}
let low_statistics = {}
for(let val in sort_val){
    for(let key in file_counts){
        if(file_counts[key] == sort_val[val]){
            statistics[key] = sort_val[val]
        }
    }
}
for(let val in neg_example){
    for(let key in file_counts){
        if(file_counts[key] == neg_example[val] && example_feature_words.includes(key) == false){
            low_statistics[key] = neg_example[val]
        }
    }
}
if(Object.keys(sort_val).length > 0){
    // fs.writeFile('VegetableReqPython_corpus_statistics.json', JSON.stringify(statistics), 'utf8', function (err) {
    //     if (err) {
    //         throw err;
    //     }
    //     else {
    //         console.log('Saved data statistics!');
    //     }
    // });
    // fs.writeFile('VegetableReqPython_corpus_statistics.txt', JSON.stringify(Object.keys(statistics)), 'utf8', function (err) {
    //     if (err) {
    //         throw err;
    //     }
    //     else {
    //         console.log('Saved data statistics!');
    //     }
    // });
    fs.writeFile('VegetableReqPython_corpus_statistics_neg.txt', JSON.stringify(Object.keys(low_statistics)), 'utf8', function (err) {
        if (err) {
            throw err;
        }
        else {
            console.log('Saved data statistics!');
        }
    });
}