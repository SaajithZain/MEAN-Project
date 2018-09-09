import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePostComponent} from '../app/posts/create-post/post-create.component';
import { PostListComponent } from '../app/posts/post-list/post-list.component';
const appRoutes: Routes = [

    { path: '', component: PostListComponent},
    { path: 'create', component: CreatePostComponent},
    { path: 'update/:postId', component: CreatePostComponent}
  ];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})

export class AppRouterModule {

}
