import gifAnimation.*;

PImage img;
PImage[] circularSmallImgs = new PImage[8];
PImage[] circularBigImgs = new PImage[8];
int randIndex1;
int randIndex2;
GifMaker gifExport;
void setup(){
    size(displayWidth, 500);
    background(255);

    /*frameRate(12);*/
    gifExport = new GifMaker(this, "images/export.gif");
    gifExport.setRepeat(0);				// make it an "endless" animation
    /*gifExport.setTransparent(0, 0, 0);	// black is transparent*/

    String imgPath = "images/main.jpg";
    img = loadImage(imgPath);
    img.resize(width, 0);
    for(int i = 0; i < 8; i++) {
        String circularImgPath = "images/circular_img_" + (i+1) + ".jpg";
        circularSmallImgs[i] = loadImage(circularImgPath);
        circularSmallImgs[i].resize(260, 260);
        circularBigImgs[i] = loadImage(circularImgPath);
        circularBigImgs[i].resize(315, 315);
    }
} 

void draw(){
    image(img, 0, 0);
    image(circularSmallImgs[randIndex1], 410, 203);
    image(circularBigImgs[randIndex2], 680, 145);
    if (random(100) > 50) {
        randIndex1 = int(random(circularSmallImgs.length-1));
        randIndex2 = int(random(circularBigImgs.length-1));
    }
    /*gifExport.setDelay(1);*/
    gifExport.addFrame();
}

void mousePressed() {
    gifExport.finish();
}
