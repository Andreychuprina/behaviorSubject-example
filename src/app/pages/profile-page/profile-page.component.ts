import { Component, OnDestroy, OnInit } from '@angular/core';
import { IProfile } from '../../interfaces/profile.interface';
import { StoreService, StoreServiceConstructor } from '../../services/store.service';
import { filter, first, Subscription } from 'rxjs';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit, OnDestroy {
  public profile!: IProfile;
  private profileSubscription!: Subscription;
  private storeService: StoreService;

  constructor() {
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

  ngOnDestroy(): void {
    this.profileSubscription?.unsubscribe();
  }
}
