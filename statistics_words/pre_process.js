let fs = require('fs')
let NK = require('nk-vector')
let file_Vegetable_corpus = fs.readFileSync('VegetableReqPython_corpus.txt').toString();
file_Vegetable_corpus = file_Vegetable_corpus.split("\r\n")
file_Vegetable_corpus = [...new Set(file_Vegetable_corpus)]
file_Vegetable_corpus = file_Vegetable_corpus.slice(0,120)
let processed = ''
function merge_segmentation_tag(list) {
    let full_sentence = ''
    for (let word in list) {
        full_sentence += list[word].replace(' ', '_') + ' '
    }
    return full_sentence.trim()
}
for (let sentence in file_Vegetable_corpus){
    let seg_sentence = NK.clear_sentence_VN(file_Vegetable_corpus[sentence])
    processed += merge_segmentation_tag(NK.VN_segmentation_tag(seg_sentence))+ '\n'
}
if (processed.length > 0) {
    fs.writeFile('VegetableReqPython_corpus_processed.txt', processed, 'utf8', function (err) {
        if (err) {
            throw err;
        }
        else {
            console.log('Saved data processed!');
        }
    });
}