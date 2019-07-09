import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { ChildrenService } from './children.service';
import Children from './Children';

@Component({
  selector: 'app-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.css']
})
export class ChildrenComponent implements OnInit {

  private token: string;
  private children: Children[];

  constructor(public authService: AuthService, public statsService: ChildrenService) {

    const getdata = JSON.parse(localStorage.getItem('currentUser'));

    this.token = getdata.data.token;
  }

  ngOnInit() {
    this.statsService.getChildren(this.token)
      .subscribe((data: Children[]) => {
        console.log(data);
        this.children = data;
    });
  }

}
