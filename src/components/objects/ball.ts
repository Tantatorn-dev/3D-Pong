import { MeshBuilder, Vector3, Mesh, Scene } from "babylonjs";

export default class Ball {
    _position: Vector3;
    _body: Mesh;

    constructor(scene: Scene) {
        this._body = MeshBuilder.CreateSphere("ball", { diameter: 10, updatable: true }, scene);
    }
};