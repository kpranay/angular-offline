import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, fromEvent } from 'rxjs';


@Injectable()
export class NetworkStatusService {

  private networkStatus = new BehaviorSubject<boolean>(false);
  status = this.networkStatus.asObservable();
  private onlineEvent: Observable<Event>;
  private offlineEvent: Observable<Event>;
  private subscriptions: Subscription[] = [];

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

   isOnline() {
     return this.networkStatus.value;
   }
}
