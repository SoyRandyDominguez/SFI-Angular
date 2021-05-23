import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { ArticleService } from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/operators';
import { AppComponentBase } from '@shared/app-component-base';
import { EditArticle } from './edit-article'
import { ArticleDto } from '../article-dto';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styles: [
  ]
})
export class EditArticleComponent  extends AppComponentBase  implements OnInit {
  saving = false;
  article = new ArticleDto();
  id: number;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _articleService: ArticleService,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }
  ngOnInit(): void {
    this._articleService.get(this.id).subscribe((result) => {
      this.article = result;
      console.log(result);
    });
  }

  save(): void {
    this.saving = true;

    console.log(this.article)
    this._articleService
      .update(this.article)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe(() => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.bsModalRef.hide();
        this.onSave.emit();
      });
  }
 

}
