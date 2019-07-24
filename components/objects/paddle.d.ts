import { Mesh, Scene } from "babylonjs";
import { PaddleDirection } from "../enums/enums";
export default class Paddle {
    _body: Mesh;
    _type: string;
    _direction: PaddleDirection;
    constructor(paddleType: string, scene: Scene);
    handleEvent(): void;
    moveByBallPosition(z: number): void;
    getDirection(): PaddleDirection;
}
