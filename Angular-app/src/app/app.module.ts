import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CreatePostComponent } from './posts/create-post/post-create.component';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';

import { MatInputModule , MatCardModule, MatButtonModule,
   MatToolbarModule, MatGridListModule , MatExpansionModule, MatProgressSpinnerModule, MatPaginatorModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header/header.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { AppRouterModule } from './app.routes.module';

@NgModule({
  declarations: [
    AppComponent,
    CreatePostComponent,
    HeaderComponent,
    PostListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatGridListModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRouterModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
