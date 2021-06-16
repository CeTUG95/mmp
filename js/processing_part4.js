/**
 * Created by Juergen Lohr on 2021. Git VERSIOM
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
//Gleitfarbe
var sceneCounter = 0;

function processingVideo41() {
	startValue = parseFloat(document.getElementById("In1").value);
	endValue = parseFloat(document.getElementById("In2").value);

	colourVari(imgArrayOut, startValue, endValue);
	writeCanvas(iImageOut);

	LogArray = ["imgArrayOut"];
}

function colourVari(iOutput, start, end) {
	for (var i = 0; i < iOutput.length; i += 4) {
		iOutput[i] = Math.abs(start + sceneCounter - end);
		iOutput[i + 1] = Math.abs(start + 2 * sceneCounter - end);
		iOutput[i + 2] = Math.abs(start + 3 * sceneCounter - end);
		iOutput[i + 3] = 255;
	}
	if (sceneCounter == 255) {
		sceneCounter = 0;
	} else {
		sceneCounter++;
	}
}

//Farbskalierung
function processingVideo42() {
	imgArrayIn = readCanvas(videoPlayer, 0);

	var value = parseFloat(document.getElementById("In1").value);

	videoColor(imgArrayOut, imgArrayIn, value);
	writeCanvas(iImageOut);

	LogArray = ["imgArrayIn", "imgArrayOut"];
}

function videoColor(iOutput, iInput, iValue) {
	vu = iValue / 100;
	vv = (100 - iValue) / 100;

	for (var i = 0; i < iInput.length; i += 4) {
		y = 0.299 * iInput[i] + 0.587 * iInput[i + 1] + 0.114 * iInput[i + 2];
		u = 0.492 * (iInput[i + 2] - y) * vu;
		v = 0.877 * (iInput[i] - y) * vv;

		iOutput[i] = y + 1.140 * v;
		iOutput[i + 1] = y - 0.395 * u - 0.581 * v;
		iOutput[i + 2] = y + 2.032 * u;
		iOutput[i + 3] = 255;
	}
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
	var gammakompress = comp / 1;
	for(let i = 0; i < iInput.length; i += 4){
		iOutput[i] = 255 * Math.pow((iInput[i] / 255),gammakompress) // iInput[i]; // Red 
		iOutput[i + 1] = 255 * Math.pow((iInput[i + 1] / 255),gammakompress) // iInput[i + 1]; // Green
		iOutput[i + 2] = 255 * Math.pow((iInput[i + 2] / 255),gammakompress) // iInput[i + 2]; // Blue 
		iOutput[i + 3] = 255; // Transparenz
	}
}

var startDelta
function INITDeltaGOP(){ 
	startDelta=8;
}

function processingVideo47a(event) {  
	// Tugay C. 
	// Chroma Key Diff
	imgArrayIn = readCanvas(videoPlayer,2);
	// Process chain begin    ---// Loop through the pixels, turning them in-RGB-Out
	var Faktor = parseFloat(document.getElementById("In1").value);
	DeltaGOP_Chroma12(imgArrayOut,imgArrayIn2,imgArrayIn,Faktor);   
	if(startDelta>>0){
		storeArray(imgArrayIn2,imgArrayIn);
		startDelta-=1;
	}
	// Process chain end
	writeCanvas(iImageOut);
	LogArray = ["imgArrayIn", "imgArrayOut"];
}

function processingVideo47b() {  
	// Tugay C. 
	// Chroma Key Diff
	imgArrayIn = readCanvas(videoPlayer,2);
	// Process chain begin    ---// Loop through the pixels, turning them in-RGB-Out
	var Faktor = parseFloat(document.getElementById("In1").value);
	DeltaGOP_Chroma12(imgArrayOut,imgArrayIn2,imgArrayIn,Faktor);   
	if(startDelta>>0){
		storeArray(imgArrayIn2,imgArrayIn);
		startDelta-=1;
	}
	// Process chain end
	writeCanvas(iImageOut);
	LogArray = ["imgArrayIn", "imgArrayOut"];
}

function storeArray(store, input){
	for(var i = 0; i < input.length; i++){
		store[i] = input[i];
	}
}

function DeltaGOP_Chroma12(iOutput,iInput2,iInput,value){
	for(var i = 0;i < iInput.length; i+=4){
		let R = iOutput[i+0] = iInput[i+0]; 
		let G = iOutput[i+1] = iInput[i+1]; 
		let B = iOutput[i+2] = iInput[i+2]; 
		let dR = Math.abs(iInput2[i+0] - iInput[i+0]);
		let dG = Math.abs(iInput2[i+1] - iInput[i+1]);
		let dB = Math.abs(iInput2[i+2] - iInput[i+2]);
		let Y = (dR + dG + dB); 
		if(dR <= value && dG <= value && dB <= value){
			iOutput[i+3] = 0;
		} else {
			iOutput[i+3] = 255;
		}
	}
}

function GRAYtoRGB(iOutput, iInput) {  
	for(let i = 0; i < iOutput.length; i += 4){
		iOutput[i] = iInput[i/4];
		iOutput[i+1] = iInput[i/4];
		iOutput[i+2] = iInput[i/4];
		iOutput[i+3] = 255;
	}
}

function RGBtoGRAY(iOutput, iInput) { 
	for(var i = 0; i < iInput.length; i += 4){
		let out = 0.3 * iInput[i] + 0.50 * iInput[i+1] + 0.11 * iInput[i+2];
		iOutput[i/4] = out;
	}
}

function cutFirstLine(iOutput, iInput) {  
	for(var i = cw; i < iInput.length-cw; i+=1) {
		iOutput[i-cw] = iInput[i] ;
	}
}

function setSobel(iOutput,iInput, value){
	var k = -1; 
	var l = -2;
	var m =	 1; 
	var n =  2; 

	/* 	-1 -2 -1 
		 0  0  0 gefaltet "data" + "127"
		 1  2  1 
	*/
	
	for(var i = cw+1; i < iInput.length-(cw-1); i+=1){
		iOutput[i] = Math.abs // vertikal
		( k * iInput[i-cw-1] + l * iInput[i-cw] + k * iInput[i-cw+1]
		+ m * iInput[i+cw-1] + n * iInput[i+cw] + m * iInput[i+cw+1])
		iOutput[i]  +=  Math.abs    //Horizontal
		( k * iInput[i-cw-1] + m * iInput[i-cw+1]
		+ l * iInput[i-1] + n * iInput[i+1]
		+ k * iInput[i+cw-1] + m * iInput[i+cw+1]);
		if(iOutput[i] <= value){
			iOutput[i] = 0;
		}
	}
}

