var milkcocoa = new MilkCocoa("noteiahx7tqb.mlkcca.com");

// テーブル名
var anserDataStore = milkcocoa.dataStore("Anser");
var qeationDataStore = milkcocoa.dataStore("Qeation");

//問題のスタート時間登録
function start() {
    var data = {
            qeation : $(':radio[name="question"]:checked').val(),
            };
    qeationDataStore.push(data);
    alert('問題スタート時間登録完了');
}

//回答登録
function send() {

    var data = {
            userID : $(':text[name="userID"]').val(),
            qeation : $(':radio[name="question"]:checked').val(),
            anser : $(':radio[name="anser"]:checked').val()
        };

    anserDataStore.push(data);
    alert('データ登録');
}

var startTime = 0;


//データ取得
function get() {

    //問題番号
    var qeation = $(':radio[name="question"]:checked').val();

    //問題開始時間を取得
    qeationDataStore.stream().next(function(err,data){

        //指定した問題番号を抜き出す
        var obj = $.map(data, function(val, key) {
            if(val.value.qeation == qeation) return val;
        });

        //回答時間の速い順にソート
        obj.sort(function(a, b) {
            if (a.timestamp > b.timestamp) return -1;
            if (a.timestamp < b.timestamp) return 1;
        });

        startTime = obj[0].timestamp;
    });

    // 回答を取得
    anserDataStore.stream().next(function(err,data){

        //指定した問題番号を抜き出す
        var obj = $.map(data, function(val, key) {
            if(val.value.qeation == qeation) return val;
        });

        //回答時間の速い順にソート
        obj.sort(function(a, b) {
            if (a.timestamp > b.timestamp) return 1;
            if (a.timestamp < b.timestamp) return -1;
        });

        add(obj);

    });

}


//データ出力
function add(obj) {

    // TODO jsonから正解を取得して、正解者だけ取り除く

    var time = new Date(startTime);
    var html = '';
        html += '<p>問題スタート時間：' + time.toLocaleString() +'</p>';
    for(var i = 0; i < obj.length; i++){
        var anserTime = new Date(obj[i].timestamp);
        //var time = startTime - startTime ;
        var diff = (anserTime.getTime() - time.getTime());
        var daysDiff = Math.floor(diff / 1000);

         // 時間の表示は、問題開始時間から、回答した時間を算出して●●秒と表示
         html += '<p>' + obj[i].value.userID + ' : ' + (daysDiff) +'</p>';
    }
    $('.js-result').html('').append(html);

}


