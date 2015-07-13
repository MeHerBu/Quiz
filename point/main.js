var milkcocoa = new MilkCocoa("noteiahx7tqb.mlkcca.com");

// テーブル名
var anserDataStore = milkcocoa.dataStore("Anser");

//問題のスタート時間登録
function start() {
    localStorage.setItem('startTime_'+ $(':radio[name="question"]:checked').val(), new Date());
    alert('問題スタート時間登録しました');
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

//データ取得
function get() {

    //問題番号
    var qeation = $(':radio[name="question"]:checked').val();

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


    // 問題開始時間
    var time = now = new Date(localStorage.getItem('startTime_'+ $(':radio[name="question"]:checked').val()) );
    var start = '';
        start += '問題スタート時間：' +
                time.getFullYear()+"年"+
                time.getMonth()+"月"+
                time.getDate()+"日"+
                time.getHours()+"時"+
                time.getMinutes()+"分"+
                time.getSeconds()+"秒";
    $('.js-startTime').html('').append(start);


    // 回答時間取得
    // TODO jsonから正解を取得して、正解者だけ取り除く

    var anser = '';
    for(var i = 0; i < obj.length; i++){
        var anserTime = new Date(obj[i].timestamp);
        //var time = startTime - startTime ;
        var diff = (anserTime.getTime() - time.getTime());
        var daysDiff = diff / 1000;

        if(daysDiff > 0){
            // 時間の表示は、問題開始時間から、回答した時間を算出して●●秒と表示
            anser += '<p>' + obj[i].value.userID + ' : ' + daysDiff +'ミリ秒</p>';
        }

    }
    $('.js-result').html('').append(anser);

}


