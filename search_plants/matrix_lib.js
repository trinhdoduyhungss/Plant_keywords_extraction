function mashup(matrix) {
    let result = matrix[0]
    for (let i = 1; i < matrix.length; i++) {
      for (let j in matrix[i]) {
        result[j] += matrix[i][j]
      }
    }
    return result
  }
  module.exports.gen_vec = function(N, L){
    let result = []
    for(let i = 0; i < L; i++){
      result.push(N)
    }
    return result
  }
  module.exports.dot_matrix = function(matrix1, matrix2) {
    let result = []
    for (let item in matrix1) {
      let contain_matrix = []
      for (let i in matrix1[item]) {
        let line = []
        for (let j in matrix2[i]) {
          line.push(matrix1[item][i] * matrix2[i][j])
        }
        if (line.length > 0) {
          contain_matrix.push(line)
        }
      }
      if (contain_matrix.length > 0) {
        result.push(mashup(contain_matrix))
      }
    }
    if (result.length > 0) {
      return result
    }
  }
  module.exports.dot_vec = function(vec1, vec2){
    let result = 0
    for (let i in vec1) {
      result += vec1[i] * vec2[i]
    }
    return result
  }
  module.exports.rotating_array = function(W) {
    let result_W = []
    for (let j = 0; j < W[0].length; j++) {
      let x_W = []
      for (let i in W) {
        x_W.push(W[i][j])
      }
      if (x_W.length > 0) {
        result_W.push(x_W)
      }
    }
    if (result_W.length > 0) {
      return result_W
    }
  }
  module.exports.subtract = function(N, S) {
    let result = []
    for (let i in S) {
      result.push(S[i] - N[i])
    }
    if (result.length > 0) {
      return result
    }
  }
  module.exports.random_vec = function(L){
    return [...Array(L)].map(e => Math.random()*1)
  }
  module.exports.dot_matrix_N = function(matrix, N){
    let result = []
    for (let i in matrix) {
      let line = []
      for (let item in matrix[i]) {
        line.push(matrix[i][item] * N)
      }
      if (line.length > 0 && line.length == matrix[i].length) {
        result.push(line)
      }
    }
    if (result.length > 0) {
      return result
    }
  }