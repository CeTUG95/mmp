/**
 * Created by Juergen Lohr on 2021.
 */

//	---------------------------------------------------------------- Video Processing  Default--------------------------------------------------------------

function writeCanvas(iInput) { 
	context.putImageData(iInput,0, 0); // Draw the ImageData object.
}

function readCanvas(iVideoPlayer, ih) {  // Player; n. Line to read
    if (iVideoPlayer.paused || iVideoPlayer.ended)        return false;
//    backcontext.drawImage(iVideoPlayer, 0, 0, cw, ch, 0, 0, cw, ch);    // First Video, draw it into the backing canvas
	backcontext.drawImage(iVideoPlayer,mouseX,mouseY,cw,ch, 0,0, cw,ch);
	iImageIn = backcontext.getImageData(0,ih,cw,ch);	// Grab the pixel data from the backing canvas
	imgArrayIn = iImageIn.data;
	return imgArrayIn;
}

function processingVideoGenArea() {
	var brightness  = parseFloat(document.getElementById("In1").value);
	// Process chain begin ------------------------------------
	genBridness(BridnessSamples,brightness);         
	GRAYtoRGB_v0(imgArrayOut, BridnessSamples);  
	// Process chain end  ------------------------------------
	writeCanvas(iImageOut);
		
	LogArray = ["BridnessSamples", "imgArrayOut"];  // Define Logging name of array object.
}

function genBridness(iOutput, iBrightness) {
	for (var i = 0, n = iOutput.length; i < n; i += 1) {
		iOutput[i] = iBrightness ;     // the gray channel
	}
}

function GRAYtoRGB_v0(iOutput, iInput) {  // L�sung 2.1a
	var r,g,b;
	for(var i = 0; i < iInput.length; i+=1) {
	    r = iInput[i];
	    g = iInput[i];
	    b = iInput[i];
		iOutput[i*4+0] = r;
		iOutput[i*4+1] = 0;
		iOutput[i*4+2] = 0;
		iOutput[i*4+3] = 255;
	}
}

function processingVideoChannel() {
	var selectedChannelRGB = (document.getElementById("In1").value);
	
	imgArrayIn = readCanvas(videoPlayer,0); 
	// Process chain begin    
	RGBtoGRAY_v0(BridnessSamples, imgArrayIn, selectedChannelRGB );  
	GRAYtoRGB_v0(imgArrayOut, BridnessSamples);   
	// Process chain end
	writeCanvas(iImageOut);
	
	LogArray = ["imgArrayIn", "BridnessSamples",  "imgArrayOut"];
}


function RGBtoGRAY_v0(iOutput, iInput, iSelectedChannelRGB) {  // L�sung 1.2
	var r,g,b,gray ;
	for(var i = 0; i < iOutput.length; i+=1) {
		r = iInput[i*4+0];
		g = iInput[i*4+1];
		b = iInput[i*4+2];
		switch(iSelectedChannelRGB){ 
			case "r": 		y = r;             break;	
			case "g": 		y = g;             break;	
			case "b": 		y = b;             break;	
			default: 		y = r;     
			}		
			iOutput[i]   = runde(y,0);
		}
}


			//	---------------------------------------------------------------- Video -L�sung �1---------------------------------------------------------------
	

