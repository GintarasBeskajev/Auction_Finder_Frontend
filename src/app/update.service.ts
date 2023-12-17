import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {
  private headerUpdateSubject = new Subject<void>();

  headerUpdate$ = this.headerUpdateSubject.asObservable();

  triggerHeaderUpdate() {
    this.headerUpdateSubject.next();
  }
}
