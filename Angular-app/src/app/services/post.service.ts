import { Injectable } from '@angular/core';
import {  Post } from '../posts/post-model/post-model';
import { Subject, fromEventPattern } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class PostService {

  private postUpdated = new Subject<Post[]>();
  private posts: Post[] = [];
  constructor(private http: HttpClient, private router: Router) { }

  getPosts() {
    this.http.get<{ message: string, posts: any}>('http://localhost:3000/api/posts').
    pipe(map((postData) => {
      return postData.posts.map( mappingPost => {
          return{
            postTitle: mappingPost.postTitle,
            postContent: mappingPost.postContent,
            id: mappingPost._id,
            imagePath: mappingPost.imagePath
          };
      });
    })).
    subscribe((updatedPostData) => {
        console.log(updatedPostData);
       this.posts = updatedPostData;
       this.postUpdated.next([...this.posts]);
    });

  }

  addPosts(id: string, title: string, content: string, image: File ) {
    const postData = new FormData();
    postData.append("postTitle", title);
    postData.append("postContent", content);
    postData.append("image", image, title);


    this.http.post<{message: string, post: Post}>('http://localhost:3000/api/posts', postData)
    .subscribe((responseData) => {
    const addedPost: Post = {
       id: responseData.post.id,
       postTitle: responseData.post.postTitle,
       postContent: responseData.post.postContent,
       imagePath: responseData.post.imagePath
    };
    // newPost.id = responseData.post.id;
    this.posts.push(addedPost);
    this.postUpdated.next( [...this.posts] );
    this.router.navigate(['/']);
    });

  }

  deletePost( id: string) {
    this.http.delete('http://localhost:3000/api/posts/' + id)
    .subscribe(resData => {
      this.posts = this.posts.filter(postData => postData.id !== id );
      this.postUpdated.next([...this.posts]);
    });
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
      this.router.navigate(['/']);
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
