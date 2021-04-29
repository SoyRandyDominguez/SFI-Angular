import { Component, Injector, OnInit } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { ArticleTypeDto, ArticleTypeDtoPagedResultDto } from './article-typeDto';



import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { ArticleTypeService } from '@shared/service-proxies/service-proxies';
import { CreateArticleTypeComponent } from './create-article-type/create-article-type.component';
import { EditArticleTypeComponent } from './edit-article-type/edit-article-type.component';

class PagedArticleTypeRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}
@Component({
  selector: 'app-article-types',
  templateUrl: './article-types.component.html',
  styleUrls: ['./article-types.component.css'],
  animations: [appModuleAnimation()]
})
export class ArticleTypesComponent extends PagedListingComponentBase<ArticleTypeDto> {

  keyword = '';
  isActive: boolean | null;
  articletypes: ArticleTypeDto[] = [];


  protected list(request: PagedArticleTypeRequestDto, pageNumber: number, finishedCallback: Function): void {
    request.keyword = this.keyword;
    request.isActive = this.isActive;
    this._articleTypeService
      .getAll(
        request.keyword,
        request.isActive,
        request.skipCount,
        request.maxResultCount
      )
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: ArticleTypeDtoPagedResultDto) => {
        this.articletypes = result.items;
        this.showPaging(result, pageNumber);
      });
  }
 constructor(
    injector: Injector,
    private _articleTypeService: ArticleTypeService,
    private _modalService: BsModalService
  ) {
    super(injector);
  }


  createArticleType(): void {
    this.showCreateOrEditArticleTypeDialog();
  }

  editArticletype(articletype: ArticleTypeDto): void {
    this.showCreateOrEditArticleTypeDialog(articletype.id);
  }

  protected delete(articletype: ArticleTypeDto): void {
    abp.message.confirm(
      this.l('UserDeleteWarningMessage', articletype.name),
      undefined,
      (result: boolean) => {
        if (result) {
          this._articleTypeService.delete(articletype.id).subscribe(() => {
            abp.notify.success(this.l('SuccessfullyDeleted'));
            this.refresh();
          });
        }
      }
    );
  }

 

  private showCreateOrEditArticleTypeDialog(id?: number): void {
    let createOrEditUserDialog: BsModalRef;
    if (!id) {
      createOrEditUserDialog = this._modalService.show(
        CreateArticleTypeComponent,
        {
          class: 'modal-lg',
        }
      );
    } else {
      createOrEditUserDialog = this._modalService.show(
        EditArticleTypeComponent,
        {
          class: 'modal-lg',
          initialState: {
            id: id,
          },
        }
      );
    }

    createOrEditUserDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }
}
