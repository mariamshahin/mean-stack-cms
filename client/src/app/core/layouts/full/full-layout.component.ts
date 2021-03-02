import {
  Component,
  OnInit,
  ElementRef,
  Inject,
  Renderer2,
  ViewChild,
  OnDestroy,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';
import { ConfigService } from 'app/shared/services/config.service';

@Component({
  selector: 'app-full-layout',
  templateUrl: './full-layout.component.html',
  styleUrls: ['./full-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullLayoutComponent implements OnInit, OnDestroy {
  @ViewChild('content-wrapper') wrapper!: ElementRef;
  public config: any = {};
  layoutSub: Subscription;

  constructor(
    private configService: ConfigService,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef
  ) {
    this.config = this.configService.templateConf;
  }

  ngOnInit() {
    this.layoutSub = this.configService.templateConf$.subscribe(
      (templateConf) => {
        if (templateConf) {
          this.config = templateConf;
        }
        this.loadLayout();
        this.cdr.markForCheck();
      }
    );
  }

  loadLayout() {
    this.renderer.removeClass(this.document.body, 'vertical-menu');
    this.renderer.removeClass(this.document.body, 'menu-expanded');
    this.renderer.removeClass(this.document.body, 'navbar-static');
    this.renderer.removeClass(this.document.body, 'menu-open');
    this.renderer.addClass(this.document.body, 'blank-page');
  }

  ngOnDestroy() {
    if (this.layoutSub) {
      this.layoutSub.unsubscribe();
    }
  }
}
