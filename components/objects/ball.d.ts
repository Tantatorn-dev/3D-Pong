import { Mesh, Scene } from "babylonjs";
import Paddle from "./paddle";
import { BallDirection } from "../enums/enums";
export default class Ball {
    _body: Mesh;
    _speed: number;
    _direction: BallDirection;
    _paddle1: Paddle;
    _paddle2: Paddle;
    constructor(scene: Scene, paddle1: any, paddle2: Paddle);
    update(): void;
    _move(): void;
    _checkCollision(): void;
}
