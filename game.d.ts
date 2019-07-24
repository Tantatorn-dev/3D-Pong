import { Engine, Scene, Light, ArcRotateCamera } from "babylonjs";
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
    constructor(canvasElement: string);
    createScene(): void;
    render(): void;
}
