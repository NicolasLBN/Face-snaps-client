import { Component, OnInit } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { FaceSnap } from './models/face-snap.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  faceSnaps!: FaceSnap[];
  interval$!: Observable<string>;

  ngOnInit() {
   this.interval$ = interval(1000).pipe(
     map(value => value % 2 === 0 ?
      `Je suis value ${value} et je suis pair` :
      `Je suis value ${value} et je suis impair`
      ),
      tap(text => console.log(text))
   );
  }
}