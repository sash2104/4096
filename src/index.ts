declare var GIF: any;  // for https://github.com/jnordberg/gif.js

module framework {
  export class Random {
    private x: number;
    private y: number;
    private z: number;
    private w: number;
    constructor() {
      this.x = 123456789;
      this.y = 362436069;
      this.z = 521288629;
      this.w = 88675123; // seedk
    }

    // XorShift
    next() {
      let t;
      t = this.x ^ (this.x << 11);
      this.x = this.y; this.y = this.z; this.z = this.w;
      return this.w = (this.w ^ (this.w >>> 19)) ^ (t ^ (t >>> 8));
    }

    nextInt(max: number) {
      return this.next() % max;
    }
  }

  export class Game {
    public readonly N: number = 4;
    public grid: number[][] = [];
    constructor() {
      for (let i = 0; i < this.N; i++) {
        const row: number[] = [];
        for (let j = 0; j < this.N; j++) {
          row.push(0);
        }
        this.grid.push(row);
      }
    }
  }
}

module visualizer {
  class Visualizer {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private scoreInput: HTMLInputElement;
    private game: framework.Game;
    static colors = [
      '#ffffff', '#e1f5fe', '#b3e5fc', '#81d4fa', '#4fc3f7',
      '#29b6f6', '#03a9f4', '#039be5', '#0288d1', '#0277bd',
      '#01579b',
    ];

    constructor() {
      this.game = new framework.Game();
      this.canvas = <HTMLCanvasElement>document.getElementById("canvas");  // TODO: IDs should be given as arguments
      const size = 400;
      this.canvas.height = size;  // pixels
      this.canvas.width = size;  // pixels
      this.ctx = this.canvas.getContext('2d')!;
      this.scoreInput = <HTMLInputElement>document.getElementById("scoreInput");
    }

    public draw() {
      this.scoreInput.value = "0";

      const W = this.canvas.width / this.game.N;
      const H = this.canvas.height / this.game.N;
      // this.ctx.font = `${(lenH - 1)/2}px monospace`;
      this.ctx.lineWidth = 1;
      for (let i = 0; i < this.game.N; i++) {
        const x = i*W;
        for (let j = 0; j < this.game.N; j++) {
          const y = j*H;
          this.ctx.fillStyle = Visualizer.colors[(i*this.game.N+j)%11];
          this.ctx.fillRect(x, y, W, H);
        }
      }
    }

    public getCanvas(): HTMLCanvasElement {
      return this.canvas;
    }
  };

  export class App {
    public visualizer: Visualizer;

    constructor() {
      this.visualizer = new Visualizer();
      this.visualizer.draw();
    }
  }
}

window.onload = () => {
  if (location.host != 'atcoder.jp') {
    document.body.style.paddingTop = '40px';
  }
  new visualizer.App();
};
