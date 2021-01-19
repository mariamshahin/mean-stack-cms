import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { ClickOutsideModule } from 'ng-click-outside';

//COMPONENTS
import { FooterComponent } from "./components/footer/footer.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { SideMenuComponent } from './components/side-menu/side-menu.component';

//DIRECTIVES
import { SidebarLinkDirective } from './directives/sidebar-link.directive';
import { SidebarDropdownDirective } from './directives/sidebar-dropdown.directive';
import { SidebarAnchorToggleDirective } from './directives/sidebar-anchor-toggle.directive';
import { SidebarDirective } from './directives/sidebar.directive';

@NgModule({
    exports: [
        CommonModule,
        FooterComponent,
        NavbarComponent,
        SideMenuComponent,
        SidebarDirective,
        NgbModule,
    ],
    imports: [
        RouterModule,
        CommonModule,
        NgbModule,
        FormsModule,
        OverlayModule,
        ReactiveFormsModule ,
        PerfectScrollbarModule,
        ClickOutsideModule,
    ],
    declarations: [
        FooterComponent,
        NavbarComponent,
        SideMenuComponent,
        SidebarLinkDirective,
        SidebarDropdownDirective,
        SidebarAnchorToggleDirective,
        SidebarDirective,
    ]
})
export class SharedModule { }
