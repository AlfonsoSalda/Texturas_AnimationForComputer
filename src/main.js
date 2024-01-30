import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.min.js&#39';

var renderer = null, 
			scene = null, 
			camera = null,
			cube = null,
			animating = false;
		
		function onLoad()
		{
            window.onLoad=onLoad();
			// Grab our container div
	        var container = document.getElementById("container");

		    // Create a new Three.js scene
		    scene = new THREE.Scene();

		    // Put in a camera
	        camera = new THREE.PerspectiveCamera( 45, container.offsetWidth / container.offsetHeight, 1, 4000 );
	        camera.position.set( 0, 0, 3 );

	        // Create the Three.js renderer, add it to our div
		    renderer = new THREE.WebGLRenderer({ antialias: true });
		    renderer.setSize(container.offsetWidth, container.offsetHeight);
		    container.appendChild( renderer.domElement );

	        // Create a directional light to show off the object
			var light = new THREE.DirectionalLight( 0xffffff, 1.5);
			light.position.set(0, 0, 1);
			scene.add( light );

	        // Create a shaded, texture-mapped cube and add it to the scene
	        // First, create the texture map
	        var mapUrl = "./images/angry_monster.jpg";
	        //var map = THREE.ImageUtils.loadTexture(mapUrl);
	        var texture = new THREE.TextureLoader().load( mapUrl );
	        
	        // Now, create a Phong material to show shading; pass in the map
	        var material = new THREE.MeshPhongMaterial({map:texture});

	        // Create the cube geometry
	        var geometry = new THREE.BoxGeometry(1.0, 1.0, 1.0);


	        // And put the geometry and material together into a mesh
	        cube = new THREE.Mesh(geometry, material);

	        // Turn it toward the scene, or we won't see the cube shape!
	        cube.rotation.x = Math.PI / 5;
	        cube.rotation.y = Math.PI / 5;

	        // Add the cube to our scene
	        scene.add( cube );

	        // Add a mouse up handler to toggle the animation
	        addMouseHandler();

	        // Run our render loop
	        run();
		}

		function run()
		{
			// Render the scene
			renderer.render( scene, camera );

			// Spin the cube for next frame
			if (animating)
			{
				cube.rotation.y -= 0.01;
			}
				
			// Ask for another frame
	    	requestAnimationFrame(run);	
		}

		function addMouseHandler()
		{
			var dom = renderer.domElement;
			
			dom.addEventListener( 'mouseup', onMouseUp, false);
		}
		
		function onMouseUp	(event)
		{
		    event.preventDefault();

		    animating = !animating;
		}