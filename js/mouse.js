class Mouse {
  constructor() {
    this.isClicked = false;
    this.x = 0;
    this.y = 0;
    this.angle = 0;
    this.distance = 0;
    this.handle = null;
    window.addEventListener("mousedown", (event) => { this.down(event); });
    window.addEventListener("mouseup", (event) => { this.up(event); });
    window.addEventListener("mousemove", (event) => { this.move(event); });
  }

  down(event) {
    event.preventDefault();
    this.x = event.pageX;
    this.y = event.pageY;
    this.isClicked = true;
    clickDown(event);
  }

  move(event) {
    if (!mouse.isClicked) return;
    let deltaX = mouse.x - event.pageX;
    let deltaY = mouse.y - event.pageY;
    this.deltaX = deltaX;
    this.deltaY = deltaY;
    this.angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI + 180;
    this.distance = Math.sqrt(deltaX*deltaX + deltaY*deltaY);
    mouseMove();
  }

  up(event) {
    clickUp();
    mouse.isClicked = false;
    mouse.handle = null;
    mouse.angle = 0;
    mouse.distance = 0;
  }
}
