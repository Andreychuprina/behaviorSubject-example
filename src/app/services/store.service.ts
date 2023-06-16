import { BehaviorSubject, Observable } from 'rxjs';
import { IProfile } from '../interfaces/profile.interface';

export class StoreServiceConstructor {
  private static _instance: StoreService;

  public static getInstance(): StoreService {
    if(!this._instance) {
      this._instance = new StoreServiceInstance();
    }
    return this._instance;
  }
}

export abstract class StoreService {
  protected abstract _profile$: BehaviorSubject<IProfile | undefined>;

  public abstract get profile$(): Observable<IProfile | undefined>;

  public abstract set profile(profile: IProfile);
}

class StoreServiceInstance extends StoreService {
  protected _profile$ = new BehaviorSubject<IProfile | undefined>(undefined);

  public get profile$(): Observable<IProfile | undefined> {
    return this._profile$.asObservable();
  }

  public set profile(profile: IProfile) {
    this._profile$.next(profile);
  }
}
