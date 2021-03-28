let fs = require('fs')
let Kw = require('./extract_keywords.js')
let data_plants = fs.readFileSync('VegetableReqPython_1.json', 'utf8')
data_plants = JSON.parse(data_plants);
let data_kw = {}
for(let plant in data_plants){
    data_kw[plant] = Kw.extract_keywords(data_plants[plant])
}
if(Object.keys(data_kw).length > 0){
    fs.writeFile('data_kws.json', JSON.stringify(data_kw), function (err) {
        if (err) { console.log(err) }
        else {
          console.log('Saved data')
        }
    })
}
// console.log(Kw.extract_keywords('Gừng sống còn gọi là sinh khương có tác dụng phát tán phong hàn, chống nôn ói. Gừng khô còn gọi là can khương, có tính nóng hơn sinh khương, có thể làm ấm tỳ vị. Gừng đốt cháy tồn tính còn gọi là hắc khương. Hắc khương có vị đắng, thường được tẩm đồng tiện, có thể làm ấm can thận, giáng hư hỏa. Vỏ gừng được gọi là khương bì có tác dụng lợi tiểu. Nhờ vậy mà trong kỹ thuật bào chế, gừng cũng có thể giúp cho thầy thuốc đạt được một số mục đích quan trọng. Sinh địa nấu với gừng sẽ hạn chế bớt tính mát. Bán hạ chế với gừng để giải độc. Một số loại thuốc khác như: sâm, đinh lăng... cũng thường được tẩm gừng, sao qua để tăng tính ấm và dẫn vào phế vị. Tuy nhiên, trong trường hợp âm hư nội nhiệt sinh ho, biểu hư làm ra mồ hôi nhiều hoặc mất máu không nên dùng. Khi sử dụng gừng không nên gọt vỏ vì vỏ gừng cũng có rất nhiều công dụng chữa bệnh nên ăn gừng chỉ cần rửa sạch sau đó sử dụng. Không nên ăn gừng trong thời gian dài đối với những người âm hư hỏa vượng, nhiệt trong, mắc các bệnh mụn nhọt, viêm phổi, phù thũng phổi, hạch phổi, viêm dạ dày, viêm gan, viêm thận, bệnh đái tháo đường… Khi bị cảm lạnh, uống nước gừng sẽ rất hiệu quả. Trái lại, đối với những trường hợp cảm mạo thử nhiệt, cảm mạo phong nhiệt hoặc bị trúng nắng tuyệt đối không cho dùng gừng. Không nên ăn gừng tươi đã bị dập: củ gừng tươi sau khi bị dập sẽ sinh ra một loại độc tố mạnh có thể gây hoại tử các tế bào gan, lâu đàn sẽ biến thành ung thư gan, ung thư thực quản. Mặc dù gừng có nhiều tác dụng nhưng không nên quá lạm dụng.'))