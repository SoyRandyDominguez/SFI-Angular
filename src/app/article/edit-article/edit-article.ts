import { ArticleTypeDto } from '@app/article-types/article-typeDto';
import * as moment from 'moment';

export class EditArticle {

    description: string;
    purchasePrice: number;
    stockMin: number;
    stockMax: number;
    articleType: ArticleTypeDto = new ArticleTypeDto();
    tax: number;
    salePrice1: number;
    salePrice2: number;
    salePrice3: number;
    amount: number;
    observations: string;
    admissionDate:  moment.Moment | undefined;;
    image: string;
    location: string;
      
}
