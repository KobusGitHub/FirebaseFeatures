import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import { tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  @Output() uploadedUrlChange = new EventEmitter<{id: string, imageUrl: string}>();
  @Input() showDrowZone: boolean = false;
  @Input() showImage: boolean = false;

  // Main task
  task: AngularFireUploadTask;
  // Progress monitoring
  percentage: Observable<number>;
  snapshot: Observable<any>;
  // Download URL
  downloadURL: Observable<string>;
  // State for dropzone CSS toggling
  isHovering: boolean;
  imageId: string = '';

  constructor(private _snackBarService: MatSnackBar,
    private storage: AngularFireStorage, private db: AngularFirestore) { }

  ngOnInit() {
    this.imageId = '';
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }
  getNewId(): string {
    let d = new Date().getTime();
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      // tslint:disable-next-line:no-bitwise
      let r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      // tslint:disable-next-line:no-bitwise
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }

  startUpload(event: FileList) {
    // The File object
    const file = event.item(0);

    // Client-side validation example
    if (file.type.split('/')[0] !== 'image') {
      this._snackBarService.open('unsupported file type :( ', undefined, { duration: 3000 });
      return;
    }

    // The storage path
    this.imageId = this.getNewId();
    const path = 'images/' + this.imageId;

    // Totally optional metadata
    const customMetadata = { app: 'FirebaseFeatures' };

    // The main task
    this.task = this.storage.upload(path, file, { customMetadata });

    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(
      tap((snap) => {

        if (snap.bytesTransferred === snap.totalBytes) {
          // Update firestore on completion
        }
      })
    );
    // The file's download URL
    this.downloadURL = this.task.downloadURL().pipe(
      tap((res) => {
        this.uploadedUrlChange.emit({id: this.imageId, imageUrl: res});
      }
      ));

  }

  // Determines if the upload task is active
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

}
