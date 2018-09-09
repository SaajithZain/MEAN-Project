import { Component } from '@angular/core';
import { Post } from './posts/post-model/post-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  savedPosts: Post[] = [];

  onPostAdded(post) {
    this.savedPosts.push(post);
  }
}
