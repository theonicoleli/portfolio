import { Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ProjectsComponent } from './pages/projects/projects.component';

export const routes: Routes = [
    {path: '', component: IndexComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'projects', component: ProjectsComponent},
];
