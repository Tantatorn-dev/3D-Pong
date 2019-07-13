import { Engine, Scene, HemisphericLight, Vector3, Light, ArcRotateCamera } from "babylonjs";
import Ball from "./components/objects/ball";

export default class Game {
    _canvas: HTMLCanvasElement;
    _engine: Engine;
    _scene: Scene;
    _camera: ArcRotateCamera;
    _light: Light;
    _ball: Ball;

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

        //add a ball to the scene
        this._ball = new Ball(this._scene);
    }

    render(): void {
        this._engine.runRenderLoop(() => {
            this._scene.render();
        });

        window.addEventListener('resize', () => {
            this._engine.resize();
        })
    }
}