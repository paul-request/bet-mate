import { Component, EventEmitter, Output, Input } from '@angular/core';

import { TrimPipe } from '../../pipes/trim.pipe';
import template from './bet-item.template.html';

@Component({
  selector: 'bet-item',
  template: template,
  pipes: [TrimPipe]
})
export class BetItemComponent {
  @Input() bet;

  @Output() itemModified = new EventEmitter();
  @Output() itemRemoved = new EventEmitter();

  editing = false;

  cancelEditing() {
    this.editing = false;
  }

  stopEditing(editedTitle) {
    this.bet.setTitle(editedTitle.value);
    this.editing = false;

    if (this.bet.title.length === 0) {
      this.remove();
    }
    else {
      this.update();
    }
  }

  edit() {
    this.editing = true;
  }

  toggleCompletion() {
    this.bet.completed = !this.bet.completed;
    this.update();
  }

  remove() {
    this.itemRemoved.next(this.bet.uid);
  }

  update() {
    this.itemModified.next(this.bet.uid);
  }
}
