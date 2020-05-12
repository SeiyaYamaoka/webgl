
//シーン　カメラ　レンダラー
let scene, camera, renderer;

// 幅、高さ取得
const width  = window.innerWidth;
const height = window.innerHeight;

const group = new THREE.Group();

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
   const directionalLight = new THREE.DirectionalLight(0x0000ff,2);
   directionalLight.position.set(1, 1, 1);
   scene.add(directionalLight);
   // 環境光を追加
   const ambientLight = new THREE.AmbientLight(0x000000);
   scene.add(ambientLight);


  let controls = new THREE.OrbitControls(camera);
  controls.addEventListener('change',render);
  controls.minDistance = 500;
  controls.maxDistance = 1500;

  // グループを作成

  scene.add(group);

  const material = new THREE.MeshStandardMaterial();

  for (let i = 0; i < 500; i++) {
    const x = Math.random()*100;
    const y = Math.random()*100;
    const z = Math.random()*100;
    const geometry = new THREE.BoxBufferGeometry(x, y, z);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = (Math.random() - 0.5) * 1400;
    mesh.position.y = (Math.random() - 0.5) * 1400;
    mesh.position.z = (Math.random() - 0.5) * 1400;
    mesh.rotation.x = Math.random() * 2 * Math.PI;
    mesh.rotation.y = Math.random() * 2 * Math.PI;
    mesh.rotation.z = Math.random() * 2 * Math.PI;
    // グループに格納する
    group.add(mesh);
  }


  animate();
}

function render() {
  renderer.render( scene, camera );
}


function animate(){
  group.rotateY(0.001);
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

init();
