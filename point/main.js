var milkcocoa = new MilkCocoa("noteiahx7tqb.mlkcca.com");

// テーブル名
var pointDataStore = milkcocoa.dataStore("point");


//データ送信
function send() {

    var data = {
            no : $(':text[name="no"]').val(),
            userID : $(':text[name="userID"]').val(),
            score : $(':text[name="point"]').val()
            };

    pointDataStore.push(data);

}


//データ取得
function get() {

    //クエリをかける。
    pointDataStore.stream().next(function(err,data){

        //問題番号
        var n = $(':text[name="no"]').val();

        //指定した問題番号を抜き出す
        var obj = $.map(data, function(val, key) {
            if(val.value.no == n) return val;
        });

        //スコアの高い順にソート
        obj.sort(function(a, b) {
            if (a.value.score > b.value.score) return -1;
            if (a.value.score < b.value.score) return 1;
        });

        add(obj);
    });

}


//データ出力
function add(obj) {

    var html = '';

    for(var i = 0; i < obj.length; i++){
         html += '<p>' + obj[i].value.userID + ' : ' + obj[i].value.score +'</p>';
    }
    $('.js-result').html('').append(html);

}







