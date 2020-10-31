import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './footer/footer.component';
import { ModalsComponent } from './modals/modals.component';



@NgModule({
  declarations: [HeaderComponent, SidebarComponent, BreadcrumbsComponent, FooterComponent, ModalsComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [

  ]
})
export class SharedModule { }
