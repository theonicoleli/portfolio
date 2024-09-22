import { Component, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isMenuOpen = false;
  activeRoute: string = '';

  constructor(private el: ElementRef, private renderer: Renderer2, private router: Router) {
    this.router.events.subscribe(() => {
      this.activeRoute = this.router.url;
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;

    const headerElement = this.el.nativeElement.querySelector('header');
    const iconHeader = this.el.nativeElement.querySelector('.fa-solid');

    if (this.isMenuOpen) {
      this.renderer.addClass(headerElement, 'no-radius');
      this.renderer.removeClass(iconHeader, 'fa-bars');
      this.renderer.addClass(iconHeader, 'fa-xmark');
    } else {
      this.renderer.removeClass(headerElement, 'no-radius');
      this.renderer.removeClass(iconHeader, 'fa-xmark');
      this.renderer.addClass(iconHeader, 'fa-bars');
    }
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
    this.toggleMenu();
  }

  isActive(route: string): boolean {
    return this.activeRoute === route;
  }
}
