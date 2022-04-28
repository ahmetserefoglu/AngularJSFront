import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service'
import { UserService } from '../_services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;
  usercontent = ''
  user = {
    username: '',
    email: '',
    password: '',
    role: '',
  };
  submitted = false;
  message = '';

  constructor(private tokenStorageService: TokenStorageService,private userService:UserService,private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.getUser(this.route.snapshot.paramMap.get('id'));
    
  }

  getUser(id) : void{
    this.userService.findOne(id)
      .subscribe(response=>{
        console.log(response)
        this.userService.getRoles().subscribe(
          data => {
            this.roles = data;
          },
          err => {
            this.message = JSON.parse(err.error).message;
          }
        );
        this.usercontent = response
      })
  }

  updateUser(id): void {
    console.log(this.usercontent)
    this.userService.updateUser(id,this.usercontent)
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

}
