import { Component, OnInit , Input, OnDestroy } from '@angular/core';
import { Post } from '../post-model/post-model';
import { PostService } from '../../services/post.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  isLoading = false;
  private postSubscription: Subscription;
  posts: Post[] = [];
  postCount = 0;
  currentPage = 1;
  postsPerPage = 3;
  pageSizeOptions = [ 1, 3, 5, 7];
  constructor(public postService: PostService) { }

  ngOnInit() {
    this.isLoading = true;
    this.postService.getPosts(this.postsPerPage, this.currentPage );
    this.postSubscription = this.postService.getPostUpdateListener()
    .subscribe((postData: {posts: Post[], postCount: number}) => {
      this.posts = postData.posts;
      this.isLoading = false;
      this.postCount = postData.postCount;
    });
  }

  ngOnDestroy() {
    this.postSubscription.unsubscribe();
  }

  onDelete(id: string) {
    this.isLoading = true;
    this.postService.deletePost(id).subscribe(() => {
      this.postService.getPosts(this.postsPerPage, this.currentPage);
    });
  }

  onPageChange(pageEvent: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageEvent.pageIndex + 1;
    this.postsPerPage = pageEvent.pageSize;
    this.postService.getPosts(this.postsPerPage, this.currentPage );
  }
}
