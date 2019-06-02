// YouTube IFrame Player API の読み込み
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// YouTubeの埋め込み
var ytPlayer;
function onYouTubeIframeAPIReady() {
  ytPlayer = new YT.Player(
    'background-movie-player', // 埋め込む場所の指定
    {
      playerVars: {
        playsinline: 1,
        autoplay: 1, // 自動再生
        loop: 1, // ループ有効
        listType: 'playlist', //リスト再生
        list: 'PLYpUhFEzQAcTwTxvxx04al09DDKjnDuZT', // 再生する動画リスト
        controls: 0, // コントロールバー非表示
        enablejsapi: 1, //JavaScript API 有効
        iv_load_policy: 3, //動画アノテーションを表示しない
        disablekb:1, //キーボード操作OFF
        showinfo:0, //動画の再生が始まる前に動画のタイトルなどの情報を表示しない
        rel:0, //再生終了時に関連動画を表示しない
      },
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange,
        'onError': onPlayerError
      }
    }
  );
}

// プレーヤーの準備ができたとき
function onPlayerReady(event) {
  // 動画をミュートにする
  const player = event.target;
  player.mute();
  player.playVideo();
}

// onStateChangeのコールバック関数
function onPlayerStateChange(event) {
  var status = event.data;
  //var playerWrap = $('#header .background-wrap');
  //var names = {
    //'-1' : '未開始',
    //'0' : '終了',
    //'1' : '再生中',
    //'2' : '停止',
    //'3' : 'バッファリング中',
    //'5' : '頭出し済み'
  //};
  ////バッファリングの完了後、動画背景を表示させる
  //if (status == 1) {
    //$(playerWrap).css('opacity','1');
  //} else {
    //$(playerWrap).css('opacity','0');
  //}
}

// errorの発生時
function onPlayerError(event) {
  var errorstatus = event.data;
  //var playerWrap = $('#header .background-wrap');
  ////何らかのエラーステータスが渡された場合、youtubeプレイヤーを削除する
  //if (errorstatus !== '') {
    //$(playerWrap).remove();
  //}
}
