import { ArticleTypeDto } from "@app/article-types/article-typeDto";

export class CreateArticle {

    description: string;
    purchasePrice: number;
    stockMin: number;
    stockMax: number;
    articleType: ArticleTypeDto = new ArticleTypeDto();




}
