import { Component, OnInit, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    CommonModule,
  ],
  providers: [],
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  selectedSkills: string[] = [];
  selectedImages: string[] = [];
  activeSkill: string = 'techSkills';

  isDragging = false;
  startX: number = 0;
  scrollLeft: number = 0;
  debounceTimeout: any;
  
  techSkillsPath: string = "assets/technologies/";
  techSkillsImages: string[] = [];

  softSkillsPath: string = "assets/soft_skills/";
  softSkillsImages: string[] = [];

  constructor(
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.removeAOSOnMobile();
    }
    this.getSkillsImage(this.techSkillsImages, 13, this.techSkillsPath);
    this.getSkillsImage(this.softSkillsImages, 10, this.softSkillsPath);
    this.showSkills('techSkills');
  }

  removeAOSOnMobile() {
    if (window.innerWidth < 769) {
      const elements = document.querySelectorAll('[data-aos]');
      elements.forEach(element => {
        this.renderer.removeAttribute(element, 'data-aos');
      });
    }

    window.addEventListener('resize', () => {
      if (window.innerWidth < 769) {
        const elements = document.querySelectorAll('[data-aos]');
        elements.forEach(element => {
          this.renderer.removeAttribute(element, 'data-aos');
        });
      }
    });
  }

  showSkills(skillType: string): void {
    this.activeSkill = skillType;
    switch (skillType) {
      case 'softSkills':
        this.selectedImages = this.softSkillsImages;
        break;
      case 'hardSkills':
        this.selectedImages = this.techSkillsImages;
        break;
      case 'techSkills':
        this.selectedImages = this.techSkillsImages;
        break;
    }
  }

  startDrag(event: MouseEvent, container: HTMLDivElement): void {
    if (!container) return;

    this.isDragging = true;
    container.classList.add('dragging');
    this.startX = event.pageX - container.getBoundingClientRect().left;
    this.scrollLeft = container.scrollLeft;

    if (this.debounceTimeout) clearTimeout(this.debounceTimeout);
    this.debounceTimeout = setTimeout(() => {
      container.addEventListener('mousemove', this.onMouseMove.bind(this, container));
      container.addEventListener('mouseup', this.stopDrag.bind(this, container));
    }, 100);
  }

  onMouseMove(container: HTMLDivElement, event: MouseEvent): void {
    if (!this.isDragging) return;

    event.preventDefault();
    const { pageX } = event;
    const containerRect = container.getBoundingClientRect();
    const x = pageX - containerRect.left;
    const walk = (x - this.startX) * 2;

    requestAnimationFrame(() => {
      container.scrollLeft = this.scrollLeft - walk;
    });
  }

  stopDrag(container: HTMLDivElement): void {
    if (!container) return;

    this.isDragging = false;
    container.classList.remove('dragging');

    container.removeEventListener('mousemove', this.onMouseMove.bind(this, container));
    container.removeEventListener('mouseup', this.stopDrag.bind(this, container));
    
    this.toggleAutoScroll(container, false);
  }

  enableAutoScroll(container: HTMLDivElement): void {
    this.toggleAutoScroll(container, true);
  }

  disableAutoScroll(container: HTMLDivElement): void {
    this.toggleAutoScroll(container, false);
  }

  private toggleAutoScroll(container: HTMLDivElement, enable: boolean): void {
    if (!container) return;

    if (enable) {
      container.classList.add('auto-scroll');
    } else {
      container.classList.remove('auto-scroll');
    }
  }

  private getSkillsImage(arr: any[], length: number, path: string) {
    for (let i = 1; i < length; i++) {
      arr.push(`${path}img_0${i}.png`);
    }
  }
}
