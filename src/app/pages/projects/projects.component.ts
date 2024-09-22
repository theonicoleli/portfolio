import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsService } from '../../services/projects.service';
import { catchError, map, of } from 'rxjs';
import { WorkComponent } from './component/work/work.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    WorkComponent
  ],
  providers: [
    ProjectsService
  ],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {

  public messageText: any[] = [];
  public filteredMessageText: any[] = [];
  public options: string[] = ['Todos', 'Angular', 'Dotnet', 'React', 'Spring Boot'];
  public selectedOption: string = 'Todos';
  public menuOpen: boolean = false;

  constructor(private projectService: ProjectsService) {}

  ngOnInit() {
    this.setMessageText();
  }

  selectOption(option: string) {
    this.selectedOption = option;
    this.filterProjects();
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  setMessageText() {
    this.projectService.getProjects().pipe(
      map((projects) => {
        this.messageText = projects.list.map((project: any) => {
          const [frameworks, text, github] = project.note.includes("\\") 
            ? project.note.split("\\") 
            : [project.note, '', ''];
          return { ...project, frameworks, text, github };
        });
        this.filterProjects();
      }),
      catchError((error) => {
        console.error('Erro ao buscar projetos:', error);
        return of([]);
      })
    ).subscribe();
  }

  getLanguages(project: any): string[] {
    return project.frameworks 
      ? project.frameworks.split(",").map((lang: string) => lang.trim().toLowerCase()) 
      : [];
  }

  getText(project: any): string {
    return project.text || project.note;
  }

  filterProjects() {
    const selectedOptionLower = this.selectedOption.toLowerCase();
    
    if (this.selectedOption === 'Todos') {
      this.filteredMessageText = this.messageText;
    } else {
      this.filteredMessageText = this.messageText.filter(project => 
        this.getLanguages(project).includes(selectedOptionLower)
      );
    }
  }

}
