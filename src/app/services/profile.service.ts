import { delay, Observable, of } from 'rxjs';
import { StoreService, StoreServiceConstructor } from './store.service';
import { IProfile } from '../interfaces/profile.interface';

export class ProfileServiceConstructor {
  private static _instance: ProfileService;

  public static getInstance(): ProfileService {
    if(!this._instance) {
      this._instance = new ProfileServiceInstance();
    }
    return this._instance;
  }
}

export abstract class ProfileService {
  protected abstract store: StoreService;

  public abstract getProfile(): Observable<IProfile>;

  public abstract setProfile(profile: IProfile): void;
}

class ProfileServiceInstance extends ProfileService {
  protected store!: StoreService;

  public getProfile(): Observable<IProfile> {
    return of({
      id: 1,
      age: 20,
      firstName: 'Andrey',
      lastName: 'Chuprina',
      phone: '0762112567',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
    }).pipe(delay(1000));
  }

  public setProfile(profile: IProfile): void {
    this.store = StoreServiceConstructor.getInstance();
    this.store.profile = profile;
  }
}