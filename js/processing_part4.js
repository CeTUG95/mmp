/**
 * Created by Juergen Lohr on 2021.
 */
//------------------------------------------------Video----------------------------
//-------------------------------------------Default---------------------
    var customCanvas = document.getElementById('customCanvas');
    var customCtx = customCanvas.getContext('2d');
	
function processingVideoCanvasGraph() {  
	imgArrayIn = readCanvas(videoPlayer,0); 
	// Process chain begin    
	RGBtoGRAY_v0(BridnessSamples, imgArrayIn );  
    drawMeasurmentVideo(customCanvas,BridnessSamples);
}
 
function drawMeasurmentVideo(iCanvas,iInput) { 
 let customCtx = iCanvas.getContext('2d');
 	iCanvas.width =600;
	iCanvas.height=400;
	
	customCtx.fillStyle="#0000CC";
	customCtx.font = "12px Arial";
	customCtx.fillText("Canvas: Messung  Video!!!!!",10,50);
 //console.log(iInput);
  for(var i = 0; i <iInput.length; i++) {
    let mono =(iInput[i] *1) + 1;
		// waveform
    customCtx.fillStyle = "rgb(255,00,00)";
	customCtx.fillRect(i , mono, 2, 2);
  }
}
 
 function writeCanvasCust(iInput, iCanvas) { 
	customCtx.putImageData(iInput,0, 0); // Draw the ImageData object.
}
function processingVideoCanvasPic() {  
	var selectedChannelRGB = (document.getElementById("In1").value);
	var 	iImageOut2; 
    var 	imgArrayOut2 ;
	customCanvas.width =128;
	customCanvas.height=128;	
	iImageOut2 = customCtx.createImageData( customCanvas.width, customCanvas.height);  //Processing Array W and H
	imgArrayOut2= iImageOut2.data;
	
	imgArrayIn = readCanvas(videoPlayer,0); 
	// Process chain begin    
	RGBtoGRAY_v0(BridnessSamples, imgArrayIn, selectedChannelRGB );  
	GRAYtoRGB_v0(imgArrayOut, BridnessSamples);   
	// Process chain end
	writeCanvas(iImageOut);
	fillCanvas(imgArrayOut2,imgArrayOut)
	writeCanvasCust(iImageOut2, customCanvas);
}
function fillCanvas(iOutput, iInput){
//	console.log(iInput);
 	var r,g,b;
	for(var i = 0; i < iInput.length; i+=4) {
	    r = iInput[i+0];
	    g = iInput[i+1];
	    b = iInput[i+2];
		iOutput[i+0] = b;
		iOutput[i+1] = g;
		iOutput[i+2] = r;
		iOutput[i+3] = 255;
	}
}
//-------------------------------------------�bung---------------------
function processingVideo41() {  
}
function processingVideo42() {  
}
var count = 0;
function processingVideo43(event) {
	// Hier Videoaufgabe Wahrnehmung
	var clip1StartTime = 15000;
	var clip1DurationTime = 6000;
	//var clip1Transperency = parseFloat(document.getElementById("In1").value);
	clip1Transperency = (count / 10);
	document.getElementById("In1").value = clip1Transperency;
	if(clip1Transperency >= 255){
		count = 0;
	}
	imgArrayIn = readCanvas(videoPlayer, 1);
	// Process chain begin
  
	setClipTransperency(videoPlayer, imgArrayOut, imgArrayIn, clip1Transperency, clip1StartTime, clip1DurationTime);
	// Process chain end
	writeCanvas(iImageOut);
  
	LogArray = ["imgArrayIn", "imgArrayOut"];
	count++;
	console.log(count);
}

function setClipTransperency(iPlayer, iOutput, iInput, iClip1Transperency, iClip1StartTime, iInput1DurationTime1) {
	iCurrentTime = iPlayer.currentTime;
	iInput1DurationTime1 += iClip1StartTime;
	iClip1StartTime /= 1000;
	iInput1DurationTime1 /= 1000;
  
	if ((iCurrentTime > iInput1DurationTime1) || (iCurrentTime < iClip1StartTime)) {
	  iPlayer.currentTime = iClip1StartTime;
	}
  
	iCanvasBackgroundPicture = picFile;
  
	for (var i = 0, n = iOutput.length; i < n; i += 4) {
	  iOutput[i] = iInput[i];
	  iOutput[i + 1] = iInput[i + 1];
	  iOutput[i + 2] = iInput[i + 2];
	  iOutput[i + 3] = iClip1Transperency;
	}
}

