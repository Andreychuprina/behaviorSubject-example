import { Component, OnDestroy, OnInit } from '@angular/core';
import { IProfile } from '../../interfaces/profile.interface';
import { filter, first, Subscription } from 'rxjs';
import { StoreService, StoreServiceConstructor } from '../../services/store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-greeting-page',
  templateUrl: './greeting-page.component.html',
  styleUrls: ['./greeting-page.component.scss']
})
export class GreetingPageComponent implements OnInit, OnDestroy {
  public profile!: IProfile;
  private profileSubscription!: Subscription;
  private storeService: StoreService;

  constructor(private router: Router) {
    this.storeService = StoreServiceConstructor.getInstance();
  }

  ngOnInit(): void {
    this.getProfile();
  }

  private getProfile(): void {
    this.profileSubscription = this.storeService.profile$
      .pipe(
        filter(v => !!v),
        first()
      )
      .subscribe((profile: IProfile | undefined) => {
        this.profile = profile!;
      });
  }

  public navigateToProfile(): void {
    this.router.navigate(['/', 'profile']);
  }

  ngOnDestroy(): void {
    this.profileSubscription?.unsubscribe();
  }
}
