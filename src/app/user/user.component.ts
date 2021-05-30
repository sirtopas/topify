import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

    userDetails: any;

    constructor(private userService: UserService) { }

    ngOnInit(): void {
        this.userService.getUserDetails().subscribe(user => {
            this.userDetails = user;
        });
    }
}
