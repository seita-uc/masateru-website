$(document).ready(function(){
    const video = $('#video-element-id').get(0);
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    if(iOS) {
        //video.controls = true;
        //video.play()
    } else {
        //video.play()
    }
    $('body').append('<a class="arrow sample1-1 is-black is-rounded"></a>');
    $('.arrow').click(function() {
        video.play();
    });
})

