import {
  Component,
  EventEmitter,
  Output,
  OnInit,
  ViewChild
} from '@angular/core';
import { Post } from '../post-model/post-model';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-create-post',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class CreatePostComponent implements OnInit {
  private mode = 'create';
  editPost: Post;
  private postId: string;
  public isLoading = false;
  form: FormGroup;
  public imagePreview: string;

  constructor(
    public postService: PostService,
    public activatedRoute: ActivatedRoute
  ) {}
  ngOnInit() {
    this.imagePreview = '';
    // Reactive for group for new post creation
    this.form = new FormGroup({
      'title' : new FormControl(null, {validators: [ Validators.required]}),
      'content' : new FormControl(null, {validators: [ Validators.required]}),
      'image' : new FormControl(null, {validators: [ Validators.required],
         asyncValidators: [mimeType]})
    });
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {

      // checks if the page had been initialized for  a post edit
      if (paramMap.has('postId')) {
        this.postId = paramMap.get('postId');
        this.mode = 'edit';
        this.isLoading = true;
        this.postService.getOnePost(this.postId).subscribe(postData => {

          this.editPost = {
             id: postData._id,
             postTitle: postData.postTitle,
             postContent: postData.postContent,
             imagePath: postData.imagePath
           };
           this.imagePreview=postData.imagePath;
           this.form.setValue({
           title: this.editPost.postTitle,
           content: this.editPost.postContent,
           image: this.editPost.imagePath
        });
        console.log(postData.imagePath);
       });
        this.isLoading = false;
      } else {
        this.postId = null;
        this.mode = 'create';
      }
    });
  }

  // called on post add and update. updates by cheking the mode property
  onPostAdd() {

    if (this.form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      const post: Post = {
        id: null,
        postTitle: this.form.value.title,
        postContent: this.form.value.content,
        imagePath: null // edit later
      };
      this.postService.addPosts
       ( null,
        this.form.value.title,
        this.form.value.content,
        this.form.value.image);
    } else {

      this.postService.updatePost(
        this.postId,
        this.form.value.title,
        this.form.value.content,
        this.form.value.image
      );
    }
    this.form.reset();
  }

  onImagedPicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = (reader.result as string);
    };
    reader.readAsDataURL(file);
    }
}
