/**
 * Created by Juergen Lohr on 2021.
 */
	
	//	---------------------------------------------------------------- Video -UE--------------------------------------------------------------

//--------------------Delta

function processingVideoGenKompDelta() {
	var quant = parseFloat(document.getElementById("In1").value);
	var Round =2;
	// Process chain begin ------------------------------------   
	RGBtoGRAY(BridnessSamples, VideoTestArray);   
	setDelta(DeltaSamples, BridnessSamples);   
	setQuant(QuantSamples, DeltaSamples, quant, Round);
	
	setIQuant(iQuantSamples, QuantSamples, quant);
	setIDelta(IDeltaSamples, iQuantSamples);   		
	// Process chain end  ------------------------------------
	writeCanvas(iImageOut);
		
	analyseError(ErrorLog,IDeltaSamples, BridnessSamples,255) 
	LogArray = ["VideoTestArray", "BridnessSamples", "DeltaSamples", "QuantSamples",  "ErrorLog"];

}
function processingVideoKompDelta() { 
	var quant = parseFloat(document.getElementById("In1").value);
	var Round =2;
	imgArrayIn = readCanvas(videoPlayer,0);
	// Process chain begin    ---// Loop through the pixels, turning them in-RGB-Out
	RGBtoGRAY(BridnessSamples, imgArrayIn);   
	setDelta(DeltaSamples, BridnessSamples);   
	setQuant(QuantSamples, DeltaSamples, quant, Round);
	
	setIQuant(iQuantSamples, QuantSamples, quant);
	setIDelta(IDeltaSamples, iQuantSamples);   		
	GRAYtoRGB(imgArrayOut, IDeltaSamples);   
	// Process chain end
	writeCanvas(iImageOut);
	
	analyseError(ErrorLog,IDeltaSamples, BridnessSamples,255); 
	analyseVideoKompressionDelta(KompressionLog, quant );
	LogArray = ["imgArrayIn", "BridnessSamples", "DeltaSamples", "QuantSamples", "iQuantSamples", "IDeltaSamples", "imgArrayOut", "ErrorLog"];
}

					
function setDelta(iOutput, iInput) {  
}
function setIDelta(iOutput, iInput) {  
}

function setQuant(iOutput, iInput, iQuant, iRound)	{
	// ich gehe das array durch und teile es damit es kleiner wird. bei Iquant wird das array multipliziert
	for(i=0; i<iInput.length;i++){
		if(i%iQuant){
			iOutput[i] = iInput[i];
		}
	}
}

function setIQuant(iOutput, iInput, iQuant)	{
}

	
function analyseError(iErrorLog, iInput2, iInput,iMaxAmplitude)  	{
     SAD =0;  
	 MSE = 0;
	 PSNR= 0;
     var Dif;
	 var iMaxAmplitude = parseFloat(iMaxAmplitude);
	
	for ( var i = 0; i < (iInput2.length); i ++ ) { 

		if(typeof iInput2[i] != 'undefined'){
		 if(! isNaN(iInput[i])&& ! isNaN(iInput2[i])){
				Dif = 1;	
				MSE = 2;
				SAD = 3;
				iErrorLog[i] = Dif;
					}
		}
	}
	MSE += 0.000000001;
	PSNR  = 4;   
	MSE  -= 0.000000001;		
		
	SAD =runde (SAD,2);
    MSE=runde (MSE,2);
	PSNR=runde (PSNR,2);
}


//--------------------Subband

