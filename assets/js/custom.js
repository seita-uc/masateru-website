$(document).ready(function(){
    const video = $('#video-element-id').get(0);
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    if(iOS) {
        $('body').append('<a class="arrow sample1-1 is-black is-rounded"></a>');
        $('.arrow').click(function() {
            video.play();
        });
        const touchEvent = 'ontouchstart' in window ? 'touchstart' : 'click';
        window.addEventListener(touchEvent, function() {
            video.play();
        });
    } else {
        video.play();
    }
})

