import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePostComponent} from './posts/create-post/post-create.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { LoginComponent } from './authentication/login/login.component';
import { AuthGuardService as AuthGuard } from './services/auth-service/auth.guard.service';

const appRoutes: Routes = [
    { path: 'posts', component: PostListComponent, canActivate: [AuthGuard]},
    { path: 'create', component: CreatePostComponent, canActivate: [AuthGuard]},
    { path: 'update/:postId', component: CreatePostComponent, canActivate: [AuthGuard]},
    { path: 'login', component: LoginComponent},
    { path: 'signup', component: SignUpComponent},

  ];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    providers: [
      AuthGuard
    ],
    exports: [RouterModule]
})

export class AppRouterModule {

}
