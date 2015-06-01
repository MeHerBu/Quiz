// --------------------------------------------------------
// セッティング
// --------------------------------------------------------
var milkcocoa = new MilkCocoa('maxi9ffclh3.mlkcca.com');
var DS = milkcocoa.dataStore('quiz');
var jsonPath = './src/js/qa.json'; // JSONのパス
var actNum = 0; // 現在のスライド
var maxNum = 0; // 問題数
var qaJson = '';


// --------------------------------------------------------
// 便利関数
// --------------------------------------------------------

// 問題数を取得
function getObjLength(data){
    for(var i in data){ maxNum++; }
}