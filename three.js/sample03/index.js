
//シーン　カメラ　レンダラー
let scene, camera, renderer;

// 幅、高さ取得
const width  = window.innerWidth;
const height = window.innerHeight;

function init(){
  scene  = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(55, width / height, 45, 30000 );
  camera.position.set(-900, -200, -900);

  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setSize(width, height);
  document.body.appendChild(renderer.domElement);


  // 平行光源を作成
   const directionalLight = new THREE.DirectionalLight(0xffffff);
   directionalLight.position.set(1, 1, 1);
   scene.add(directionalLight);
   // 環境光を追加
   const ambientLight = new THREE.AmbientLight(0x333333);
   scene.add(ambientLight);


  let controls = new THREE.OrbitControls(camera);
  controls.addEventListener('change',render);
  // controls.minDistance = 500;
  // controls.maxDistance = 1500;


  let materialArray = [];
  //空っぽい　雲が伸びてる
  // let texture_ft = new THREE.TextureLoader().load('../skyboximages/penguins (44)/yonder_ft.jpg');
  // let texture_bk = new THREE.TextureLoader().load('../skyboximages/penguins (44)/yonder_bk.jpg');
  // let texture_up = new THREE.TextureLoader().load('../skyboximages/penguins (44)/yonder_up.jpg');
  // let texture_dn = new THREE.TextureLoader().load('../skyboximages/penguins (44)/yonder_dn.jpg');
  // let texture_rt = new THREE.TextureLoader().load('../skyboximages/penguins (44)/yonder_rt.jpg');
  // let texture_lf = new THREE.TextureLoader().load('../skyboximages/penguins (44)/yonder_lf.jpg');

  let texture_ft = new THREE.TextureLoader().load('../skyboximages/penguins (2)/arid2_ft.jpg');
  let texture_bk = new THREE.TextureLoader().load('../skyboximages/penguins (2)/arid2_bk.jpg');
  let texture_up = new THREE.TextureLoader().load('../skyboximages/penguins (2)/arid2_up.jpg');
  let texture_dn = new THREE.TextureLoader().load('../skyboximages/penguins (2)/arid2_dn.jpg');
  let texture_rt = new THREE.TextureLoader().load('../skyboximages/penguins (2)/arid2_rt.jpg');
  let texture_lf = new THREE.TextureLoader().load('../skyboximages/penguins (2)/arid2_lf.jpg');

  materialArray.push(new THREE.MeshBasicMaterial({map: texture_ft}));
  materialArray.push(new THREE.MeshBasicMaterial({map: texture_bk}));
  materialArray.push(new THREE.MeshBasicMaterial({map: texture_up}));
  materialArray.push(new THREE.MeshBasicMaterial({map: texture_dn}));
  materialArray.push(new THREE.MeshBasicMaterial({map: texture_rt}));
  materialArray.push(new THREE.MeshBasicMaterial({map: texture_lf}));

  for(let i=0;i<6;i++)
    materialArray[i].side = THREE.BackSide;

  let skyboxGeo = new THREE.BoxGeometry(10000,10000,10000);
  let skybox = new THREE.Mesh(skyboxGeo,materialArray);
  scene.add(skybox);

// メッシュの作成と追加
  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(100,100,100),
    new THREE.MeshPhongMaterial( { color: 0x0074df } )
  );
  sphere.position.set(0,300,0);
  //sphere.scale.set(10,10,10);
  scene.add(sphere);

   //「立方体」の生成
 var cube = new THREE.Mesh(
  //立方体の大きさ(300,300,300)                                           
  new THREE.CubeGeometry(300,300,300),                          
  new THREE.MeshPhongMaterial({                                      
            color: 0x990000 //球の色
   }));
     
//sceneにcubeを追加
   scene.add(cube);    

  animate();
}

function render() {
  renderer.render( scene, camera );
}


function animate(){

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

init();
