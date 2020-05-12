
//dat.gui
var text;
//rotate_y_speed
var speed = 0.001;

  // キューブ
  var cube;
  var geometry ;
  var material ;

  var radius = 30;
  var radialSegments = 10;
  var tubularSegments = 64;
  var arc = 10;

//https://workshop.chromeexperiments.com/examples/gui/#1--Basic-Usage
var FizzyText = function() {
  //this.message = 'dat.gui';
  this.speed = 0.001;
  this.color = 0x6699FF;
  this.radius = 30;
  this.radialSegments = 10;
  this.tubularSegments = 64;
  this.arc = 10;
  this.wireframe = false;
  this.material = "B";
  //this.displayOutline = false;
  //this.explode = function() { };
  // Define render logic ...
};

window.onload = function() {
  text = new FizzyText();
  var gui = new dat.GUI();
  SetValue();
  // gui.add(text, 'message');
  var f1 = gui.addFolder('operation of Torus');
  f1.add(text, 'speed', { Stopped: 0, Slow: 0.01, Fast: 0.1 }).onChange(SetValue);
  f1.addColor(text, 'color').onChange(SetValue);
  f1.add(text,'radius',0,200).onChange(SetValue);
  f1.add(text,'radialSegments',0,200).onChange(SetValue);
  f1.add(text,'tubularSegments',0,100).onChange(SetValue);
  f1.add(text,'arc',3,100).onChange(SetValue);
  f1.add(text,'wireframe').onChange(SetValue);
  f1.add(text,'material',{ Basic: "B", Normal: "N", Lambert: "L" , Phong: "P" , Toon: "T" ,Standard: "S"}).onChange(SetValue);
 // gui.add(text, 'explode');
};

function SetValue(){
  speed = text.speed;
  radius = text.radius;
  radialSegments = text.radialSegments;
  tubularSegments = text.tubularSegments;
  arc = text.arc;

  scene.remove( cube );
  geometry.dispose();
  material.dispose();

  switch(text.material){ //https://ics.media/tutorial-three/material_variation/
    case "B":
      material = new THREE.MeshBasicMaterial({color: text.color, wireframe: text.wireframe});
      break;
    case "N":
      material = new THREE.MeshNormalMaterial({wireframe: text.wireframe});
      break;
    case "L":
      material = new THREE.MeshLambertMaterial({color: text.color, wireframe: text.wireframe});
      break;
    case "P":
      material = new THREE.MeshPhongMaterial({color: text.color, wireframe: text.wireframe});
      break;
    case "T":
      material = new THREE.MeshToonMaterial({color: text.color, wireframe: text.wireframe});
      break;
    case "S":
      material = new THREE.MeshStandardMaterial({color: text.color, wireframe: text.wireframe});
      break;
  }
  

  geometry = new THREE.TorusGeometry(radius, radialSegments, tubularSegments, arc);
  
  cube = new THREE.Mesh( geometry, material);
  cube.position.set(0,0,0);
  scene.add(cube);
}

//シーン　カメラ　レンダラー
let scene, camera, renderer;

// 幅、高さ取得
const width  = window.innerWidth;
const height = window.innerHeight;

const group = new THREE.Group();

function init(){

//シーン作成
scene  = new THREE.Scene();


//カメラ作成
const cfov = 45;                 //カメラ錐台垂直視野
const caspect = width / height;  //カメラの錐台アスペクト比。
const cnear = 1;                 //飛行機の近くのカメラ錐台。
const cfar = 2000;               //カメラ錐台遠方面。
camera = new THREE.PerspectiveCamera(cfov , caspect , cnear , cfar);
camera.position.set(0, 0, 150);

//レンダラー作成

renderer = new THREE.WebGLRenderer({
  antialias:true
});
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);


// 平行光源を作成
 const directionalLight = new THREE.DirectionalLight(0xffffff,1.0);
 directionalLight.position.set(1, 1, 1);
 scene.add(directionalLight);
 // 環境光を追加
 const ambientLight = new THREE.AmbientLight(0xffffff,1.0);
 scene.add(ambientLight);

 material = new THREE.MeshStandardMaterial({color: 0x6699FF});

 geometry = new THREE.TorusGeometry(radius, radialSegments, tubularSegments, arc);
 

    cube = new THREE.Mesh( geometry, material);
    cube.position.set(0,0,0);
    scene.add(cube);

  animate();
}

function render() {
  renderer.render( scene, camera );
}


function animate(){
  cube.rotateY(speed);
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

init();
