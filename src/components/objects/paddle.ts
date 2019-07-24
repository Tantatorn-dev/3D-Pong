import { Mesh, Scene, MeshBuilder, StandardMaterial, Color3, Vector3, ActionManager, ExecuteCodeAction } from "babylonjs";

const WIDTH = 2;
const HEIGHT = 10;
const DEPTH = 50;

enum Direction {
    LEFT,
    RIGHT
}

export default class Paddle {
    _body: Mesh;
    _type: string; //player or cpu
    _direction: Direction;

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

    }

    handleEvent(){
        if (this._type=='player'){
            window.addEventListener('keydown',
            (event)=>{
                switch(event.key){
                    case 'a':
                        this._body.position.z --;
                        break;
                    case 'd':
                        this._body.position.z ++;
                        break;
                }
            })
        }
    }
}