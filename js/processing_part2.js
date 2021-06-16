/**
 * Created by Juergen Lohr on 2021. git
 */
 
function cutFirstLine(iOutput, iInput) {  
	for(var i = cw; i < iInput.length-cw; i+=1) {
		iOutput[i-cw] = iInput[i] ;
	}
}

	//	---------------------------------------------------------------- Video -L�sung �2--------------------------------------------------------------


function processingVideoGenCosinus() {
	var	horizontalFrequency  = parseFloat(document.getElementById("In1").value);
	// Process chain begin   
	
	genCosinus(BridnessSamples, horizontalFrequency,cw,128);
	GRAYtoRGB(imgArrayOut, BridnessSamples);   // L�sung 1.1a
	// Process chain end  
	writeCanvas(iImageOut);
		
	LogArray = ["BridnessSamples", "imgArrayOut"];  // Define Logging name of array object.
}

function genCosinus(iOutput, iHorizontalFrequency, iSampleRate, iOffset) {
						
															  
													 
														  
   
}

function processingVideoBridnessContrast() {
var contrast =pegel( parseFloat(document.getElementById("In1").value));
	imgArrayIn = readCanvas(videoPlayer,0);
	// Process chain begin    
	RGBtoGRAY(BridnessSamples, imgArrayIn);   
	setAmplitude(ContrastSamples, BridnessSamples, contrast);   
	GRAYtoRGB(imgArrayOut, ContrastSamples);  
	// Process chain end
	writeCanvas(iImageOut);
	
	LogArray = ["imgArrayIn", "BridnessSamples", "ContrastSamples", "imgArrayOut"];
}

function  pegel(wert) {	   // Pegel berechnung dbFS
	return Math.pow(10,wert/20);
	//return  1; 
}	

function  db(wert) {	 
	return 20*Math.log10(wert+0.0000001);
	//return 1; 
}

function setAmplitude(iOutput, iInput, iAplitude) {  
	for(let i=0;i<iInput.length;i++){
		if(iAplitude > 0){
			iOutput[i] = iAplitude * iInput[i];
		}
		if(iAplitude < 0){
			iOutput[i] = iAplitude / iInput[i];
		}
		if(iAplitude == 0){
			iOutput[i] = 1 * iInput[i];
		}
	}
}

function processingVideoChromaKeying() {
	imgArrayIn = readCanvas(videoPlayer,2);
	// Process chain begin    ---// Loop through the pixels, turning them in-RGB-Out
	var R = parseFloat(document.getElementById("In1").value);
	var G = parseFloat(document.getElementById("In2").value);
	var B = parseFloat(document.getElementById("In3").value);
	setChromaKeying(imgArrayOut, imgArrayIn, R,G,B);   	
	// Process chain end
	writeCanvas(iImageOut);
	
	LogArray = ["imgArrayIn", "imgArrayOut"];
}