function processingVideoGenKompSubband() {
	var down_fac = 2;
	var TPquant = parseFloat(document.getElementById("In1").value);
	var HPquant = parseFloat(document.getElementById("In2").value);
	var Round =1;
	// Process chain begin ------------------------------------   
	RGBtoGRAY(BridnessSamples, VideoTestArray);   
	setALength(ALengthSamples, BridnessSamples);   
	setTP1O1D(TPsamples, ALengthSamples);   
	setHP1O1D(HPsamples, ALengthSamples);  
	setDownsampling(TPdownsamples, TPsamples, down_fac);
    setDownsampling(HPdownsamples, HPsamples, down_fac);
	setQuant(TPquantsamples, TPdownsamples, TPquant, Round);
	setQuant(HPquantsamples, HPdownsamples, HPquant, Round);
	
	setIQuant(TPIquantsamples, TPquantsamples, TPquant);
	setIQuant(HPIquantsamples, HPquantsamples, HPquant);
	setUpsampling(TPupsamples, TPIquantsamples, down_fac);
    setUpsampling(HPupsamples, HPIquantsamples, down_fac);
    setTP1O1D(ATPOutsamples, TPupsamples);
    setAHP1O1D(AHPOutsamples, HPupsamples);
	setMix(MixOutSamples, ATPOutsamples, AHPOutsamples);
	setDelay(DelaySamples, MixOutSamples,1)
	setAmplitude(ScaleSamples, DelaySamples, 2);   
	GRAYtoRGB(imgArrayOut, ScaleSamples); 
	// Process chain end  ------------------------------------
	writeCanvas(iImageOut);
		
	analyseError(ErrorLog,ScaleSamples, BridnessSamples,255) 
	LogArray = ["VideoTestArray", "BridnessSamples", "ALengthSamples", "TPsamples",  "HPsamples", "TPdownsamples","HPdownsamples","TPquantsamples","HPquantsamples","TPIquantsamples","HPIquantsamples", "TPupsamples","HPupsamples","ATPOutsamples", "AHPOutsamples", "MixOutSamples","DelaySamples", "ScaleSamples", "imgArrayOut", "ErrorLog"];
}

function processingVideoKompSubband() {  
	var down_fac = 2;
	var TPquant = parseFloat(document.getElementById("In1").value);
	var HPquant = parseFloat(document.getElementById("In2").value);
	var Round =1;
	imgArrayIn = readCanvas(videoPlayer,0);
	// Process chain begin    ---// Loop through the pixels, turning them in-RGB-Out
	RGBtoGRAY(BridnessSamples, imgArrayIn);   
	setALength(ALengthSamples, BridnessSamples);   
	setTP1O1D(TPsamples, ALengthSamples);  
	setHP1O1D(HPsamples, ALengthSamples);   
	setDownsampling(TPdownsamples, TPsamples, down_fac);
    setDownsampling(HPdownsamples, HPsamples, down_fac);
	setQuant(TPquantsamples, TPdownsamples, TPquant, Round);
	setQuant(HPquantsamples, HPdownsamples, HPquant, Round);
	
	setIQuant(TPIquantsamples, TPquantsamples, TPquant);
	setIQuant(HPIquantsamples, HPquantsamples, HPquant);
	setUpsampling(TPupsamples, TPIquantsamples, down_fac);
    setUpsampling(HPupsamples, HPIquantsamples, down_fac);
    setTP1O1D(ATPOutsamples, TPupsamples);
    setAHP1O1D(AHPOutsamples, HPupsamples);
	setMix(MixOutSamples, ATPOutsamples, AHPOutsamples);
	setDelay(DelaySamples, MixOutSamples,1)
	setAmplitude(ScaleSamples, DelaySamples, 2);   
	GRAYtoRGB(imgArrayOut, ScaleSamples); 
	// Process chain end  ------------------------------------
	writeCanvas(iImageOut);
		
	analyseError(ErrorLog,ScaleSamples, BridnessSamples,255) 
	analyseVideoKompressionSubband(KompressionLog, TPquant, HPquant  );
	LogArray = [ "BridnessSamples", "ALengthSamples", "TPsamples",  "HPsamples", "TPdownsamples","HPdownsamples","TPquantsamples","HPquantsamples","TPIquantsamples","HPIquantsamples", "TPupsamples","HPupsamples","ATPOutsamples", "AHPOutsamples", "MixOutSamples","DelaySamples", "ScaleSamples", "imgArrayOut", "ErrorLog"];
}

function setALength(iOutput, iInput) {		//Downsampling
	for(var i=0; i<iInput.length;i++){
		iOutput[i] = iInput[i];
	}
	iOutput[iOutput.length-1] = 0;
}

function setDownsampling(iOutput, iInput, idown_fac) {		//Downsampling
	var k = 0;
	for(var i = 0;i<iInput.length;i+=2){
		iOutput[k] = iInput[i];
		k++;
	}
}

function setUpsampling(iOutput, iInput, idown_fac) {		//Downsampling
	// rauskommen soll von 1,3,5,7 --> 1,0,3,0,5,7,0
	for(i=0;i<iInput.length;i++){
		iOutput[i] = iInput[i];
	}
}