function processingVideo48() { 
	// Sobel & Schwellwert
	var Schwellwert = parseFloat(document.getElementById("In1").value);
	imgArrayIn = readCanvas(videoPlayer,2);

	// process chain start
	RGBtoGRAY(BridnessSamples, imgArrayIn);
	setSobel(SobelSamples, BridnessSamples, Schwellwert);  
	cutFirstLine(secondLineBridnessSamples, BridnessSamples);
	cutFirstLine(secondLineSobelSamples, SobelSamples);
	GRAYtoRGB(imgArrayOut, secondLineSobelSamples);
	// process chain end 

	writeCanvas(iImageOut);
	LogArray = ["imgArrayIn", "imgArrayOut"];
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

function processingAudio41(event) {
	let sampleRate = event.sampleRate;
	var startFrequency = parseFloat(document.getElementById("In1").value);
	var endFrequency = 48000;
	// Process chain begin    
	//genSinus(monoSamples, startFrequency, sampleRate, 1, startFrequency, endFrequency);
	genSinus(monoSamples, startFrequency, endFrequency, sampleRate, 1);
	// Process chain end
	writeWebAudio(event, monoSamples);
	LogArray = ["monoSamples"];  // Define Logging name of array object.
}

var count = 0;

function genSinus(iOutput, start, end, sampleRate, iOffset) {
	var maxAmpl = 1;
	let iOffAmpl = iOffset - 1;

	for (i = 0; i < iOutput.length; ++i) {
		var at = maxAmpl * Math.sin(2 * Math.PI * (count + start) / sampleRate * i + iOffAmpl)
		iOutput[i] = at;
	}

	if (count <= end - start) {
		count += 5;
	} else {
		count = 0;
	}
}

function processingAudio42(event) {
	audArrayIn = readWebAudio(event);
	let value = parseFloat(document.getElementById("In1").value);

	/*********************
	 *Mono Output Working *
	 *********************/
	//audioPan(monoSamples, audArrayIn, value);
	//writeWebAudio(event.outputBuffer, monoSamples);
	//LogArray = ["monoSamples", "audArrayIn.l", "audArrayIn.r"];
	/**********************
	 * Stereo Output
	 * *******************/

	StereoToMono(monoSamples, audArrayIn);
	value = value / 100;
	audioPan(audArray2, monoSamples, value);
	writeWebAudioObject(event.outputBuffer, audArray2);
	//writeWebAudio(event.outputBuffer, audArray2.r);
	LogArray = ["monoSamples", "audArray2.l", "audArray2.r"];

}

function audioPan(iOutput, iInput, iValueR) {
	let vl = 1 - iValueR;
	let vr = iValueR;
	//let vl = (100 - iValueR);
	//let vr = iValueR;

	//Mono Output
	//for (let i = 0; i < iOutput.length; i++) {
	//iOutput[i] = parseFloat(iInput.l[i]) * vl + parseFloat(iInput.r[i]) * vr; // writing to Monooutput
	//}
	//Stereo Output
	for (let i = 0; i < iInput.length; i++) {
		iOutput.r[i] = iInput[i] * vr;
		iOutput.l[i] = iInput[i] * vl;

	}

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

function genSinus2(iOutput, freq, sampleRate, iOffset) {
	var maxAmpl = 1;
	let iOffAmpl = iOffset - 1;

	for (i = 0; i < iOutput.length; ++i) {
		var at = maxAmpl * Math.sin(2 * Math.PI * freq / sampleRate * i + iOffAmpl)
		iOutput[i] = at;
	}
}

//Measurement
function processingAudio44() {
	audArrayIn = readWebAudio(event);
	let sampleRate = 1024

	//initCanvas();
	//audioMeasurementHisto(monoSamples, audArrayIn);
	//StereoToMono(monoSamples, audArrayIn);
	genSinus2(monoSamples, 40000, sampleRate, 1)


	processCanvas(monoSamples, peak(monoSamples));

	writeWebAudio(event.outputBuffer, monoSamples);

	//writeWebAudio(event, monoSamples);
	LogArray = ["monoSamples", "audArrayIn.l", "audArrayIn.r"];

}

function processCanvas(iInput, iAmplitude) {
	let measureAmplAudio = new Object();
	measureAmplAudio.min = -96;
	measureAmplAudio.max = 0;
	measureAmplAudio.low = -23;
	measureAmplAudio.high = -9;
	measureAmplAudio.optimum = -90;

	//let iAmplitude = peak(iInput);
	let measPegel = pegelDB(iInput);
	//document.body.appendChild(measureAmplAudio);
	context.font = "12px Arial";
	measResult = 0.0;
	var ctx = canvas.getContext("2d");
	canvas.width = 500;
	canvas.height = 300;
	ctx.moveTo(0, 0);
	ctx.fillStyle = "#FF0000";

	let lOffset = 100;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillText("Meas.Audio Peak dBFs: " + iAmplitude, 10, 30);
	ctx.fillRect(0, 40, lOffset + iAmplitude, 20);
	//Grid
	ctx.fillText("|0", lOffset, 70)
	ctx.fillText("|-70", lOffset - 70, 70);
	ctx.fillText("|-50", lOffset - 50, 70);
	ctx.fillText("|-30", lOffset - 30, 70);

	ctx.fillText("Meas. Pegel dbFs: " + measPegel, 10, 90);
	ctx.fillRect(0, 100, lOffset + measPegel, 20);
	measureAmplAudio.value = measPegel.toFixed(2);

	//Grid
	ctx.fillText("|0", lOffset, 130)
	ctx.fillText("|-70", lOffset - 70, 130);
	ctx.fillText("|-50", lOffset - 50, 130);
	ctx.fillText("|-30", lOffset - 30, 130);
	ctx.stroke();

}

function initMeasureAudio() {

}

function pegelDB(iInput) {
	let measPegel = 0.000000000000001;

	for (let i = 0; i < iInput.length; i++) {
		measPegel += db(Math.abs(iInput[i]));
	}
	measPegel = (measPegel / iInput.length);
	return measPegel;

}
function peak(iInput) {
	let measResult = 0.000000000000001;

	for (let i = 0; i < iInput.length; i++) {
		if (measResult < iInput[i]) {
			measResult = Math.abs(iInput[i]);
		}

	}
	let iAmplitude = db(measResult);
	return iAmplitude;
}

function processingAudio45() {  
}


////////////////
//Kompression von Nicholas//
//////////////
function processingAudio46(event) {

	let thresholdDB = parseFloat(document.getElementById("In1").value);
	let compressionFactor = parseFloat(document.getElementById("In2").value);
	let volume = pegel(parseFloat(document.getElementById("In3").value));
	let threshold = pegel(thresholdDB);
	let compression = 1 / (compressionFactor);

	//audArrayIn = readWebAudio(event);
	// Process chain begin
	//StereoToMono(monoSamples, audArrayIn);
	genSinus2(monoSamples, 400, sampleRate, 1)
	AudioKompressor(monoSamples, DelaySamples, threshold, compression);
	//setAmplitude(ScaleSamplesP, VolumenSamples, volume);
	// Process chain end
	//writeWebAudio(event, monoSamples);
	writeWebAudio(event, DelaySamples);
	LogArray = ["monoSamples", "DelaySamples"];  // Define Logging name of array object.

}

function AudioKompressor(inSamples, outSamples, threshold, compression) {
	for (let i = 0; i < inSamples.length; i++) {
		let ival = Math.abs(inSamples[i]);
		if (ival > threshold) {
			outSamples[i] = threshold;
			outSamples[i] += (ival - threshold) * compression;
			if (inSamples[i] < 0) outSamples[i] *= -1;

		} else {
			outSamples[i] = inSamples[i];
		}
	}
}


///////////////////////
///Enhancer/Exciter von Nicholas///
/////////////////////

function processingAudio47(event) {
	var level = pegel(parseFloat(document.getElementById("In1").value));
	var positiv = 1 / parseFloat(document.getElementById("In2").value);
	var negativ = 1 / parseFloat(document.getElementById("In3").value);
	var volume = pegel(parseFloat(document.getElementById("In4").value));

	genSinus2(monoSamples, 400, sampleRate, 1)
	setEnhancer(DelaySamples, monoSamples, level, positiv, negativ);

	writeWebAudio(event, DelaySamples);
	LogArray = ["monoSamples", "DelaySamples"];  // Define Logging name of array object.
}

function setEnhancer(iOutput, iInput, iLevel, iPositiv, iNegativ) {
	for (let i = 0; i < iInput.length; i += 1) {
		let Dif = iInput[i] - iLevel;
		let Dif2 = iInput[i] + iLevel;
		if (iInput[i] > iLevel) iOutput[i] = iLevel + Dif * iPositiv;
		else if (iInput[i] < -iLevel) iOutput[i] = -iLevel + Dif2 * iNegativ;
		else iOutput[i] = iInput[i];
	}
}

////////////
///Delay von Nicholas///
//////////
function processingAudio48(event) {
	var directGain = pegel(parseFloat(document.getElementById("In1").value));
	var delayGain = pegel(parseFloat(document.getElementById("In2").value));
	var delayTime = parseFloat(document.getElementById("In3").value);
	var feedback = pegel(parseFloat(document.getElementById("In4").value));
	audArrayIn = readWebAudio(event);
	//let sampleRate = event.sampleRate;
	// Process chain begin

	StereoToMono(monoSamples, audArrayIn);
	setDelayFeedback(OutSamples, DelaySamples2, monoSamples, sampleRate, delayTime, feedback, directGain, delayGain)
	// Process chain end
	writeWebAudio(event.outputBuffer, OutSamples);
	LogArray = ["monoSamples", "DelaySamples2", "OutSamples"];  // Define Logging name of array object.
}

function setDelayFeedback(iOutput, iDelay, iInput, sampleRate, iDelayTime, feedbackGain, iDirectGain, iDelayGain) {
	let iDelayOffset = iOutput.length;
	let iDelaySamples = parseInt(sampleRate / (1000 / iDelayTime));
	//iDelaySamples = 7000;

	for (let i = 0; i < iInput.length; i++) {
		iDelay[i + iDelayOffset] = iInput[i];
		iDelay[i + iDelayOffset] += feedbackGain * iDelay[i + iDelayOffset - iDelaySamples];
	}

	for (let i = 0; i < iInput.length; i++) { // write DelayBuffWindow to Output
		iOutput[i] = parseFloat(iDirectGain * iInput[i]);
		iOutput[i] += parseFloat(iDelayGain * iDelay[i + iDelayOffset - iDelaySamples]);
	}

	for (let i = 0; i < iInput.length; i++) { // write DelayBuffPart2 to DelayBuffPart1
		iDelay[i] = iDelay[i + iDelayOffset];
	}

	/*for (let i = 0; i < iInput.length; i++) { // write DelayBuffPart2 to DelayBuffPart1
		iOutput[i] = iInput[i];
	}*/

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