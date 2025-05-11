import * as THREE from "three";
import audioController from "../../utils/AudioController";
import scene from "../Scene";

export default class Head {
  constructor() {
    this.group = null;

    this.planete1 = null;
    this.planete2 = null;
    this.planete3 = null;
    this.planete4 = null;
    this.planete4x = null;
    this.verresref = null;


    scene.gltfLoader.load("/models/dididev.glb", (gltf) => {
      this.group = gltf.scene;

      // Récupérer planete1
      this.planete1 = this.group.getObjectByName("planete1");
      if (this.planete1 && this.planete1.material) {
        this.planete1.material.emissiveIntensity = 1.0; // Intensité initiale
      }

      // Récupérer planete2
      this.planete2 = this.group.getObjectByName("planete2");
      if (this.planete2 && this.planete2.material) {
        this.planete2.material.emissiveIntensity = 0.0; // Intensité initiale
      }

      // Récupérer planete3
      this.planete3 = this.group.getObjectByName("planete3");
      if (this.planete3 && this.planete3.material) {
        this.planete3.material.emissiveIntensity = 1.0; // Intensité initiale
      }

      // Récupérer planete4 et planete4x
      this.planete4 = this.group.getObjectByName("planete4");
      this.planete4x = this.group.getObjectByName("planete4x");

      // Récupérer verresref
      this.verresref = this.group.getObjectByName("verresref");

      // this.group.rotation.x = Math.PI / 2;
    });
  }

  setCover(src) {
      // charger la texture
      this.texture = scene.textureLoader.load(src);

      // donner la texture au material
      this.verresref.map = this.texture;

      console.log(this.verresref.uniforms);
      this.verresref.uniforms.uMap.value = this.texture;

      // force la recompilation du material
      this.verresref.needsUpdate = true;

      console.log(this.texture);
    }

  update() {
    const bpm = audioController.bpm || 2; // Valeur par déf
    const beatsPerSecond = bpm / 60; // Nombre de battements par seconde
    const time = performance.now() / 1000; // Temps en secondes
    const scaleFactor = 0.1 + 0.02 * Math.sin(2 * Math.PI * beatsPerSecond * time); // Calculer compliqué d'une oscillation basée sur le BPM
    const scaleFactorx = 0.3 + 0.02 * Math.sin(2 * Math.PI * beatsPerSecond * time); // Calculer compliqué d'une oscillation basée sur le BPM
    const remappedFrequency = audioController.fdata[0] / 255; // Valeur entre 0 et 1





    if (this.planete1 && this.planete1.material) {
      // const remappedFrequency = audioController.fdata[0] / 255; // Valeur entre 0 et 1
      // Ajuster l'intensité de l'émission
      this.planete1.material.emissiveIntensity = 1 + remappedFrequency * 20.0;
    }
    if (this.planete2 && this.planete2.material) {
      // const remappedFrequency = audioController.fdata[0] / 255; // Valeur entre 0 et 1
      // Ajuster l'intensité de l'émission
      this.planete2.material.emissiveIntensity = 1 + remappedFrequency * 10.0;
    }
    if (this.planete3 && this.planete3.material) {
      // const remappedFrequency = audioController.fdata[0] / 255; // Valeur entre 0 et 1
      // Ajuster l'intensité de l'émission
      this.planete3.material.emissiveIntensity = 1 + remappedFrequency * 20.0;
    }




    //planete1 rotation
    if (this.planete1) {
      this.planete1.rotation.y += 0.015;
    }
    //planete2 rotation
    if (this.planete2) {
      this.planete2.rotation.y += 0.02;
    }
    //planete3 rotation
    if (this.planete3) {
      this.planete3.rotation.y += -0.01;
    }
    // taille à planete4 et planete4x
    if (this.planete4) {
      this.planete4.scale.set(scaleFactor, scaleFactor, scaleFactor);
    }
    if (this.planete4x) {
      this.planete4x.scale.set(scaleFactor*3, scaleFactor, scaleFactor*3);
    }

    if (this.group) {
      this.group.rotation.y += -0.003;
      this.group.rotation.z += 0.002;
      // this.group.rotation.x += 0.003;
    }
  }
}