function setAHP1O1D(iOutput, iInput) {  
	// inverser hochpass --> unterlagen anschauen minus aktieller wert + vorgänger oder alles mal -1 vom hochpass 
}

function setMix(iOutput, iInput2, iInput1) {		//Mix
	// Die beiden eingabewerte werden zusammengesmischt also addition 
}

function setDelay(iOutput, iInput,iDelaySamples) {		//Scale und shift
	// wenn array und an position 0 bis lenght um einen wert nach vorne verschoben 
	// bei input array gehts bei 1 los bei output gehts bei 0 los 
 }

 // bei wavelet kommt hinzu --> dass wir sagen wir drehen alles und packen das alles wieder durch hochpass und gesamten subband wieder rein 


//--------------------FFT
function processingVideoGenKompFFTOneHz() {
	var TPquant = parseFloat(document.getElementById("In1").value);
	var HPquant = parseFloat(document.getElementById("In2").value);
	var splitFreq = parseFloat(document.getElementById("In3").value);
	var Round =0;
	setFreqQuantMatrix(QuantMatrix,TPquant,HPquant,splitFreq);
	// Process chain begin    ---// Loop through the pixels, turning them in-RGB-Out
		GRAYtoRGB(imgArrayIn2, oneHz); 	
    	setFFT(swepFFT,imgArrayIn2);
		FFT1.spec=swepFFT.spec.slice(0,swepFFT.spec.length);
		swapFFTfor(swepFFT)
		setQuantFFT(quantFFT,swepFFT,QuantMatrix,Round);
		
		setInvQuantFFT(iswepFFT,quantFFT,QuantMatrix);
		iquantFFT.spec=iswepFFT.spec.slice(0,iswepFFT.spec.length);
		swapFFTback(iswepFFT)				
		setIFFT(imgArrayOut, iswepFFT);	
		RGBtoGRAY(iFFTspec,imgArrayOut);  
		
	// Process chain end  ------------------------------------
	writeCanvas(iImageOut);
		
	analyseError(ErrorLog,iFFTspec, oneHz,255) 
	LogArray = ["imgArrayIn2","oneHz","FFT1.spec","swepFFT.spec","QuantMatrix", "quantFFT.spec","iquantFFT.spec","iswepFFT.spec","iFFTspec","imgArrayOut","ErrorLog"];
}

function processingVideoGenKompFFTpic() {
	var TPquant = parseFloat(document.getElementById("In1").value);
	var HPquant = parseFloat(document.getElementById("In2").value);
	var splitFreq = parseFloat(document.getElementById("In3").value);
	var Round =0;
	setFreqQuantMatrix(QuantMatrix,TPquant,HPquant,splitFreq);
	imgArrayIn = readCanvas(videoPlayer,0);
	// Process chain begin    ---// Loop through the pixels, turning them in-RGB-Out
		RGBtoGRAY( BridnessSamples,imgArrayIn); 
		GRAYtoRGB(imgArrayIn2, BridnessSamples); 	
		setFFT(swepFFT,imgArrayIn2);
		FFT1.spec=swepFFT.spec.slice(0,swepFFT.spec.length);
		swapFFTfor(swepFFT)
		setQuantFFT(quantFFT,swepFFT,QuantMatrix,Round);

		setInvQuantFFT(iswepFFT,quantFFT,QuantMatrix);
		iquantFFT.spec=iswepFFT.spec.slice(0,iswepFFT.spec.length);
		swapFFTback(iswepFFT)				
		setIFFT(imgArrayOut, iswepFFT);	
		RGBtoGRAY(iFFTspec,imgArrayOut);  
		
	// Process chain end  ------------------------------------
	writeCanvas(iImageOut);
		
	analyseError(ErrorLog,iFFTspec, BridnessSamples,255) 
	LogArray = ["imgArrayIn","BridnessSamples","FFT1.spec","QuantMatrix","swepFFT.spec","quantFFT.spec","iquantFFT.spec","iswepFFT.spec","iFFTspec","imgArrayOut","ErrorLog"];
}

