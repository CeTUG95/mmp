/**
 * Created by Juergen Lohr on 2021. Git Version
 */
 
    var StartProcess = "u0.2"; // First Process automatic Start by Play-Button
 
		var intervalId=0;
        var videoPlayer ;
        var canvas ;
        var context ;
        var back ;
        var backcontext ;
		var iImageIn, imgArrayIn,iImageOut, imgArrayOut; 
        var cw, ch, length, mouseX, mouseY, imgW, imgH;
		var  frameRate =25;
		var farbe ;
		var asset;
		var preLog;
		var LogArray  = new Array(); 
	var oneHz64 = new Array(254, 180, 74, 0, 0, 74, 180, 254, 254, 180, 74, 0, 0, 74, 180, 254, 254, 180, 74, 0, 0, 74, 180, 254, 254, 180, 74, 0, 0, 74, 180, 254, 254, 180, 74, 0, 0, 74, 180, 254, 254, 180, 74, 0, 0, 74, 180, 254, 254, 180, 74, 0, 0, 74, 180, 254, 254, 180, 74, 0, 0, 74, 180, 254);
	var oneHz = new Array(254, 0, 0, 254, 254, 0, 0, 254, 254, 0, 0, 254, 254, 0, 0, 254 ) ;
	var VideoTestArray  = new Array( 100, 100, 100, 255, 101, 101, 101, 255, 102, 102, 102, 255, 103, 103, 103, 255, 104, 104, 104, 255, 105, 105, 105, 255, 106, 106, 106, 255, 107, 107, 107, 255);
	var AudioTestArray  = new Array( 0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7);	
	var oneHzAudio = new Array(1,0.42,-0.42,-1,-1,-0.42,0.42,1);
	var display_fac = 128;  
		var SAD, PSNR, MSE;

		var QuantMatrix ;
	var FFT1 =new Object();
	FFT1.real = [];
	FFT1.imag = [];
	FFT1.spec = [];	
	var iFFT =new Object();
	iFFT.real = [];
	iFFT.imag = [];
	iFFT.spec = [];	
	var FFT2 =new Object();
	FFT2.real = [];
	FFT2.imag = [];
	FFT2.spec = [];
	var FFT3 =new Object();
	FFT3.real = [];
	FFT3.imag = [];
	FFT3.spec = [];	
	var swepFFT =new Object();
	swepFFT.real = [];
	swepFFT.imag = [];
	swepFFT.spec = [];	
	var iswepFFT =new Object();
	iswepFFT.real = [];
	iswepFFT.imag = [];
	iswepFFT.spec = [];	
	var quantFFT =new Object();
	quantFFT.real = [];
	quantFFT.imag = [];
	quantFFT.spec = [];	
	var iquantFFT =new Object();
	iquantFFT.real = [];
	iquantFFT.imag = [];
	iquantFFT.spec = [];	
	var istoreFFT =new Object();
	istoreFFT.real = [];
	istoreFFT.imag = [];
	istoreFFT.spec = [];	
	var istore2FFT =new Object();
	istore2FFT.real = [];
	istore2FFT.imag = [];
	istore2FFT.spec = [];
	var ieditFFT =new Object();
	ieditFFT.real = [];
	ieditFFT.imag = [];
	ieditFFT.spec = [];
	var idifFFT1 =new Object();
	idifFFT1.real = [];
	idifFFT1.imag = [];
	idifFFT1.spec = [];
	var idifFFT2 =new Object();
	idifFFT2.real = [];
	idifFFT2.imag = [];
	idifFFT2.spec = [];
	
var audioFile  = 'asset/audio/dual_audio.wav';
var audioFile1 = 'asset/audio/rauschen_weiss.wav';	
var audioFile2 = 'asset/audio/drum_ursprung.wav';	
var audioFile3 = 'asset/audio/gleitton48000Hz.wav';	

var videoFile  = "asset/video/blue_screen.webm" ;
var videoFile1  = "asset/video/background.webm"  ;
var videoFile2  = "asset/video/test4.mp4"  ;
var videoFile3  = "asset/video/KreisRecht.mp4"  ;

												
												  
var picFile = "asset/pic/leer.jpg"; 
var picFile1 = "asset/pic/BeuthHSMapSmall2klein.jpg"; 

var jsNode;
var aContext;
var audio;

var bufferSize = 2048;
var sampleRate = 48000; //24000; //22,05k, !24K,32K,44,1K,48K
var channelIn = 2;
var channelOut = 1;
 var sampleOut;
 var source; 
 
 var rundeLog=0;

 var audArrayIn =new Object();
	audArrayIn.l = [];
	audArrayIn.r = [];
var audArray2 =new Object();
	audArray2.l = [];
	audArray2.r = [];
var monoSamples, outputSamples, VolumenSamples;
var AVMODE ;
var FFTKoef, quantFFT, iQuantFFT, fft4;
	var QuantMatrix;
	var delayBufferCounter=0;
	
var button_normal = "#dddddd";
var button_on = "#66CC33";

//----------------------------------------init Menue-----------------------
var xhr;
var objJasonMeta;
var		 aktBookProc= "u0.2";
var iBookChapter=2; 

function init() {  
      xhr = new XMLHttpRequest();
     xhr.open("GET", "index_meta.json");
     xhr.onload = function(){
	            responseInfo=this.response.replace(/,/g, ",<br/>").replace(/\[/g, "[<br/>").replace(/\]/g, "<br/>]")

		        // objJasonMeta = JSON.parse(responseInfo);
				//		const json = '{"result":true, "count":42}';
	 objJasonMeta   = JSON.parse(this.response);
	 console.log(objJasonMeta);
		 iBookChapter= objJasonMeta.book[0].struct[0];
     initMenue(iBookChapter) ;   
     };
     xhr.send();
}

function initMenue(iiBookChapter) {
	let metaHead;
	metaHead=objJasonMeta.title;
	createMenueHome("meta", "Titel : ", metaHead ); 
	metaHead=objJasonMeta.keywords;
	createMenueHome("meta", "Begriffe : ", metaHead ); 
	metaHead=objJasonMeta.description;
	createMenueHome("meta", "Beschreibung : ", metaHead ); 
	metaHead=objJasonMeta.author;
	createMenueHome("meta", "Autor : ", metaHead ); 
	metaHead=objJasonMeta.camera;
	createMenueHome("meta", "Kamera : ", metaHead);   
	metaHead=objJasonMeta.audioCapture;
	createMenueHome("meta", "Audio-Aufzeichnung : ", metaHead);   
	metaHead=objJasonMeta.date;	
	createMenueHome("meta", "Datum : ",  metaHead);   
	metaHead=objJasonMeta.license;
	createMenueHome("meta", "Lizense : ", metaHead ); 
	metaHead=objJasonMeta.speaker;
	createMenueHome("meta", "Sprecher : ", metaHead ); 
	metaHead=objJasonMeta.attribution;
	createMenueHome("meta", "Link : ", metaHead ); 
	metaHead=objJasonMeta.input[0].bitrate;  
	createMenueHome("meta", "Bitrate : ", metaHead ); 
  	metaHead=objJasonMeta.input[0].format;  
	createMenueHome("meta", "fFrmat : ", metaHead ); 
  	metaHead=objJasonMeta.input[0].start;  
	createMenueHome("meta", "Start : ", metaHead ); 
  	metaHead=objJasonMeta.input[0].streams[0].codec;  
	createMenueHome("meta", "Stream-Codec-Video: ", metaHead ); 
   	metaHead=objJasonMeta.input[0].streams[1].codec;  
	createMenueHome("meta", "Stream-Codec-Audio : ", metaHead ); 


	     createMenueSegments(); 
	//	console.log(iSession);	
  
} 
function createMenueSegments() { 
ibookLength = objJasonMeta.book.length;

let booknr=0;  
 //Navibar 
 let	 metaNaviBar = document.getElementById("naviBar")
 for (iiii=0;iiii<ibookLength;++iiii)  { 
 booknr=iiii;
let  iElementNavDiv =    document.createElement("div"); 
     iElementNavDiv.setAttribute("class", "dropdown");
     metaNaviBar.appendChild(iElementNavDiv); 
let  iElementNavButton =    document.createElement("button"); 
     iElementNavButton.setAttribute("id", "struct"+booknr);
     iElementNavButton.setAttribute("class", "dropbtn");
     iElementNavDiv.appendChild(iElementNavButton); 

	 
	     
let  iElementNavDivDiv =    document.createElement("div"); 
     iElementNavDivDiv.setAttribute("class", "dropdown-content");
	 iElementNavDivDiv.setAttribute("id", "MegaMenu"+booknr);  
     iElementNavDiv.appendChild(iElementNavDivDiv); 

     createMenueMega("MegaMenu"+booknr , iiii, "struct"+booknr); 
   
  }
 } 
function showMenueHome() {
let	  iMeta = document.getElementById('meta');
 	//console.log(meta);  
	
	if (iMeta.style.visibility =="hidden" ) 	meta.style.visibility ="visible"; 
	else iMeta.style.visibility ="hidden";    
}

