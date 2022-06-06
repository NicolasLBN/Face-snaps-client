import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FaceSnap } from '../models/face-snap.model';
import { FaceSnapsService } from '../services/face-snaps.service';

@Component({
  selector: 'app-single-face-snap',
  templateUrl: './single-face-snap.component.html',
  styleUrls: ['./single-face-snap.component.scss']
})
export class SingleFaceSnapComponent implements OnInit {
  faceSnap$!: Observable<FaceSnap>
  buttonText!: string;

  constructor(private faceSnapsService: FaceSnapsService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.buttonText = 'Oh Snap!';
    const faceSnapId = +this.route.snapshot.params['id'];
    this.faceSnap$ = this.faceSnapsService.getSnapFaceSnapById(faceSnapId)
  }

  onSnap(faceSnapId: number) {
    if (this.buttonText === 'Oh Snap!') {
      this.faceSnapsService.snapFaceSnapById(faceSnapId, 'snap').pipe(
        tap(() => {
          this.faceSnap$ = this.faceSnapsService.getSnapFaceSnapById(faceSnapId)
          this.buttonText = 'Oops, unSnap!'
        })
      ).subscribe()
    } else {
      this.faceSnapsService.snapFaceSnapById(faceSnapId, 'unsnap').pipe(
        tap(() => {
          this.faceSnap$ = this.faceSnapsService.getSnapFaceSnapById(faceSnapId);
          this.buttonText = 'Oh Snap!';
        })
      ).subscribe()
    }
  }
}
