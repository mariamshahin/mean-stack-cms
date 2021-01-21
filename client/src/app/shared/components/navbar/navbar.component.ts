import {
  Component,
  Output,
  EventEmitter,
  OnDestroy,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef,
  ViewChild,
  ElementRef,
  ViewChildren,
  QueryList,
  HostListener,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LayoutService } from 'app/services/layout.service';
import { ConfigService } from 'app/services/config.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, AfterViewInit, OnDestroy {
  toggleClass = 'ft-maximize';
  isSmallScreen = false;
  protected innerWidth: any;
  hideSidebar: boolean = true;
  public isCollapsed = true;
  layoutSub: Subscription;
  configSub: Subscription;

  @ViewChild('search') searchElement: ElementRef;
  @ViewChildren('searchResults') searchResults: QueryList<any>;

  @Output()
  toggleHideSidebar = new EventEmitter<Object>();

  public config: any = {};

  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private configService: ConfigService,
    private cdr: ChangeDetectorRef
  ) {
    this.config = this.configService.templateConf;
    this.innerWidth = window.innerWidth;

    this.layoutSub = layoutService.toggleSidebar$.subscribe((isShow) => {
      this.hideSidebar = !isShow;
    });
  }

  ngOnInit() {
    if (this.innerWidth < 1200) {
      this.isSmallScreen = true;
    } else {
      this.isSmallScreen = false;
    }
  }

  ngAfterViewInit() {
    this.configSub = this.configService.templateConf$.subscribe(
      (templateConf) => {
        if (templateConf) {
          this.config = templateConf;
        }
        this.cdr.markForCheck();
      }
    );
  }

  ngOnDestroy() {
    if (this.layoutSub) {
      this.layoutSub.unsubscribe();
    }
    if (this.configSub) {
      this.configSub.unsubscribe();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = event.target.innerWidth;
    if (this.innerWidth < 1200) {
      this.isSmallScreen = true;
    } else {
      this.isSmallScreen = false;
    }
  }

  ToggleClass() {
    if (this.toggleClass === 'ft-maximize') {
      this.toggleClass = 'ft-minimize';
    } else {
      this.toggleClass = 'ft-maximize';
    }
  }

  toggleSidebar() {
    this.layoutService.toggleSidebarSmallScreen(this.hideSidebar);
  }
}