function createMenueMega(MenueName, ibookNr, iStructTitle) { 
 //console.log(MenueName);
let  iElementCol ;
let  ibook = objJasonMeta.book[ibookNr];
 document.getElementById(iStructTitle).innerHTML= ibook.info; //Title
 // Mega Menu
let	 meta = document.getElementById(MenueName  ); 
let KapText ="----Kap 1: Akustik, Lic----";
let MEventText ="----Akustik 1----";
let MegaMenue =objJasonMeta.title;
let  iElementDiv =    document.createElement("div"); 
     iElementDiv.setAttribute("class", "header");
     meta.appendChild(iElementDiv);  
let  iElementH2 =    document.createElement("h2"); 
let  t = document.createTextNode(MegaMenue ); 
     iElementH2.appendChild(t);  
     iElementDiv .appendChild(iElementH2);  
	 
 let    iElementRaw =    document.createElement("div"); 
     iElementRaw.setAttribute("class", "row");

for (i=0;i<ibook.struct.length;++i){ 
        KapText=ibook.struct[i].chap;  
		MEventText=ibook.struct[i].theme;    
   if(KapText != "" && MEventText == "") {
	  iElementCol =    document.createElement("div"); 
	  createMenueMegaKap(iElementRaw ,iElementCol, KapText );   
  }
 if(KapText != "" && MEventText != "") createMenueMegaMEvent(iElementRaw ,iElementCol, MEventText, i,ibookNr ); 
}
      meta.appendChild(iElementRaw);  

//console.log(meta);  
}  
  
 function createMenueMegaMEvent(iElementRaw, iElementCol, MEventText, iNr, ibookNr) {   
let  iElementA =    document.createElement("a"); 
  	 iElementA.setAttribute("href","#");
     iElementA.setAttribute("onclick","changeChap(" + iNr +  ", "   + ibookNr + ")");
let  t2 = document.createTextNode(MEventText);   

        iElementA.appendChild(t2); 
        iElementCol.appendChild(iElementA);       
} 
 function createMenueMegaKap(iElementRaw, iElementCol, KapText) { 

     iElementCol.setAttribute("class", "column");
let  iElementh3 =    document.createElement("h3"); 
let  t = document.createTextNode(KapText); 
     iElementh3.appendChild(t);     
     iElementCol.appendChild(iElementh3);    
 
       iElementRaw.appendChild(iElementCol);  
 
}
 
function createMenueHome(MenueName, Text1, Text2) { 
let	  meta = document.getElementById('meta');

let  t = document.createTextNode(Text1 + Text2 ); 
meta.appendChild(t);
let x = document.createElement("br");
meta.appendChild(x);
}   

function changeChap(iNr, iBookNr) {
let iBook = objJasonMeta.book[iBookNr].struct[iNr];
let	  h2 = document.getElementById('h2');

		 aktBookProc = iBook.processNr;
// 	  console.log(iNr);  
toggleplay() 	;
	h2.innerText=		iBook.chap + " - " + iBook.theme;
} 


  

//Init-Player----------------------------------------------------------------
	  
function initPlayer(){

initVideoPlayer();
initAudioPlayer();
logClear();

}
function initAudioPlayer(){
 
  // create the audio source

    audioPlayer = document.getElementById('audioID');
	aContext = new (window.AudioContext || window.webkitAudioContext || window.mozAudioContext)();
	    // when the audio element has been loaded, hook up the processing graph
    source = aContext.createMediaElementSource(audioPlayer); 
 }


function initVideoPlayer(){
    videoPlayer = document.getElementById('videoID');
	videoPlayer.src= videoFile 
	videoPlayer.load();
    canvas = document.getElementById('canvasID');
    context = canvas.getContext('2d');
    back = document.createElement('canvas');
    backcontext = back.getContext('2d');
//	mouseX=421;
//	mouseY=127;
	mouseX=281;
	mouseY=147;
	context.clearRect(0, 0, canvas.width, canvas.height);

	context.font = "12px Arial";
	context.fillText("Canvas: Videoausgabe !!!!!",10,50);
}		

// ---------------------------Controls------------------------------
function toggleplay() {
	if(typeof(videoPlayer) == "undefined") {initPlayer();}
	if (intervalId==0) {
    mainPlayer( aktBookProc );  
	logClear();
	document.getElementById("playVideoAudio").style.backgroundColor = button_on;
    } else {
	stopAudioVideo();
	clearInterval(intervalId);
	intervalId=0;
	document.getElementById("playVideoAudio").style.backgroundColor = button_normal;
	}
}

function startAudio() {
   // jsNode.connect(aContext.destination);
}

function stopAudioVideo() {
	if (audioPlayer.played) audioPlayer.pause();	
	if (videoPlayer.played)	videoPlayer.pause();	
	if (AVMODE =="a") jsNode.disconnect(0);
}



function doStop(iPlayerFlag) {
	if (videoPlayer.played)
	{		videoPlayer.pause();
	}
	stopAudioVideo();
	intervalId=0;
	clearInterval(intervalId);

}
function drawLog() {

drawLogLine();

}

function drawLogLine() {
 logClear();
 for(var n = 0; n <LogArray.length ; n+=1)
 {
	iArray = eval (LogArray [n])
	if(iArray === undefined) {

	log(LogArray [n]+":      " );       log( "undefined" );   
	} else {
		    if (iArray.length<=ch) firstLineImage=iArray.length
			if (iArray.length<=64) firstLineImage=iArray.length
			else                  firstLineImage = (iArray.length / ch); 
			
			log(LogArray [n]+":      " );        for(var i = 0; i <firstLineImage ; i+=1) logEvent(runde(iArray[i],rundeLog)); 
			if (LogArray [n] =="ErrorLog" || LogArray [n] =="ErrorLogP" ) {
				 log("Error - SAD: "+ SAD + ", MSE: "+ MSE + ", PSNR: "+ PSNR); 
				}
		
	}
 }
 			if (KompressionLog[0] > "0" ) {
				 logVideoCompression(KompressionLog); 
				}
 			if (KompressionLogP[0] > "0" ) {
				 logAudioCompression(KompressionLogP); 
				}
}

function log(text){
		    preLog = document.getElementById('preLog');
			preLog.textContent += ('\n' + text);
}

function logEvent(text){
		    preLog = document.getElementById('preLog');
			preLog.textContent += ( text +', ');

}
function logClear(){
		    preLog = document.getElementById('preLog');
			if (preLog) preLog.textContent = ('Logging of: \n');
			else alert("no logging output field");
}
function logVideoCompression(iKomLog){
    log("--------------Compression Data -----------------");
    log("Origninal Wortbreite: " +  iKomLog[0] + " Bit , Codec Wortbreite: " + iKomLog[1] +" Bit" ); // "bit, TP-Quant Wortbreite: " + iKomLog[2] + "bit, HP-Quant Wortbreite: " + iKomLog[3] + "bit"
    log("TP-Quant-Wortbreite = " + iKomLog[2] + " Bit,  HP-Quant-Wortbreite = " + iKomLog[3] + " Bit");
    log("TP-Codec-Wortbreite = " + iKomLog[4] + " Bit,  HP-Codec-Wortbreite = " + iKomLog[5] + " Bit");
  	log("Datarate  at Canvas ("+ cw + ", "+ ch +", p25): Orginal: " + iKomLog[6]+ " MBit/s, Codec: " + iKomLog[9] + " MBit/s " );  //  log("Gesamt-Datenrate(TP + HP) bei 404p25: " + tpdrate + " + " + hpdrate + " = " + allDrate + " bit ~ " + allDrate/1000000 + " mbit");
    log("Kompressionsrate: 1 : " + iKomLog[10] );
}
function logAudioCompression(iKomLog){
    log("--------------Compression Data -----------------");
    log("Origninal Wortbreite: " +  iKomLog[0] + " Bit , Codec Wortbreite: " + iKomLog[1] +" Bit" ); // "bit, TP-Quant Wortbreite: " + iKomLog[2] + "bit, HP-Quant Wortbreite: " + iKomLog[3] + "bit"
    log("TP-Quant-Wortbreite = " + iKomLog[2] + " Bit,  HP-Quant-Wortbreite = " + iKomLog[3] + " Bit");
    log("TP-Codec-Wortbreite = " + iKomLog[4] + " Bit,  HP-Codec-Wortbreite = " + iKomLog[5] + " Bit");
  	log("Datarate  at AudioBuffer ("+ bufferSize + ", Ch: "+ channelOut +"): Orginal: " + iKomLog[6]+ " MBit/s, Codec: " + iKomLog[9] + " MBit/s " );  //  log("Gesamt-Datenrate(TP + HP) bei 404p25: " + tpdrate + " + " + hpdrate + " = " + allDrate + " bit ~ " + allDrate/1000000 + " mbit");
    log("Kompressionsrate: 1 : " + iKomLog[10] );
}

function runde(x, n) {
  if (n < 0 || n > 14) return false;
  var e = Math.pow(10, n);
  var k = (Math.round(x * e) / e).toString();
  if (n == 0 ) return k;
  if (k.indexOf('.') == -1) k += '.';
  k += e.toString().substring(1);
  return k.substring(0, k.indexOf('.') + n+1);
}

function getMousePos(ic_img, event) { 
  var rect = ic_img.getBoundingClientRect();
  mouseY= Math.round(event.clientY - rect.top);
  mouseX= Math.round(event.clientX - rect.left); 
  mouseY = mouseY - (display_fac/2);   // Position um S_Block mitte verschieben
  mouseX = mouseX - (display_fac/2) ;
	//  alert("x:" + mouseX + " y:" + mouseY);
}

function setMousePos(iX, iY) {   
mouseX = iX;
mouseY = iY;
}

			//	---------------------------------------------------------------- Interaction Control---------------------------------------------------------------
	
