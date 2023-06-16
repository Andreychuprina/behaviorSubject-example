import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GreetingPageComponent } from './pages/greeting-page/greeting-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';

const routes: Routes = [
  { path: '', component: GreetingPageComponent, pathMatch: 'full' },
  { path: 'profile', component: ProfilePageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
