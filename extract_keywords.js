let fs = require('fs')
let NK = require('nk-vector')
let matrix_lib = require('./matrix_lib.js')
let data_vecs = fs.readFileSync('data_vec_VegetableReqPython_corpus_processed_50d.json', 'utf8')
data_vecs = JSON.parse(data_vecs);
let data_vecs2 = fs.readFileSync('data_vec_VegetableReqPython_corpus_processed.json', 'utf8')
data_vecs2 = JSON.parse(data_vecs2);
let example_feature_words = fs.readFileSync('VegetableReqPython_corpus_statistics.txt', 'utf-8')
example_feature_words = JSON.parse(example_feature_words)
let neg_example_feature_words = fs.readFileSync('VegetableReqPython_corpus_statistics_neg.txt', 'utf-8')
neg_example_feature_words = JSON.parse(neg_example_feature_words)
let W = fs.readFileSync('W.txt', 'utf8').toString();
    W = JSON.parse(W)
function sigmoid(arr) {
  let result = []
  for (let i in arr) {
    result.push(1 / (1 + Math.exp(-arr[i])))
  }
  return result
}
function is_keyword(word){
  let vec1 = data_vecs[word]
  let vec2 = data_vecs2[word]
  let result_predict = sigmoid([matrix_lib.dot_vec(vec1, W)])
  let result_predict2 = sigmoid([matrix_lib.dot_vec(vec2, W)])
  if((result_predict[0]+result_predict2[0])/2 >= 0.5){
    return true
  }else{
    return false
  }
}
function merge_segmentation_tag(list) {
    let full_sentence = ''
    for (let word in list) {
        full_sentence += list[word].replace(' ', '_') + ' '
    }
    return full_sentence.trim()
}
module.exports.extract_keywords = function(sentence){
    sentence = NK.clear_sentence_VN(sentence)
    sentence = merge_segmentation_tag(NK.VN_segmentation_tag(sentence))
    sentence = sentence.split(' ')
    sentence = [... new Set(sentence)]
    let key_words = []
    for(let word in sentence){
      if(key_words.includes(sentence[word]) == false){
        if(example_feature_words.includes(sentence[word]) == true){
          key_words.push(sentence[word])
        }else{
          if(neg_example_feature_words.includes(sentence[word]) == false){  
            if(is_keyword(sentence[word])){
              key_words.push(sentence[word])
            }
            else if(NK.English_or_Vietnamese(sentence[word])['label'] == 'English'){
              key_words.push(sentence[word])
            }
          }
        }
      }
    }
    if(key_words.length > 0){
      return key_words
    }
}