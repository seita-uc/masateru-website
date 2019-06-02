class Person {
    public PImage img;
    public float px;
    public float py;
    public float pxspeed;
    public float pyspeed;
    public Boolean isOn;
    public float psize;

    public Person(String imgPath, float x, float y, float xspeed, float yspeed) {
        img = loadImage(imgPath);
        px = x;
        py = y;
        pxspeed = xspeed;
        pyspeed = yspeed;
        isOn = true;
        psize = random(100, 300);
    }

    public void walk() {
        if(isOn) {
            image(img, px, py, psize, psize);
        }

        px = px + pxspeed;
        py = py + pyspeed;

        if(px > 800) {
            pxspeed = -pxspeed;
        } else if (px < 0) {
            pxspeed = -pxspeed;
        }

        if(py > 800) {
            pyspeed = -pyspeed;
        } else if (py < 0) {
            pyspeed = -pyspeed;
        }
    }

    public void changeSize(float size) {
        psize = size;
    }
}

Person masateru;
void setup() {
    size(800, 800);
    String imgPath = "./images/masateru.png";
    float x = random(0, 800);
    float y = random(0, 800);
    float xspeed = random(-15, 15);
    float yspeed = random(-15, 15);
    masateru = new Person(imgPath, x, y, xspeed, yspeed);
    println("hoge");
} 

void draw() {
    clear();
    imageMode(CENTER);
    masateru.walk();
}
