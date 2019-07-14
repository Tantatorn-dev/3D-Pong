import { MeshBuilder, Vector3, Mesh, Scene, Material, StandardMaterial, Color3 } from "babylonjs";

export default class Ball {
    _body: Mesh;
    _speed: number;
    _direction: string;

    constructor(scene: Scene) {
        // create a ball
        this._body = MeshBuilder.CreateSphere("ball", {
            diameter: 6,
            updatable: true
        }, scene);

        // prepare the material
        let mat = new StandardMaterial('ballMaterial', scene);
        mat.diffuseColor = new Color3(1, 0, 0);

        // add color to a ball
        this._body.material = mat;

        // set start speed and direction
        this._speed = 0.5;
        this._direction = 'down'
    }

    update() {
        this._move();
    }

    _move(){
        switch (this._direction) {
            case 'down':
                this._body.position.x += this._speed;
                break;
            case 'up':
                this._body.position.x -= this._speed;
                break;
            case 'left-down':
                this._body.position.x += this._speed;
                this._body.position.z -= this._speed;
                break;
            case 'right-down':
                this._body.position.x += this._speed;
                this._body.position.z += this._speed;
                break;
            case 'left-up':
                this._body.position.x -= this._speed;
                this._body.position.z -= this._speed;
                break;
            case 'right-up':
                this._body.position.x -= this._speed;
                this._body.position.z += this._speed;
                break;
        }

    }
};