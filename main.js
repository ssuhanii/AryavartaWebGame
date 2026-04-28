
// // import * as THREE from 'three';
// // import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// // let scene, camera, renderer, character;
// // const keys = {};

// // // Camera settings
// // let cameraAngleH = 0; // Horizontal rotation (left-right)
// // let cameraAngleV = 0.5; // Vertical rotation (up-down)
// // const cameraDistance = 250; // Distance from character

// // // --- Scene & Camera ---
// // scene = new THREE.Scene();
// // scene.background = new THREE.Color(0x87ceeb); // sky blue

// // camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// // // Renderer
// // renderer = new THREE.WebGLRenderer({ antialias: true });
// // renderer.setSize(window.innerWidth, window.innerHeight);
// // document.body.appendChild(renderer.domElement);

// // // --- Lights ---
// // const dirLight = new THREE.DirectionalLight(0xffffff, 3);
// // dirLight.position.set(10, 20, 10);
// // scene.add(dirLight);

// // const ambientLight = new THREE.AmbientLight(0xffffff, 3);
// // scene.add(ambientLight);

// // // --- Load Blender scene ---
// // const loader = new GLTFLoader();
// // loader.load('/scene.glb', (gltf) => {
// //   scene.add(gltf.scene);

// //   // Player object
// //   character = gltf.scene.getObjectByName('character');
// //   if (!character) {
// //     console.warn('⚠️ Could not find "character" object in scene!');
// //     return;
// //   }

// //   // Set initial position
// //   character.position.set(765, 0, 150);

// //   // Initial camera setup
// //   updateCamera();
// // });

// // // --- Camera update: third-person follow ---
// // function updateCamera() {
// //   if (!character) return;

// //   // Calculate camera position based on angles
// //   const horizontalDistance = cameraDistance * Math.cos(cameraAngleV);
// //   const verticalDistance = cameraDistance * Math.sin(cameraAngleV);

// //   // Position camera behind and above character
// //   const offsetX = horizontalDistance * Math.sin(cameraAngleH);
// //   const offsetZ = horizontalDistance * Math.cos(cameraAngleH);
// //   const offsetY = verticalDistance;

// //   // Set camera position
// //   camera.position.x = character.position.x - offsetX;
// //   camera.position.y = character.position.y + offsetY;
// //   camera.position.z = character.position.z + offsetZ;

// //   // Camera looks at character
// //   camera.lookAt(character.position);
// // }

// // // --- Mouse control for camera rotation ---
// // let isDragging = false;
// // let previousMouseX = 0;
// // let previousMouseY = 0;

// // window.addEventListener('mousedown', (e) => {
// //   isDragging = true;
// //   previousMouseX = e.clientX;
// //   previousMouseY = e.clientY;
// // });

// // window.addEventListener('mouseup', () => {
// //   isDragging = false;
// // });

// // window.addEventListener('mousemove', (e) => {
// //   if (!isDragging) return;

// //   const deltaX = e.clientX - previousMouseX;
// //   const deltaY = e.clientY - previousMouseY;

// //   // Update camera angles
// //   cameraAngleH -= deltaX * 0.005; // Horizontal rotation (left-right)
// //   cameraAngleV += deltaY * 0.005; // Vertical rotation (up-down)

// //   // Limit vertical angle (prevent flipping)
// //   cameraAngleV = Math.max(0.2, Math.min(1.2, cameraAngleV));

// //   previousMouseX = e.clientX;
// //   previousMouseY = e.clientY;

// //   updateCamera();
// // });

// // // --- Movement Controls ---
// // window.addEventListener('keydown', (e) => {
// //   const key = e.key.toLowerCase();
// //   keys[key] = true;
// //   if (key === 'arrowup') keys['up'] = true;
// //   if (key === 'arrowdown') keys['down'] = true;
// //   if (key === 'arrowleft') keys['left'] = true;
// //   if (key === 'arrowright') keys['right'] = true;
// // });

// // window.addEventListener('keyup', (e) => {
// //   const key = e.key.toLowerCase();
// //   keys[key] = false;
// //   if (key === 'arrowup') keys['up'] = false;
// //   if (key === 'arrowdown') keys['down'] = false;
// //   if (key === 'arrowleft') keys['left'] = false;
// //   if (key === 'arrowright') keys['right'] = false;
// // });

// // function moveCharacter() {
// //   if (!character) return;
// //   const speed = 1.2;