function mainPlayer(iProzess){
	        switch(iProzess){ 
        case "u0.1": 
			setMainVideoPlayer(720,404,processingVideoGenArea); // Default
			setImputFields("visible","visible","Bridness(0-255): ","150", "hidden","hidden","HP-Quant-Faktor: ","1", "hidden","hidden","Grenzfreq.(Hz): ","1");
            break; 
        case "u0.2": 
			setMainVideoPlayer(display_fac,display_fac,processingVideoChannel); // Default
			setImputFields("visible","visible","R/G/B(r,g,b):","r", "hidden","hidden","HP-Quant-Faktor: ","1", "hidden","hidden","Grenzfreq.(Hz): ","1");
			loadPlayer(videoPlayer, videoFile, picFile);
            break; 
		case "u0.3": 
			setMainVideoPlayer(display_fac,display_fac,processingVideoCanvasGraph); // Default
			setImputFields("visible","visible","R/G/B(r,g,b):","r", "hidden","hidden","HP-Quant-Faktor: ","1", "hidden","hidden","Grenzfreq.(Hz): ","1");
			loadPlayer(videoPlayer, videoFile, picFile);
            break; 
        case "u0.4": 
			setMainVideoPlayer(display_fac,display_fac,processingVideoCanvasPic); // Default
			setImputFields("visible","visible","R/G/B(r,g,b):","r", "hidden","hidden","HP-Quant-Faktor: ","1", "hidden","hidden","Grenzfreq.(Hz): ","1");
			loadPlayer(videoPlayer, videoFile, picFile);
            break; 
		case "u1.1": 
			setMainVideoPlayer(720,404,processingVideoGenColourArea);  // Lösung 1.1
			setImputFields("visible","visible","R (0-255): ","235", "visible","visible","G: ","235", "visible","visible","B: ","235");
            break; 
        case "u1.2": 
            setMainVideoPlayer(display_fac,display_fac,processingVideoGray); // Lösung 1.1
			setImputFields("hidden","hidden","Quant-Faktor: ","8", "hidden","hidden","HP-Quant-Faktor: ","1", "hidden","hidden","Grenzfreq.(Hz): ","1");
			loadPlayer(videoPlayer, videoFile, picFile);
            break; 
		case "u1.10": 
			setMainVideoPlayer(display_fac,display_fac,processingVideoPerceptionTransparency); 
			setImputFields("visible","visible","Transparency(0-255): ","50", "hidden","hidden","Video1-On/Off(0,1): ","1", "hidden","hidden","Grenzfreq.(Hz): ","1");
			loadPlayer(videoPlayer, videoFile, picFile1);
            break        
		case "u1.11": 
			setMainVideoPlayer(display_fac,display_fac,processingVideoPerceptionTime);  
			setImputFields("visible","visible","Time(ms: 0.0 - 1000.0): ","1000", "hidden","hidden","HP-Quant-Faktor: ","1", "hidden","hidden","Grenzfreq.(Hz): ","1");
			loadPlayer(videoPlayer, videoFile, picFile1);
            break 
		case "u2.1": 
			setMainVideoPlayer(720,404,processingVideoGenCosinus);     // Lösung 2.1
			setImputFields("visible","visible","Hz: ","1", "hidden","hidden","HP-Quant-Faktor: ","1", "hidden","hidden","Grenzfreq.(Hz): ","1");
            break; 
        case "u2.2": 
			setMainVideoPlayer(display_fac,display_fac,processingVideoBridnessContrast);     //lösung  2.1
			setImputFields("visible","visible","Contrast (dB): ","-6", "hidden","hidden","HP-Quant-Faktor: ","1", "hidden","hidden","Grenzfreq.(Hz): ","1");
			loadPlayer(videoPlayer, videoFile, picFile);
            break; 
	    case "u2.3": 
			setMainVideoPlayer(display_fac,display_fac,processingVideoChromaKeying); //lösung  2.1		
			setImputFields("visible","visible","R: ","50", "visible","visible","G: ","75", "visible","visible","B: ","150");
			loadPlayer(videoPlayer, videoFile, picFile1);
            break;
	    case "u2.4": 
			setMainVideoPlayer(display_fac,display_fac,processingVideoTP10);  //lösung  2.2
			setImputFields("hidden","hidden","Hz: ","64", "hidden","hidden","HP-Quant-Faktor: ","1", "hidden","hidden","Grenzfreq.(Hz): ","1");
			loadPlayer(videoPlayer, videoFile, picFile);
            break;
	    case "u2.4a": 
			setMainVideoPlayer(display_fac,display_fac,processingVideoTP10_cos64);  //lösung  2.2
			setImputFields("visible","visible","Hz: ","64", "hidden","hidden","HP-Quant-Faktor: ","1", "hidden","hidden","Grenzfreq.(Hz): ","1");
            break;
		case "u2.5": 
			setMainVideoPlayer(display_fac,display_fac,processingVideoHP10);  //lösung  2.2			setImputFields("hidden","hidden","Hz: ","1", "hidden","hidden","HP-Quant-Faktor: ","1", "hidden","hidden","Grenzfreq.(Hz): ","1");
			setImputFields("hidden","hidden","Hz: ","1", "hidden","hidden","HP-Quant-Faktor: ","1", "hidden","hidden","Grenzfreq.(Hz): ","1");
			loadPlayer(videoPlayer, videoFile, picFile);
            break;
		case "u2.5a": 
			setMainVideoPlayer(display_fac,display_fac,processingVideoHP10visuell);  
			setImputFields("hidden","hidden","Hz: ","1", "hidden","hidden","HP-Quant-Faktor: ","1", "hidden","hidden","Grenzfreq.(Hz): ","1");
			loadPlayer(videoPlayer, videoFile, picFile);
            break;
		case "u2.5b": 
			setMainVideoPlayer(display_fac,display_fac,processingVideoHP10_cos64); 
			setImputFields("visible","visible","Hz: ","64", "hidden","hidden","HP-Quant-Faktor: ","1", "hidden","hidden","Grenzfreq.(Hz): ","1");
            break;
	    case "u2.6": 
			setMainVideoPlayer(display_fac,display_fac,processingVideoTP20); 
			setImputFields("hidden","hidden","Hz: ","1", "hidden","hidden","HP-Quant-Faktor: ","1", "hidden","hidden","Grenzfreq.(Hz): ","1");
			loadPlayer(videoPlayer, videoFile, picFile);
            break;
		case "u2.7": 
			setMainVideoPlayer(display_fac,display_fac,processingVideoHP20);  
			setImputFields("hidden","hidden","Hz: ","1", "hidden","hidden","HP-Quant-Faktor: ","1", "hidden","hidden","Grenzfreq.(Hz): ","1");
			loadPlayer(videoPlayer, videoFile, picFile);
            break        
		case "u2.8": 
			setMainVideoPlayer(display_fac,display_fac,processingVideoSobel);  
			setImputFields("hidden","hidden","Hz: ","1", "hidden","hidden","HP-Quant-Faktor: ","1", "hidden","hidden","Grenzfreq.(Hz): ","1");
			loadPlayer(videoPlayer, videoFile, picFile);
            break  
		case "u3.1": 
			setMainVideoPlayer(8,2,processingVideoGenKompDelta); //lösung  3.1 
			setImputFields("visible","visible","Quant-Faktor(1,2,4,8,16,..512. , off: 5555): ","1", "hidden","hidden","HP-Quant-Faktor: ","1", "hidden","hidden","Grenzfreq.(Hz): ","1");
			break  			
		case "u3.2": 
			setMainVideoPlayer(display_fac,display_fac,processingVideoKompDelta); //lösung  3.1 
			setImputFields("visible","visible","Quant-Faktor(1,2,4,8,16,..512. , off: 5555): ","1", "hidden","hidden","HP-Quant-Faktor: ","1", "hidden","hidden","Grenzfreq.(Hz): ","1");
			loadPlayer(videoPlayer, videoFile, picFile);
            break  	
		case "u3.3": 
			setMainVideoPlayer(8,2,processingVideoGenKompSubband); //lösung  3.1 
			setImputFields("visible","visible","TP-Quant-Faktor(1,2,4,8,16,..255. , off: 5555): ","1", "visible","visible","HP-Quant-Faktor: ","1", "hidden","hidden","Grenzfreq.(Hz): ","1");
            break  	
		case "u3.4": 
			setMainVideoPlayer(display_fac,display_fac,processingVideoKompSubband); //lösung  3.1 
			setImputFields("visible","visible","TP-Quant-Faktor(1,2,4,8,16,..255. , off: 5555): ","1", "visible","visible","HP-Quant-Faktor: ","1", "hidden","hidden","Grenzfreq.(Hz): ","1");
			loadPlayer(videoPlayer, videoFile, picFile);
            break  		
		case "u3.5": 
			setMainVideoPlayer(4,4,processingVideoGenKompFFTOneHz); setInitFFT(4);//lösung  3.1 
			setImputFields("visible","visible","TP-Quant-Faktor(1 bis  - 24 Bit - 88888888:off): ","1", "visible","visible","HP-Quant-Faktor: ","1", "visible","visible","Grenzfreq.(0...64Hz): ","1");
			break  	
		case "u3.6": 
			setMainVideoPlayer(4,4,processingVideoGenKompFFTpic); setInitFFT(4);//lösung  zusatz ?3.1 
			setImputFields("visible","visible","TP-Quant-Faktor(1 bis  - 24 Bit - 88888888:off): ","1", "visible","visible","HP-Quant-Faktor: ","1", "visible","visible","Grenzfreq.(0...64Hz): ","1");
			loadPlayer(videoPlayer, videoFile, picFile);
            break  	
		case "u3.7": 
			setMainVideoPlayer(display_fac,display_fac,processingVideoKompFFT); setInitFFT(display_fac);//lösung  3.1 
			setImputFields("visible","visible","TP-Quant-Faktor(1 bis  - 24 Bit - 88888888:off): ","1", "visible","visible","HP-Quant-Faktor: ","1", "visible","visible","Grenzfreq.(0...64Hz): ","10");
			loadPlayer(videoPlayer, videoFile, picFile);
            break  	
// -------------------------------------------------------------4----------------------------------------------
		case "u4.1": 
			setMainVideoPlayer(720,404,processingVideo41);  // Lösung 1.1
			setImputFields("visible","visible","R (0-255): ","235", "visible","visible","G: ","235", "visible","visible","B: ","235");
			break  			
		case "u4.2": 
            setMainVideoPlayer(display_fac,display_fac,processingVideo42); // Lösung 1.1
			setImputFields("visible","visible","u - v (-300...0-35-100...2000): ","34", "hidden","hidden","G: ","60", "hidden","hidden","B: ","20");
			loadPlayer(videoPlayer, videoFile, picFile);
            break  
		case "u4.3": 
			setMainVideoPlayer(display_fac,display_fac,processingVideo43);  
			setImputFields("visible","visible","Transparency(0-255): ","50", "hidden","hidden","Video1-On/Off(0,1): ","1", "hidden","hidden","Grenzfreq.(Hz): ","1");
			loadPlayer(videoPlayer, videoFile, picFile1);
            break  
		case "u4.4": 
			initMeasureAudio2();
			setMainVideoPlayer(display_fac,display_fac,processingVideo44);   //Measurment Pegel
			setImputFields("visible","visible","Contrast (dB): ","-6", "hidden","hidden","HP-Quant-Faktor: ","1", "hidden","hidden","Grenzfreq.(Hz): ","1");
			loadPlayer(videoPlayer, videoFile, picFile);
			InitCanvas('customCanvas',150,100);
            break  		
		case "u4.4b":
			setMainVideoPlayer(display_fac,display_fac,processingVideo44b); //Measurment Histogram
			setImputFields("visible","visible","Histogramm-Switch [1 = Rot, 2 = Gruen, 3 = Blau, 4 = Y ]: ","4", "hidden","hidden","-: ","0","hidden","hidden","-: ","0");
			loadPlayer(videoPlayer, videoFile, picFile);
			InitCanvas('customCanvas',750,200);
            break
		case "u4.4c": 
			setMainVideoPlayer(display_fac,display_fac, processingVideo44c); //Measurment Histogram
			setImputFields("visible","visible","Histogramm-Switch [1 = Rot, 2 = Gruen, 3 = Blau, 4 = Y, 5 = Alle]: ","5", "hidden","hidden","MP1 + Mp2-Quant-Faktor: ","2","hidden","hidden","HP-Quant-Faktor: ","1");
			loadPlayer(videoPlayer, videoFile, picFile);
		   InitCanvas('customCanvas',1200,350);
            break
		case "u4.5": 
			setMainVideoPlayer(display_fac,display_fac,processingVideo45); 
			start_VideoCap("video") ;
			setImputFields("visible","visible","start with https://;  Contrast (dB): ","-6", "hidden","hidden","HP-Quant-Faktor: ","1", "hidden","hidden","Grenzfreq.(Hz): ","1");
		//	loadPlayer(videoPlayer, videoFile, picFile);	
			break  	
		case "u4.6": 
			setMainVideoPlayer(display_fac,display_fac,processingVideo46); //Kompression Gama
			setImputFields("visible","visible","Kompression-Faktor(0...0.5..1..4....30 , off: 1): ","0.5", "hidden","hidden","MP1 + Mp2-Quant-Faktor: ","2","hidden","hidden","HP-Quant-Faktor: ","1");
			setImputFields4("hidden","hidden","Gain Sumant: ","100");
			loadPlayer(videoPlayer, videoFile, picFile);
            break  	
		case "u4.7a": 
			setMainVideoPlayer(display_fac,display_fac,processingVideo47a); //Diferenz - ChromaKeying mit beliebigem Hindergrunds-Stand-Bild
			setImputFields("visible","visible","Quant-Faktor: (0...255, unkompressed: 1)","1", "hidden","hidden","HP-Quant-Faktor: ","1", "hidden","hidden","Grenzfreq.(Hz): ","1");
			setImputFields4("hidden","hidden","Gain Sumant: ","100");
			loadPlayer(videoPlayer, videoFile, picFile);
            break 
		case "u4.7b": 

			setMainVideoPlayer(display_fac,display_fac,processingVideo47b);  // - ChromaKeying mit beliebigem Hindergrunds-Stand-Bild
			setImputFields("visible","visible","Value: (0...255; off: -1)","15", "hidden","hidden","HP-Quant-Faktor: ","1", "hidden","hidden","Grenzfreq.(Hz): ","1");
			setImputFields4("hidden","hidden","Gain Sumant: ","100");
			loadPlayer(videoPlayer, videoFile2, picFile1);
			INITDeltaGOP() ;
			setMousePos(433,142);
              break 
		case "u4.8":  
				  
		    setMainVideoPlayer(display_fac,display_fac,processingVideo48); // Sobel-schwellwert
			setImputFields("visible","visible","Schwellwert-Faktor (0-255): ","90", "hidden","hidden","HP-Quant-Faktor: ","1", "hidden","hidden","Grenzfreq.(Hz): ","1");
			setImputFields4("hidden","hidden","Gain Sumant: ","100");
			loadPlayer(videoPlayer, videoFile, picFile);
															
             break 
		case "u4.9a": 
			setMainVideoPlayer(display_fac,display_fac,processingVideo49a); //9a Analyse auf Bewegung: geringe Bewegung wird Darstellung
					setImputFields("visible", "visible", "Value: blue > (0...255)", "4", "visible", "visible", "Value2: gruen > (0...255)", "28", "visible", "visible", "Value3: rot> (0...255)","56");
			setImputFields4("hidden","hidden","Gain Sumant: ","100");
			loadPlayer(videoPlayer, videoFile, picFile); 
             break 
		case "u4.9b": 
			setMainVideoPlayer(display_fac,display_fac,processingVideo49b); //9b Analyse auf Bewegung: hohe Bewegung mit Farbkodierung
			setImputFields("visible","visible","Value1: blue >(0...255)","4", "visible","visible","Value2: Green > (0...255)","28", "visible","visible","Value3: red > (0...255)","56");
			setImputFields4("hidden","hidden","Gain Sumant: ","100");
			loadPlayer(videoPlayer, videoFile, picFile);
            break 
		case "u4.10": 
			setMainVideoPlayer(display_fac,display_fac,processingVideo410); //
			setImputFields("visible","visible","Value: ","8", "hidden","hidden","HP-Quant-Faktor: ","1", "hidden","hidden","Grenzfreq.(Hz): ","1");
//			setImputFields4("hidden","hidden","Gain Sumant: ","100");
			loadPlayer(videoPlayer, videoFile, picFile);
																															 
            break 
		case "u4.11": 
			setMainVideoPlayer(display_fac,display_fac,processingVideo411); //
			setImputFields("visible","visible","Value: ","8", "hidden","hidden","HP-Quant-Faktor: ","1", "hidden","hidden","Grenzfreq.(Hz): ","1");
//			setImputFields4("hidden","hidden","Gain Sumant: ","100");
			loadPlayer(videoPlayer, videoFile, picFile);
																																							   
            break 
		case "u4.12": 
			setMainVideoPlayer(display_fac,display_fac,processingVideo412); //
			setImputFields("visible","visible","Value1: blue >","4", "visible","visible","Value2: Green > ","28", "visible","visible","Value3: red > ","56");
//			setImputFields4("hidden","hidden","Gain Sumant: ","100");
			loadPlayer(videoPlayer, videoFile, picFile);
																																								
            break 
		case "u4.13": 

			setMainVideoPlayer(display_fac,display_fac,processingVideo413); //
			setImputFields("hidden","hidden","Value: ","15", "hidden","hidden","HP-Quant-Faktor: ","1", "hidden","hidden","Grenzfreq.(Hz): ","1");
//			setImputFields("visible","visible","R: ","50", "visible","visible","G: ","75", "visible","visible","B: ","150");

			setImputFields4("visible","visible","Gain Sumant: ","100");
			loadPlayer(videoPlayer, videoFile, picFile1);
	
            break 
		case "u4.14": 
			setMainVideoPlayer(display_fac,display_fac,processingVideo414); //
			setImputFields("hidden","hidden","TP-Quant-Faktor(1,2,4,8,16,..255. , off: 5555): ","3", "hidden","hidden","MP1 + Mp2-Quant-Faktor: ","2","hidden","hidden","HP-Quant-Faktor: ","1");
//			setImputFields4("visible","visible","Gain Sumant: ","100");
			loadPlayer(videoPlayer, videoFile, picFile);
            break 
		case "u4.15": 
			setMainVideoPlayer(display_fac,display_fac,processingVideo415); //
			setImputFields("hidden","hidden","TP-Quant-Faktor(1,2,4,8,16,..255. , off: 5555): ","3", "hidden","hidden","MP1 + Mp2-Quant-Faktor: ","2","hidden","hidden","HP-Quant-Faktor: ","1");
//			setImputFields4("visible","visible","Gain Sumant: ","100");
			loadPlayer(videoPlayer, videoFile, picFile);
            break 

 
											   
				  
				
																	 
																																														
																
											   
				  

																					
				 
																							  
																																																			  
											   
			 
				 
																								
																																																				 
											   
				   
				 
																													
																																																		
																		   
												
				   
				 
																								   
																																																	   
																			 
											   
					 
				 
																								   
																																																	   
																			 
											   
		   
				 
																								   
																																																	   
																			 
											   
					
				  
																					
																																																	   
																			 
			
				 
																									  
																																																	   
																			 
											   
				  
				  
																					
																																																	   
																			 
			
				 
																									  
																																																	   
																			 
											   
				  
				  
																					
																																																	   
																			 
			
				 
																									  
																																																	   
																			 
											   
				  
				  
																											  
																																																	   
																			 
											   
												   
				  
				  
																																  
																																																	   
																			 
																		   
											   
												   
				  
				  
																																  
																																																	   
																			 
																		   
												 
												   
				  
				  
																																   
																																																	   
																		   
																					 
											   
												   
				  
				  
																																   
																																																	   
																		   
																					 
												 
												   
				  

				  
																																	   
																																																	   
																		   
																					 
											   
												   
				  
				  
			   
																		   
																																														
															
												 
				  
				  
																												
							  
																																																   
																							  
												 
												   
				   
				  
																									   
							  
																																															   
																							  
												 
												   
				  
				  
																												   
							  
																																												   
																							  
												 
												   
				  
				  
																													   
							  
																																																											   
												 
												   
				  
				  
																													
							  
																																																												 
												 
												   
				  
				  
																													
							  
																																																												 
												   
												   
				  
				   
																													
							  
																																																												 
											   
												   
				  

				  
																										 
							  
																																																											   
												 
												   
				  
				  
																									
							  
																																															   
												 
												   
				  
				   
																
							
					   
																																				   
																										

										
		  
				   
																				   
																																							  
															
												
					   
					
					
																				  
																																							
															
												
					   
					
					
																					
																																							  
															
														
												
					   
									  
// ------------------------------------------------------Audio----------------------------------
		case "u10.1": 
			setImputFields("visible","visible","Type(1-1000): ","2", "hidden","hidden","???: ","1", "hidden","hidden","?????: ","1");  
			setMainAudioPlayer("Gen",1,1024,processingAudioGenNoise); // Default
            break 
		case "u10.2": 
			setImputFields("visible","visible","channel(l,r): ","l", "hidden","hidden","???: ","1", "hidden","hidden","?????: ","1");
			setMainAudioPlayer("Aud",1,1024,processingAudioChannel); //Default
			loadPlayer(audioPlayer, audioFile, picFile);
            break 
		case "u10.3": 
			setImputFields("visible","visible","Type(1-1000): ","2", "hidden","hidden","???: ","1", "hidden","hidden","?????: ","1");  
			setMainAudioPlayer("Gen",1,1024,processingAudioCanvasText); // Default
            break 
		case "u10.4": 
			setImputFields("visible","visible","channel(l,r): ","l", "hidden","hidden","???: ","1", "hidden","hidden","?????: ","1");
			setMainAudioPlayer("Aud",1,1024,processingAudioCanvasLine); //Default
			loadPlayer(audioPlayer, audioFile, picFile);
            break 
		case "u11.1": 
			setImputFields("visible","visible","Frequency(0-20000): ","1000", "hidden","hidden","???: ","1", "hidden","hidden","?????: ","1");
			setMainAudioPlayer("Gen",1,sampleRate,processingAudioGenSinus); //lösung  Audio 1.1 
            break 
		case "u11.2": 
			setImputFields("hidden","hidden","???: ","1", "hidden","hidden","???: ","1", "hidden","hidden","?????: ","1");
			setMainAudioPlayer("Aud",1,1024,processingAudioMono); //lösung  Audio 1.1 
			loadPlayer(audioPlayer, audioFile, picFile);
            break 	
		case "u11.10": 
			setImputFields("visible","visible","Mixing Level(0-100): ","50", "hidden","hidden","???: ","1", "hidden","hidden","?????: ","1");
			setMainAudioPlayer("Aud",1,1024*16,processingAudioPerceptionMixingLevel); 
			loadPlayer(audioPlayer, audioFile, picFile);
            break 
		case "u11.11": 
			setImputFields("visible","visible","Time(ms: 0.0 - 1000.0): ","200", "hidden","hidden","???: ","1", "hidden","hidden","?????: ","1");
			setMainAudioPlayer("Aud",1,1024/2,processingAudioPerceptionTime); 
			loadPlayer(audioPlayer, audioFile, picFile);
            break
		case "u12.1": 
			setImputFields("visible","visible","Frequency(0-20000): ","400", "hidden","hidden","???: ","1", "hidden","hidden","?????: ","1");
			setMainAudioPlayer("Gen",1,120,processingAudioKlang); 
            break 
		case "u12.2": 
			setImputFields("visible","visible","dB(-96 bis +12): ","-6", "hidden","hidden","???: ","1", "hidden","hidden","?????: ","1");
			setMainAudioPlayer("Aud",1,1024,processingAudioVolumen); 
			loadPlayer(audioPlayer, audioFile, picFile);
            break 
		case "u12.3": 
			setImputFields("visible","visible","Direct dB(-96 bis +12): ","0", "visible","visible","Delay dB(-96 bis +12): ","0", "visible","visible","DealyTime ms(0 bis 332): ","200");
			setMainAudioPlayer("Aud",1,1024*16,processingAudioDelay);  //lösung 2
			loadPlayer(audioPlayer, audioFile, picFile);
            break 
		case "u12.3a": 
			setImputFields("visible","visible","Delay dB(-96 bis +12): ","-2", "hidden","hidden","DealyTime(-16k bis 16k): ","16000", "hidden","hidden","?????: ","1");
			setMainAudioPlayer("Aud",1,1024*16,processingAudioDelay16K);  //lösung 2
			loadPlayer(audioPlayer, audioFile, picFile);
            break 
		case "u12.3b": 
			setImputFields("visible","visible","Direct dB(-96 bis +12): ","0", "visible","visible","Delay dB(-96 bis +12): ","0", "visible","visible","DealyTime ms(0 bis 0.17): ","0.025");
			setMainAudioPlayer("Gen",1,8,processingAudioGenDelay);  //lösung 2
            break 			
		case "u12.4": 
			setImputFields("visible","visible","Type(1-1000): ","2", "hidden","hidden","???: ","1", "hidden","hidden","?????: ","1");
			setMainAudioPlayer("Gen",1,1024*16,processingAudioTP1O); 
            break 
		case "u12.5": 
			setImputFields("visible","visible","Type(1-1000): ","2", "hidden","hidden","???: ","1", "hidden","hidden","?????: ","1");
			setMainAudioPlayer("Gen",1,1024*16,processingAudioHP1O); 
            break 	
		case "u12.6": 
			setImputFields("visible","visible","Type(1-1000): ","2", "hidden","hidden","???: ","1", "hidden","hidden","?????: ","1");
			setMainAudioPlayer("Gen",1,1024*16,processingAudioTP2O1D); 
            break 
		case "u12.7": 
			setImputFields("visible","visible","Type(1-1000): ","2", "hidden","hidden","???: ","1", "hidden","hidden","?????: ","1");
			setMainAudioPlayer("Gen",1,1024*16,processingAudioHP2O1D); 
            break 			
		case "u12.8": 
			setImputFields("visible","visible","Type(1-1000): ","2", "hidden","hidden","???: ","1", "hidden","hidden","?????: ","1");
			setMainAudioPlayer("Gen",1,1024*16,processingAudioBP2O1D); 
            break 
		case "u12.9": 
			setImputFields("visible","visible","Type(1-1000): ","2", "hidden","hidden","???: ","1", "hidden","hidden","?????: ","1");
			setMainAudioPlayer("Gen",1,1024*16,processingAudioBS2O1D); 
            break 
		case "u13.1": 
			setMainAudioPlayer("Gen",1,8,processingAudioGenKompDelta); //lösung  3.1 
			setImputFields("visible","visible","Quant-Faktor(1,2,4,8,16,..4096. , off: 66000): ","1", "hidden","hidden","HP-Quant-Faktor: ","1", "hidden","hidden","Grenzfreq.(Hz): ","1");
			break  			
		case "u13.2": 
			setMainAudioPlayer("Aud",1,1024*16,processingAudioKompDelta); //lösung  3.1 
			setImputFields("visible","visible","Quant-Faktor(1,2,4,8,16,..4096. , off: 66000): ","1", "hidden","hidden","HP-Quant-Faktor: ","1", "hidden","hidden","Grenzfreq.(Hz): ","1");
			loadPlayer(audioPlayer, audioFile, picFile);
            break 
		case "u13.3": 
			setMainAudioPlayer("Gen",1,8,processingAudioGenKompSubband); //lösung  3.1 
			setImputFields("visible","visible","Quant-Faktor(1,2,4,8,16,..4096. , off: 66000): ","1", "hidden","hidden","HP-Quant-Faktor: ","1", "hidden","hidden","Grenzfreq.(Hz): ","1");
			break  			
		case "u13.4": 
			setMainAudioPlayer("Aud",1,1024*16,processingAudioKompSubband); //lösung  3.1 
			setImputFields("visible","visible","TP-Quant-Faktor(1,2,4,8,16,..4096. , off: 66000): ","1", "visible","visible","HP-Quant-Faktor: ","1", "hidden","hidden","Grenzfreq.(Hz): ","1");
			loadPlayer(audioPlayer, audioFile, picFile);
            break 
		case "u13.5": 
			setMainAudioPlayer("Gen",1,8,processingAudioGenKompFFT); //lösung  3.1 
			setImputFields("visible","visible","Quant-Faktor(1,2,4,8,16,.. 24 Bit. , off: 88888888): ","1", "visible","visible","HP-Quant-Faktor: ","1", "visible","visible","Grenzfreq.(1-2 Hz): ","2");
			break  			
		case "u13.6": 
			setMainAudioPlayer("Aud",1,1024*16,processingAudioKompFFT); //lösung  3.1 
			setImputFields("visible","visible","TP-Quant-Faktor(1,2,4,8,16,.. 24 Bit. , off: 88888888): ","1", "visible","visible","HP-Quant-Faktor: ","1", "visible","visible","Grenzfreq.(1-16000/2 Hz): ","1000");
			loadPlayer(audioPlayer, audioFile, picFile);
            break			
		case "u13.5a": 
			setMainAudioPlayer("Gen",1,1024*8,processingAudioGenWhiteNoiseKompFFT); //lösung  3.1 
			setImputFields("visible","visible","TP-Quant-Faktor(1,2,4,8,16,.. 24 Bit. , off: 88888888): ","1", "visible","visible","HP-Quant-Faktor: ","1", "visible","visible","Grenzfreq.(1-16000/2 Hz): ","1000");
			break  			

//----------------------------------- 4--------------------
		case "u14.1": 
			setImputFields("visible","visible","Frequency(0-20000): ","1000", "hidden","hidden","???: ","1", "hidden","hidden","?????: ","1");
			setMainAudioPlayer("Gen",1,sampleRate,processingAudio41); // Default
			break  
		case "u14.2": 
			setImputFields("visible","visible","Pan(0,1,2,4,8,16,..100): ","50", "hidden","hidden","HP-Quant-Faktor: ","1", "hidden","hidden","Grenzfreq.(Hz): ","1");
			setMainAudioPlayer("Aud",2,1024,processingAudio42); //lösung  3.1 
			loadPlayer(audioPlayer, audioFile, picFile);	
			break  
		case "u14.3": 
			setImputFields("visible","visible","Mixing Level(0-100): ","50", "hidden","hidden","???: ","1", "hidden","hidden","?????: ","1");
			setMainAudioPlayer("Aud",1,1024*16,processingAudio43); 
			loadPlayer(audioPlayer, audioFile, picFile);
			break  
		case "u14.4": 
			initMeasureAudio();
			setImputFields("visible","visible","Mixing Level(0-100): ","50", "hidden","hidden","???: ","1", "hidden","hidden","?????: ","1");
			setMainAudioPlayer("Aud",1,1024*16,processingAudio44); 
			loadPlayer(audioPlayer, audioFile, picFile);
			InitCanvas('customCanvas',200,100);
			break  
		case "u14.4b":
			setImputFields("visible","visible","output-Gain dB(-96 bis +12): ","+15","visible","visible","channel: L/R/Mono:L&R(l,r,m): ","r", "hidden","hidden","?????: ","1");
			setMainAudioPlayer("Aud",1,1024*16,processingAudio44b); 
			loadPlayer(audioPlayer, audioFile, picFile);
			InitCanvas('customCanvas',750,200);
			break
		case "u14.4c": 
			setMainAudioPlayer("Aud",1,1024*16,processingAudio44c); //l?sung  3.1 
			setImputFields("hidden","hidden","Quant-Faktor(1,2,4,8,16,..4096. , off: 66000): ","64", "hidden","hidden","HP-Quant-Faktor: ","1", "hidden","hidden","Grenzfreq.(Hz): ","1");
			loadPlayer(audioPlayer, audioFile, picFile);		
			break  

		case "u14.5": 
			start_VideoCap("audio") ;
			setMainAudioPlayer("Aud",1,1024,processingAudio45); //lösung  3.1 
			setImputFields("hidden","hidden","start with https://; dB(-96 bis +12): ","-6", "hidden","hidden","???: ","1", "hidden","hidden","?????: ","1");
		//	loadPlayer(audioPlayer, audioFile, picFile);		
			break  
		case "u14.6": 
			setMainAudioPlayer("Gen",1,sampleRate,processingAudio46); // kompressor gen
			setImputFields("visible","visible","Treshold (Off:0; Value:... -96): ", "-6", "visible", "visible", "CompressionFactor (unkompressed: 1; Kompressor: ..4  Limiter: ..100 ): ","4", "visible","visible","Output-Gain (-96dB... off: 0dB .... 12dB):","15");
 			setImputFields4("visible","visible","not-Used Release(Samples:0....2000): ","44800");
            break 
		case "u14.6b": 
			setMainAudioPlayer("Aud",1,1024,processingAudio46b); // kompressor aud
			setImputFields("visible","visible","Treshold (0, -96 dB): ", "-46", "visible", "visible", "CompressionFactor (unkompressed: 1; Kompressor: ...4 limit: ..100 )","16", "visible","visible","Output-Gain (-96dB... off: 0dB .... 12dB):","15");
 			setImputFields4("visible","visible","not-Used Release(Samples:0....2000): ","2000");
 			loadPlayer(audioPlayer, audioFile2, picFile);
			 break 
		case "u14.7": 
			setMainAudioPlayer("Gen",1,sampleRate,processingAudio47); //enhancer gen
			setImputFields("visible","visible","Theshold(-96dB.... off: 0): ","-6", "visible","visible","ComFacPositiv(unkompressed: 1; Kompressor: ..4  Limiter: ..100 ): ","4", "visible","visible","ComFacNegativ((unkompressed: 1; Kompressor: ..4  Limiter: ..100 ): ","4");
			setImputFields4("visible","visible","Output-Gain(-96dB..... off: 0dB .... 12dB):","0");
            break 
		case "u14.7b": 
			setMainAudioPlayer("Aud",1,1024*16,processingAudio47b); //enhancer aud
			setImputFields("visible","visible","Theshold(-96dB.... off: 0): ","-36", "visible","visible","ComFacPositiv(unkompressed: 1; Kompressor: ..4  Limiter: ..100 ): ","1", "visible","visible","ComFacNegativ((unkompressed: 1; Kompressor: ..4  Limiter: ..100 ): ","9");
			setImputFields4("visible","visible","Output-Gain (-96dB..... off: 0dB  .... 12dB):","12");
			loadPlayer(audioPlayer, audioFile, picFile);
			 break 
		case "u14.8": // Delay Feedback
			setMainAudioPlayer("Aud",1,1024*16,processingAudio48);  //lösung 2
			setImputFields("visible","visible","Direct dB(-96 bis +12): ","0", "visible","visible","Delay dB(-96 bis +12): ","0", "visible","visible","DealyTime ms(0 bis 332): ","200");
			setImputFields4("visible","visible","Feedback (-96dB..... off: -96dB  .... 12dB):","-6");
			loadPlayer(audioPlayer, audioFile, picFile);
  			break  
		case "u14.9":  // Analyse LAutheit Delaybuffer
			initMeasureAudio();
			setMainAudioPlayer("Aud",1,1024*2,processingAudio49);  //lösung 2
			setImputFields("visible","visible","output-Gain dB(-96 bis +12): ","+15","visible","visible","channel: L/R/Mono:L&R(l,r,m): ","r", "visible","visible","Value Green dB(0 bis 96): ","2");// 2
			setImputFields4("visible","visible","Value Blue dB(0 bis 96): ","5"); // -15
			setImputFields5("visible","visible","Value Red dB(0 bis 96): ","10"); //-6
			loadPlayer(audioPlayer, audioFile, picFile);
			InitCanvas('customCanvas',750,200);
			break  
		case "u14.10": // Analyse Buffer Sampl-Dif 
			setImputFields("visible","visible","output-Gain dB(-96 bis +12): ","+15","visible","visible","channel: L/R/Mono:L&R(l,r,m): ","r", "visible","visible","Value Green dB(-96 bis 0): ","-40");
			setImputFields4("visible","visible","Value Blue dB(-96 bis 0): ","-15");
			setImputFields5("visible","visible","Value Red dB(-96 bis 0): ","-6");
			setMainAudioPlayer("Aud",1,1024*16,processingAudio410); 
			loadPlayer(audioPlayer, audioFile, picFile);
			InitCanvas('customCanvas',750,200);
			break
		case "u14.11": // Analyse Buffer Sample 
			setImputFields("visible","visible","output-Gain dB(-96 bis +12): ","+15","visible","visible","channel: L/R/Mono:L&R(l,r,m): ","r", "visible","visible","Value Green dB(-96 bis 0): ","-30");
			setImputFields4("visible","visible","Value Blue dB(-96 bis 0): ","-9");
			setImputFields5("visible","visible","Value Red dB(-96 bis 0): ","-3");
			setMainAudioPlayer("Aud",1,1024*16,processingAudio411); 
			loadPlayer(audioPlayer, audioFile, picFile);
			InitCanvas('customCanvas',750,200);
			break  
		case "u14.12": 
			setMainAudioPlayer("Aud",1,1024*16,processingAudio412); //
			setImputFields("hidden","hidden","Quant-Faktor(1,2,4,8,16,..4096. , off: 66000): ","64", "hidden","hidden","HP-Quant-Faktor: ","1", "hidden","hidden","Grenzfreq.(Hz): ","1");
			loadPlayer(audioPlayer, audioFile, picFile);		
			break  
		case "u14.13": 
			setMainAudioPlayer("Aud",1,1024*16,processingAudio413); //
			setImputFields("hidden","hidden","Quant-Faktor(1,2,4,8,16,..4096. , off: 66000): ","64", "hidden","hidden","HP-Quant-Faktor: ","1", "hidden","hidden","Grenzfreq.(Hz): ","1");
			loadPlayer(audioPlayer, audioFile, picFile);		
			break  
		case "u14.14": 
			setMainAudioPlayer("Aud",1,1024*16,processingAudio414); //
			setImputFields("hidden","hidden","Quant-Faktor(1,2,4,8,16,..4096. , off: 66000): ","64", "hidden","hidden","HP-Quant-Faktor: ","1", "hidden","hidden","Grenzfreq.(Hz): ","1");
			loadPlayer(audioPlayer, audioFile, picFile);		
			break  

 
									  
		  
				 
															 
																																												 
												 
		  
				 
															 
																																												 
												 
		  
				 
															 
																																												 
												 
		  

																			 
				 
																					  
																																												  
												
			   
				 
																						
																																													   
											   
			
				 
																					
																																																			
											   
			 
				 
																				   
																																					  
																
				  
				 
																		  
																																					  
																
											   
			 
				 
				
																			 
																																																																										  
		  
				 
			   
																	
																																																 
		  
				 
						
																		  
																																																			
												
											 
			 
				 
																			  
																																																			
																					 
											   
											 
		 
				  
																						
																					   
																																															   
																					 
											   
											 
		 
				  
																							
																					   
																																																 
																																			
																					 
																					
											   
										 
		 
				  
																					 
																																																				   
																					 
																			   
											   
										 
		 
				  
																					
																																																				   
																					   
																					 
											   
										 
		 
				  
																							
																																																				   
																					   
																					 
											   
										 
		 
				  
																								  
																																																				   
																								
																					 
											   
										 
		 
				  
																									 
																																																				 
																								  
																					 
											   
										 
		 
				  
																										
																																																				 
																								  
																					 

										 
		 
				  
																							  
																																																				   
																					 
																			   
											   
										 
		 
				  
																								  
																																																				   
																					 
																			   
											   
										 
		 

				  
																				
																																														  
																
																
																
										  
			 
				  
																					   
																																														  
																
																
																
											   
										  
				  
				  
																			 
																																																												  
																
																
																
										 
			 
				  
																					  
																																																									  
																
																
																
											   
			
			default: 
            log("keinen Prozess definiert"); 
			
        } 
}

	
function setMainVideoPlayer(iCW, iCH,iProcessingFunction){  // Canvas width, canvas hight, function processing
	AVMODE ="v";
	initVideoPlayer ();
	cw =  iCW 
	ch =  iCH;
	length= iCW*iCH*1; 
	canvas.width = iCW;
	canvas.height = iCH;
	back.width = iCW;
	back.height = iCH;
	imgW = iCW;
	imgH = iCH;  //Processing Array W and H
	iImageOut = context.createImageData(iCW, iCH);  //Processing Array W and H
	imgArrayOut = iImageOut.data;
	iImageOut2 = context.createImageData(iCW, iCH);  
	imgArrayOut2 = iImageOut2.data;
	iImageIn2 = context.createImageData(iCW, iCH);  //Processing Array W and H
	imgArrayIn2 = iImageIn2.data;
	iImageIn3 = context.createImageData(iCW, iCH);  //Processing Array W and H
	imgArrayIn3 = iImageIn2.data;
	secondLineIImageOut = context.createImageData(iCW, iCH);  //Processing Array W and H
	secondLineImgArrayOut = secondLineIImageOut.data;
	
	 BridnessSamples  = new Array(length * 1); //Uint8Array
	 ContrastSamples  = new Array(length * 1); 
 MesureSamples  = new Array(length * 1); 

	 TPsamples    = new Array(length * 1);
	 HPsamples    = new Array(length * 1);
	 SobelSamples    = new Array(length * 1);
	 secondLineBridnessSamples    = new Array(length * 1);
	 secondLineTPsamples    = new Array(length * 1);
	 secondLineHPsamples    = new Array(length * 1);
	 secondLineSobelSamples    = new Array(length * 1);	 
	 
	 DeltaSamples    = new Array(length * 1); //Int16Array
	 IDeltaSamples    = new Array(length * 1);
	 QuantSamples    = new Array(length * 1);
	 iQuantSamples    = new Array(length * 1);

	 ALengthSamples    = new Array(length * 1+1);
     TPdownsamples  = new Array(length/2 * 1+1);
     HPdownsamples  = new Array(length/2 * 1+1);

     HPquantsamples = new Array(length/2 * 1+1);
     TPquantsamples = new Array(length/2 * 1+1);
     HPIquantsamples = new Array(length/2 * 1+1);
     TPIquantsamples = new Array(length/2 * 1+1);
     TPupsamples  = new Array(length * 1+1);
     HPupsamples  = new Array(length * 1+1);
     ATPOutsamples = new Array(length * 1+1);
     AHPOutsamples = new Array(length * 1+1);
	 MixOutSamples  = new Array(length * 1+1);
     ScaleSamples = new Array(length * 1);
	 DelaySamples = new Array(length * 1); 
		 	 
	 QuantMatrix = new Array(length * 1);
	 iFFTspec = new Array(length * 1);


	 T1samples = new Array(length * 1); 
	 T2samples = new Array(length * 1); 
	 T3samples = new Array(length * 1); 
	 T3asamples = new Array(length * 1); 
	T3bsamples = new Array(length * 1); 
	T3csamples = new Array(length * 1); 
	 Tsamples = new Array(length * 1);  
	 
	GT1samples = new Array(length /4 +1);
	GT2samples = new Array(length /4 +1);
	GT3samples = new Array(length /4 +1);
	GT4samples = new Array(length /4 +1);
	GT11samples = new Array(length /2+1);
	GT12samples = new Array(length /2+1);
	GT13samples = new Array(length /2+1);
	GT14samples = new Array(length /2+1);
	GT15samples = new Array(length );
	GT16samples = new Array(length );
	GT21samples = new Array(length /8 +1);
	GT22samples = new Array(length /8 +1);
	GT23samples = new Array(length /8 +1);
	GT24samples = new Array(length /8 +1);
	GT31samples = new Array(length /16 +1);
	GT32samples = new Array(length /16 +1);
	GT33samples = new Array(length /16 +1);
	GT34samples = new Array(length /16 +1);

	vGT1samples = new Array(length /4 +1);
	vGT2samples = new Array(length /4 +1);
	vGT3samples = new Array(length /4 +1);
	vGT4samples = new Array(length /4 +1);
	vGT11samples = new Array(length /2+1);
	vGT12samples = new Array(length /2+1);
	vGT13samples = new Array(length /2+1);
	vGT14samples = new Array(length /2+1);
	vGT15samples = new Array(length );
	vGT16samples = new Array(length );
	vGT21samples = new Array(length /8 +1);
	vGT22samples = new Array(length /8 +1);
	vGT23samples = new Array(length /8 +1);
	vGT24samples = new Array((length /8 +1));
	vGT31samples = new Array(length /16 +1);
	vGT32samples = new Array(length /16 +1);
	vGT33samples = new Array(length /16 +1);
	vGT34samples = new Array(length /16 +1);	 
	
	GMixOutSamples = new Array(length * 1); 
	
	storeGT1samples = new Array(length /4 +1);
	storeGT2samples = new Array(length /4 +1);
	storeGT3samples = new Array(length /4 +1);
	storeGT4samples = new Array(length /4 +1);
	storeGT11samples = new Array(length /2+1);
	storeGT12samples = new Array(length /2+1);
	storeGT13samples = new Array(length /2+1);
	storeGT14samples = new Array(length /2+1);
	storeGT15samples = new Array(length );
	storeGT16samples = new Array(length );
	storeGT21samples = new Array(length /8 +1);
	storeGT22samples = new Array(length /8 +1);
	storeGT23samples = new Array(length /8 +1);
	storeGT24samples = new Array(length /8 +1);
	storeGT31samples = new Array(length /16 +1);
	storeGT32samples = new Array(length /16 +1);
	storeGT33samples = new Array(length /16 +1);
	storeGT34samples = new Array(length /16 +1);	 
	
	 ErrorLog  = new Array(length * 1);
	 KompressionLog = new Array(length * 1); 	
	 KompressionLogP = new Array(length * 1); 	
     visuellEditFFT = new Array(length * 1); 
		for (var i = 0; i < visuellEditFFT.length ; i++) {
		visuellEditFFT[i]=new Object();
		visuellEditFFT[i].val = 0;
		visuellEditFFT[i].val2 = 0;
		visuellEditFFT[i].r = 0;
		visuellEditFFT[i].l = 0;
		visuellEditFFT[i].r2 = 0;
		visuellEditFFT[i].l2 = 0;
		visuellEditFFT[i].procID = -1;
		}

	 
	videoPlayer.addEventListener('click', function(evt) {getMousePos(videoPlayer, evt);}, false);
	intervalId = setInterval(iProcessingFunction, 1000/frameRate);
	rundeLog=0;
	}
	

