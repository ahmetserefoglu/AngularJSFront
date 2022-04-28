import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  content: string;
  users: JSON;
  isLoggedIn = false;
  isLoginFailed = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  errorMessage = '';
  roles: string[] = [];
  submitted = false;
  message = '';
  constructor(private userService: UserService,private tokenStorage: TokenStorageService,private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      
      this.showAdminBoard = this.roles.includes('admin');
      this.showModeratorBoard = this.roles.includes('user');
      this.submitted = false;
      this.getUser();

    }else{

      this.router.navigate(['login']);

    }

    
  }

  getUser(): void {
    this.userService.getUserBoard().subscribe(
      data => {
        this.users = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }

  deleteUser(id): void{
    this.userService.deleteUser(id).subscribe(
      response => {
        console.log(response);
        this.message = response.message
        this.submitted = true;
        this.ngOnInit();
      },
      error => {
        console.log(error);
      });
  }
  

}
