(function(){

	var canvas = document.getElementById("canvas"),
		ctx = canvas.getContext("2d");
	
	var background, background2, maskItem, maskItem2, sunglasses;
	
		maskItemX = 100,
		maskItemY = 100,
		imageURLs = [],
		imagesOK = 0,
		imgs = [];
		imageX = 100,
		imageY = 100,
		draggingImage = false,
		canvasOffset = $("#canvas").offset(),
		isDown = false,
		draggingResizer = { x: 0, y: 0 },
		offsetX = canvasOffset.left,
		offsetY = canvasOffset.top,
		startX = 0,
		startY = 0,
		
	imageURLs.push("http://placekitten.com/940/500");
	imageURLs.push("http://codepo8.github.io/canvas-masking/star.png");
	imageURLs.push("http://codepo8.github.io/canvas-masking/star.png");
	imageURLs.push("http://placekitten.com/950/500");
	loadAllImages();
	
	function loadAllImages() {
		for (var i = 0; i < imageURLs.length; i++) {
			var img = new Image();
			imgs.push(img);
			img.onload = function () {
				imagesOK++;
				imagesAllLoaded();
			};
			img.src = imageURLs[i];
		}
	}
	
	var imagesAllLoaded = function () {
		if (imagesOK == imageURLs.length) {
			// all images are fully loaded an ready to use
			background = imgs[0];
			maskItem = imgs[1];
			maskItem2 = imgs[2];
			background2 = imgs[3];
			start();
		}
	};
	
	function start() {
	
        ctx.clearRect(0, 0, 940,500);
		ctx.drawImage(maskItem, maskItemX, maskItemY);
		ctx.globalCompositeOperation = "source-in";
		ctx.drawImage(maskItem, maskItemX, maskItemY);			

        ctx.drawImage(background, 0, 0, 940, 500);
		ctx.globalCompositeOperation = "destination-atop";
		ctx.drawImage(background2, 0, 0, 940, 500);
	
		ctx.globalCompositeOperation = "copy";
	}
	

	function hitImage(x, y) {
    	return (x > maskItemX && x < maskItemX + maskItem.width && y > maskItemY && y < maskItemY + maskItem.height);
	}
	
	function checkArea(x, y) {
		var 	backgroundWidth = background.width,
				backgroundHeight = background.height,
				maskWidth = maskItem.width,
				maskHeight = maskItem.height;
				
    	if (x < 0) {
			maskItemX = 0;
		}
		if (x > (backgroundWidth - maskWidth)) {
			maskItemX = backgroundWidth - maskWidth;
		}
		if (y < 0) {
			maskItemY = 0;
		}
		if (y > (backgroundHeight - maskHeight)) {
			maskItemY = backgroundHeight - maskHeight;
		}
	}


	function handleMouseDown(e) {
		startX = parseInt(e.clientX - offsetX);
		startY = parseInt(e.clientY - offsetY);
		//console.log(e.clientX +' : '+e.clientY);
		draggingImage = hitImage(startX, startY);
	}
	
	function handleMouseUp(e) {
		draggingImage = false;
	}
	
	function handleMouseOut(e) {
		handleMouseUp(e);
	}
	
	function handleMouseMove(e) {
	
		if (draggingImage) {
			
			imageClick = false;
	
			mouseX = parseInt(e.clientX - offsetX);
			mouseY = parseInt(e.clientY - offsetY);

			// move the image by the amount of the latest drag
			var dx = mouseX - startX;
			var dy = mouseY - startY;
			maskItemX += dx;
			maskItemY += dy;
			// reset the startXY for next time
			startX = mouseX;
			startY = mouseY;
			// redraw the image with border
			
			//console.log('draggingImage '+draggingImage);
			checkArea(maskItemX, maskItemY);
			start();
		}
	}
	
	
	$("#canvas").mousedown(function (e) {
		handleMouseDown(e);
	});
	$("#canvas").mousemove(function (e) {
		handleMouseMove(e);
	});
	$("#canvas").mouseup(function (e) {
		handleMouseUp(e);
	});
	$("#canvas").mouseout(function (e) {
		handleMouseOut(e);
	});


})();// JavaScript Document