import { Component, Injector, OnInit } from '@angular/core';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { ArticleDto, ArticleDtoPagedResultDto } from './article-dto';
import { ArticleService } from '@shared/service-proxies/service-proxies';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { CreateArticleComponent } from './create-article/create-article.component';
import { EditArticleComponent } from './edit-article/edit-article.component';
class PagedArticleRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styles: [
  ],
  animations: [appModuleAnimation()]
})
export class ArticleComponent  extends PagedListingComponentBase<ArticleDto> {

  keyword = '';
  cantRow:number = 5;
  articles: ArticleDto[] = [];

  protected list(request: PagedArticleRequestDto, pageNumber: number, finishedCallback: Function): void {
    request.keyword = this.keyword;
    this._articleService
      .getAll(
        request.keyword,
        request.skipCount,
        request.maxResultCount
      )
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: ArticleDtoPagedResultDto) => {
        this.articles = result.items;
        console.log(result.items);
        this.showPaging(result, pageNumber);
      });
  }
  protected delete(entity: ArticleDto): void {
    throw new Error('Method not implemented.');
  }


 


  constructor(
    injector: Injector,
    private _articleService: ArticleService,
    private _modalService: BsModalService
  ) {
    super(injector);
  
  }


  
  viewArticle(): void {
    // this.showCreateOrEditArticleDialog();
  }

  deleteArticle(): void {
    // this.showCreateOrEditArticleDialog();
  }

  createArticle(): void {
    this.showCreateOrEditArticleDialog();
  }

  editArticle(article: ArticleDto): void {
    this.showCreateOrEditArticleDialog(article.id);
  }

  
  private showCreateOrEditArticleDialog(id?: number): void {
    let createOrEditArticleDialog: BsModalRef;
    if (!id) {
      createOrEditArticleDialog = this._modalService.show(
        CreateArticleComponent,
        {
          class: 'modal-lg',
        }
      );
    } else {
      createOrEditArticleDialog = this._modalService.show(
        EditArticleComponent,
        {
          class: 'modal-lg',
          initialState: {
            id: id,
          },
        }
      );
    }

    createOrEditArticleDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }
}
