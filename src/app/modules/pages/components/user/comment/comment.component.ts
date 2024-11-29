import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CommentService } from 'src/app/services/comment.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
import { Blogs } from 'src/app/models/Blogs';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  cmtForm: FormGroup;
  today: any = Date.now();
  blogObject: Blogs

  userFake = {
    "id": 3,
    "avatar": "https://png.pngtree.com/png-vector/20190719/ourmid/pngtree-no-photo-png-image_1555358.jpg",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "gender": 1,
    "phoneNumber": "1234567890",
    "birthDate": "1990-01-01",
    "address": "123 Main Street",
    "account": {
      "id": 1,
      "accountName": "john_doe",
      "password": "hashed_password1",
      "status": true,
      "roles": [
        {
          "id": 2,
          "roleName": "USER"
        },
        {
          "id": 1,
          "roleName": "ADMIN"
        }
      ]
    }
  }

  constructor(
    private commentService: CommentService,
    private activatedRoute: ActivatedRoute,
    private blogService: BlogService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      const acID = params.get('id')
      this.blogService.findById(acID).subscribe(blog => {
        this.blogObject = blog
      })
    })
    
  }



}

