import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookshelfComponent } from './bookshelf.component';
import { BookInfoComponent } from './book-info.component';
import { LibraryService } from './library.service';

const appRoutes: Routes = [
  {path: 'books/?:id', component: BookInfoComponent},
  {path: 'books', component: BookshelfComponent},
  {path: '', redirectTo: 'books'}
]

@NgModule({
  declarations: [
    BookshelfComponent,
    BookInfoComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true}
    )
  ],
  providers: [LibraryService],
  bootstrap: [BookshelfComponent]
})

export class AppModule {}
