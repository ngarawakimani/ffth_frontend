import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { StatsService } from '../stats.service';
import Stats from '../Stats';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  private token: string;
  private stats: Stats[];
  private adminName: string;

  constructor(public authService: AuthService,public statsService: StatsService) {

    const getdata = JSON.parse(localStorage.getItem('currentUser'));

    this.token = getdata.data.token;

    this.adminName = getdata.data.user.name;

  }

  ngOnInit() {
    this.statsService.getStats(this.token)
      .subscribe((data: Stats[]) => {
        this.stats = data;
    });
}

  logout() {
    this.authService.logout();
  }
}
