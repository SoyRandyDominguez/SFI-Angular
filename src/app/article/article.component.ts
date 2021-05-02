import { Component, Injector, OnInit } from '@angular/core';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { ArticleDto, ArticleDtoPagedResultDto } from './article-dto';
import { ArticleService } from '@shared/service-proxies/service-proxies';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
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
        this.showPaging(result, pageNumber);
      });
  }
  protected delete(entity: ArticleDto): void {
    throw new Error('Method not implemented.');
  }


 
  keyword = '';
  articles: ArticleDto[] = [];


  constructor(
    injector: Injector,
    private _articleService: ArticleService,
    private _modalService: BsModalService
  ) {
    super(injector);
  }


  
  createArticle(): void {
    // this.showCreateOrEditArticleTypeDialog();
  }

  editArticle(articletype: ArticleDto): void {
    // this.showCreateOrEditArticleTypeDialog(articletype.id);
  }

}
