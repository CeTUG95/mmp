/**
 * Created by Juergen Lohr on 1.9.2016.
 */
//------------------------------------------------Video----------------------------

/****************************************************
 * Video 1.4 Gleitfarbe
 ****************************************************/

var sceneCounter = 0;

function processingVideoGenColorVari() {
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

/****************************************************
 * Video 1.4 Farbskalierung
 ****************************************************/

function processingVideoColor() {
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

/****************************************************
 * Video 1.5 a) Wahrnehmungsanalyse
 ****************************************************/

function processingVideoPerception(event) {
  var clip1StartTime = 15000;
  var clip1DurationTime = 6000;
  var clip1Transperency = parseFloat(document.getElementById("In1").value);

  imgArrayIn = readCanvas(videoPlayer, 1);
  // Process chain begin

  setClipTransperency(videoPlayer, imgArrayOut, imgArrayIn, clip1Transperency, clip1StartTime, clip1DurationTime);
  // Process chain end
  writeCanvas(iImageOut);

  LogArray = ["imgArrayIn", "imgArrayOut"];
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

/****************************************************
 * Video 1.5 b) Measurement
 ****************************************************/

function processingVideoMeasurement(event) {
  value = parseFloat(document.getElementById("In1").value);
  imgArrayIn = readCanvas(videoPlayer, 1);
  initCanvasVideo();
  videoMeasurementHisto(imgArrayIn, value);

  LogArray = ["imgArrayIn", "imgArrayOut"];
}

var videoHist_minValue = 256;
var videoHist_maxValue = 0;

function videoMeasurementHisto(imgPixel, value) {
  let histo = new Array(256).fill(0); //gray
  let histoR = new Array(256).fill(0);
  let histoG = new Array(256).fill(0);
  let histoB = new Array(256).fill(0);

  for (var i = 0; i < imgPixel.length / 4; i += 4) {
    var r = imgPixel[i];
    var g = imgPixel[i + 1];
    var b = imgPixel[i + 2];
    var y = Math.round(0.299 * r + 0.587 * g + 0.114 * b);

    histo[y]++;
    histoR[r]++;
    histoG[g]++;
    histoB[b]++;
    // histo[255] = 255; // Eichwert

    if (y > videoHist_maxValue) {
      videoHist_maxValue = y;
    } else if (y < videoHist_minValue) {
      videoHist_minValue = y;
    }
  }

  if (value == 1 || value == 5) {
    histoR.forEach(function (elem, index) {
      drawHistoVideo(elem, index, "red");
    });
  }
  if (value == 2 || value == 5) {
    histoG.forEach(function (elem, index) {
      drawHistoVideo(elem, index, "green");
    });
  }

  if (value == 3 || value == 5) {
    histoB.forEach(function (elem, index) {
      drawHistoVideo(elem, index, "blue");
    });
  }

  if (value == 4 || value == 5) {
    histo.forEach(function (elem, index) {
      drawHistoVideo(elem, index, "#cccccc");
    });
  }
}

function drawHistoVideo(value, position, color) {
  var ctx = canvas.getContext("2d");
  ctx.fillStyle = color;
  ctx.fillRect(
    canvasOptions.textOffset,
    canvasOptions.zeroPoint + position,
    value,
    1
  );
}

function initCanvasVideo() {
  var iMaxValue = 1200;
  var steps = 24;

  var ctx = canvas.getContext("2d");
  canvas.width = iMaxValue;
  canvas.height = 350;
  ctx.textBaseline = "middle";
  ctx.font = "15px Courier-New";
  ctx.fillStyle = "#000000";
  ctx.fillText("Lowest Value found: " + Math.round(videoHist_minValue) + " Hightest Value found: " + Math.round(videoHist_maxValue), 0, 10);
  ctx.fillText(0, 0, canvasOptions.zeroPoint);
  ctx.fillText(255, 0, 307);
  ctx.fillText("y: Auftritte, x: Pixelwerte (0 bis 255)", 20, canvas.height - 30);

  ctx.beginPath();

  for (var i = 0; i <= iMaxValue; i += (iMaxValue / steps)) {
    ctx.moveTo(canvasOptions.textOffset + i, canvasOptions.zeroPoint);//0
    ctx.lineTo(canvasOptions.textOffset + i, 307);
    ctx.fillText(i, 25 + i, 40);
    ctx.stroke();
  }

  ctx.moveTo(canvasOptions.textOffset, 50);//0
  ctx.lineTo(iMaxValue + 20, 50);
  ctx.moveTo(canvasOptions.textOffset, 307);//255
  ctx.lineTo(iMaxValue + 20, 307);
  ctx.stroke();
}

/****************************************************
 * Video 1.6 Capture Video
 ****************************************************/

function processingVideoCapture(event) {
  // Beispielhaft das Histogramm aus der vorherigen Teilübung
  value = parseFloat(document.getElementById("In1").value);
  imgArrayIn = readCanvas(videoPlayer, 1);
  initCanvasVideo();
  videoMeasurementHisto(imgArrayIn, value);

  LogArray = ["imgArrayIn", "imgArrayOut"];
}

function initConstraintsVideo() {
  // initialisieren
  var constraints = {
    audio: false,
    video: {
      mandatory: {
        maxWidth: 720,
        maxHeight: 404
      }
    }
  };

  navigator.mediaDevices.getUserMedia(constraints).then(gotStreamVideo).catch(noStreamVideo);
}

function gotStreamVideo(stream) {
  // stream zuweisen
  videoStream = stream;
  try {
    videoPlayer.srcObject = stream;
  } catch (error) {
    videoPlayer.src = window.URL.createObjectURL(stream);
  }
  // wiedergabe starten
  videoPlayer.play();
}

function noStreamVideo() {
  console.log("An error occurred");
}

function processingVideo46() {

}

function processingVideo47() {

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

/****************************************************
 * Audio 1.1 Gleitton
 ****************************************************/
var count = 0;

function processingAudioGenVari(event) {
  var startFrequency = parseFloat(document.getElementById("In1").value);
  var endFrequency = parseFloat(document.getElementById("In2").value);
  // Process chain begin    
  genSinus(monoSamples, startFrequency, endFrequency);
  // Process chain end
  writeWebAudio(event, monoSamples);
  LogArray = ["monoSamples"];  // Define Logging name of array object.
}

function genSinus(iOutput, start, end) {
  var maxAmpl = 1;
  var fs = 48000;
  var phi = 0;

  for (i = 0; i < iOutput.length; ++i) {
    var at = maxAmpl * Math.sin(2 * Math.PI * (count + start) / fs * i + phi)
    iOutput[i] = at;
  }

  if (count <= end - start) {
    count += 10;
  } else {
    count = 0;
  }
}

/****************************************************
 * Audio 1.1 Panorama
 ****************************************************/

function processingAudioPan(event) {
  audArrayIn = readWebAudio(event);
  var value = parseFloat(document.getElementById("In1").value);

  audioPan(monoSamples, audArrayIn, value);

  writeWebAudio(event.outputBuffer, monoSamples);
  LogArray = ["monoSamples", "audArrayIn.l", "audArrayIn.r"];
}

function audioPan(iOutput, iInput, iValueR) {
  vl = (100 - iValueR) / 100;
  vr = iValueR / 100;
  for (var i = 0; i < iOutput.length; i++) {
    iOutput[i] = parseFloat(iInput.l[i]) * vl + parseFloat(iInput.r[i]) * vr; // writing to Monooutput
    // for stereo-output
    // iOutput.r[i] = parseFloat(iInput.r[i]) * vr;
    // iOutput.l[i] = parseFloat(iInput.l[i]) * vl);
  }
}

/****************************************************
 * Audio 1.2 a) Wahrnemungsanalys
 ****************************************************/

function processingAudioPerception(event) {
  var clip1StartTime = 15000;
  var clip1DurationTime = 6000;
  var clip1Mixing = parseFloat(document.getElementById("In1").value);

  audArrayIn = readWebAudio(event);

  StereoSelectOneChannel(monoSamples, audArrayIn, "l");
  StereoSelectOneChannel(VolumenSamples, audArrayIn, "r");
  audioPerception(audioPlayer, OutSamples, monoSamples, VolumenSamples, clip1Mixing, clip1StartTime, clip1DurationTime);

  writeWebAudio(event.outputBuffer, OutSamples);

  LogArray = ["audArrayIn", "monoSamples", "VolumenSamples", "OutSamples"];

}

function audioPerception(iPlayer, iOutput, iInput1, iInput2, mixingValue, startTime, durationTime) {
  iCurrentTime = iPlayer.currentTime;
  durationTime += startTime;
  startTime /= 1000;
  durationTime /= 1000;

  if ((iCurrentTime > durationTime) || (iCurrentTime < startTime)) {
    iPlayer.currentTime = startTime;
  }

  mixingValue /= 100;
  for (var i = 0, n = iOutput.length; i < n; i += 1) {
    iOutput[i] = mixingValue * iInput1[i] + (1 - mixingValue) * iInput2[i];
  }
}

/****************************************************
 * Audio 1.2 b) Measurement
 ****************************************************/

let canvasOptions = new Object();
canvasOptions.zeroPoint = 50;
canvasOptions.textOffset = 20;

let measureAmplAudio = new Object();
measureAmplAudio.min = -96;
measureAmplAudio.max = 0;
measureAmplAudio.low = -23;
measureAmplAudio.high = -9;
measureAmplAudio.optimum = -90;

let globalMaxValuedB = 0;
let globalMaxCountdB = 0;

function audioMeasurementHisto(iOutput, audArrayIn) {
  let maxValuedB = 0;
  let maxCountdB = 0;
  let maxCount = 0;
  let histo = new Array(150).fill(0);

  for (var i = 0; i < audArrayIn.l.length; i++) {
    let l = parseFloat(audArrayIn.l[i]);
    let r = parseFloat(audArrayIn.r[i]);
    let dBValue = Math.round(Math.abs(db(l + r)));
    histo[dBValue]++;
    if (dBValue > maxValuedB) {
      maxValuedB = dBValue;
    }
    if (histo[dBValue] > maxCount) {
      maxCountdB = dBValue;
    }
    //histo[96] = 500; //NOTE: eichwert
    //histo[9] = 500;
    iOutput[i] = l + r;
  }
  globalMaxValuedB = maxValuedB;
  globalMaxCountdB = maxCountdB;

  histo.forEach(function (elem, index) {
    drawHisto(elem, index, "#cccccc");
  })

  drawHisto(10, globalMaxValuedB, "red");
  drawHisto(10, globalMaxCountdB, "red");
}

function initCanvas() {
  var iMaxValue = 1000;
  var steps = 20;

  var ctx = canvas.getContext("2d");
  canvas.width = iMaxValue;
  canvas.height = 300;
  ctx.textBaseline = "middle";
  ctx.font = "15px Courier-New";
  ctx.fillStyle = "#000000";
  ctx.fillText("Lowest Value found: -" + globalMaxValuedB + "dB" + "    Most counted at: -" + globalMaxCountdB + "dB", 0, 10);
  ctx.fillText(measureAmplAudio.max, 0, canvasOptions.zeroPoint);
  ctx.fillText("-9", 0, 59);
  ctx.fillText(measureAmplAudio.min, 0, 148);
  ctx.fillText("y: Auftritte, x: Amplitude (0 bis -96)", 20, canvas.height - 20);

  ctx.beginPath();

  for (var i = 0; i <= iMaxValue; i += (iMaxValue / steps)) {
    ctx.moveTo(canvasOptions.textOffset + i, canvasOptions.zeroPoint);//0
    ctx.lineTo(canvasOptions.textOffset + i, canvas.height - 50);
    ctx.fillText(i, 25 + i, 40);
    ctx.stroke();
  }

  ctx.moveTo(canvasOptions.textOffset, 50);//0
  ctx.lineTo(iMaxValue, 50);
  ctx.moveTo(canvasOptions.textOffset, 59);
  ctx.lineTo(iMaxValue, 59);
  ctx.moveTo(canvasOptions.textOffset, 146.5);//96
  ctx.lineTo(iMaxValue, 146.5);
  ctx.stroke();
}


function drawHisto(value, position, color) {
  var ctx = canvas.getContext("2d");
  ctx.fillStyle = color;
  ctx.fillRect(
    canvasOptions.textOffset,
    canvasOptions.zeroPoint + position,
    value,
    1
  );
}

function processingAudioMeasurement(event) {
  audArrayIn = readWebAudio(event);

  initCanvas();
  audioMeasurementHisto(monoSamples, audArrayIn);

  writeWebAudio(event.outputBuffer, monoSamples);
  LogArray = ["monoSamples", "audArrayIn.l", "audArrayIn.r"];

}

/****************************************************
 * Audio 1.3 Capture
 ****************************************************/

function processingAudioCapture(event) {
  // Verarbeitung des Streams wäre hier
}

function initConstraints() {
  // initialisieren
  var constraints = {
    audio: {
      mandatory: {
        echoCancellation: false,
        googAutoGainControl: false,
        googNoiseSuppression: false,
        googHighpassFilter: false,
        googAutoGainControl2: false
      }
    },
    video: false
  };

  navigator.mediaDevices.getUserMedia(constraints).then(gotStream).catch(noStream);
}

function gotStream(stream) {
  // stream zuweisen
  audioStream = stream;
  try {
    audioPlayer.srcObject = stream;
  } catch (error) {
    audioPlayer.src = window.URL.createObjectURL(stream);
  }
  // wiedergabe starten
  audioPlayer.play();
  // audio-context zuweisen
  realAudioInput = aContext.createMediaStreamSource(stream);
  realAudioInput.connect(jsNode);
}

function noStream() {
  console.log("An error occurred");
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
