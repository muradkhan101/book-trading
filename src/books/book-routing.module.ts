import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookInfoComponent } from './book-info.component';
import { BookshelfComponent } from './bookshelf.component';

const bookRoutes : Routes = [
  {path: 'books/:uuid', component: BookInfoComponent},
  {path: 'books', component: BookshelfComponent, data:{ title: "List of Books"}},
]

@NgModule({
  imports: [RouterModule.forChild(bookRoutes)],
  exports: [RouterModule]
})

export class BookRoutingModule {}
