import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, fromEvent } from 'rxjs';


@Injectable()
export class NetworkStatusService {

  private networkStatus = new BehaviorSubject<boolean>(false);
  status = this.networkStatus.asObservable();
  public onlineEvent: Observable<Event>;
  public offlineEvent: Observable<Event>;
  public subscriptions: Subscription[] = [];

  constructor() {
    this.networkStatus.next(navigator.onLine);
    this.onlineEvent = fromEvent(window, 'online');
    this.offlineEvent = fromEvent(window, 'offline');
    this.subscriptions.push(this.onlineEvent.subscribe(event => {
        this.networkStatus.next(true);
    }));
    this.subscriptions.push(this.offlineEvent.subscribe(e => {
        this.networkStatus.next(false);
    }));
   }
}
