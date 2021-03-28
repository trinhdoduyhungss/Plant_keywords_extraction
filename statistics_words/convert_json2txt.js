let fs = require('fs')
let data_content = fs.readFileSync('VegetableReqPython_1.json', 'utf8')
data_content = JSON.parse(data_content);
let full_text = ''
for (let i in data_content) {
    full_text += data_content[i] + "\r\n"
}
if (full_text.length > 0) {
    fs.writeFile('VegetableReqPython_corpus.txt', full_text, 'utf8', function (err) {
        if (err) {
            console.log(err)
            throw err;
        } else {
            console.log('Saved data!');
        }
    });
}