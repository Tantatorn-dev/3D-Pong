import { MeshBuilder, Mesh, Scene, StandardMaterial, Color3 } from "babylonjs";
import Paddle from "./paddle";
import { PaddleDirection, BallDirection } from "../enums/enums";

export default class Ball {
    _body: Mesh;
    _speed: number;
    _direction: BallDirection;
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
            case BallDirection.DOWN:
                this._body.position.x += this._speed;
                break;
            case BallDirection.UP:
                this._body.position.x -= this._speed;
                break;
            case BallDirection.L_DOWN:
                this._body.position.x += this._speed;
                this._body.position.z -= this._speed;
                break;
            case BallDirection.R_DOWN:
                this._body.position.x += this._speed;
                this._body.position.z += this._speed;
                break;
            case BallDirection.L_UP:
                this._body.position.x -= this._speed;
                this._body.position.z -= this._speed;
                break;
            case BallDirection.R_UP:
                this._body.position.x -= this._speed;
                this._body.position.z += this._speed;
                break;
        }
    }

    _checkCollision() {
        if (this._body.intersectsMesh(this._paddle1._body, false)) {
            if (this._paddle1.getDirection() == PaddleDirection.NONE) {
                this._direction = BallDirection.UP;
            }
            else if (this._paddle1.getDirection() == PaddleDirection.LEFT) {
                this._direction = BallDirection.L_UP;
            }
            else if (this._paddle1.getDirection() == PaddleDirection.RIGHT) {
                this._direction = BallDirection.R_UP;
            }
        }
        if (this._body.intersectsMesh(this._paddle2._body, false)) {
            if (this._paddle2.getDirection() == PaddleDirection.NONE) {
                this._direction = BallDirection.DOWN;
            }
            else if (this._paddle2.getDirection() == PaddleDirection.LEFT) {
                this._direction = BallDirection.L_DOWN;
            }
            else if (this._paddle2.getDirection() == PaddleDirection.RIGHT) {
                this._direction = BallDirection.R_DOWN;
            }
        }
    }
};