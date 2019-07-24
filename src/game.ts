import { Engine, Scene, HemisphericLight, Vector3, Light, ArcRotateCamera, ActionManager } from "babylonjs";
import Ball from "./components/objects/ball";
import Paddle from "./components/objects/paddle";

export default class Game {
    _canvas: HTMLCanvasElement;
    _engine: Engine;
    _scene: Scene;
    _camera: ArcRotateCamera;
    _light: Light;
    _ball: Ball;
    _paddle1: Paddle;
    _paddle2: Paddle;

    constructor(canvasElement: string) {
        this._canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
        this._engine = new Engine(this._canvas, true);
    }

    createScene(): void {
        this._scene = new Scene(this._engine)

        //create a camera 
        this._camera = new ArcRotateCamera('camera', 0, 0, 100, new Vector3(0, 0, 0), this._scene);

        //target a camera to center
        this._camera.setTarget(Vector3.Zero());

        //attach the camera to the canvas
        this._camera.attachControl(this._canvas, false);

        //light
        this._light = new HemisphericLight('light1', new Vector3(10, 10, 10), this._scene);

        //add paddles to the scene
        this._paddle1 = new Paddle('player', this._scene);
        this._paddle2 = new Paddle('cpu', this._scene)

        //add a ball to the scene
        this._ball = new Ball(this._scene, this._paddle1, this._paddle2);

        //enable collision
        this._scene.collisionsEnabled = true;
        this._camera.checkCollisions = true;

        //keyboard input configuration
        this._camera.inputs.clear()

        //register update methods
        this._scene.registerBeforeRender(() => {
            this._paddle1.handleEvent();
            this._paddle2.moveByBallPosition(this._ball._body.position.z);
            this._ball.update();
        });

    }

    render(): void {

        this._engine.runRenderLoop(() => {
            this._scene.render();
        });

        window.addEventListener('resize', () => {
            this._engine.resize();
        });
    }
}