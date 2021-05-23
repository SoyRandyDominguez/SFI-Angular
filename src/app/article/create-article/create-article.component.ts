import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { ArticleService } from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/operators';
import { CreateArticle}  from '../create-article/create-article';
import { AppComponentBase } from '@shared/app-component-base';
@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styles: [
  ]
})
export class CreateArticleComponent  extends AppComponentBase  implements OnInit {
  saving = false;
  article = new CreateArticle();

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _articleService: ArticleService,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }
 

  ngOnInit(): void {
  }

  save(): void {
    this.saving = true;

    console.log(this.article)
    this._articleService
      .create(this.article)
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
