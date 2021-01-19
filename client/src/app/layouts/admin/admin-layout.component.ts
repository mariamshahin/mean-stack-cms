import {
  Component,
  OnInit,
  Inject,
  Renderer2,
  AfterViewInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  HostListener,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ConfigService } from 'app/services/config.service';
import { LayoutService } from 'app/services/layout.service';
import { WINDOW } from 'app/services/window.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminLayoutComponent implements OnInit, AfterViewInit, OnDestroy {
  hideSidebar: boolean = true;
  overlayContent = false;
  configSub: Subscription;
  layoutSub: Subscription;
  bgImage: string;
  bgColor='man-of-steel';
  isSmallScreen = false;
  menuPosition = 'Side';
  displayOverlayMenu = false; // Vertical Side menu for screenSize < 1200
  public config: any = {};
  public innerWidth: any;
  isMenuCollapsedOnHover = false;
  isNavbarSeachTextEmpty = true;
  isScrollTopVisible = false;
  resizeTimeout;

  constructor(
    private configService: ConfigService,
    private layoutService: LayoutService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window: Window,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    private deviceService: DeviceDetectorService
  ) {
    this.config = this.configService.templateConf;
    this.innerWidth = window.innerWidth;

    // On toggle sidebar menu
    this.layoutSub = layoutService.toggleSidebar$.subscribe((isShow) => {
      this.hideSidebar = !isShow;
      if (this.hideSidebar) {
        this.overlayContent = false;
      } else {
        this.overlayContent = true;
      }
      this.toggleSidebar();
    });
  }

  ngOnInit() {
    this.configSub = this.configService.templateConf$.subscribe(
      (templateConf) => {
        if (templateConf) {
          this.config = templateConf;
        }
        //load layout
        this.loadLayout();
        this.cdr.markForCheck();
      }
    );

    //hide overlay class on router change
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((routeChange) => {
        if (this.innerWidth < 1200) {
          this.layoutService.toggleSidebarSmallScreen(false);
          this.overlayContent = false;
          this.renderer.removeClass(this.document.body, 'overflow-hidden');
        }
      });
  }

  ngAfterViewInit() {
    this.setMenuLayout();
  }

  ngOnDestroy() {
    //Unsubcribe subscriptions
    if (this.configSub) {
      this.configSub.unsubscribe();
    }
    if (this.layoutSub) {
      this.layoutSub.unsubscribe();
    }
  }

  //adjust layout
  setMenuLayout() {
    this.overlayContent = false;
    // Vertical Menu
    if (this.innerWidth < 1200) {
      // If Screen size < 1200
      this.displayOverlayMenu = true;
    } else {
      // If Screen size > 1200
      this.displayOverlayMenu = false;
    }
  }
  loadLayout() {
    this.toggleSidebar();
    //toggle side menu

    this.setMenuLayout();
    console.log(this.config.layout.sidebar.size);
    // For Sidebar width

    // vertical/Side menu expanded/collapse
    if (this.config.layout.sidebar.collapsed && !this.isSmallScreen) {
      // collapse side menu
      this.renderer.removeClass(this.document.body, 'menu-expanded');
      this.renderer.addClass(this.document.body, 'nav-collapsed');
    } else {
      // expand side menu
      this.renderer.removeClass(this.document.body, 'nav-collapsed');
      this.renderer.addClass(this.document.body, 'menu-expanded');
    }
  }

  toggleSidebar() {
    if (this.hideSidebar) {
      // on sidebar collapse
      this.renderer.removeClass(this.document.body, 'menu-expanded');
      this.renderer.removeClass(this.document.body, 'vertical-menu');
      this.renderer.removeClass(this.document.body, 'menu-open');

      this.renderer.addClass(this.document.body, 'vertical-layout');
      this.renderer.addClass(this.document.body, 'menu-hide');

    } else {
      // on sidebar expand
      this.renderer.addClass(this.document.body, 'vertical-layout');
      this.renderer.addClass(this.document.body, 'menu-expanded');
      this.renderer.addClass(this.document.body, 'vertical-menu');
      if (this.config.layout.sidebar.collapsed) {
        this.renderer.removeClass(this.document.body, 'menu-open');
      } else {
        this.renderer.addClass(this.document.body, 'menu-open');
      }
      this.renderer.removeClass(this.document.body, 'menu-hide');
    }
    this.isTouchDevice();
  }

  isTouchDevice() {
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();

    if (isMobile || isTablet) {
      if (!this.hideSidebar) {
        this.renderer.addClass(this.document.body, 'overflow-hidden');
      } else {
        this.renderer.removeClass(this.document.body, 'overflow-hidden');
      }
    }
  }

  hideCompactMenuOnSmallScreen() {
    if (this.innerWidth < 1200) {
      let conf = this.config;
      conf.layout.sidebar.collapsed = false;
      this.configService.applyTemplateConfigChange({ layout: conf.layout });
    }
  }

  sidebarMouseenter(e) {
    if (this.config.layout.sidebar.collapsed) {
      this.isMenuCollapsedOnHover = false;
      this.layoutService.overlaySidebartoggle(this.isMenuCollapsedOnHover);
    }
  }

  sidebarMouseleave(e) {
    if (this.config.layout.sidebar.collapsed) {
      this.isMenuCollapsedOnHover = true;
      this.layoutService.overlaySidebartoggle(this.isMenuCollapsedOnHover);
    }
  }

  //scroll to top on click
  scrollToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  onOutsideClick(e) {
    if (this.innerWidth < 1200) {
      if (!e.target.classList.contains('toggleSidebarNavbarButton')) {
        this.layoutService.toggleSidebarSmallScreen(false);
      }
    }
  }

  onWrapperClick() {
    this.isNavbarSeachTextEmpty = true;
  }

  checkNavbarSeachTextEmpty($event) {
    this.isNavbarSeachTextEmpty = $event;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
    this.resizeTimeout = setTimeout(
      (() => {
        this.innerWidth = event.target.innerWidth;
        this.setMenuLayout();
        this.hideCompactMenuOnSmallScreen();
      }).bind(this),
      500
    );
  }

  //Add/remove classes on page scroll
  @HostListener('window:scroll', [])
  onWindowScroll() {
    let number =
      this.window.pageYOffset ||
      this.document.documentElement.scrollTop ||
      this.document.body.scrollTop ||
      0;
    if (number > 60) {
      this.renderer.addClass(this.document.body, 'navbar-scrolled');
    } else {
      this.renderer.removeClass(this.document.body, 'navbar-scrolled');
    }

    if (number > 400) {
      this.isScrollTopVisible = true;
    } else {
      this.isScrollTopVisible = false;
    }

    if (number > 20) {
      this.renderer.addClass(this.document.body, 'page-scrolled');
    } else {
      this.renderer.removeClass(this.document.body, 'page-scrolled');
    }
  }
}
