$(document).ready(function(){
    const video = $('#video-element-id').get(0);
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    if(iOS) {
        video.preload = "none";
        video.pause()
    } else {
        video.play()
    }
})

