import { Injectable } from '@angular/core';
import {  Post } from '../posts/post-model/post-model';
import { Subject, fromEventPattern } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { query } from '@angular/core/src/render3/query';
@Injectable({
  providedIn: 'root'
})
export class PostService {

  private postUpdated = new Subject<{posts: Post[], postCount: number}>();
  private posts: Post[] = [];
  constructor(private http: HttpClient, private router: Router) { }

  getPosts(postsPerPage: number, currentPage: number) {
    const queryParam = `?pagesize=${postsPerPage}&pagenum=${currentPage}`;
    this.http.get<{ message: string, posts: any, postCount: number}>('http://localhost:3000/api/posts' + queryParam).
    pipe(
      map((postData) => {
      return { posts: postData.posts.map( mappingPost => {
          return{
            postTitle: mappingPost.postTitle,
            postContent: mappingPost.postContent,
            id: mappingPost._id,
            imagePath: mappingPost.imagePath
          };
      }), maxPost: postData.postCount};
    })).
    subscribe((updatedPostData) => {
       this.posts = updatedPostData.posts;
       this.postUpdated.next({posts: [...this.posts], postCount : updatedPostData.maxPost});
      });

  }

  addPosts(id: string, title: string, content: string, image: File ) {
    const postData = new FormData();
    postData.append('postTitle', title);
    postData.append('postContent', content);
    postData.append('image', image, title);


    this.http.post<{message: string, post: Post}>('http://localhost:3000/api/posts', postData)
    .subscribe((responseData) => {
    this.router.navigate(['/posts']);
    });

  }

  deletePost( id: string) {
    return this.http.delete('http://localhost:3000/api/posts/' + id);

  }

  updatePost(postId: string, title: string , content: string, image: File | string ) {

    let postData: Post | FormData;
    if (typeof(image) === 'object' ) {
      postData = new FormData();
      postData.append('id', postId);
      postData.append('postTitle', title);
      postData.append('postContent', content);
      postData.append('image', image, title);
    } else {
      postData = {
        id: postId,
        postTitle : title,
        postContent: content,
        imagePath: image
      };
    }

    this.http.put('http://localhost:3000/api/posts/' + postId, postData).
    subscribe( responseDta => {
      this.router.navigate(['/posts']);
    });
  }
  getOnePost(id: string ) {
    return this.http.get
    <{ _id: string,
      postTitle: string,
      postContent: string,
      imagePath: string}>
      ('http://localhost:3000/api/posts/' + id);
  }
  getPostUpdateListener() {
    return this.postUpdated.asObservable();
  }
}
