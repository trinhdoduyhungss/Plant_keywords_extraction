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
let sentence = 'Gừng sống còn gọi là sinh khương có tác dụng phát tán phong hàn, chống nôn ói. Gừng khô còn gọi là can khương, có tính nóng hơn sinh khương, có thể làm ấm tỳ vị. Gừng đốt cháy tồn tính còn gọi là hắc khương. Hắc khương có vị đắng, thường được tẩm đồng tiện, có thể làm ấm can thận, giáng hư hỏa. Vỏ gừng được gọi là khương bì có tác dụng lợi tiểu. Nhờ vậy mà trong kỹ thuật bào chế, gừng cũng có thể giúp cho thầy thuốc đạt được một số mục đích quan trọng. Sinh địa nấu với gừng sẽ hạn chế bớt tính mát. Bán hạ chế với gừng để giải độc. Một số loại thuốc khác như: sâm, đinh lăng... cũng thường được tẩm gừng, sao qua để tăng tính ấm và dẫn vào phế vị. Tuy nhiên, trong trường hợp âm hư nội nhiệt sinh ho, biểu hư làm ra mồ hôi nhiều hoặc mất máu không nên dùng. Khi sử dụng gừng không nên gọt vỏ vì vỏ gừng cũng có rất nhiều công dụng chữa bệnh nên ăn gừng chỉ cần rửa sạch sau đó sử dụng. Không nên ăn gừng trong thời gian dài đối với những người âm hư hỏa vượng, nhiệt trong, mắc các bệnh mụn nhọt, viêm phổi, phù thũng phổi, hạch phổi, viêm dạ dày, viêm gan, viêm thận, bệnh đái tháo đường… Khi bị cảm lạnh, uống nước gừng sẽ rất hiệu quả. Trái lại, đối với những trường hợp cảm mạo thử nhiệt, cảm mạo phong nhiệt hoặc bị trúng nắng tuyệt đối không cho dùng gừng. Không nên ăn gừng tươi đã bị dập: củ gừng tươi sau khi bị dập sẽ sinh ra một loại độc tố mạnh có thể gây hoại tử các tế bào gan, lâu đàn sẽ biến thành ung thư gan, ung thư thực quản. Mặc dù gừng có nhiều tác dụng nhưng không nên quá lạm dụng.'
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
  console.log(key_words)
}