function processingVideoKompFFT() { 
	var TPquant = parseFloat(document.getElementById("In1").value);
	var HPquant = parseFloat(document.getElementById("In2").value);
	var splitFreq = parseFloat(document.getElementById("In3").value);
	var Round =0;
	setFreqQuantMatrix(QuantMatrix,TPquant,HPquant,splitFreq);
	imgArrayIn = readCanvas(videoPlayer,0);
	// Process chain begin    ---// Loop through the pixels, turning them in-RGB-Out
		RGBtoGRAY( BridnessSamples,imgArrayIn); 
		GRAYtoRGB(imgArrayIn2, BridnessSamples); 	
		setFFT(swepFFT,imgArrayIn2);
		FFT1.spec=swepFFT.spec.slice(0,swepFFT.spec.length);
		swapFFTfor(swepFFT)
		setQuantFFT(quantFFT,swepFFT,QuantMatrix,Round);

		setInvQuantFFT(iswepFFT,quantFFT,QuantMatrix);
		iquantFFT.spec=iswepFFT.spec.slice(0,iswepFFT.spec.length);
		swapFFTback(iswepFFT)				
		setIFFT(imgArrayOut, iswepFFT);	
		RGBtoGRAY(iFFTspec,imgArrayOut);  
		
	// Process chain end  ------------------------------------
	writeCanvas(iImageOut);
		
	analyseError(ErrorLog,iFFTspec, BridnessSamples,255) 
	analyseVideoKompressionFFT(KompressionLog, TPquant, HPquant, splitFreq)
	LogArray = ["imgArrayIn","BridnessSamples","FFT1.spec","QuantMatrix","swepFFT.spec","quantFFT.spec","iquantFFT.spec","iswepFFT.spec","iFFTspec","imgArrayOut","ErrorLog"];
}

function setInitFFT(iDisplay_fac)	{
	FFT.init(iDisplay_fac);
	FrequencyFilter.init(iDisplay_fac); // wird gebraucht Filter.Swap
}

function setFFT(FFT_data,idata)	{
	var islog= true;
	var maxSpectrum= 1.0;
	GRAYFFT(FFT_data,idata);
    FFT.fft2d(FFT_data.real, FFT_data.imag);
	FFT.fftspectrum(FFT_data.spec, maxSpectrum, FFT_data.real, FFT_data.imag, islog);
}
function GRAYFFT(FFT_data,idata){
	var i = 0,
        val = 0,
        p = 0;
			
	for(var y=0; y<display_fac; y++) {
        i = y*display_fac;
        for(var x=0; x<display_fac; x++) {
            FFT_data.real[i + x] = idata[(i << 2) + (x << 2)];
            FFT_data.imag[i + x] = 0.0;
        }
    }
} 
function setIFFT(idata,FFT_data)	{
	var i = 0,
        val = 0,
        p = 0;
	FFT.ifft2d(FFT_data.real, FFT_data.imag);
	for(var y=0; y<display_fac; y++) {
          i = y*display_fac;
          for(var x=0; x<display_fac; x++) {
            val = FFT_data.real[i + x];
            val = val > 255 ? 255 : val < 0 ? 0 : val;
            p = (i << 2) + (x << 2);
            idata[p] = idata[p + 1] = idata[p + 2] = val;
			idata[p +3] = 255;
          }
        }
}
function swapFFTfor(iFFT)	{
	var islog= true;
	var maxSpectrum= 1.0;
	iFFT.imag[0] =0;
	FrequencyFilter.swap(iFFT.real, iFFT.imag); 
	FFT.fftspectrum(iFFT.spec, maxSpectrum, iFFT.real, iFFT.imag, islog);
}
function swapFFTback(iFFT)	{
	var islog= true;
	var maxSpectrum= 1.0;
	iFFT.imag[0] =0;
	FrequencyFilter.swap(iFFT.real, iFFT.imag); 
	FFT.fftspectrum(iFFT.spec, maxSpectrum, iFFT.real, iFFT.imag, islog);
}
			
function setFreqQuantMatrix(iQuantMatrix, TPspann, HPspann, splitFreq)	{
  var x,l,k=0;
  var sqrt = Math.sqrt;
  var iDisplay_fac=sqrt (iQuantMatrix.length) ;




        for(i=0;i<iQuantMatrix.length;++i) {

		    iQuantMatrix[i] = TPspann;

        }
   
}

