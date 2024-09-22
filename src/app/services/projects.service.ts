import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private apiUrl = 'https://global.api.clockify.me/workspaces/66cd29599c354e3d939527d5/projects';

  constructor(private http: HttpClient) {}

  getProjects(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(
      map((data) => data),
      catchError((error) => {
        console.error('Erro ao obter projetos:', error);
        return of([]);
      })
    );
  }
}
