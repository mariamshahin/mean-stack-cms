import { Component, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FileLikeObject, FileUploader } from 'ng2-file-upload';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements OnDestroy {
  @Output() selectFile = new EventEmitter<any>();

  faCloudUploadAlt = faCloudUploadAlt;
  hasDropZoneOver = false;
  isError = false;
  errorMessage: string = null;
  // File upload config
  uploader: FileUploader;
  allowedMimeType = ['image/png', 'image/jpg', 'image/jpeg'];
  maxFileSize = 1 * 1024 * 1024;

  constructor() {
    this.uploader = new FileUploader({
      isHTML5: true,
      allowedMimeType: this.allowedMimeType,
      maxFileSize: this.maxFileSize,
    });
    this.uploader.onWhenAddingFileFailed = (item, filter, options) =>
      this.onAddFileFailed(item, filter, options);
    this.uploader.onAfterAddingFile = (item) => this.readFile(item._file);
  }

  onAddFileFailed(item: FileLikeObject, filter: any, options: any) {
    this.isError = true;
    this.selectFile.emit(null);
    switch (filter.name) {
      case 'fileSize':
        this.errorMessage = `Maximum upload size exceeded ( ${this.toMegaBytes(
          item.size
        )} of ${this.toMegaBytes(this.maxFileSize)} MB allowed )`;
        break;
      case 'mimeType':
        const itemType = item.type.split('/').pop();
        const allowedTypes = this.allowedMimeType.map((type) =>
          type.split('/').pop()
        );
        this.errorMessage = `Type " ${itemType} " is not allowed. Allowed types: " ${allowedTypes.join(
          ' , '
        )} "`;
        break;
      default:
        this.errorMessage = `Unknown error (filter is ${filter.name})`;
    }
  }

  toMegaBytes(n) {
    const mb = n / (1024 * 1024);
    return mb.toFixed(2);
  }

  fileOver(e: any): void {
    this.hasDropZoneOver = e;
  }

  readFile(f) {
    this.cleanUp();
    const file = new Blob([f], { type: f.type });
    this.selectFile.emit({ file, name: f.name });
  }

  cleanUp() {
    this.isError = false;
    this.errorMessage = null;
  }

  ngOnDestroy() {
    this.uploader.destroy();
  }
}
