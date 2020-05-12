// 幅、高さ取得
const width  = window.innerWidth;
const height = window.innerHeight;

// レンダラの作成、DOMに追加
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
renderer.setClearColor(0xf2f2f2, 1.0);
document.body.appendChild(renderer.domElement);

// シーンの作成、カメラの作成と追加、ライトの作成と追加
const scene  = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, width / height, 1, 100 );
camera.position.set(0, 3, 10);
// const light  = new THREE.AmbientLight(0xffffff, 1);
// scene.add(light);

    // 平行光源を作成
    const directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    // 環境光を追加
    const ambientLight = new THREE.AmbientLight(0x333333);
    scene.add(ambientLight);

// メッシュの作成と追加
const grid   = new THREE.GridHelper(10, 5);
// const sphere = new THREE.Mesh(
//   new THREE.SphereGeometry(1),
//   new THREE.MeshPhongMaterial( { color: 0x0074df } )
// );
// sphere.position.set(0, 1, 0);
// scene.add(grid, sphere);
scene.add(grid);

// 3DS形式のモデルデータを読み込む
const loader = new THREE.TDSLoader();
// テクスチャーのパスを指定
//sloader.setPath('http://localhost/db/webgl/mysamples/three.jssamples/sample02/');
// 3dsファイルのパスを指定
loader.load('http://arrowblog.xyz/index07webgraphics/three.js/sample02/dol2.3ds',  (object) => {
  // 読み込み後に3D空間に追加
  object.rotation.set(-Math.PI/2,0,0); 
  object.position.set(0,1,0);
  scene.add(object);
});

// OrbitControls
const controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.userPan = false;
controls.userPanSpeed = 0.0;
controls.maxDistance = 5000.0;
controls.maxPolarAngle = Math.PI * 0.495;
controls.autoRotate = true;
controls.autoRotateSpeed = 1.0;


// レンダリング
const animation = () => {

  renderer.render(scene, camera);

  controls.update();

  requestAnimationFrame(animation);
};

animation();