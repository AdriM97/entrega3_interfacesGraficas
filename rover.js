/**Ejemplo modificado de Learn ThreeJs
**/

//Variables
var scene, renderer, camera;
var controls;

function init() {
    // create a scene, that will hold all our elements such as objects, cameras and lights.
     scene = new THREE.Scene();

    // create a camera, which defines where we're looking at.
     camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    // create a render and set the size
     renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0xffffff));
    renderer.setSize(window.innerWidth, window.innerHeight);

	//Definimos la luz
	const light = new THREE.DirectionalLight();
	light.position.set(0,1,2);
	scene.add(light);
	
	//Objeto que representa el rober
	rober = new THREE.Object3D();
	scene.add(rober);
	
	//Definimos las dos componentes que forman el rober: el cuerpo y la rueda
	//La componente base del cuerpo se representa como un prisma rectangular 
	const geo_cuerpo = new THREE.BoxGeometry( 3, 8, 1);
	const mat_cuerpo = new THREE.MeshStandardMaterial({color: new THREE.Color('green')});
	cuerpo_base = new THREE.Mesh(geo_cuerpo, mat_cuerpo);
	//La componente base de la rueda se prepresenta como un cilindro
	const geo_rueda = new THREE.CylinderGeometry( 1, 1, 1,32);
	const mat_rueda = new THREE.MeshStandardMaterial({color: new THREE.Color('red')});
	rueda_base = new THREE.Mesh(geo_rueda, mat_rueda);
	rueda_base.rotation.z = 0.5*Math.PI;
	
	//Añadimos 6 ruedas al rober, utilizando la componente rueda_base creada anteriormente (clone)
	for (let n_rueda=0; n_rueda<3; n_rueda++){
		rueda = rueda_base.clone()
		rueda.position.set(-2, 3*n_rueda+1, 0);
		rober.add(rueda);
	}
	for (let n_rueda=0; n_rueda<3; n_rueda++){
		rueda = rueda_base.clone()
		rueda.position.set(2, 3*n_rueda+1, 0);
		rober.add(rueda);
	}
	
	//Añadimos un cuerpo al rober, utilizando la componente cuerpo_base creada anteriormente (clone)
	cuerpo = cuerpo_base.clone()
	cuerpo.position.set(0, 4, 0);
	rober.add(cuerpo);


    // position and point the camera to the center of the scene
    camera.position.set(10, 10, 20);
    camera.lookAt(scene.position);

    // add the output of the renderer to the html element
    document.getElementById("contenedor").appendChild(renderer.domElement);

    //controles
    createControls();

    // render the scene
    renderer.render(scene, camera);
}

    function createControls() {

        controls = new THREE.TrackballControls( camera, renderer.domElement );

        controls.rotateSpeed = 1.0;
        controls.zoomSpeed = 1.2;
        controls.panSpeed = 0.8;

        controls.keys = [ 65, 83, 68 ];

     }


function animate() {

   requestAnimationFrame( animate );
   controls.update();
   render();

 }

 function render() {
    renderer.render( scene, camera );
 }