function setMainAudioPlayer(mode, channelOut, samplebufferLenght,iProcessingFunction){  // channel out , samplebuffer lenght , function processing 
    initVideoPlayer();
	bufferSize=samplebufferLenght;
	AVMODE ="a";
	monoSamples   = aContext.createBuffer(channelOut, samplebufferLenght, sampleRate);// create an audio node with 2 input and 1 output channels, and 1024 byte buffer size per audio frame	
	OutputSamples = aContext.createBuffer(channelOut, samplebufferLenght, sampleRate);// create an audio node with 2 input and 1 output channels, and 1024 byte buffer size per audio frame
	
						   
	if (mode=="Gen") {
	jsNode = aContext.createBufferSource();
	jsNode.buffer = monoSamples;
	jsNode.loop = true ; 
 	jsNode.start(0);
	intervalId = setInterval(iProcessingFunction, parseInt(monoSamples.length*1000/sampleRate/100), monoSamples); 
	}  else {
    jsNode = aContext.createScriptProcessor(samplebufferLenght, channelIn, channelOut);
    source.connect(jsNode);

    jsNode.onaudioprocess = iProcessingFunction;
	intervalId=1;
	}
	jsNode.connect(aContext.destination);
			 
																																														 
																																														
	ch =  sampleRate/100;
	rundeLog=4;

	VolumenSamples = new Float32Array(sampleRate);
	DelaySamples = new Float32Array(samplebufferLenght);	
	GainSamples = new Float32Array(samplebufferLenght);
	DelaySamples2 = new Float32Array(samplebufferLenght*2);	
	
	TPsamples    = new Float32Array(samplebufferLenght + 1);
	HPsamples    = new Float32Array(samplebufferLenght + 1);
	 
	DeltaSamples    = new Float32Array(samplebufferLenght); //Int16Array
	iDeltaSamples    = new Float32Array(samplebufferLenght);
	QuantSamples    = new Float32Array(samplebufferLenght);
	iQuantSamples    = new Float32Array(samplebufferLenght);
	DeltaSamplesP    = new Float32Array(sampleRate); //Int16Array
	iDeltaSamplesP    = new Float32Array(sampleRate);
	QuantSamplesP    = new Float32Array(sampleRate);
	iQuantSamplesP    = new Float32Array(sampleRate);	
	ErrorLog  = new Array(samplebufferLenght);
	ErrorLogP  = new Array(sampleRate);
	KompressionLog = new Array(samplebufferLenght); 
	KompressionLogP = new Array(sampleRate); 
	
	ALengthSamples    = new Float32Array(samplebufferLenght * 1+1);
     TPdownsamples  = new Float32Array((samplebufferLenght/2 * 1+1));
     HPdownsamples  = new Float32Array((samplebufferLenght/2 * 1+1));
     HPquantsamples = new Float32Array((samplebufferLenght/2 * 1+1));
     TPquantsamples = new Float32Array((samplebufferLenght/2 * 1+1));
     HPIquantsamples = new Float32Array((samplebufferLenght/2 * 1+1));
     TPIquantsamples = new Float32Array((samplebufferLenght/2 * 1+1));
	 
	 G2ALengthSamples    = new Float32Array(samplebufferLenght/2 * 1+1);
     G2TPdownsamples  = new Float32Array((samplebufferLenght/4 * 1+1));
     G2HPdownsamples  = new Float32Array((samplebufferLenght/4 * 1+1));
     G2HPquantsamples = new Float32Array((samplebufferLenght/4 * 1+1));
     G2TPquantsamples = new Float32Array((samplebufferLenght/4 * 1+1));
     G2HPIquantsamples = new Float32Array((samplebufferLenght/4 * 1+1));
     G2TPIquantsamples = new Float32Array((samplebufferLenght/4 * 1+1));
 
 	 G3ALengthSamples    = new Float32Array(samplebufferLenght/4 * 1+1);
     G3TPdownsamples  = new Float32Array((samplebufferLenght/8 * 1+1));
     G3HPdownsamples  = new Float32Array((samplebufferLenght/8 * 1+1));
     G3HPquantsamples = new Float32Array((samplebufferLenght/8 * 1+1));
     G3TPquantsamples = new Float32Array((samplebufferLenght/8 * 1+1));
     G3HPIquantsamples = new Float32Array((samplebufferLenght/8 * 1+1));
     G3TPIquantsamples = new Float32Array((samplebufferLenght/8 * 1+1));

 	 G4ALengthSamples    = new Float32Array(samplebufferLenght/8 * 1+1);
     G4TPdownsamples  = new Float32Array((samplebufferLenght/16 * 1+1));
     G4HPdownsamples  = new Float32Array((samplebufferLenght/16 * 1+1));
     G4HPquantsamples = new Float32Array((samplebufferLenght/16 * 1+1));
     G4TPquantsamples = new Float32Array((samplebufferLenght/16 * 1+1));
     G4HPIquantsamples = new Float32Array((samplebufferLenght/16 * 1+1));
     G4TPIquantsamples = new Float32Array((samplebufferLenght/16 * 1+1));

 	 G5ALengthSamples    = new Float32Array(samplebufferLenght/16 * 1+1);
     G5TPdownsamples  = new Float32Array((samplebufferLenght/32 * 1+1));
     G5HPdownsamples  = new Float32Array((samplebufferLenght/32 * 1+1));
     G5HPquantsamples = new Float32Array((samplebufferLenght/32 * 1+1));
     G5TPquantsamples = new Float32Array((samplebufferLenght/32 * 1+1));
     G5HPIquantsamples = new Float32Array((samplebufferLenght/32 * 1+1));
     G5TPIquantsamples = new Float32Array((samplebufferLenght/32 * 1+1));
	
	GMixOutSamples = new Float32Array(samplebufferLenght * 1);
	
     TPupsamples  = new Float32Array(samplebufferLenght * 1+1);
     HPupsamples  = new Float32Array(samplebufferLenght * 1+1);
     ATPOutsamples = new Float32Array(samplebufferLenght * 1+1);
     AHPOutsamples = new Float32Array(samplebufferLenght * 1+1);
	 MixOutSamples  = new Float32Array(samplebufferLenght * 1+1);
     ScaleSamples = new Float32Array(samplebufferLenght * 1);
     OutSamples = new Float32Array(samplebufferLenght * 1);
	 
	TPsamplesP    = new Float32Array(sampleRate + 1);
	HPsamplesP    = new Float32Array(sampleRate + 1);
	
	ALengthSamplesP    = new Float32Array(sampleRate * 1+1);
     TPdownsamplesP  = new Float32Array((sampleRate/2 * 1+1));
     HPdownsamplesP  = new Float32Array((sampleRate/2 * 1+1));
     HPquantsamplesP = new Float32Array((sampleRate/2 * 1+1));
     TPquantsamplesP = new Float32Array((sampleRate/2 * 1+1));
     HPIquantsamplesP = new Float32Array((sampleRate/2 * 1+1));
     TPIquantsamplesP = new Float32Array((sampleRate/2 * 1+1));
     TPupsamplesP  = new Float32Array(sampleRate * 1+1);
     HPupsamplesP  = new Float32Array(sampleRate * 1+1);
     ATPOutsamplesP = new Float32Array(sampleRate * 1+1);
     AHPOutsamplesP = new Float32Array(sampleRate * 1+1);
	 MixOutSamplesP  = new Float32Array(sampleRate * 1+1);
     ScaleSamplesP = new Float32Array(sampleRate * 1); 
	 DelaySamplesP = new Float32Array(sampleRate * 1); 

	 
	FFTKoef = new FFT_1D(samplebufferLenght, samplebufferLenght); 
	QuantFFT = new FFT_1D(samplebufferLenght, samplebufferLenght); 
	iQuantFFT = new FFT_1D(samplebufferLenght, samplebufferLenght); 
	iInverseFFT = new FFT_1D(samplebufferLenght, samplebufferLenght); 
	QuantMatrix = new Array(samplebufferLenght); 
	FFTKoefP = new FFT_1D(samplebufferLenght, sampleRate); 
	QuantFFTP = new FFT_1D(samplebufferLenght, sampleRate); 
	EditFFTP = new FFT_1D(samplebufferLenght, sampleRate); 
	EditFFTP2 = new FFT_1D(samplebufferLenght, sampleRate); 
	StoreFFTP = new FFT_1D(samplebufferLenght, sampleRate); 
	Store2FFTP = new FFT_1D(samplebufferLenght, sampleRate); 
	DifFFTP = new FFT_1D(samplebufferLenght, sampleRate); 
	
	iQuantFFTP = new FFT_1D(samplebufferLenght, sampleRate); 
	iInverseFFTP = new FFT_1D(samplebufferLenght, sampleRate); 
	QuantMatrixP = new Array(sampleRate); 
	volumenFFT = new FFT_1D(samplebufferLenght, samplebufferLenght); 
	visuellEditFFTP = new Array(samplebufferLenght); 
		for (var i = 0; i < visuellEditFFTP.length ; i++) {
		visuellEditFFTP[i]=new Object();
		visuellEditFFTP[i].val = 0;
		visuellEditFFTP[i].val2 = 0;
		visuellEditFFTP[i].r = 0;
		visuellEditFFTP[i].l = 0;
		visuellEditFFTP[i].r2 = 0;
		visuellEditFFTP[i].l2 = 0;
		visuellEditFFTP[i].procID = -1;
		}
	}