// //   let moved = false;
// //   let direction = new THREE.Vector3();

// //   // WASD and Arrow keys for movement
// //   if (keys['w'] || keys['up']) {
// //     character.position.z -= speed;
// //     direction.z = 1;
// //     moved = true;
// //   }
// //   if (keys['s'] || keys['down']) {
// //     character.position.z += speed;
// //     direction.z = -1;
// //     moved = true;
// //   }
// //   if (keys['a'] || keys['left']) {
// //     character.position.x -= speed;
// //     direction.x = -1;
// //     moved = true;
// //   }
// //   if (keys['d'] || keys['right']) {
// //     character.position.x += speed;
// //     direction.x = 1;
// //     moved = true;
// //   }

// //   // Rotate character to face movement direction
// //   if (moved && direction.length() > 0) {
// //     const angle = Math.atan2(direction.x, direction.z);
// //     character.rotation.y = angle;
// //   }

// //   // Update camera to follow character
// //   updateCamera();
// // }

// // // --- Clickable Objects ---
// // const raycaster = new THREE.Raycaster();
// // const mouse = new THREE.Vector2();

// // function onMouseClick(event) {
// //   // Skip if we were dragging the camera
// //   if (isDragging) return;

// //   mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
// //   mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

// //   raycaster.setFromCamera(mouse, camera);
// //   const intersects = raycaster.intersectObjects(scene.children, true);

// //   if (intersects.length > 0) {
// //     console.log("Objects intersected:");
// //     intersects.forEach((intersect, index) => {
// //       console.log(`${index}: Name = ${intersect.object.name}`, intersect.object);
// //     });

// //     let clicked = intersects[0].object;

// //     // Traverse up parent hierarchy to find named object
// //     while (clicked && !clicked.name && clicked.parent) {
// //       clicked = clicked.parent;
// //     }

// //     console.log("Clicked object name:", clicked.name);

// //     if (clicked.name === 'quizLink') window.location.href = 'http://localhost:3000/quiz';
// //     else if (clicked.name === 'MapLink') window.location.href = 'http://localhost:3000/';
// //     else if (clicked.name === 'sourcesLink') window.location.href = 'http://localhost:3000/sources';
// //   } else {
// //     console.log("No intersected objects.");
// //   }
// // }
// // window.addEventListener('click', onMouseClick);

// // // --- Animation Loop ---
// // function animate() {
// //   requestAnimationFrame(animate);
// //   moveCharacter();
// //   renderer.render(scene, camera);
// // }
// // animate();

// // // --- Handle Resize ---
// // window.addEventListener('resize', () => {
// //   camera.aspect = window.innerWidth / window.innerHeight;
// //   camera.updateProjectionMatrix();
// //   renderer.setSize(window.innerWidth, window.innerHeight);
// // });

// import * as THREE from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// let scene, camera, renderer, character;
// const keys = {};

// // Camera settings
// let cameraAngleH = 0;
// let cameraAngleV = 0.5;
// const cameraDistance = 250;

// // Collision objects
// let collidableObjects = [];

// // --- Scene & Camera ---
// scene = new THREE.Scene();
// scene.background = new THREE.Color(0x87ceeb);

// camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// // Renderer setup
// renderer = new THREE.WebGLRenderer({ antialias: true });
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// // --- Lights ---
// const dirLight = new THREE.DirectionalLight(0xffffff, 2);
// dirLight.position.set(10, 20, 10);
// scene.add(dirLight);

// const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
// scene.add(ambientLight);

// // --- Load Blender-exported GLTF Scene ---
// const loader = new GLTFLoader();
// loader.load('/scene.glb', (gltf) => {
//   scene.add(gltf.scene);

//   // Player character
//   character = gltf.scene.getObjectByName('character');
//   if (!character) {
//     console.warn('⚠️ Could not find "character" object in scene!');
//     return;
//   }

//   character.position.set(765, 0, 150);

//   // --- Gather collidable meshes ---
//   gltf.scene.traverse((child) => {
//     if (child.isMesh && child.name) {
//       const name = child.name.toLowerCase();

//       if (
//         name.includes('tree') ||
//         name.includes('boundary') ||
//         name.includes('fountain') ||
//         name.includes('flower')
//       ) {
//         collidableObjects.push(child);
//       }
//     }
//   });

//   console.log(`✅ Found ${collidableObjects.length} collidable meshes`);
//   updateCamera();
// });

