import {
  Component,
  EventEmitter,
  Output,
  OnInit,
  ViewChild
} from "@angular/core";
import { Post } from "../post-model/post-model";
import { FormGroup, FormArray, FormControl, Validators } from "@angular/forms";
import { PostService } from "../../services/post.service";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { mimeType } from "./mime-type.validator";

@Component({
  selector: "app-create-post",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"]
})
export class CreatePostComponent implements OnInit {
  private mode = "create";
  private editingPost: Post;
  private postId: string;
  public isLoading = false;
  form: FormGroup;
  public imagePreview: string;

  constructor(
    private router: Router,
    public postService: PostService,
    public activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.imagePreview = "";
    // Reactive for group for new post creation
    this.form = new FormGroup({
      title: new FormControl(null, { validators: [Validators.required] }),
      content: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });

    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      // checks if the page had been initialized for new post or edit post
      if (paramMap.has("postId")) {
        this.postId = paramMap.get("postId");
        this.mode = "edit";
        this.isLoading = true;
        this.postService.getOnePost(this.postId).subscribe(postData => {
          this.imagePreview = postData.imagePath;
          // set value to form on edit post
          this.form.setValue({
            title: postData.postTitle,
            content: postData.postContent,
            image: postData.imagePath
          });
        });
        this.isLoading = false;
      } else {
        // if routed for creating a new post

        this.postId = null;
        this.mode = "create";
      }
    });
  }

  // called on post add and update. updates by cheking the mode property
  onPostSave() {
    if (this.form.invalid) {
      return;
    }
    // adding new post
    if (this.mode === 'create') {
      this.postService.addPost(
        null,
        this.form.value.title,
        this.form.value.content,
        this.form.value.image
      ).subscribe((responseData) => {
          this.router.navigate(['/posts']);
        });

    } else {
      this.postService
        .updatePost(
          this.postId,
          this.form.value.title,
          this.form.value.content,
          this.form.value.image
        )
        .subscribe(responseDta => {
          this.router.navigate(['/posts']);
        });
    }
    this.form.reset();
  }

  onImagedPicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
