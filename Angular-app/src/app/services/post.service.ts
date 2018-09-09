import { Injectable } from '@angular/core';
import {  Post } from '../posts/post-model/post-model';
import { Subject, fromEventPattern } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { post } from 'selenium-webdriver/http';
@Injectable({
  providedIn: 'root'
})
export class PostService {

  private postUpdated = new Subject<Post[]>();
  private posts: Post[] = [];
  constructor(private http: HttpClient) { }

  getPosts() {
    this.http.get<{ message: string, posts: any}>('http://localhost:3000/api/posts').
    pipe(map((postData) => {
      return postData.posts.map( updatingPost => {
          return{
            postTitle: updatingPost.postTitle,
            postContent: updatingPost.postContent,
            id: updatingPost._id
          };
      });
    })).
    subscribe((updatedPostData) => {

       this.posts = updatedPostData;
       this.postUpdated.next([...this.posts]);
    });

  }

  addPosts( newPost: Post ) {
    this.http.post<{message: string, id: string}>('http://localhost:3000/api/posts', newPost)
    .subscribe((responseData) => {
    console.log(responseData.message);
    newPost.id = responseData.id;
    this.posts.push(newPost);
    this.postUpdated.next( [...this.posts] );
    });

  }

  deletePost( id: string) {
    this.http.delete('http://localhost:3000/api/posts/' + id)
    .subscribe(resData => {
      this.posts = this.posts.filter(postData => postData.id !== id );
      this.postUpdated.next([...this.posts]);
    });
  }

  updatePost(postId: string, title: string , content: string ) {
    const postData = { id: postId, postTitle: title, postContent: content };
    this.http.put('http://localhost:3000/api/posts/' + postId, postData).subscribe( responseDta =>{

    });
  }
  getOnePost(id: string ) {
    return {...this.posts.find(postData => postData.id === id )};
  }
  getPostUpdateListener() {
    return this.postUpdated.asObservable();
  }
}