function processingVideoGenColourArea() {
	var R  = parseFloat(document.getElementById("In1").value);
	var G  = parseFloat(document.getElementById("In2").value);
	var B  = parseFloat(document.getElementById("In3").value);
	// Process chain begin ------------------------------------
	genColourArea(imgArrayOut,R,G,B);           
	// Process chain end  ------------------------------------
	writeCanvas(iImageOut);
		
	LogArray = ["imgArrayOut"];  // Define Logging name of array object.
}
function genColourArea(iOutput, iR,iG,iB) {
}
function processingVideoGray() {
	imgArrayIn = readCanvas(videoPlayer,0);
	// Process chain begin    ---// Loop through the pixels, turning them in-RGB-Out
	RGBtoGRAY(BridnessSamples, imgArrayIn);  
	GRAYtoRGB(imgArrayOut, BridnessSamples);   
	// Process chain end
	writeCanvas(iImageOut);
	
	LogArray = ["imgArrayIn", "BridnessSamples",  "imgArrayOut"];
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
function processingVideoPerceptionTransparency() { 
	var	clip1StartTime  = 15000;
	var	clip1DurationTime  = 6000;
	var	clip1Transperency  =  parseFloat(document.getElementById("In1").value);
	
	imgArrayIn = readCanvas(videoPlayer,1);
	// Process chain begin    ---// Loop through the pixels, turning them in-RGB-Out

	setClipTransperency12(videoPlayer, imgArrayOut,imgArrayIn, clip1Transperency,  clip1StartTime, clip1DurationTime) ;
	// Process chain end
	writeCanvas(iImageOut);
	
	LogArray = ["imgArrayIn",  "imgArrayOut"];
}

function setClipTransperency12(iPlayer,iOutput,iInput, iClip1Transperency, iClip1StartTime, iInput1DurationTime1) { 
iCurrentTime=iPlayer.currentTime;
iInput1DurationTime1 +=iClip1StartTime;
iClip1StartTime /=1000;
iInput1DurationTime1 /=1000;
		
}

function processingVideoPerceptionTime() { 
	var	clip1StartTime  = 15000;
	var	clip1DurationTime  = 2000;
	var	clip2DurationTime  =  parseFloat(document.getElementById("In1").value);
	var	clip1DurationTime2  = 2000;
		
	imgArrayIn = readCanvas(videoPlayer,1);
	// Process chain begin    ---// Loop through the pixels, turning them in-RGB-Out

	setClipCut121(videoPlayer,imgArrayOut,imgArrayIn, clip1StartTime, clip1DurationTime,clip2DurationTime,clip1DurationTime2) ;
	// Process chain end
	writeCanvas(iImageOut);
	
	LogArray = ["imgArrayIn",  "imgArrayOut"];
}


function setClipCut121(iPlayer,iOutput, iInput, iClip1StartTime, iInput1DurationTime1,iInput2DurationTime1, iInput1DurationTime2) { 
iCurrentTime=iPlayer.currentTime;
iInput1DurationTime1 +=iClip1StartTime;
iInput2DurationTime1 +=iInput1DurationTime1 ;
iInput1DurationTime2 +=iInput2DurationTime1 ;
iClip1StartTime /=1000;
iInput1DurationTime1 /=1000;
iInput2DurationTime1 /=1000;
iInput1DurationTime2 /=1000;
if ((iCurrentTime > iInput1DurationTime2) || (iCurrentTime < iClip1StartTime)) iPlayer.currentTime =iClip1StartTime;	
 

}
//	--------------------------------------------------------------- Audio Processing  Default--------------------------------------------------------------

function readWebAudio(iInput) { 
	 audArrayIn.l  = iInput.inputBuffer.getChannelData(channelIn-2); // Stereo: 0 = left channel, 1 = right channel 
	 audArrayIn.r  = iInput.inputBuffer.getChannelData(channelIn-1);
	 return audArrayIn;
}
function writeWebAudio(iOutput,iInput) { 
      sampleOut = iOutput.getChannelData(0); 
	  for(i = 0; i < sampleOut.length; i++) {
        sampleOut[i] = iInput[i] 
      } 
}

function writeWebAudioObject(iOutput, iInput) {
	sampleOutL = iOutput.getChannelData(0);
	sampleOutR = iOutput.getChannelData(1);
	for (i = 0; i < iInput.l.length; i++) {
		sampleOutL[i] = iInput.l[i];
		sampleOutR[i] = iInput.r[i];

	}
}

function processingAudioGenNoise(event) {  
	var value = parseFloat(document.getElementById("In1").value);
	// Process chain begin    
	genNoise(monoSamples, value) ;  	
	// Process chain end
    writeWebAudio(event,monoSamples);
	LogArray = ["monoSamples"];  // Define Logging name of array object.
} 
  
function genNoise(iOutput, iValue) { 
 	for (i = 0; i < iOutput.length; ++i) {
		iOutput[i] = (Math.random() * iValue) -1;   
	}
}

function processingAudioChannel(event) {  
	var value = (document.getElementById("In1").value);
    audArrayIn = readWebAudio(event);
	// Process chain begin    
	StereoSelectOneChannel(monoSamples, audArrayIn, value);
	// Process chain end
    writeWebAudio(event.outputBuffer,monoSamples);
	
	LogArray = ["monoSamples"];  
}



function StereoSelectOneChannel(iOutput,iInput, iChannelLR) {
var iChannel	
	switch(iChannelLR){ 
		case "r": 		iChannel = iInput.r;           break;	
		case "l": 		iChannel = iInput.l;           break;	
		default: 		iChannel = iInput.l;    
	}
	for(i = 0; i < event.inputBuffer.length; i++) {
	iOutput[i] = iChannel[i];  
	}	
}
	//	---------------------------------------------------------------- Audio -L�sung �1--------------------------------------------------------------

function processingAudioGenSinus(event) {  
	var freq = parseFloat(document.getElementById("In1").value);
	// Process chain begin    
	genSinus(monoSamples,freq,sampleRate,1) ;  	

	// Process chain end
    writeWebAudio(event,monoSamples);
	
	LogArray = ["monoSamples"];  
} 

function genSinus(iOutput, iHorizontalFrequency, iSampleRate, iOffset) {
}

function processingAudioMono(event) {  
    audArrayIn = readWebAudio(event);
	// Process chain begin    
	StereoToMono(monoSamples, audArrayIn);
	// Process chain end
    writeWebAudio(event.outputBuffer,monoSamples);
	
	LogArray = ["monoSamples"];  
}  
function StereoToMono(iOutput, iInput) { 
 }


function processingAudioPerceptionMixingLevel(event) { 
 	var	clip1StartTime  = 15000;
	var	clip1DurationTime  = 6000;
	var clip1Mixing = parseFloat(document.getElementById("In1").value);
//	genNoise(VolumenSamples, 1) ;  
//	genSinus(VolumenSamples,1000,bufferSize,1) ; 
    audArrayIn = readWebAudio(event);
	// Process chain begin   
	StereoSelectOneChannel(monoSamples, audArrayIn, "l");
	StereoSelectOneChannel(VolumenSamples, audArrayIn, "r");
	setClipAudio12(audioPlayer,OutSamples,monoSamples, VolumenSamples, clip1Mixing, clip1StartTime, clip1DurationTime) ;
	// Process chain end
    writeWebAudio(event.outputBuffer,OutSamples);
	
	LogArray = ["VolumenSamples","audArrayIn","monoSamples","OutSamples"]; 
	
}

function setClipAudio12(iPlayer,iOutput,iInput, iInput2, iClip1Mixing, iClip1StartTime, iInput1DurationTime1) { 
iCurrentTime=iPlayer.currentTime;
iInput1DurationTime1 +=iClip1StartTime;
iClip1StartTime /=1000;
iInput1DurationTime1 /=1000;

if ((iCurrentTime > iInput1DurationTime1) || (iCurrentTime < iClip1StartTime)) iPlayer.currentTime =iClip1StartTime;	

		
}

function processingAudioPerceptionTime(event) {  
	var	clip1StartTime  = 10000;
	var	clip1DurationTime  = 2000;
	var	clip2DurationTime  =  parseFloat(document.getElementById("In1").value);
	var	clip1DurationTime2  = 2000;
//	genNoise(VolumenSamples, 1) ;  
//	genSinus(VolumenSamples,1000,bufferSize,1) ; 
    audArrayIn = readWebAudio(event);
	// Process chain begin   
	StereoSelectOneChannel(monoSamples, audArrayIn, "l");
	StereoSelectOneChannel(VolumenSamples, audArrayIn, "r");
	setClipAudioCut121(audioPlayer,OutSamples,monoSamples, VolumenSamples, clip1StartTime, clip1DurationTime,clip2DurationTime,clip1DurationTime2) ;	// Process chain end

	// Process chain end
    writeWebAudio(event.outputBuffer,OutSamples);
	
	LogArray = ["VolumenSamples","audArrayIn","monoSamples","OutSamples"]; 	
}



function setClipAudioCut121(iPlayer,iOutput, iInput, iInput2, iClip1StartTime, iInput1DurationTime1,iInput2DurationTime1, iInput1DurationTime2) { 
iCurrentTime=iPlayer.currentTime;
iInput1DurationTime1 +=iClip1StartTime;
iInput2DurationTime1 +=iInput1DurationTime1 ;
iInput1DurationTime2 +=iInput2DurationTime1 ;
iClip1StartTime /=1000;
iInput1DurationTime1 /=1000;
iInput2DurationTime1 /=1000;
iInput1DurationTime2 /=1000;
if ((iCurrentTime > iInput1DurationTime2) || (iCurrentTime < iClip1StartTime)) iPlayer.currentTime =iClip1StartTime;	
 
			
}