function setChromaKeying(iOutput, iInput, iR, iG, iB) {  
	let tolerance = 40;
	for (let i = 0; i < iInput.length; i += 4) {
		if (iInput[i] > iR + tolerance || iInput[i] < iR - tolerance) {
			iOutput[i] = iInput[i];
			iOutput[i + 1] = iInput[i + 1];
			iOutput[i + 2] = iInput[i + 2];
			iOutput[i + 3] = 255;
		}
		else if (iInput[i + 1] > iG + tolerance || iInput[i + 1] < iG - tolerance) {
			iOutput[i] = iInput[i];
			iOutput[i + 1] = iInput[i + 1];
			iOutput[i + 2] = iInput[i + 2];
			iOutput[i + 3] = 255;
		}
		else if (iInput[i + 2] > iB + tolerance || iInput[i + 2] < iB - tolerance) {
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

function processingVideoTP10_cos64() { 
	var	horizontalFrequency  = parseFloat(document.getElementById("In1").value);
	// Process chain begin   
	
	genCosinus(BridnessSamples, horizontalFrequency,cw,128);	
	setTP1O1D(TPsamples, BridnessSamples);  
	GRAYtoRGB(imgArrayOut, TPsamples);   
	// Process chain end
	writeCanvas(iImageOut);
	
	LogArray = [ "BridnessSamples", "TPsamples", "imgArrayOut"];
}
function processingVideoTP10() { 
	imgArrayIn = readCanvas(videoPlayer,0);
	// Process chain begin    ---// Loop through the pixels, turning them in-RGB-Out

	RGBtoGRAY(BridnessSamples, imgArrayIn); 
	
	setTP1O1D(TPsamples, BridnessSamples);  	
	GRAYtoRGB(imgArrayOut, TPsamples);   
	// Process chain end
	writeCanvas(iImageOut);
	
	LogArray = ["imgArrayIn", "BridnessSamples", "TPsamples", "imgArrayOut"];
}

function setTP1O1D(iOutput, iInput) {
	//calc average
	let avg = (iInput[i] + iInput[i] + iInput[i] + iInput[i]) / 4;
	iOutput[i] = avg / 4;
}

function processingVideoTP20() { 
	imgArrayIn = readCanvas(videoPlayer,2);
	// Process chain begin    ---// Loop through the pixels, turning them in-RGB-Out

	RGBtoGRAY(BridnessSamples, imgArrayIn);   
	setTP2O2D(TPsamples, BridnessSamples);   

	cutFirstLine(secondLineBridnessSamples, BridnessSamples);
	cutFirstLine(secondLineTPsamples, TPsamples);
	GRAYtoRGB(imgArrayOut, secondLineTPsamples);  

	// Process chain end
	writeCanvas(iImageOut);
	
	LogArray = ["imgArrayIn", "BridnessSamples", "TPsamples", "secondLineBridnessSamples", "secondLineTPsamples", "imgArrayOut"];
}

function setTP2O2D(iOutput, iInput) {  

	var lshift = cw - 1;
	var rshift = cw + 1;
	var start = iInput;
	var ende = iInput.length - lshift -1;

	for(let i = rshift; i < ende; i++){

		var left = iInput[i-1];
		var right = iInput[i+1];
		var middle = iInput[i];

		var upleft = iInput[i - cw -1 ];
		var up = iInput[i - cw];
		var upright = iInput[i - cw +1];

		var downleft = iInput[i + cw -1];
		var down = iInput[i + cw];
		var downright = iInput[i + cw +1];

		var median = (middle + right + left + up + upleft + upright + down + downleft + downright)/9;
		
		iOutput[i] = median;

		//iOutput[i] = iInput[i];
	}					
}

function processingVideoHP10() { 
	imgArrayIn = readCanvas(videoPlayer,0);
	// Process chain begin    ---// Loop through the pixels, turning them in-RGB-Out

	RGBtoGRAY(BridnessSamples, imgArrayIn);   
	setHP1O1D(HPsamples, BridnessSamples);    
	GRAYtoRGB(imgArrayOut, HPsamples);   
	// Process chain end
	writeCanvas(iImageOut);
	
	LogArray = ["imgArrayIn", "BridnessSamples", "HPsamples", "imgArrayOut"];
}
function processingVideoHP10_cos64() { 
	var	horizontalFrequency  = parseFloat(document.getElementById("In1").value);
	// Process chain begin   
	
	genCosinus(BridnessSamples, horizontalFrequency,cw,128);  
	setHP1O1D(HPsamples, BridnessSamples);   	 
	GRAYtoRGB(imgArrayOut, HPsamples);   
	// Process chain end
	writeCanvas(iImageOut);
	
	LogArray = [ "BridnessSamples", "HPsamples", "imgArrayOut"];
}

function setHP1O1D(iOutput, iInput) {  
						   
				 
											 
									
															 
   
}

function processingVideoHP10visuell() { 
	imgArrayIn = readCanvas(videoPlayer,0);
	// Process chain begin    ---// Loop through the pixels, turning them in-RGB-Out

	RGBtoGRAY(BridnessSamples, imgArrayIn);   
	setHP1Ovisuell(HPsamples, BridnessSamples);    
	GRAYtoRGB(imgArrayOut, HPsamples);   
	// Process chain end
	writeCanvas(iImageOut);
	
	LogArray = ["imgArrayIn", "BridnessSamples", "HPsamples", "imgArrayOut"];
}
function setHP1Ovisuell(iOutput, iInput) {  
						   
				 
											 
									
															 
				   
   
}

function processingVideoHP20() { 
	imgArrayIn = readCanvas(videoPlayer,2);
	// Process chain begin    ---// Loop through the pixels, turning them in-RGB-Out

	RGBtoGRAY(BridnessSamples, imgArrayIn);   
	setHP2O2D(HPsamples, BridnessSamples);   

	cutFirstLine(secondLineBridnessSamples, BridnessSamples);
	cutFirstLine(secondLineHPsamples, HPsamples);
	GRAYtoRGB(imgArrayOut, secondLineHPsamples);	
	// Process chain end
	writeCanvas(iImageOut);
	
	LogArray = ["imgArrayIn", "BridnessSamples", "HPsamples",  "secondLineBridnessSamples","secondLineHPsamples", "imgArrayOut"];
}
function setHP2O2D(iOutput, iInput) {  
			
			
						   

				 
			  
			  
			  

										  
																			
																  
																	   
					
   
}

function processingVideoSobel() { 
	imgArrayIn = readCanvas(videoPlayer,2);
	// Process chain begin    ---// Loop through the pixels, turning them in-RGB-Out
	RGBtoGRAY(BridnessSamples, imgArrayIn);   
	setSoebel(SoebelSamples, BridnessSamples);  

	cutFirstLine(secondLineBridnessSamples, BridnessSamples);	
	cutFirstLine(secondLineSoebelSamples, SoebelSamples);	
	GRAYtoRGB(imgArrayOut, secondLineSoebelSamples);   
	// Process chain end
	writeCanvas(iImageOut);
	
	LogArray = ["imgArrayIn", "BridnessSamples", "SoebelSamples","secondLineBridnessSamples","secondLineSoebelSamples", "imgArrayOut"];
}

function setSoebel(iOutput, iInput) { 
			
			
		   
		   
								 
																   
											 
													   
									  
																			  
																		   
							  
				   
													  
													  
															   
		
	   
}

	//	---------------------------------------------------------------- Audio -L�sung �2--------------------------------------------------------------


function processingAudioKlang(event) {  
	var freq = parseFloat(document.getElementById("In1").value);
	// Process chain begin    
	genKlang(monoSamples,freq,sampleRate,1) ;  	

	// Process chain end
    writeWebAudio(event,monoSamples);
	
	LogArray = ["monoSamples"];  
}
function genKlang(iOutput, iHorizontalFrequency, iSampleRate, iOffset) {
						
		   
			
			
											   
												
															  
																
																
													 
										   
											
											
   
}

function processingAudioVolumen(event) {  
	var volume = pegel(parseFloat(document.getElementById("In1").value));    
    audArrayIn = readWebAudio(event);
	// Process chain begin    
	StereoToMono(monoSamples, audArrayIn);
	setAmplitude(VolumenSamples, monoSamples, volume);	
	// Process chain end
    writeWebAudio(event.outputBuffer,VolumenSamples);
	
	LogArray = ["monoSamples","VolumenSamples"];  
}
function setAmplitude2(iOutput, iInput, iAplitude) {  
										  
																	  
														  
												   
													   
  
}

function processingAudioDelay(event) {  
	var directGain = pegel(parseFloat(document.getElementById("In1").value));
	var delayGain = pegel(parseFloat(document.getElementById("In2").value));
	var delayTime = parseFloat(document.getElementById("In3").value);

    audArrayIn = readWebAudio(event);
	// Process chain begin   
	StereoToMono(monoSamples, audArrayIn);	
	setDelayTime(OutSamples, DelaySamples2, monoSamples, directGain, delayGain, delayTime);

	// Process chain end
    writeWebAudio(event.outputBuffer,OutSamples);
	
	LogArray = ["monoSamples","DelaySamples2","OutSamples"]; 
}
function processingAudioDelay16K(event) {  
	var delayGain = pegel(parseFloat(document.getElementById("In1").value));
    audArrayIn = readWebAudio(event);
	// Process chain begin   
	StereoToMono(monoSamples, audArrayIn);	
	setDelaySample(VolumenSamples, DelaySamples2, monoSamples, delayGain);
	// Process chain end
    writeWebAudio(event.outputBuffer,VolumenSamples);
	
	LogArray = ["monoSamples","VolumenSamples"]; 
}

function setDelaySample(iOutput, iDelay, iInput, iGain) {  
										  
													
						  
	   
}

function processingAudioGenDelay(event) {  
	var directGain = pegel(parseFloat(document.getElementById("In1").value));
	var delayGain = pegel(parseFloat(document.getElementById("In2").value));
	var delayTime = parseFloat(document.getElementById("In3").value);
	// Process chain begin   
	setDelayTime(OutSamples, DelaySamples2, AudioTestArray, directGain, delayGain, delayTime);


	// Process chain end
	
    writeWebAudio(event,OutSamples);
	
	LogArray = ["AudioTestArray","DelaySamples2","OutSamples"]; 
}

function setDelayTime(iOutput, iDelay, iInput, iDirectGain, iDelayGain, iDelayTime) {  
								
															 
																				
									  

   
																			   
										  
																	  
	 
 
					 
																					  
										 
							
	 
}

function processingAudioTP1O(event) {
	var value = parseFloat(document.getElementById("In1").value);
	genNoise(monoSamples, value) ;  
	// Process chain begin    
	setTP1O1D(VolumenSamples, monoSamples)
	// Process chain end
    writeWebAudio(event,VolumenSamples);
	
	LogArray = ["monoSamples","VolumenSamples"]; 	
}
function processingAudioHP1O(event) {  
	var value = parseFloat(document.getElementById("In1").value);
	genNoise(monoSamples, value) ;  
	// Process chain begin 
	setHP1O1D(VolumenSamples, monoSamples)
	// Process chain end
    writeWebAudio(event,VolumenSamples);
	
	LogArray = ["monoSamples","VolumenSamples"]; 	
}
function processingAudioTP2O1D(event) {  
	var value = parseFloat(document.getElementById("In1").value);
	genNoise(monoSamples, value) ;  
	// Process chain begin 
	setTP2O1D(VolumenSamples, monoSamples)
	// Process chain end
    writeWebAudio(event,VolumenSamples);
	
	LogArray = ["monoSamples","VolumenSamples"]; 	
}

function setTP2O1D(iOutput, iInput) {  
	//ToDo
	for (let i = 1; i < iInput.length-1; i+=2) {
		iOutput[i] = (iInput[i - 1] + iInput[i + 1]) / 2;
	}					  
}

function processingAudioHP2O1D(event) {  
	var value = parseFloat(document.getElementById("In1").value);
	genNoise(monoSamples, value) ;  
	// Process chain begin 
	setHP2O1D(VolumenSamples, monoSamples)
	// Process chain end
    writeWebAudio(event,VolumenSamples);
	
	LogArray = ["monoSamples","VolumenSamples"]; 	
}


function setHP2O1D(iOutput, iInput) {  

							  
											
																									 
	   
}

function processingAudioBP2O1D(event) {  
	var value = parseFloat(document.getElementById("In1").value);
	genNoise(monoSamples, value) ;  
	// Process chain begin 
	setBP2O1D(VolumenSamples, monoSamples)
	// Process chain end
    writeWebAudio(event,VolumenSamples);
	
	LogArray = ["monoSamples","VolumenSamples"]; 	
}

function setBP2O1D(iOutput, iInput) {  
						 
						   
									
																	  
											
																									 
	   
}

function processingAudioBS2O1D(event) {  
	var value = parseFloat(document.getElementById("In1").value);
	genNoise(monoSamples, value) ;  
	// Process chain begin 
	setBS2O1D(VolumenSamples, monoSamples)
	// Process chain end
    writeWebAudio(event,VolumenSamples);
	
	LogArray = ["monoSamples","VolumenSamples"]; 	
}

function setBS2O1D(iOutput, iInput) {  
						 
						   
											
																									 
	   
}





