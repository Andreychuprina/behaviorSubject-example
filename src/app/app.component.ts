import { Component, OnInit } from '@angular/core';
import { ProfileService, ProfileServiceConstructor } from './services/profile.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private profileService: ProfileService;

  constructor() {
    this.profileService = ProfileServiceConstructor.getInstance();
  }

  ngOnInit(): void {
    this.initSession();
  }

  private initSession(): void {
    this.profileService.getProfile().pipe(
      first()
    ).subscribe((profile) => {
      this.profileService.setProfile(profile);
    });
  }
}
