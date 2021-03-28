let fs = require('fs')
let data_vecs = fs.readFileSync('./data_vec_VegetableReqPython_corpus_processed_50d.json', 'utf8')
data_vecs = JSON.parse(data_vecs);
let example_feature_words = fs.readFileSync('VegetableReqPython_corpus_statistics.txt', 'utf-8')
example_feature_words = JSON.parse(example_feature_words)
let neg_example_feature_words = fs.readFileSync('VegetableReqPython_corpus_statistics_neg.txt', 'utf-8')
neg_example_feature_words = JSON.parse(neg_example_feature_words)
let data_train = []
let y_train = []
for (let word in neg_example_feature_words) {
  if(data_vecs[neg_example_feature_words[word]] !== undefined){
      data_train.push(data_vecs[neg_example_feature_words[word]])
      y_train.push(0)
  }
}
for (let word in example_feature_words) {
  if(data_vecs[example_feature_words[word]]!= undefined){
      data_train.push(data_vecs[example_feature_words[word]])
      y_train.push(1)
  }
}
if (Object.keys(data_train).length > 0) {
  data = JSON.stringify(data_train)
  fs.writeFile('./data_train.txt', data, function (err) {
    if (err) { console.log(err) }
    else {
      console.log('Saved data')
    }
  })
  fs.writeFile('./data_y_train.txt', JSON.stringify(y_train), function (err) {
    if (err) { console.log(err) }
    else {
      console.log('Saved data')
    }
  })
}