// // --- Camera follow system ---
// function updateCamera() {
//   if (!character) return;

//   const horizontalDist = cameraDistance * Math.cos(cameraAngleV);
//   const verticalDist = cameraDistance * Math.sin(cameraAngleV);

//   const offsetX = horizontalDist * Math.sin(cameraAngleH);
//   const offsetZ = horizontalDist * Math.cos(cameraAngleH);
//   const offsetY = verticalDist;

//   camera.position.x = character.position.x - offsetX;
//   camera.position.y = character.position.y + offsetY;
//   camera.position.z = character.position.z + offsetZ;

//   camera.lookAt(character.position);
// }

// // --- Collision detection using world-space bounding boxes ---
// function checkCollision(newPosition) {
//   const characterBox = new THREE.Box3();
//   const size = 10; // Adjust if character too small/big
//   const halfSize = size / 2;

//   // Define player’s bounding box in world-space
//   characterBox.set(
//     new THREE.Vector3(
//       newPosition.x - halfSize,
//       newPosition.y - halfSize,
//       newPosition.z - halfSize
//     ),
//     new THREE.Vector3(
//       newPosition.x + halfSize,
//       newPosition.y + halfSize,
//       newPosition.z + halfSize
//     )
//   );

//   // Loop through collidable meshes
//   for (let i = 0; i < collidableObjects.length; i++) {
//     const object = collidableObjects[i];

//     // Compute actual bounding box in WORLD space
//     const objectBox = new THREE.Box3().setFromObject(object);

//     if (characterBox.intersectsBox(objectBox)) {
//       return true; // Collision detected
//     }
//   }

//   return false;
// }

// // --- Mouse control for limited camera look-around ---
// let isDragging = false;
// let prevMouseX = 0, prevMouseY = 0;

// window.addEventListener('mousedown', (e) => {
//   isDragging = true;
//   prevMouseX = e.clientX;
//   prevMouseY = e.clientY;
// });
// window.addEventListener('mouseup', () => {
//   isDragging = false;
// });
// window.addEventListener('mousemove', (e) => {
//   if (!isDragging) return;

//   const deltaX = e.clientX - prevMouseX;
//   const deltaY = e.clientY - prevMouseY;

//   cameraAngleH -= deltaX * 0.005;
//   cameraAngleV += deltaY * 0.005;
//   cameraAngleV = Math.max(0.2, Math.min(1.2, cameraAngleV));

//   prevMouseX = e.clientX;
//   prevMouseY = e.clientY;

//   updateCamera();
// });

// // --- Movement Controls ---
// window.addEventListener('keydown', (e) => (keys[e.key.toLowerCase()] = true));
// window.addEventListener('keyup', (e) => (keys[e.key.toLowerCase()] = false));

// function moveCharacter() {
//   if (!character) return;
//   const speed = 1.5;

//   let direction = new THREE.Vector3();
//   // WASD and Arrow keys for movement
//   if (keys['w'] || keys['arrowup']) {
//     character.position.z -= speed;
//     direction.z = 1;  // Move forward (negative Z)
//   }
//   if (keys['s'] || keys['arrowdown']) {
//     character.position.z += speed;
//     direction.z = -1;   // Move backward (positive Z)
//   }
//   if (keys['a'] || keys['arrowleft']) {
//     character.position.x -= speed;
//     direction.x = -1;
//   }
//   if (keys['d'] || keys['arrowright']) {
//     character.position.x += speed;
//     direction.x = 1;
//   }

//   if (direction.length() > 0) {
//     direction.normalize();
//     // Rotate character to face movement direction
//     const angle = Math.atan2(direction.x, direction.z);
//     character.rotation.y = angle;
//   }

//   updateCamera();
// }


// // --- Animation Loop ---
// function animate() {
//   requestAnimationFrame(animate);
//   moveCharacter();
//   renderer.render(scene, camera);
// }
// animate();

// // --- Handle Resize ---
// window.addEventListener('resize', () => {
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
//   renderer.setSize(window.innerWidth, window.innerHeight);
// });

// import * as THREE from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// let scene, camera, renderer, character;
// const keys = {};

// let cameraAngleH = 0, cameraAngleV = 0.5;
// const cameraDistance = 250;

// let collidableObjects = [];
// let npcElderMeshes = [];
// let quizShrineMeshes = [];

// scene = new THREE.Scene();
// scene.background = new THREE.Color(0x87ceeb);

// camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// renderer = new THREE.WebGLRenderer({ antialias: true });
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// const dirLight = new THREE.DirectionalLight(0xffffff, 2);
// dirLight.position.set(10, 20, 10);
// scene.add(dirLight);

// const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
// scene.add(ambientLight);

// const loader = new GLTFLoader();
// loader.load('/scene.glb', (gltf) => {
//   scene.add(gltf.scene);

//   gltf.scene.traverse(child => {
//     if (child.isMesh && child.name) {
//       // For elders and shrines: supports npcElder_1, npcElder_2, quizShrine_1, etc.
//       if (child.name.toLowerCase().includes("npcelder")) npcElderMeshes.push(child);
//       if (child.name.toLowerCase().includes("quizshrine")) quizShrineMeshes.push(child);

//       // Colliders
//       const n = child.name.toLowerCase();
//       if (n.includes('tree') || n.includes('boundary') || n.includes('fountain') || n.includes('flower')) {
//         collidableObjects.push(child);
//       }
//     }
//   });

//   character = gltf.scene.getObjectByName('character');
//   if (!character) {
//     console.warn('⚠️ Could not find "character" object in scene!');
//     character = new THREE.Mesh(
//       new THREE.BoxGeometry(10, 10, 10),
//       new THREE.MeshStandardMaterial({ color: 0x3366cc })
//     );
//     character.position.set(765, 0, 150);
//     scene.add(character);
//   }

//   updateCamera();
// });

// // Camera follow logic
// function updateCamera() {
//   if (!character) return;
//   const horizontalDist = cameraDistance * Math.cos(cameraAngleV), verticalDist = cameraDistance * Math.sin(cameraAngleV);
//   const offsetX = horizontalDist * Math.sin(cameraAngleH), offsetZ = horizontalDist * Math.cos(cameraAngleH), offsetY = verticalDist;
//   camera.position.x = character.position.x - offsetX;
//   camera.position.y = character.position.y + offsetY;
//   camera.position.z = character.position.z + offsetZ;
//   camera.lookAt(character.position);
// }

// // Collision logic
// function checkCollision(newPosition) {
//   const characterBox = new THREE.Box3();
//   const size = 10, halfSize = size / 2;
//   characterBox.set(
//     new THREE.Vector3(newPosition.x - halfSize, newPosition.y - halfSize, newPosition.z - halfSize),
//     new THREE.Vector3(newPosition.x + halfSize, newPosition.y + halfSize, newPosition.z + halfSize)
//   );
//   for (const object of collidableObjects) {
//     const objectBox = new THREE.Box3().setFromObject(object);
//     if (characterBox.intersectsBox(objectBox)) return true;
//   }
//   return false;
// }

// // Camera controls
// let isDragging = false, prevMouseX = 0, prevMouseY = 0;
// window.addEventListener('mousedown', (e) => { isDragging = true; prevMouseX = e.clientX; prevMouseY = e.clientY; });
// window.addEventListener('mouseup', () => { isDragging = false; });
// window.addEventListener('mousemove', (e) => {
//   if (!isDragging) return;
//   const deltaX = e.clientX - prevMouseX, deltaY = e.clientY - prevMouseY;
//   cameraAngleH -= deltaX * 0.005;
//   cameraAngleV += deltaY * 0.005;
//   cameraAngleV = Math.max(0.2, Math.min(1.2, cameraAngleV));
//   prevMouseX = e.clientX; prevMouseY = e.clientY; updateCamera();
// });

// window.addEventListener('keydown', (e) => (keys[e.key.toLowerCase()] = true));
// window.addEventListener('keyup', (e) => (keys[e.key.toLowerCase()] = false));

// // Movement
// function moveCharacter() {
//   if (!character) return;
//   const speed = 1.5;
//   let direction = new THREE.Vector3();
//   if (keys['w'] || keys['arrowup']) direction.z -= 1;
//   if (keys['s'] || keys['arrowdown']) direction.z += 1;
//   if (keys['a'] || keys['arrowleft']) direction.x -= 1;
//   if (keys['d'] || keys['arrowright']) direction.x += 1;
//   if (direction.length() === 0) return;
//   direction.normalize();
//   const newPos = character.position.clone().addScaledVector(direction, speed);
//   if (!checkCollision(newPos)) {
//     character.position.copy(newPos);
//     character.rotation.y = Math.atan2(direction.x, direction.z);
//   }
//   updateCamera();
// }

