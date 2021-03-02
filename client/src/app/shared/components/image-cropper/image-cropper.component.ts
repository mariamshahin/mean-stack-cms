import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.scss'],
})
export class ImageCropperComponent {
  @Input() imageFile: { file: Blob; name: string } = null;
  @Input() round = false;
  @Output() imageCrop = new EventEmitter<any>();

  isLoading = false;
  isError = false;
  errorMessage = null;

  constructor() {}

  imageCropped(event: ImageCroppedEvent) {
    const image = this.base64ToFile(event.base64, this.imageFile?.name);
    this.imageCrop.emit(image);
  }
  imageLoaded() {
    this.isLoading = true;
    this.isError = false;
    this.errorMessage = null;
  }
  cropperReady() {
    this.isLoading = false;
  }
  loadImageFailed() {
    this.isLoading = false;
    this.isError = true;
    this.errorMessage = 'Image loading faild, please try again';
  }

  base64ToFile(data, filename) {
    const arr = data.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }
}
