import { Engine, Scene, ArcRotateCamera, HemisphericLight, Vector3, MeshBuilder, Mesh, FreeCamera, Light } from "babylonjs";

export default class Game {
    _canvas: HTMLCanvasElement;
    _engine: Engine;
    _scene: Scene;
    _camera: FreeCamera;
    _light: Light;

    constructor(canvasElement: string) {
        this._canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
        this._engine = new Engine(this._canvas, true);
    }

    createScene(): void {
        this._scene = new Scene(this._engine)

        //create a camera 
        this._camera = new FreeCamera('camera', new Vector3(0, 5, -10), this._scene);

        //target a camera to center
        this._camera.setTarget(Vector3.Zero());

        //attach the camera to the canvas
        this._camera.attachControl(this._canvas,false);

        this._light = new HemisphericLight('light',new Vector3(0,1,0),this._scene);
    }

    render(): void {
        this._engine.runRenderLoop(()=>{
            this._scene.render();
        });

        window.addEventListener('resize',()=>{
            this._engine.resize();
        })
    }
}