// // Proximity – checks array, returns true if near any
// function checkProximity(meshArray, radius) {
//   if (!character) return false;
//   let pos = new THREE.Vector3();
//   for (const mesh of meshArray) {
//     mesh.getWorldPosition(pos);
//     if (pos.distanceTo(character.position) < (radius || 25)) return true;
//   }
//   return false;
// }

// // Animation loop
// function animate() {
//   requestAnimationFrame(animate);
//   moveCharacter();
//   renderer.render(scene, camera);

//   document.getElementById("npc-dialog").style.display = checkProximity(npcElderMeshes, 25) ? "block" : "none";
//   document.getElementById("quiz-popup").style.display = checkProximity(quizShrineMeshes, 25) ? "block" : "none";
// }
// animate();

// window.addEventListener('resize', () => {
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
//   renderer.setSize(window.innerWidth, window.innerHeight);
// });


// import * as THREE from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// // Global game state
// window.gameStarted = false; // Use global so both HTML and this see it

// let scene, camera, renderer, character;
// const keys = {};

// let cameraAngleH = 0, cameraAngleV = 0.5;
// const cameraDistance = 250;

// let collidableObjects = [];
// let npcElderMeshes = [];
// let quizShrineMeshes = [];
// let npcMedievalMeshes = [];
// let npcClassicalMeshes = [];
// let npcSultanateMeshes = [];

// scene = new THREE.Scene();
// scene.background = new THREE.Color(0x87ceeb);

// camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// renderer = new THREE.WebGLRenderer({ antialias: true });
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// const dirLight = new THREE.DirectionalLight(0xffffff, 2);
// dirLight.position.set(10, 20, 10);
// scene.add(dirLight);

// const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
// scene.add(ambientLight);

// const loader = new GLTFLoader();
// loader.load('/aaryavartaGame1.glb', (gltf) => {
//   scene.add(gltf.scene);

//   gltf.scene.traverse(child => {
//     if (child.isMesh && child.name) {
//       if (child.name.toLowerCase().includes("npcelder")) npcElderMeshes.push(child);
//       if (child.name.toLowerCase().includes("quizshrine")) quizShrineMeshes.push(child);
//       if (child.name.toLowerCase().includes("npcmedieval")) npcMedievalMeshes.push(child);
//       if (child.name.toLowerCase().includes("npcclassical")) npcClassicalMeshes.push(child);
//       if (child.name.toLowerCase().includes("npcsultanate")) npcSultanateMeshes.push(child);



//       const n = child.name.toLowerCase();
//       if (n.includes('tree') || n.includes('boundary') || n.includes('fountain') || n.includes('flower')) {
//         collidableObjects.push(child);
//       }
//     }
//   });

//   character = gltf.scene.getObjectByName('character');
//   if (!character) {
//     console.warn('⚠️ Could not find "character" object in scene!');
//     character = new THREE.Mesh(
//       new THREE.BoxGeometry(10, 10, 10),
//       new THREE.MeshStandardMaterial({ color: 0x3366cc })
//     );
//     character.position.set(765, 0, 150);
//     scene.add(character);
//   }

//   updateCamera();
// });

// // Camera follow logic
// function updateCamera() {
//   if (!character) return;
//   const horizontalDist = cameraDistance * Math.cos(cameraAngleV), verticalDist = cameraDistance * Math.sin(cameraAngleV);
//   const offsetX = horizontalDist * Math.sin(cameraAngleH), offsetZ = horizontalDist * Math.cos(cameraAngleH), offsetY = verticalDist;
//   camera.position.x = character.position.x - offsetX;
//   camera.position.y = character.position.y + offsetY;
//   camera.position.z = character.position.z + offsetZ;
//   camera.lookAt(character.position);
// }

// // Collision logic
// function checkCollision(newPosition) {
//   const characterBox = new THREE.Box3();
//   const size = 10, halfSize = size / 2;
//   characterBox.set(
//     new THREE.Vector3(newPosition.x - halfSize, newPosition.y - halfSize, newPosition.z - halfSize),
//     new THREE.Vector3(newPosition.x + halfSize, newPosition.y + halfSize, newPosition.z + halfSize)
//   );
//   for (const object of collidableObjects) {
//     const objectBox = new THREE.Box3().setFromObject(object);
//     if (characterBox.intersectsBox(objectBox)) return true;
//   }
//   return false;
// }