function processingVideo44() {  
}
function processingVideo45() {  
}	
function processingVideo46(event) {  
	// Tugay C. 
	// Gammakompression
	imgArrayIn = readCanvas(videoPlayer,2);
	var kompression = parseFloat(document.getElementById("In1").value);
	setGammaCorrection(imgArrayOut, imgArrayIn, kompression);   	
	writeCanvas(iImageOut);
	LogArray = ["imgArrayIn", "imgArrayOut"];
}

function setGammaCorrection(iOutput, iInput, comp) {  
	var gammakompress = 1 / comp;
	for(let i = 0; i < iInput.length; i += 4){
		iOutput[i] = 255 * Math.pow((iInput[i] / 255),gammakompress) // iInput[i]; // Red 
		iOutput[i + 1] = 255 * Math.pow((iInput[i + 1] / 255),gammakompress) // iInput[i + 1]; // Green
		iOutput[i + 2] = 255 * Math.pow((iInput[i + 2] / 255),gammakompress) // iInput[i + 2]; // Blue 
		iOutput[i + 3] = 255; // Transparenz
	}
}

function processingVideo47a() {  
	// Tugay C. 
	// Chroma Key first part
	imgArrayIn = readCanvas(videoPlayer,2);
	// Process chain begin    ---// Loop through the pixels, turning them in-RGB-Out
	var QuantFaktor = parseFloat(document.getElementById("In1").value);
	setChromaKeying(imgArrayOut, imgArrayIn, QuantFaktor);   	
	// Process chain end
	writeCanvas(iImageOut);
	
	LogArray = ["imgArrayIn", "imgArrayOut"];
}

function processingVideo47b() {  
	// Tugay C. 
	// Chroma Key second part
	imgArrayIn = readCanvas(videoPlayer,2);
	// Process chain begin    ---// Loop through the pixels, turning them in-RGB-Out
	var QuantFaktor = parseFloat(document.getElementById("In1").value);
	setChromaKeying(imgArrayOut, imgArrayIn, QuantFaktor);   	
	// Process chain end
	writeCanvas(iImageOut);
	
	LogArray = ["imgArrayIn", "imgArrayOut"];
}

function setChromaKeying(iOutput, iInput, QuantFaktor) {  
	// chromekey base part
	let tolerance = 40;
	for (let i = 0; i < iInput.length; i += 4) {
		if (iInput[i] > QuantFaktor + tolerance || iInput[i] < QuantFaktor - tolerance) {
			iOutput[i] = iInput[i];
			iOutput[i + 1] = iInput[i + 1];
			iOutput[i + 2] = iInput[i + 2];
			iOutput[i + 3] = 255;
		}
		else if (iInput[i + 1] > QuantFaktor + tolerance || iInput[i + 1] < QuantFaktor - tolerance) {
			iOutput[i] = iInput[i];
			iOutput[i + 1] = iInput[i + 1];
			iOutput[i + 2] = iInput[i + 2];
			iOutput[i + 3] = 255;
		}
		else if (iInput[i + 2] > QuantFaktor + tolerance || iInput[i + 2] < QuantFaktor - tolerance) {
			iOutput[i] = iInput[i];
			iOutput[i + 1] = iInput[i + 1];
			iOutput[i + 2] = iInput[i + 2];
			iOutput[i + 3] = 255;
		} else {
			iOutput[i] = iInput[i];
			iOutput[i + 1] = iInput[i + 1];
			iOutput[i + 2] = iInput[i + 2];
			iOutput[i + 3] = 0;
        }
	}
}

function processingVideo48() { 
}
function processingVideo49() { 
}

function processingVideo410() {  
}

function processingVideo411() {  
}
function processingVideo412() {  
}


function processingVideo413() {  
}

function processingVideo414() {  
}


