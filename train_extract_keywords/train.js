let fs = require('fs')
let matrix_lib = require('./matrix_lib.js')
let traindata = fs.readFileSync('data_train.txt', 'utf8').toString();
    traindata = JSON.parse(traindata)

let y = fs.readFileSync('data_y_train.txt', 'utf8').toString();
    y = JSON.parse(y)
let W = matrix_lib.random_vec(traindata[0].length)
let loss_rec = []
let learning_rate = 0.1
let x_predicts_wrong = []
let y_predicts_wrong = []

function sigmoid(arr) {
  let result = []
  for (let i in arr) {
    result.push(1 / (1 + Math.exp(-arr[i])))
  }
  return result
}

function train(epoch_run) {
  for (let epoch = 0; epoch < epoch_run; epoch++) {
    let tx = matrix_lib.dot_matrix([W], matrix_lib.rotating_array(traindata))[0]
    tx = sigmoid(tx)
    let error = matrix_lib.subtract(y, tx)
    let sig_grad = matrix_lib.dot_matrix([tx],[error])
    let sig_grad_loss = matrix_lib.dot_matrix([matrix_lib.subtract(tx,matrix_lib.gen_vec(1,y.length))], sig_grad)
    let up_W = matrix_lib.dot_matrix(sig_grad_loss, traindata)
    let up_W_lr = matrix_lib.dot_matrix_N(up_W, learning_rate)[0]
    W = matrix_lib.subtract(up_W_lr, W)
    // Loss rec
    let sum_loss = 0
    for(let vec in traindata){
      let item_matrix_pre = 0
      for (var i in traindata[vec]) {
        item_matrix_pre += -traindata[vec][i] * W[i]
      }
      if (item_matrix_pre != 0) {
        let y_pre = 1 / (1 + Math.exp(item_matrix_pre))
        sum_loss += Math.abs(y[vec] - y_pre)
        if(y_pre >= 0.5){
          y_pre = 1
        }else{
          y_pre = 0
        }
        if(y[vec] != y_pre){
          x_predicts_wrong.push(traindata[vec])
          y_predicts_wrong.push(y[vec])
        }
      }
    }
    loss_rec.push([epoch, sum_loss/traindata.length]) 
  }
}
train(31000)
console.log("loss_rec: ",loss_rec.splice(loss_rec.length-100, loss_rec.length))
fs.writeFile('./W(3).txt', JSON.stringify(W), function (err) {
    if (err) { console.log(err) }
    else {
      console.log('Saved W')
    }
})