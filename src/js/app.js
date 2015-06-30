// --------------------------------------------------------
// セッティング
// --------------------------------------------------------
var milkcocoa = new MilkCocoa('maxi9ffclh3.mlkcca.com');
var DS_Quiz = milkcocoa.dataStore('quiz');
var anserDataStore = milkcocoa.dataStore('Anser');
var qeationDataStore = milkcocoa.dataStore('Qeation');

var msgID = 'ib34agsc19m3qd5';
var jsonPath = './src/js/qa.json'; // JSONのパス
var actNum = 0; // 現在の問題画面
var maxNum = 0; // 問題数
var qaJson = '';


// --------------------------------------------------------
// 便利関数
// --------------------------------------------------------

// 問題数を取得
function getObjLength(data){
    var n = 0;
    for(var i in data){
        maxNum++;
        n++;
    }

    return n;
}