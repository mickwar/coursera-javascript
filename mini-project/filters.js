flagGray1 = false;
flagGray2 = false;
flagNoise = false;
flagScramble = false;

function upload(){
    fileinput = document.getElementById("finput");
    imgCanvas = document.getElementById("elemcan");
    imageRaw = new SimpleImage(fileinput);
    imageGray1 = new SimpleImage(fileinput);
    imageGray2 = new SimpleImage(fileinput);
    imageNoise = new SimpleImage(fileinput);
    imageScramble = new SimpleImage(fileinput);
    reset();
    }

function reset(){
    imageRaw.drawTo(imgCanvas);
    }

// average
function doGray1(){
    if (imageGray1){
        if (!flagGray1){
            filterGray1();
            }
        imageGray1.drawTo(imgCanvas);
        }
    }

function filterGray1(){
    for (var pixel of imageGray1.values()){
        var gray = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
        pixel.setRed(gray);
        pixel.setGreen(gray);
        pixel.setBlue(gray);
        }
    flagGray1 = true;
    }


// weighted-average
function doGray2(){
    if (imageGray2){
        if (!flagGray2){
            filterGray2();
            }
        imageGray2.drawTo(imgCanvas);
        }
    }

function filterGray2(){
    for (var pixel of imageGray2.values()){
        var gray = 0.30*pixel.getRed() + 0.59*pixel.getGreen() + 0.11*pixel.getBlue();
        pixel.setRed(gray);
        pixel.setGreen(gray);
        pixel.setBlue(gray);
        }
    flagGray2 = true;
    }

// noise
function doNoise(){
    if (imageNoise){
        if (!flagNoise){
            filterNoise();
            }
        imageNoise.drawTo(imgCanvas);
        }
    }

function filterNoise(){
    for (var pixel of imageNoise.values()){
        var red = Math.round(Math.max(0,Math.min(255,pixel.getRed()+((Math.random()-0.5)*60))));
        var green = Math.round(Math.max(0,Math.min(255,pixel.getGreen()+((Math.random()-0.5)*60))));
        var blue = Math.round(Math.max(0,Math.min(255,pixel.getBlue()+((Math.random()-0.5)*60))));
        pixel.setRed(red);
        pixel.setGreen(green);
        pixel.setBlue(blue);
        }
    flagNoise = true;
    }

// scramble
function doScramble(){
    if (imageScramble){
        if (!flagScramble){
            filterScramble();
            }
        imageScramble.drawTo(imgCanvas);
        }
    }
function filterScramble(){
    // arguments to add: distance range and probability of swap
    for (var pixel of imageScramble.values()){
        if (runif(0, 1) < 0.5){
            var dx = pixel.getX() + runif(-5, 5);
            var dy = pixel.getY() + runif(-5, 5);
            dx = Math.round(Math.max(0, Math.min(imageScramble.getWidth()-1, dx)));
            dy = Math.round(Math.max(0, Math.min(imageScramble.getHeight()-1, dy)));
            var tmppixel = imageRaw.getPixel(dx, dy);
            pixel.setRed(tmppixel.getRed());
            pixel.setGreen(tmppixel.getGreen());
            pixel.setBlue(tmppixel.getBlue());
            }
        }
    flagScramble = true;
    }

function displayRange(){
    var scaleText = document.getElementById("scaleText");
    var scaleValue = document.getElementById("scale");
    scaleText.innerHTML = "Scale: " + scaleValue.value + "%";
    }

function runif(a, b){
    return Math.random() * (b - a) + a;
    }
function pixelBound(x){
    return Math.round(Math.max(0, Math.min(255, x)));
    }

/* ideas:
custom weights (for gray and for individuals)
degree of noise
change reset back to normal, and make an actual reset (unsetting the flags and clearing the images)
darken (multiply by number in (0, 1))
clear canvas
*/