function setQuantFFT(iergFFT, idataFFT, spanneMatrix, iRound)	{
	var islog= true;
	var maxSpectrum= 1.0;
	var altmaxSpectrum= idataFFT.imag[0];
	idataFFT.imag[0] =0;
	for (i=0;i<idataFFT.real.length;++i) {
             iergFFT.real[i]=idataFFT.real[i];  // Loesung??
             iergFFT.imag[i]=idataFFT.imag[i];  // Loesung??
	}
		FFT.fftspectrum(iergFFT.spec, maxSpectrum, iergFFT.real, iergFFT.imag, islog);
}

function setInvQuantFFT(iergFFT, idataFFT, spanneMatrix)	{
	var islog= true;
	var maxSpectrum= 1.0;
	var altmaxSpectrum= idataFFT.imag[0];
	idataFFT.imag[0] =0;	
	for (i=0;i<idataFFT.real.length;++i) {
			 iergFFT.real[i]=idataFFT.real[i];  // Loesung??
             iergFFT.imag[i]=idataFFT.imag[i];  // Loesung??
	}
		FFT.fftspectrum(iergFFT.spec, maxSpectrum, iergFFT.real, iergFFT.imag, islog);
}


	//	---------------------------------------------------------------- Audio -L�sung �3--------------------------------------------------------------

//--------------------Delta

function processingAudioGenKompDelta(event) {  
	var quant = parseFloat(document.getElementById("In1").value);
	var Round =6;
	// Process chain begin ------------------------------------   
	setDelta(DeltaSamplesP, AudioTestArray);   // L�sung 3.1
	setQuant(QuantSamplesP, DeltaSamplesP, quant, Round);
	
	setIQuant(iQuantSamplesP, QuantSamplesP, quant);
	setIDelta(iDeltaSamplesP, iQuantSamplesP);   // L�sung 3.1		
	// Process chain end
    writeWebAudio(event,iDeltaSamplesP);
	
	analyseError(ErrorLog,iDeltaSamplesP, AudioTestArray,2.0); 
	LogArray = ["AudioTestArray",  "DeltaSamplesP", "QuantSamplesP", "iQuantSamplesP", "iDeltaSamplesP", "ErrorLog"];
 }

function processingAudioKompDelta(event) {  
 	var quant = parseFloat(document.getElementById("In1").value);
	var Round =6;
	audArrayIn = readWebAudio(event);
	// Process chain begin    
	StereoToMono(monoSamples, audArrayIn);
	setDelta(DeltaSamplesP, monoSamples);   // L�sung 3.1
	setQuant(QuantSamplesP, DeltaSamplesP, quant, Round);
	
	setIQuant(iQuantSamplesP, QuantSamplesP, quant);
	setIDelta(iDeltaSamplesP, iQuantSamplesP);   // L�sung 3.1		
	// Process chain end
    writeWebAudio(event.outputBuffer,iDeltaSamplesP);
	
	analyseError(ErrorLogP,iDeltaSamplesP, monoSamples,2.0) ;
	analyseAudioKompressionDelta(KompressionLogP, quant );
	LogArray = ["monoSamples",  "DeltaSamplesP", "QuantSamplesP", "iQuantSamplesP", "iDeltaSamplesP", "ErrorLogP"];
}

//--------------------Subband

function processingAudioGenKompSubband(event) {  
	var down_fac = 2;
	var TPquant = parseFloat(document.getElementById("In1").value);
	var HPquant = parseFloat(document.getElementById("In2").value);
	var Round =5;
	// Process chain begin ------------------------------------   
	setALength(ALengthSamples, AudioTestArray);   
	setTP1O1D(TPsamples, ALengthSamples);   
	setHP1O1D(HPsamples, ALengthSamples);   
	setDownsampling(TPdownsamples, TPsamples, down_fac);
    setDownsampling(HPdownsamples, HPsamples, down_fac);
	setQuant(TPquantsamples, TPdownsamples, TPquant, Round);
	setQuant(HPquantsamples, HPdownsamples, HPquant, Round);
	
	setIQuant(TPIquantsamples, TPquantsamples, TPquant);
	setIQuant(HPIquantsamples, HPquantsamples, HPquant);
	setUpsampling(TPupsamples, TPIquantsamples, down_fac);
    setUpsampling(HPupsamples, HPIquantsamples, down_fac);
    setTP1O1D(ATPOutsamples, TPupsamples);
    setAHP1O1D(AHPOutsamples, HPupsamples);
	setMix(MixOutSamples, ATPOutsamples, AHPOutsamples);
	setDelay(DelaySamples, MixOutSamples,1)
	setAmplitude(ScaleSamples, DelaySamples, 2);   
	// Process chain end
    writeWebAudio(event,ScaleSamples);
	analyseError(ErrorLog,ScaleSamples, AudioTestArray,2.0) 
	
 	LogArray = [ "AudioTestArray", "ALengthSamples", "TPsamples",  "HPsamples", "TPdownsamples","HPdownsamples","TPquantsamples","HPquantsamples","TPIquantsamples","HPIquantsamples", "TPupsamples","HPupsamples","ATPOutsamples", "AHPOutsamples", "MixOutSamples","DelaySamples", "ScaleSamples",  "ErrorLog"];

	}