function loadPlayer(iPlayer,iFile, iCanvasBackgroundPicture){ 
	canvas.style.background = "url("+ iCanvasBackgroundPicture +")"; // load Background Picture 
	iPlayer.src = iFile;  
	iPlayer.load();
	iPlayer.play();
}
function setImputFields(iLabelIn1Styl,iIn1Styl,iLabelIn1 ,iIn1, iLabelIn2Styl,iIn2Styl, iLabelIn2,iIn2, iLabelIn3Styl,iIn3Styl, iLabelIn3,iIn3 ) {
    document.getElementById("labelIn1").style.visibility =  iLabelIn1Styl;  	//"visible";
    document.getElementById("In1").style.visibility = iIn1Styl;  				//"visible"; 
	document.getElementById("labelIn1").innerHTML= iLabelIn1;					//"TP-Quant-Faktor: ";
	document.getElementById("In1").value= iIn1;  								//"1";

    document.getElementById("labelIn2").style.visibility =  iLabelIn2Styl;  	// "visible"; 
    document.getElementById("In2").style.visibility = iIn2Styl; 				//"visible"; 
	document.getElementById("labelIn2").innerHTML= iLabelIn2;					//"HP-Quant-Faktor: ";
	document.getElementById("In2").value= iIn2;  								//"1";
	
    document.getElementById("labelIn3").style.visibility = iLabelIn3Styl;      //"hidden"; 
    document.getElementById("In3").style.visibility = iIn3Styl;                // "hidden"; 
	document.getElementById("labelIn3").innerHTML= iLabelIn3;				   //"Grenzfreq.(Hz): ";
	document.getElementById("In3").value = iIn3;                               //"2";

	setImputFields4("hidden","hidden","Amplitude(0 bis  - 200): ","10");
	setImputFields5("hidden","hidden","Amplitude(0 bis  - 200): ","10");	
	setImputFields6("hidden","hidden","Amplitude(0 bis  - 200): ","10");	
}

