var myWorker = new Worker('worker.js');

var canvas : any = document.getElementById("blurcanvas");
var context = canvas.getContext("2d");

const time_interval : number = 2000;


let img = new Image;
img.src = "mario.jpg";

img.onload = function () {
	//draw initial image
	context.drawImage(img, 0, 0);
	//start timer for the blur
	let test = new BlurTimer();
	test.startTest();
};


myWorker.onmessage = function(e) {
	let result = e.data;
	
	console.log(result);

	context.putImageData(result, 0, 0);
}

class BlurTimer {
    public example = 'Test';
    private timer;

    startTest() {
        this.timer = setInterval(function() {
			let w = img.naturalWidth;
			let h = img.naturalHeight;
			let iData : ImageData = context.getImageData(0, 0, w, h);
			console.log('posted image data');
			myWorker.postMessage(iData);
		}, time_interval);
    }
}