function processingAudioKompSubband(event) {  
 	var down_fac = 2;
 	var TPquant = parseFloat(document.getElementById("In1").value);
	var HPquant = parseFloat(document.getElementById("In2").value);
	var Round =5;
    audArrayIn = readWebAudio(event);
	// Process chain begin    
	StereoToMono(monoSamples, audArrayIn);  
	setALength(ALengthSamplesP, monoSamples);   
	setTP1O1D(TPsamplesP, ALengthSamplesP);   // L�sung 3.1
	setHP1O1D(HPsamplesP, ALengthSamplesP);   // L�sung 3.1
	setDownsampling(TPdownsamplesP, TPsamplesP, down_fac);
    setDownsampling(HPdownsamplesP, HPsamplesP, down_fac);
	setQuant(TPquantsamplesP, TPdownsamplesP, TPquant, Round);
	setQuant(HPquantsamplesP, HPdownsamplesP, HPquant, Round);
	
	setIQuant(TPIquantsamplesP, TPquantsamplesP, TPquant);
	setIQuant(HPIquantsamplesP, HPquantsamplesP, HPquant);
	setUpsampling(TPupsamplesP, TPIquantsamplesP, down_fac);
    setUpsampling(HPupsamplesP, HPIquantsamplesP, down_fac);
    setTP1O1D(ATPOutsamplesP, TPupsamplesP);
    setAHP1O1D(AHPOutsamplesP, HPupsamplesP);
	setMix(MixOutSamplesP, ATPOutsamplesP, AHPOutsamplesP);
	setDelay(DelaySamplesP, MixOutSamplesP,1)
	setAmplitude(ScaleSamplesP, DelaySamplesP, 2);   
	// Process chain end
    writeWebAudio(event.outputBuffer,ScaleSamplesP);

	analyseError(ErrorLogP,ScaleSamplesP, monoSamples,2.0) ;
	analyseAudioKompressionSubband(KompressionLogP, TPquant, HPquant  );	
 	LogArray = [ "monoSamples", "ALengthSamplesP", "TPsamplesP",  "HPsamplesP", "TPdownsamplesP","HPdownsamplesP","TPquantsamplesP","HPquantsamplesP","TPIquantsamplesP","HPIquantsamplesP", "TPupsamplesP","HPupsamplesP","ATPOutsamplesP", "AHPOutsamplesP", "MixOutSamplesP", "DelaySamplesP", "ScaleSamplesP", "ErrorLogP"];
}

//--------------------FFT

function processingAudioGenKompFFT(event) {  
	var TPquant = parseFloat(document.getElementById("In1").value);
	var HPquant = parseFloat(document.getElementById("In2").value);
	var splitFrequenz = parseFloat(document.getElementById("In3").value);
	freqQuantMatrix(QuantMatrix,TPquant,HPquant,splitFrequenz);
	var Round =5;
	// Process chain begin ------------------------------------  
	FFTKoef.forward(oneHzAudio);
	doFFTSpectrum(FFTKoef);
	maskFFT(FFT2.real, FFTKoef.real, 0.5);
	quantMatrix(QuantFFT,FFTKoef, QuantMatrix,Round);
	doFFTSpectrum(QuantFFT);
	
	invQuantMatrix( iQuantFFT,QuantFFT, QuantMatrix,Round);	
	doFFTSpectrum(iQuantFFT);
 	iInverseFFT = iQuantFFT.inverse(iQuantFFT.real,iQuantFFT.imag);
	// Process chain end
    writeWebAudio(event,iInverseFFT);
	
	analyseError(ErrorLog, iInverseFFT, oneHzAudioImpulse,2.0); 
	LogArray = ["oneHzAudioImpulse",  "QuantMatrix", "FFTKoef.spectrumLong",  "QuantFFT.spectrumLong",  "iQuantFFT.spectrumLong",  "iInverseFFT", "ErrorLog"];
 }
 
  function doFFTSpectrum(idata) 	{   // 1D FFT : out, in)
     // Spectrum erzeugen 
	for (i=0;i<idata.real.length;++i) 	{
		idata.spectrumLong[i]=Math.sqrt(idata.real[i] *idata.real[i] )+ Math.sqrt(idata.imag[i] *idata.imag[i] );
	}	
}

