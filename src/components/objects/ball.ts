import { MeshBuilder, Mesh, Scene, StandardMaterial, Color3 } from "babylonjs";
import Paddle from "./paddle";

enum Direction {
    UP = 1,
    DOWN,
    L_UP,
    L_DOWN,
    R_UP,
    R_DOWN
}

export default class Ball {
    _body: Mesh;
    _speed: number;
    _direction: number;
    _paddle1: Paddle;
    _paddle2: Paddle;

    constructor(scene: Scene, paddle1, paddle2: Paddle) {
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
        this._direction = 1;

        // enable collision
        this._body.checkCollisions = true;

        this._paddle1 = paddle1;
        this._paddle2 = paddle2;

    }

    update() {
        this._move();
        this._checkCollision();
    }

    _move() {
        switch (this._direction) {
            case Direction.DOWN:
                this._body.position.x += this._speed;
                break;
            case Direction.UP:
                this._body.position.x -= this._speed;
                break;
            case Direction.L_DOWN:
                this._body.position.x += this._speed;
                this._body.position.z -= this._speed;
                break;
            case Direction.R_DOWN:
                this._body.position.x += this._speed;
                this._body.position.z += this._speed;
                break;
            case Direction.L_UP:
                this._body.position.x -= this._speed;
                this._body.position.z -= this._speed;
                break;
            case Direction.R_UP:
                this._body.position.x -= this._speed;
                this._body.position.z += this._speed;
                break;
        }
    }

    _checkCollision() {
        if (this._body.intersectsMesh(this._paddle1._body, false)) {
            this._direction = Direction.UP;
        }
        if (this._body.intersectsMesh(this._paddle2._body, false)) {
            this._direction = Direction.DOWN;
        }
    }
};