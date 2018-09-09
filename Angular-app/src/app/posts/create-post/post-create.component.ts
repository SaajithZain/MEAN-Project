import { Component, EventEmitter, Output, OnInit, ViewChild } from '@angular/core';
import { Post } from '../post-model/post-model';
import { NgForm } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component
({
  selector: 'app-create-post',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})

export class CreatePostComponent implements OnInit {

  private mode = 'create';
  editPost: Post;
  private postId: string;

  constructor(public postService: PostService, public activatedRoute: ActivatedRoute) {

  }
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.postId = paramMap.get('postId');
        this.mode = 'edit';
        this.editPost = this.postService.getOnePost(this.postId);

        console.log(this.postId);
      } else {
        this.postId = null;
        this.mode = 'create';

      }
    });
  }

  onPostAdd(form: NgForm) {

    if (form.invalid) {
      return;
    }
    const post: Post = {
      id: null,
      postTitle: form.value.postTitle,
      postContent: form.value.postContent
    };
  this.postService.addPosts(post);

}

}