function freqQuantMatrix(iQuantMatrix, iTpQuant, iHpQuant, koefNr) {
	let counter = 0;
	let asc = true;
	for (i = 0; i < iQuantMatrix.length; i++) {
		iQuantMatrix[i] = iTpQuant;
	}
	for (i = koefNr; i < iQuantMatrix.length - (koefNr + 1); i++) {
		iQuantMatrix[i] = iHpQuant;
	}
}

function quantMatrix(ifft2, ifft, iQuantMatrix, iRound) {
	for (i = 0; i < iQuantMatrix.length; ++i) {
		ifft2.real[i] = runde(ifft.real[i] / iQuantMatrix[i], iRound);
		ifft2.imag[i] = runde(ifft.imag[i] / iQuantMatrix[i], iRound);
	}

}

function invQuantMatrix(ifft2, ifft, iQuantMatrix, iRound) {
	for (i = 0; i < iQuantMatrix.length; ++i) {
		ifft2.real[i] = ifft.real[i] * iQuantMatrix[i];
		ifft2.imag[i] = ifft.imag[i] * iQuantMatrix[i];
	}
}
 
function processingAudioKompFFT(event) {  
	var TPquant = parseFloat(document.getElementById("In1").value);
	var HPquant = parseFloat(document.getElementById("In2").value);
	var splitFrequenz = parseFloat(document.getElementById("In3").value);
	var Round =5;
	freqQuantMatrix(QuantMatrixP,TPquant,HPquant,splitFrequenz);
    audArrayIn = readWebAudio(event);
	// Process chain begin    
	StereoToMono(monoSamples, audArrayIn);
	FFTKoefP.forward(monoSamples);
	doFFTSpectrum(FFTKoefP);
	quantMatrix(QuantFFTP,FFTKoefP, QuantMatrixP,Round);
	doFFTSpectrum(QuantFFTP);
	
	invQuantMatrix(iQuantFFTP,QuantFFTP, QuantMatrixP,Round);	
	doFFTSpectrum(iQuantFFTP);
 	iInverseFFTP = iQuantFFTP.inverse(iQuantFFTP.real,iQuantFFTP.imag);
	// Process chain end
    writeWebAudio(event.outputBuffer,iInverseFFTP);

	analyseError(ErrorLogP,iInverseFFTP, monoSamples,2.0); 
	analyseAudioKompressionFFT(KompressionLogP, TPquant, HPquant, splitFrequenz)	
	LogArray = ["monoSamples",  "QuantMatrixP", "FFTKoefP.spectrumLong",  "QuantFFTP.spectrumLong",  "iQuantFFTP.spectrumLong",  "iInverseFFTP", "ErrorLogP"];
}

function processingAudioGenWhiteNoiseKompFFT(event) {  
	var TPquant = parseFloat(document.getElementById("In1").value);
	var HPquant = parseFloat(document.getElementById("In2").value);
	var splitFrequenz = parseFloat(document.getElementById("In3").value);
	var Round =5;
	freqQuantMatrix(QuantMatrix,TPquant,HPquant,splitFrequenz);
	genNoise(monoSamples, 2) ;  	
	// Process chain begin    
	FFTKoef.forward(monoSamples);
	doFFTSpectrum(FFTKoef);
	quantMatrix(QuantFFT,FFTKoef, QuantMatrix,Round);
	doFFTSpectrum(QuantFFT);
	invQuantMatrix(iQuantFFT,QuantFFT, QuantMatrix,Round);	
	doFFTSpectrum(iQuantFFT);
	
 	iInverseFFT = iQuantFFT.inverse(iQuantFFT.real,iQuantFFT.imag);
	// Process chain end
    writeWebAudio(event,iInverseFFT);
	
	analyseError(ErrorLog,iInverseFFT, monoSamples,2.0); 
	LogArray = ["monoSamples",  "QuantMatrix", "FFTKoef.spectrumLong",  "QuantFFT.spectrumLong",  "iQuantFFT.spectrumLong",  "iInverseFFT", "ErrorLog"];
}



