var myWorker = new Worker('worker.js');
var canvas = document.getElementById("blurcanvas");
var context = canvas.getContext("2d");
var time_interval = 2000;
var img = new Image;
img.src = "mario.jpg";
img.onload = function () {
    //draw initial image
    context.drawImage(img, 0, 0);
    //start timer for the blur
    var test = new BlurTimer();
    test.startTest();
};
myWorker.onmessage = function (e) {
    var result = e.data;
    console.log(result);
    context.putImageData(result, 0, 0);
};
var BlurTimer = /** @class */ (function () {
    function BlurTimer() {
        this.example = 'Test';
    }
    BlurTimer.prototype.startTest = function () {
        this.timer = setInterval(function () {
            var w = img.naturalWidth;
            var h = img.naturalHeight;
            var iData = context.getImageData(0, 0, w, h);
            console.log('posted image data');
            myWorker.postMessage(iData);
        }, time_interval);
    };
    return BlurTimer;
}());
