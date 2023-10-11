import { Directive, Input, HostListener, ElementRef } from '@angular/core';
@Directive({
  selector: '[appResize]',
})
export class ResizeDirective {
  @Input('leftResize') leftElement!: HTMLElement;
  @Input('rightResize') rightElement!: HTMLElement;
  grabber: boolean = false;
  constructor() {}
  @HostListener('mousedown') onMouseDown() {
    this.grabber = true;
  }

  @HostListener('window:mouseup') onMouseUp() {
    this.grabber = false;
  }

  calcPercentages(mouseX: number, screenWidth: number) {
    const left = (mouseX / screenWidth) * 100;
    const right = 100 - left;
    return { left, right };
  }

  @HostListener('window:mousemove', ['$event']) onMouseMove(event: MouseEvent) {
    if (this.grabber) {
      event.preventDefault();
      const { left, right } = this.calcPercentages(
        event.clientX,
        window.innerWidth
      );
      this.leftElement.style.flex = `${left}%`;
      this.rightElement.style.flex = `${right}%`;
    }
  }
}
