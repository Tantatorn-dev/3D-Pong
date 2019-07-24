import { Mesh, Scene, MeshBuilder, StandardMaterial, Color3, Vector3, ActionManager, ExecuteCodeAction } from "babylonjs";
import { PaddleDirection } from "../enums/enums";
import Ball from "./ball";

const WIDTH = 2;
const HEIGHT = 10;
const DEPTH = 50;

export default class Paddle {
    _body: Mesh;
    _type: string; //player or cpu
    _direction: PaddleDirection;

    constructor(paddleType: string, scene: Scene) {
        this._type = paddleType;

        this._body = MeshBuilder.CreateBox(this._type, {
            depth: DEPTH,
            width: WIDTH,
            height: HEIGHT,
        }, scene);

        // prepare the material
        let mat = new StandardMaterial('paddleMaterial', scene);
        mat.diffuseColor = new Color3(0, 0, 1);

        // add color to a paddle
        this._body.material = mat;

        // add a position
        this._body.position = this._type == 'player' ? new Vector3(30, 0, 0) : new Vector3(-30, 0, 0);

        // enable collisions
        this._body.checkCollisions = true;

        // initial direction
        this._direction = PaddleDirection.NONE;
    }

    handleEvent() {
        if (this._type == 'player') {
            window.addEventListener('keydown',
                (event) => {
                    switch (event.key) {
                        case 'a':
                            this._body.position.z-=0.01;
                            this._direction = PaddleDirection.LEFT;
                            break;
                        case 'd':
                            this._body.position.z+=0.01;
                            this._direction = PaddleDirection.RIGHT;
                            break;
                        default:
                            this._direction = PaddleDirection.NONE;
                    }
                })
        }
    }

    moveByBallPosition(z:number) {
        if(this._type=='cpu'){
            if(z>this._body.position.z){
                            this._body.position.z+=0.3;
                            this._direction = PaddleDirection.LEFT;
            }
            if(z<this._body.position.z){
                            this._body.position.z-=0.3;
                            this._direction = PaddleDirection.RIGHT;
            }
            if(z==this._body.position.z){
                this._direction = PaddleDirection.NONE;
            }
        }
    }

    getDirection(): PaddleDirection {
        return this._direction;
    }
}