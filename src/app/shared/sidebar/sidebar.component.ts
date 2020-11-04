import { Component, OnInit } from '@angular/core';
import { MenuAuth } from 'src/app/models/menu-auth.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public currentMenu: MenuAuth  = null;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.currentMenu = this.authService.currentMenu;
  }

}