/* -------------------------------------------------------------------------------------
 * the Worth with
 * @param erg
 * @param idata -------------------------------
 */
  
function analyseVideoKompressionDelta(iKomLog, iQuant ){
     // Worthlength
     iKomLog[0] = 1;    // OrginalWL
     iKomLog[1] = 2; // DeltaWL
     iKomLog[2] = 3;  // QuantWL + TPWL
     iKomLog[4] = 4; // OrginalWL - TPWL;
     iKomLog[5] = 5 //nicht
     //Datenrate
	 iKomLog[6] = 6;  // frameRate
	 iKomLog[7] = 7;
 	 // Compression    
     iKomLog[10] = 10;
}
 
 
 function analyseVideoKompressionSubband(iKomLog, iTPquant, iHPquant  ){
     // Worthlength
     iKomLog[0] = 1;    // OrginalWL
     iKomLog[1] = 2; // DeltaWL
     iKomLog[2] = 3;  // QuantWL + TPWL
     iKomLog[4] = 4; // OrginalWL - TPWL;
     iKomLog[5] = 5 //OrginalWL - HPWL;
     //Datenrate
	 iKomLog[6] = 6;  // frameRate
	 iKomLog[7] = 7;
	 iKomLog[8] = 8; 
     iKomLog[9] = 9; 
 	 // Compression    
     iKomLog[10] = 10;
}

 function analyseVideoKompressionFFT(iKomLog, iTPquant, iHPquant, iKoef){
     // Worthlength
     iKomLog[0] = 1;    // OrginalWL
     iKomLog[1] = 2; // DeltaWL
     iKomLog[2] = 3;  // QuantWL + TPWL
     iKomLog[4] = 4; // OrginalWL - TPWL;
     iKomLog[5] = 5 //OrginalWL - HPWL;
     //Datenrate
	 iKomLog[6] = 6;  // frameRate
	 iKomLog[7] = 7;
	 iKomLog[8] = 8; 
     iKomLog[9] = 9; 
 	 // Compression    
     iKomLog[10] = 10;
}




function analyseAudioKompressionDelta(iKomLog, iQuant ){
     // Worthlength
     iKomLog[0] = 1;    // OrginalWL
     iKomLog[1] = 2; // DeltaWL
     iKomLog[2] = 3;  // QuantWL + TPWL
     iKomLog[4] = 4; // OrginalWL - TPWL;
     iKomLog[5] = 5 //nicht
     //Datenrate
	 iKomLog[6] = 6;  // frameRate
	 iKomLog[7] = 7;
	 iKomLog[8] = 8; 
     iKomLog[9] = 9; 
 	 // Compression    
     iKomLog[10] = 10;
}
 
 
 function analyseAudioKompressionSubband(iKomLog, iTPquant, iHPquant  ){
     // Worthlength
     iKomLog[0] = 1;    // OrginalWL
     iKomLog[1] = 2; // DeltaWL
     iKomLog[2] = 3;  // QuantWL + TPWL
     iKomLog[4] = 4; // OrginalWL - TPWL;
     iKomLog[5] = 5 //OrginalWL - HPWL;
     //Datenrate
	 iKomLog[6] = 6;  // frameRate
	 iKomLog[7] = 7;
	 iKomLog[8] = 8; 
     iKomLog[9] = 9; 
 	 // Compression    
     iKomLog[10] = 10;
}

 function analyseAudioKompressionFFT(iKomLog, iTPquant, iHPquant, iKoef){
     // Worthlength
     iKomLog[0] = 1;    // OrginalWL
     iKomLog[1] = 2; // DeltaWL
     iKomLog[2] = 3;  // QuantWL + TPWL
     iKomLog[4] = 4; // OrginalWL - TPWL;
     iKomLog[5] = 5 //OrginalWL - HPWL;
     //Datenrate
	 iKomLog[6] = 6;  // frameRate
	 iKomLog[7] = 7;
	 iKomLog[8] = 8; 
     iKomLog[9] = 9; 
 	 // Compression    
     iKomLog[10] = 10;
}
	





