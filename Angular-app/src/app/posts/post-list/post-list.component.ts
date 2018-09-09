import { Component, OnInit , Input, OnDestroy } from '@angular/core';
import { Post } from '../post-model/post-model';
import { PostService } from '../../services/post.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  private postSubscription: Subscription;
  posts: Post[] = [];

  constructor(public postService: PostService) { }

  ngOnInit() {
    this.postService.getPosts();
    this.postSubscription = this.postService.getPostUpdateListener().subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }

  ngOnDestroy() {
    this.postSubscription.unsubscribe();
  }

  onDelete(id: string) {
    this.postService.deletePost(id);
  }
}
