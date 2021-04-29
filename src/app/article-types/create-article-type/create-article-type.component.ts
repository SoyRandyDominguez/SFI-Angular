import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { ArticleTypeService } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { ArticleTypeDto } from '../article-typeDto';
import { AbpValidationError } from '@shared/components/validation/abp-validation.api';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-create-article-type',
  templateUrl: './create-article-type.component.html',
  styles: [
  ]
})
export class CreateArticleTypeComponent extends AppComponentBase  implements OnInit {
  saving = false;
  articletype = new ArticleTypeDto();
  
   
  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _articleTypeService: ArticleTypeService,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }
 

  ngOnInit(): void {
    this.articletype.isActive = true;
    this.articletype.id = 0;

   
  }

  save(): void {
    this.saving = true;

    console.log(this.articletype)
    this._articleTypeService
      .create(this.articletype)
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
