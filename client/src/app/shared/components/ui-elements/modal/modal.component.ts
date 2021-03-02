import {
  Component,
  Injectable,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
@Injectable()
export class ModalComponent {
  @Input() title: string;
  @Output() cleanUp = new EventEmitter<any>();
  @ViewChild('modal') private modalContent: TemplateRef<ModalComponent>;
  private modalRef: NgbModalRef;

  constructor(private modalService: NgbModal) {}

  open(): void {
    this.modalRef = this.modalService.open(this.modalContent, {
      size: 'lg',
      centered: true,
    });
  }

  close(): void {
    this.modalRef?.close();
    this.cleanUp.emit();
  }

  dismiss(): void {
    this.modalRef?.dismiss();
    this.cleanUp.emit();
  }
}
