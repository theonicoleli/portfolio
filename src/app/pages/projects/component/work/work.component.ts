import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-work',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent {
  @Input() project: any;

  constructor() {}

  ngOnInit() {}

  getLanguages(): any | any[] {
    return this.project.frameworks.length > 0 ? this.project.frameworks.split(",") : '';
  }

  getText(): string {
    return this.project.text.length > 1 ? this.project.text : this.project.note;
  }
}
