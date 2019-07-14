import { MeshBuilder, Vector3, Mesh, Scene, Material, StandardMaterial, Color3 } from "babylonjs";

export default class Ball {
    _body: Mesh;

    constructor(scene: Scene) {
        // create a ball
        this._body = MeshBuilder.CreateSphere("ball", {
            diameter: 6,
            updatable: true
        }, scene);

        // prepare the material
        let mat = new StandardMaterial("ballMaterial", scene);
        mat.diffuseColor = new Color3(1, 0, 0);

        // add color to a ball
        this._body.material = mat;
    }

};