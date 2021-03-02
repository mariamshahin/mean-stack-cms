import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  ElementRef,
  AfterViewInit,
  ChangeDetectorRef,
  HostListener,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { ROUTES } from './navigation-routes.config';
import { customAnimations } from 'app/shared/animations/custom-animations';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ConfigService } from 'app/shared/services/config.service';
import { LayoutService } from 'app/shared/services/layout.service';
import { AdminState, selectAdmin } from 'app/modules/admin/store';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  animations: customAnimations,
})
export class SideMenuComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('toggleIcon') toggleIcon: ElementRef;
  public menuItems: any[];
  level: number = 0;
  public config: any = {};
  protected innerWidth: any;
  layoutSub: Subscription;
  configSub: Subscription;
  logoUrl = 'assets/img/logo.png';
  perfectScrollbarEnable = true;
  resizeTimeout;

  userData$ = this.store.pipe(
    select(selectAdmin),
    map((state) => state.auth.data?.user)
  );

  constructor(
    private store: Store<AdminState>,
    private layoutService: LayoutService,
    private configService: ConfigService,
    private cdr: ChangeDetectorRef,
    private deviceService: DeviceDetectorService
  ) {
    this.config = this.configService.templateConf;
    this.innerWidth = window.innerWidth;
    this.isTouchDevice();
  }

  ngOnInit() {
    this.menuItems = ROUTES;
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
    this.layoutSub = this.layoutService.overlaySidebarToggle$.subscribe();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event) {
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
    this.resizeTimeout = setTimeout(
      (() => {
        this.innerWidth = event.target.innerWidth;
      }).bind(this),
      500
    );
  }

  toggleSidebar() {
    let conf = this.config;
    conf.layout.sidebar.collapsed = !this.config.layout.sidebar.collapsed;
    this.configService.applyTemplateConfigChange({ layout: conf.layout });
    setTimeout(() => {
      this.fireRefreshEventOnWindow();
    }, 300);
  }

  fireRefreshEventOnWindow = function () {
    const evt = document.createEvent('HTMLEvents');
    evt.initEvent('resize', true, false);
    window.dispatchEvent(evt);
  };

  CloseSidebar() {
    this.layoutService.toggleSidebarSmallScreen(false);
  }

  isTouchDevice() {
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();

    if (isMobile || isTablet) {
      this.perfectScrollbarEnable = false;
    } else {
      this.perfectScrollbarEnable = true;
    }
  }

  ngOnDestroy() {
    if (this.layoutSub) {
      this.layoutSub.unsubscribe();
    }
    if (this.configSub) {
      this.configSub.unsubscribe();
    }
  }
}
