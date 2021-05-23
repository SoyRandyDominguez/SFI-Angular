import { ArticleTypeDto } from "@app/article-types/article-typeDto";

import * as moment from 'moment';
export interface IArticleDto {
    description: string | undefined;
    purchasePrice: number;
    stockMin: number;
    stockMax: number;
    articleType: ArticleTypeDto;
    id: number;

    tax:number;
    salePrice1:number;
    salePrice2:number;
    salePrice3:number;
    amount:number;
    observations:string;
    admissionDate: moment.Moment | undefined;
    image:string;
    location:string;
    supplierName1:string | null;
    supplierName2:string | null;
    supplierName3:string | null;
}

export class ArticleDto implements IArticleDto {
    description: string;
    purchasePrice: number;
    stockMin: number;
    stockMax: number;
    articleType: ArticleTypeDto = new ArticleTypeDto();
    id: number;

    tax:number;
    salePrice1:number;
    salePrice2:number;
    salePrice3:number;
    amount:number;
    observations:string;
    admissionDate: moment.Moment | undefined;
    image:string;
    location:string;

    supplierName1:string | null;
    supplierName2:string | null;
    supplierName3:string | null;

    constructor(data?: IArticleDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.description = data["description"];
            this.purchasePrice = data["purchasePrice"];
            this.stockMin = data["stockMin"];
            this.stockMax = data["stockMax"];
            this.articleType = data["articleType"];
            this.id = data["id"];
            this.tax = data["tax"];
            this.salePrice1 = data["salePrice1"];
            this.salePrice2 = data["salePrice2"];
            this.salePrice3 = data["salePrice3"];
            this.amount = data["amount"];
            this.observations = data["observations"];
            this.admissionDate = data["admissionDate"];
            this.image = data["image"];
            this.location = data["location"];

            this.supplierName1 = data["supplierName1"];
            this.supplierName2 = data["supplierName2"];
            this.supplierName3 = data["supplierName3"];
        }
    }
    static fromJS(data: any): ArticleDto {
        data = typeof data === 'object' ? data : {};
        let result = new ArticleDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["description"] = this.description;
        data["purchasePrice"] = this.purchasePrice;
        data["stockMin"] = this.stockMin;
        data["stockMax"] = this.stockMax;
        data["articleType"] = this.articleType;
        data["id"] = this.id;

        data["tax"] = this.tax;
        data["salePrice1"] = this.salePrice1;
        data["salePrice2"] = this.salePrice2;
        data["salePrice3"] = this.salePrice3;
        data["amount"] = this.amount;
        data["observations"] = this.observations;
        data["admissionDate"] = this.admissionDate;
        data["image"] = this.image;
        data["location"] = this.location;

        data["supplierName1"] = this.supplierName1;
        data["supplierName2"] = this.supplierName2;
        data["supplierName3"] = this.supplierName3;
        
        return data; 
    }

    
    clone(): ArticleDto {
        const json = this.toJSON();
        let result = new ArticleDto();
        result.init(json);
        return result;
    }
}


export class ArticleDtoPagedResultDto implements IArticleDtoPagedResultDto {
    totalCount: number;
    items: ArticleDto[] | undefined;

    constructor(data?: IArticleDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.totalCount = data["totalCount"];
            if (Array.isArray(data["items"])) {
                this.items = [] as any;
                for (let item of data["items"])
                    this.items.push(ArticleDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): ArticleDtoPagedResultDto {
        data = typeof data === 'object' ? data : {};
        let result = new ArticleDtoPagedResultDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["totalCount"] = this.totalCount;
        if (Array.isArray(this.items)) {
            data["items"] = [];
            for (let item of this.items)
                data["items"].push(item.toJSON());
        }
        return data; 
    }

    clone(): ArticleDtoPagedResultDto {
        const json = this.toJSON();
        let result = new ArticleDtoPagedResultDto();
        result.init(json);
        return result;
    }
}

export interface IArticleDtoPagedResultDto {
    totalCount: number;
    items: ArticleDto[] | undefined;
}


