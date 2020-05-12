
//シーン　カメラ　レンダラー
let scene, camera, renderer;

// 幅、高さ取得
const width  = window.innerWidth;
const height = window.innerHeight;

const geometrysize = 100;
var boxes = new THREE.Group();

let mesh; //立方体

let box1;  //テクスチャ

let shere;//バンプマップ

let box2 // 法線マップのみ

function init(){
  
  //シーン作成
  scene  = new THREE.Scene();

  // フォグを設定
  const fcolor = 0x000000;
  const fnear = 100;
  const ffar = 2000;
  scene.fog = new THREE.Fog(fcolor, fnear, ffar);

  //カメラ作成
  const cfov = 45;                 //カメラ錐台垂直視野
  const caspect = width / height;  //カメラの錐台アスペクト比。
  const cnear = 1;                 //飛行機の近くのカメラ錐台。
  const cfar = 2000;               //カメラ錐台遠方面。
  camera = new THREE.PerspectiveCamera(cfov , caspect , cnear , cfar);
  camera.position.set(0, 0, 1000);

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


  let controls = new THREE.OrbitControls(camera);
  controls.addEventListener('change',render);
  controls.minDistance = 300;
  controls.maxDistance = 1500;






  const material = new THREE.MeshStandardMaterial();
  const geometry = new THREE.BoxBufferGeometry(geometrysize, geometrysize, geometrysize);

  mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(geometrysize * 1.5, 0, 0);
  boxes.add(mesh);

  var texture = new THREE.TextureLoader().load( 'Metal Pattern.jpg' );

  // loader.load("Metal Pattern.jpg", function(texture){

      box1 = createBox(texture);
      shere = createbumpbox(texture);

      box2 = createonlybumpbox();

  //     render();
  // });



  //   console.log(mesh);
  // console.log(box1);
  // console.log(shere);
  scene.add(boxes);



  animate();
}

function render() {
  renderer.render( scene, camera );
}

function createBox(texture){
  var box = new THREE.Mesh(
    new THREE.BoxGeometry(geometrysize, geometrysize, geometrysize),
    new THREE.MeshLambertMaterial({map: texture})  // {map: texture}がキモ
  );
  box.position.set(0, 0, 0);

  // シーンに追加
  boxes.add(box);

  return box;
}

function createbumpbox(texture){ //http://gupuru.hatenablog.jp/entry/2013/12/10/210928
  var bumptexture  = new THREE.ImageUtils.loadTexture('NormalMap (2).png');

  //球の生成と宣言
  var box = new THREE.Mesh(                                         
  new THREE.BoxGeometry(100, 100, 100),                 
  new THREE.MeshPhongMaterial({                                
    map:texture,bumpMap:bumptexture, bumpScale: 0.5,specular: 0x888888, shininess:10, ambient: 0xaaaaaa
    }));
  box.position.set(-150, 0, 0);
  //シーンオブジェクトに追加         
  boxes.add(box);   

  return box;

}

function createonlybumpbox(){
  var bumptexture  = new THREE.ImageUtils.loadTexture('NormalMap (2).png');

  //球の生成と宣言
  var box = new THREE.Mesh(                                         
  new THREE.BoxGeometry(100, 100, 100),                 
  new THREE.MeshPhongMaterial({                                
    bumpMap:bumptexture, bumpScale: 300 }));
  box.position.set(-300, 0, 0);
  //シーンオブジェクトに追加         
  boxes.add(box);   

  return box;
}



function animate(){

  boxes.rotation.x +=0.01;

  mesh.rotation.y += 0.01;
  box1.rotation.y += 0.01;
  shere.rotation.y += 0.01;
  box2.rotation.y += 0.01;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

init();