// // Camera rotation controls
// let isDragging = false, prevMouseX = 0, prevMouseY = 0;
// window.addEventListener('mousedown', (e) => { isDragging = true; prevMouseX = e.clientX; prevMouseY = e.clientY; });
// window.addEventListener('mouseup', () => { isDragging = false; });
// window.addEventListener('mousemove', (e) => {
//   if (!isDragging) return;
//   const deltaX = e.clientX - prevMouseX, deltaY = e.clientY - prevMouseY;
//   cameraAngleH -= deltaX * 0.005;
//   cameraAngleV += deltaY * 0.005;
//   cameraAngleV = Math.max(0.2, Math.min(1.2, cameraAngleV));
//   prevMouseX = e.clientX;
//   prevMouseY = e.clientY;
//   updateCamera();
// });

// // Key handling
// window.addEventListener('keydown', (e) => (keys[e.key.toLowerCase()] = true));
// window.addEventListener('keyup', (e) => (keys[e.key.toLowerCase()] = false));

// // Character movement enabled only after gameStarted
// function moveCharacter() {
//   if (!character || !window.gameStarted) return;
//   const speed = 1.5;
//   let direction = new THREE.Vector3();
//   if (keys['w'] || keys['arrowup']) direction.z -= 1;
//   if (keys['s'] || keys['arrowdown']) direction.z += 1;
//   if (keys['a'] || keys['arrowleft']) direction.x -= 1;
//   if (keys['d'] || keys['arrowright']) direction.x += 1;
//   if (direction.length() === 0) return;
//   direction.normalize();
//   const newPos = character.position.clone().addScaledVector(direction, speed);
//   if (!checkCollision(newPos)) {
//     character.position.copy(newPos);
//     character.rotation.y = Math.atan2(direction.x, direction.z);
//   }
//   updateCamera();
// }

// // Proximity check for array of meshes
// function checkProximity(meshArray, radius) {
//   if (!character) return false;
//   let pos = new THREE.Vector3();
//   for (const mesh of meshArray) {
//     mesh.getWorldPosition(pos);
//     if (pos.distanceTo(character.position) < (radius || 25)) return true;
//   }
//   return false;
// }

// function animate() {
//   requestAnimationFrame(animate);

//   if (window.gameStarted) {
//     moveCharacter();
//   }
//   renderer.render(scene, camera);

//   document.getElementById("npc-dialog").style.display = checkProximity(npcElderMeshes, 25) ? "block" : "none";
//   document.getElementById("quiz-popup").style.display = checkProximity(quizShrineMeshes, 25) ? "block" : "none";
//   document.getElementById("npc-dialog-2").style.display = checkProximity(npcMedievalMeshes, 25) ? "block" : "none";
//   document.getElementById("npc-dialog-3").style.display = checkProximity(npcClassicalMeshes, 25) ? "block" : "none";
//   document.getElementById("npc-dialog-4").style.display = checkProximity(npcSultanateMeshes, 25) ? "block" : "none";

// }
// animate();

// window.addEventListener('resize', () => {
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
//   renderer.setSize(window.innerWidth, window.innerHeight);
// });


import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Global game state
window.gameStarted = false;

let scene, camera, renderer, character;
const keys = {};

let cameraAngleH = 0, cameraAngleV = 0.5;
const cameraDistance = 250;

let collidableObjects = [];
let npcElderMeshes = [];
let quizShrineMeshes = [];
let npcMedievalMeshes = [];
let npcClassicalMeshes = [];
let npcSultanateMeshes = [];


scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const dirLight = new THREE.DirectionalLight(0xffffff, 2);
dirLight.position.set(10, 20, 10);
scene.add(dirLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const loader = new GLTFLoader();
loader.load('/aaryavartaGame1.glb', (gltf) => {
  scene.add(gltf.scene);

  gltf.scene.traverse(child => {
    if (child.isMesh && child.name) {
      const lower = child.name.toLowerCase();
      if (lower.includes("collider")) {
        collidableObjects.push(child);
        child.visible = false; // HIDE ALL COLLIDERS IN GAME
      }
      if (lower.includes("npcelder")) npcElderMeshes.push(child);
      if (lower.includes("quizshrine")) quizShrineMeshes.push(child);
      if (lower.includes("npcmedieval")) npcMedievalMeshes.push(child);
      if (lower.includes("npcclassical")) npcClassicalMeshes.push(child);
      if (lower.includes("npcsultanate")) npcSultanateMeshes.push(child);
    }
  });

  character = gltf.scene.getObjectByName('character');
  if (!character) {
    console.warn('⚠️ Could not find "character" object in scene!');
    character = new THREE.Mesh(
      new THREE.BoxGeometry(10, 10, 10),
      new THREE.MeshStandardMaterial({ color: 0x3366cc })
    );
    character.position.set(765, 0, 150);
    scene.add(character);
  }

  updateCamera();
});

function updateCamera() {
  if (!character) return;
  const horizontalDist = cameraDistance * Math.cos(cameraAngleV), verticalDist = cameraDistance * Math.sin(cameraAngleV);
  const offsetX = horizontalDist * Math.sin(cameraAngleH), offsetZ = horizontalDist * Math.cos(cameraAngleH), offsetY = verticalDist;
  camera.position.x = character.position.x - offsetX;
  camera.position.y = character.position.y + offsetY;
  camera.position.z = character.position.z + offsetZ;
  camera.lookAt(character.position);
}

function checkCollision(newPosition) {
  const characterBox = new THREE.Box3();
  const size = 10, halfSize = size / 2;
  characterBox.set(
    new THREE.Vector3(newPosition.x - halfSize, newPosition.y - halfSize, newPosition.z - halfSize),
    new THREE.Vector3(newPosition.x + halfSize, newPosition.y + halfSize, newPosition.z + halfSize)
  );
  for (const object of collidableObjects) {
    const objectBox = new THREE.Box3().setFromObject(object);
    if (characterBox.intersectsBox(objectBox)) return true;
  }
  return false;
}

let isDragging = false, prevMouseX = 0, prevMouseY = 0;
window.addEventListener('mousedown', (e) => { isDragging = true; prevMouseX = e.clientX; prevMouseY = e.clientY; });
window.addEventListener('mouseup', () => { isDragging = false; });
window.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  const deltaX = e.clientX - prevMouseX, deltaY = e.clientY - prevMouseY;
  cameraAngleH -= deltaX * 0.005;
  cameraAngleV += deltaY * 0.005;
  cameraAngleV = Math.max(0.2, Math.min(1.2, cameraAngleV));
  prevMouseX = e.clientX; prevMouseY = e.clientY; updateCamera();
});

window.addEventListener('keydown', (e) => (keys[e.key.toLowerCase()] = true));
window.addEventListener('keyup', (e) => (keys[e.key.toLowerCase()] = false));

function moveCharacter() {
  if (!character || !window.gameStarted) return;
  const speed = 1.5;
  let direction = new THREE.Vector3();
  if (keys['w'] || keys['arrowup']) direction.z -= 1;
  if (keys['s'] || keys['arrowdown']) direction.z += 1;
  if (keys['a'] || keys['arrowleft']) direction.x -= 1;
  if (keys['d'] || keys['arrowright']) direction.x += 1;
  if (direction.length() === 0) return;
  direction.normalize();
  const newPos = character.position.clone().addScaledVector(direction, speed);
  if (!checkCollision(newPos)) {
    character.position.copy(newPos);
    character.rotation.y = Math.atan2(direction.x, -direction.z);
  }
  updateCamera();
}

// Proximity check for array of meshes
function checkProximity(meshArray, radius) {
  if (!character) return false;
  let pos = new THREE.Vector3();
  for (const mesh of meshArray) {
    mesh.getWorldPosition(pos);
    if (pos.distanceTo(character.position) < (radius || 25)) return true;
  }
  return false;
}

function animate() {
  requestAnimationFrame(animate);

  if (window.gameStarted) moveCharacter();
  renderer.render(scene, camera);

  // NPC dialogs (add others if you like)
  document.getElementById("npc-dialog").style.display = checkProximity(npcElderMeshes, 40) ? "block" : "none";
  document.getElementById("quiz-popup").style.display = checkProximity(quizShrineMeshes, 80) ? "block" : "none";
  document.getElementById("npc-dialog-2").style.display = checkProximity(npcMedievalMeshes, 40) ? "block" : "none";
  document.getElementById("npc-dialog-3").style.display = checkProximity(npcClassicalMeshes, 40) ? "block" : "none";
  document.getElementById("npc-dialog-4").style.display = checkProximity(npcSultanateMeshes, 40) ? "block" : "none";
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
