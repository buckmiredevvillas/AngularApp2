
import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {

  // Check whether the task is high priority.
  @Input() appHighlight = false;

  // Highlight high-priority tasks.
  @HostBinding('style.backgroundColor')
  get backgroundColor(): string {
    return this.appHighlight ? '#ffe0b2' : '';
  }
}
