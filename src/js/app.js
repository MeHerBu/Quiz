// --------------------------------------------------------
// セッティング
// --------------------------------------------------------
var milkcocoa = new MilkCocoa('maxi9ffclh3.mlkcca.com');
var DS = milkcocoa.dataStore('quiz');
var jsonPath = 'src/js/qa.json'; // JSONのパス
var actNum = 0; // 現在のスライド
var maxNum = 0; // 問題数
var $btn_next = $('#btn_next');


// --------------------------------------------------------
// JSON Ajax
// --------------------------------------------------------
$.getJSON(jsonPath).done(function(data){
    midfielder(data);
});


// --------------------------------------------------------
// ミッドフィルダー
// --------------------------------------------------------
function midfielder(qaJson){
    // 問題数を取得
    for(var i in qaJson){ maxNum++; }

    // View生成
    vueQ(qaJson);
}


// --------------------------------------------------------
// View - 問題画面
// --------------------------------------------------------
function vueQ(qaJson){
    var vue = new Vue({
        el: 'main',
        data: {
            keyword: '',
            num: '',
            quiz: '',
            ex: ''
        },

        methods:{
            // 問題を切り替える処理
            changeQ: function(){
                var that = this;
                ++actNum;

                // 次の問題をデータバインド
                if(actNum <= maxNum) {
                    that.num = actNum;
                    that.quiz = qaJson['q' + that.num].question;
                    that.ex = _.values(qaJson['q' + that.num].answer);
                }
                if(actNum == maxNum) {
                    // 最後の問題になったら、NextボタンをOFFにする
                    $btn_next.attr('disabled', 'disabled');
                }

                // データストアに送信
                DS.send({
                    DSactNum : actNum, // 問題数
                    DSmaxNum : _.values(that.ex).length // 回答数
                });
            }
        }
    });

    // 初回描画
    vue.changeQ();
}