function setImputFields4(iLabelIn1Styl,iIn1Styl,iLabelIn1 ,iIn1) {
    document.getElementById("labelIn4").style.visibility =  iLabelIn1Styl;  	//"visible";
    document.getElementById("In4").style.visibility = iIn1Styl;  				//"visible"; 
	document.getElementById("labelIn4").innerHTML= iLabelIn1;					//"TP-Quant-Faktor: ";
	document.getElementById("In4").value= iIn1;  								//"1";

 
}
function setImputFields5(iLabelIn1Styl,iIn1Styl,iLabelIn1 ,iIn1) {
    document.getElementById("labelIn5").style.visibility =  iLabelIn1Styl;  	//"visible";
    document.getElementById("In5").style.visibility = iIn1Styl;  				//"visible"; 
	document.getElementById("labelIn5").innerHTML= iLabelIn1;					//"TP-Quant-Faktor: ";
	document.getElementById("In5").value= iIn1;  								//"1";

 
}
function setImputFields6(iLabelIn1Styl,iIn1Styl,iLabelIn1 ,iIn1) {
    document.getElementById("labelIn6").style.visibility =  iLabelIn1Styl;  	//"visible";
    document.getElementById("In6").style.visibility = iIn1Styl;  				//"visible"; 
	document.getElementById("labelIn6").innerHTML= iLabelIn1;					//"TP-Quant-Faktor: ";
	document.getElementById("In6").value= iIn1;  								//"1";

 
}