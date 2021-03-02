import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ClickOutsideModule } from 'ng-click-outside';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FileUploadModule } from 'ng2-file-upload';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveComponentModule } from '@ngrx/component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {
  featureKey,
  reducerToken,
  reducerProvider,
  moduleEffects,
} from './store';

// COMPONENTS
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { ImageCropperComponent } from './components/image-cropper/image-cropper.component';
import { AlertComponent } from './components/ui-elements/alert/alert.component';
import { FormControlComponent } from './components/ui-elements/form-control/form-control.component';
import { ButtonComponent } from './components/ui-elements/button/button.component';
import { AvatarComponent } from './components/ui-elements/avatar/avatar.component';
import { ModalComponent } from './components/ui-elements/modal/modal.component';

// LAYOUT COMPONENTS
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';

// DIRECTIVES
import { SidebarLinkDirective } from './directives/sidebar-link.directive';
import { SidebarDropdownDirective } from './directives/sidebar-dropdown.directive';
import { SidebarAnchorToggleDirective } from './directives/sidebar-anchor-toggle.directive';
import { SidebarDirective } from './directives/sidebar.directive';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    NgbModule,
    FormsModule,
    OverlayModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    ClickOutsideModule,
    NgxSpinnerModule,
    FileUploadModule,
    ReactiveComponentModule,
    ImageCropperModule,
    FontAwesomeModule,
    StoreModule.forFeature(featureKey, reducerToken),
    EffectsModule.forFeature(moduleEffects),
  ],
  exports: [
    CommonModule,
    FontAwesomeModule,
    FooterComponent,
    NavbarComponent,
    DashboardLayoutComponent,
    PublicLayoutComponent,
    SideMenuComponent,
    AlertComponent,
    FormControlComponent,
    ButtonComponent,
    AvatarComponent,
    ModalComponent,
    FileUploadComponent,
    ImageCropperComponent,
    SidebarDirective,
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    DashboardLayoutComponent,
    PublicLayoutComponent,
    AlertComponent,
    SideMenuComponent,
    FormControlComponent,
    ButtonComponent,
    AvatarComponent,
    ModalComponent,
    FileUploadComponent,
    ImageCropperComponent,
    SidebarLinkDirective,
    SidebarDropdownDirective,
    SidebarAnchorToggleDirective,
    SidebarDirective,
  ],
  providers: [reducerProvider],
})
export class SharedModule {}
