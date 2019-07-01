images = [null, null, null];

function upload(z){
    var imgCanvas = document.getElementById("can" + z);
    var fileinput = document.getElementById("finput" + z);
    images[z] = new SimpleImage(fileinput);
    if (!images[2]){
        images[2] = new SimpleImage(fileinput);
        }
    images[z].drawTo(imgCanvas);
    }

function hide(){
    if (images[0] && images[1]){
        for (var pixel of images[2].values()){
            var x = pixel.getX();
            var y = pixel.getY();
            var pixbase = images[0].getPixel(x, y);
            var pixhide = images[1].getPixel(x, y);
            // alert(pixbase.getRed());
            // alert(pixhide.getRed());
            // alert(getSignif(pixbase.getRed()));
            // alert(getSignif(pixhide.getRed()));
            // alert(getSignif(pixbase.getRed()) + getSignif(pixhide.getRed()) / 16);
            pixel.setRed(getSignif(pixbase.getRed()) + getSignif(pixhide.getRed()) / 16);
            pixel.setGreen(getSignif(pixbase.getGreen()) + getSignif(pixhide.getGreen()) / 16);
            pixel.setBlue(getSignif(pixbase.getBlue()) + getSignif(pixhide.getBlue()) / 16);
            }
        var imgCanvas = document.getElementById("can2");
        images[2].drawTo(imgCanvas);
        }
    }

function extract(z){
    if (images[z]){
        for (var pixel of images[2].values()){
            var x = pixel.getX();
            var y = pixel.getY();
            var pixextr = images[z].getPixel(x, y);
            pixel.setRed(getInsignif(pixextr.getRed()));
            pixel.setGreen(getInsignif(pixextr.getGreen()));
            pixel.setBlue(getInsignif(pixextr.getBlue()));
            }
        var imgCanvas = document.getElementById("can2");
        images[2].drawTo(imgCanvas);
        }
    }

// value assumed to be RGB value [0, 255]
// As binary, turns 1011 0011 into 1011 0000
function getSignif(value){
    return Math.floor(value / 16) * 16
    }
// As binary, turns 1011 0011 into 0011 0000
function getInsignif(value){
    return Math.floor(value % 16) * 16
    }

// Need to be able to crop images to same size, or perhaps
// select where in the image the secret image should be
