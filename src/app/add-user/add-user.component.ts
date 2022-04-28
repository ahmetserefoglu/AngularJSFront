import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  user = {
    username: '',
    email: '',
    password: '',
    role: '',
  };
  submitted = false;
  message = '';
  roles = []
  constructor(private userService: UserService,private route: ActivatedRoute,
    private router: Router) { }
  ngOnInit(): void {
    this.userService.getRoles().subscribe(
      data => {
        this.roles = data;
      },
      err => {
        this.message = JSON.parse(err.error).message;
      }
    );
  }
  saveUser(): void {
    const data = {
      username: this.user.username,
      email: this.user.email,
      password: this.user.password,
      role: this.user.role
    };
    this.userService.createUser(data)
      .subscribe(
        response => {
          console.log(response);
          this.message = response.message
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }
  newUser(): void {
    this.submitted = false;
    this.user = {
      username: '',
      email: '',
      password: '',
      role: '',
    };
  }

  userList(): void{
    this.router.navigate(['']);
  }

}
