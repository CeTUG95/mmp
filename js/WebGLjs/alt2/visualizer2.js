var scene = new THREE.Scene();
var camera ;//= new THREE.PerspectiveCamera(100, $(window).width() / $(window).height(), 1, 1000);
var renderer = new THREE.WebGLRenderer();
var cubes = new Array();
var controls;
var CubeKoef;
var gridOffset;

function initVisualizer(iCubeKief,yOffset,igridOffset,xOrbit,yOrbit,zOrbit,zoomOrbit) {
camera = new THREE.PerspectiveCamera(zoomOrbit, $(window).width() / $(window).height(), 1, 100);
gridOffset=igridOffset;
CubeKoef = iCubeKief;
	renderer.setClearColor(0x303050);
	document.body.appendChild(renderer.domElement);
 //   var yOffset=-20;
	var i = 0;
	for(var x = CubeKoef; x > 0; x -= 1) {
		var j = 0;
		cubes[i] = new Array();
		for(var y = 0; y < CubeKoef; y += 1) {
			var geometry = new THREE.CubeGeometry(.5, .5, .5);
			
			var material = new THREE.MeshPhongMaterial({
				color: FairColor(i,j),
				ambient: 0x808080,
				specular: 0xffffff,
				shininess: 20,
				reflectivity: 5.5 
			});
			
			cubes[i][j] = new THREE.Mesh(geometry, material);
			cubes[i][j].position = new THREE.Vector3(y+yOffset, x, 0);
			
			scene.add(cubes[i][j]);
			j++;
		}
		i++;
	}

	var light = new THREE.AmbientLight(0x505050);
	scene.add(light);

	var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
	directionalLight.position.set(0, 1, 1);
	scene.add(directionalLight);

	directionalLight = new THREE.DirectionalLight(0xffffff, 0.1);
	directionalLight.position.set(1, 1, 0);
	scene.add(directionalLight);


	directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
	directionalLight.position.set(0, -1, -1);
	scene.add(directionalLight);

	directionalLight = new THREE.DirectionalLight(0xffffff, 0.1);
	directionalLight.position.set(-1, -1, 0);
	scene.add(directionalLight);


	camera.position.x = xOrbit;
	camera.position.y = yOrbit;
	camera.position.z = zOrbit;
	
	controls = new THREE.OrbitControls(camera);
	controls.addEventListener('change', render);

	for(var i = 0; i < 7; i++) {
		controls.pan(new THREE.Vector3( 1, 0, 0 ));
		controls.pan(new THREE.Vector3( 0, 1, 0 ));
	}
	
render();
renderer.setSize($(window).width(), $(window).height());
}
var render = function () {

	if(typeof freqByteData === 'object' && freqByteData.length > 0) {
var k = 0;
	//var k = (CubeKoef*2)*(CubeKoef*2)/2;
		for(var i = 0; i < cubes.length; i++) {
			for(var j = 0; j < cubes[i].length; j++) {
				var boost = 0.2;
			//	k=((i*CubeKoef*2))+(j+CubeKoef); //65536/2 =32768-32896 = -128   -> 0Hz=255 i=32896
				var scale = (freqByteData[k] * boost) ;
				//var scale = (freqByteData[k] + boost) / CubeKoef;

				cubes[i][j].scale.z = (scale < 1 ? 1 : scale);
				k += (k < freqByteData.length ? 1 : 0);
			}
		}
	}

	requestAnimationFrame(render);
	controls.update();
	renderer.render(scene, camera);
};


function randomFairColor() {
	var min = 64;
	var max = 224;
	var r = (Math.floor(Math.random() * (max - min + 1)) + min) * 65536;
	var g = (Math.floor(Math.random() * (max - min + 1)) + min) * 256;
	var b = (Math.floor(Math.random() * (max - min + 1)) + min);

	return r + g + b;
}
function FairColor(iy,ix) {
	var min = 30;
	var max = 220;
	if (iy%10!=gridOffset && ix%10!=gridOffset){
	var r = (Math.floor((ix+iy-10)/2*51))* 65536;
	var g = (Math.floor((max - min + 1)) ) *256 ;
	var b = (Math.floor((ix+iy-10)/2*51));
	} else {
	var r = (min-20) * 65536;
	var g = (min-10)* 256;
	var b = (min-20);
	}
/*//	console.log(iy);
	if (iy==zeileFFT && ix==columnFFT) {
		var r = (150) * 65536;
		var g = 0;
		var b = 0;
	}
*/
	return r + g + b;
}