//-----------------------------------------------Audio------------------------------
//-------------------------------------------Default---------------------
function processingAudioCanvasText() {  
  drawMeasurmentAudio(customCanvas,AudioTestArray);
}
 
function drawMeasurmentAudio(iCanvas,iInput) { 
 var customCtx = iCanvas.getContext('2d');
 	iCanvas.width =600;
	iCanvas.height=400;
    customCtx.fillStyle="#0000CC";
	customCtx.font = "12px Arial";
	customCtx.fillText("Canvas: Messung Audio!!!!!",10,50);
 //console.log(iInput);
  for(var i = 0; i <iInput.length; i++) {
    var mono =(iInput[i] *100) + 100;
		// waveform
    customCtx.fillStyle = "rgb(255,00,00)";
	customCtx.fillRect(i , mono, 2, 2);
  }
}

function processingAudioCanvasLine() { 
   drawMeasurmentLine(customCanvas);
}
function drawMeasurmentLine(iCanvas) { 
 var customCtx = iCanvas.getContext('2d');
 	iCanvas.width =300;
	iCanvas.height=200;
	
	customCtx.clearRect(0, 0, customCtx.width, customCtx.height);
    customCtx.fillStyle="#CC0000";
	customCtx.fillRect(
		10, 
		20,
		50,
		100
	);
    customCtx.fillStyle="#CCFFFF";
	customCtx.font = "12px Arial";
	customCtx.fillText("Canvas: Messung 1 Line !!!!!",10,50);
    customCtx.beginPath();

  for (var i = 0; i <= 100; i += (100 / 10)) {
    customCtx.moveTo( i, 20);//0  
    customCtx.lineTo( i, 150);
    customCtx.fillText(i, 20 + i, 170);
    customCtx.stroke();
  }
}
//-------------------------------------------�bung---------------------
function processingAudio41() { 
}
function processingAudio42() { 
}

var count = 0;
function processingAudio43(event) { 
	// Hier Audioaufgabe Wahrnehmung
	var	clip1StartTime  = 15000;
	var	clip1DurationTime  = 12000;
	var clip1Mixing = parseFloat(document.getElementById("In1").value);
	// genNoise(VolumenSamples, 1) ;  
	// genSinus(VolumenSamples,1000,bufferSize,1) ; 
    audArrayIn = readWebAudio(event);
	// Process chain begin   
	StereoSelectOneChannel(monoSamples, audArrayIn, "l");
	StereoSelectOneChannel(VolumenSamples, audArrayIn, "r");
	setClipAudio12(audioPlayer,OutSamples,monoSamples, VolumenSamples, clip1Mixing, clip1StartTime, clip1DurationTime);
	// Process chain end
    writeWebAudio(event.outputBuffer,OutSamples);
	LogArray = ["VolumenSamples","audArrayIn","monoSamples","OutSamples"]; 
	count ++; 
 }

 function setClipAudio12(iPlayer,iOutput,iInput, iInput2, iClip1Mixing, iClip1StartTime, iInput1DurationTime1) { 
	iCurrentTime=iPlayer.currentTime;
	iInput1DurationTime1 +=iClip1StartTime;
	iClip1StartTime /=1000;
	iInput1DurationTime1 /=1000;

	if ((iCurrentTime > iInput1DurationTime1) || (iCurrentTime < iClip1StartTime)){
		iPlayer.currentTime =iClip1StartTime;
	}

	iClip1Mixing /= 1000;	
	for(var i = 0; i < iOutput.length; i += 1){
		iClip1Mixing = (count/1000);
		iOutput[i] = (iInput[i] * iClip1Mixing) + (iInput2[i] * (iClip1Mixing - 1));
		//iOutput[i] = (iInput[i] * 1) + (iInput2[i] * 0);
		document.getElementById("In1").value = iClip1Mixing;
	}	
}

function processingAudio44() { 
} 

function processingAudio45() {  
}

function processingAudio46() {
}

function processingAudio47() {  
}

function processingAudio48() {  
}

function processingAudio49() {  
}

function processingAudio410() {  
}

function processingAudio411() {  
}

function processingAudio412() {  

}

function processingAudio413() {  

}

function processingAudio414() {  

}