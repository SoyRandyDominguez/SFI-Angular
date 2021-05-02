import { ArticleTypeDto } from "@app/article-types/article-typeDto";

export interface IArticleDto {
    description: string | undefined;
    purchasePrice: number;
    stockMin: number;
    stockMax: number;
    articleType: ArticleTypeDto;
    id: number;
}

export class ArticleDto implements IArticleDto {
    description: string;
    purchasePrice: number;
    stockMin: number;
    stockMax: number;
    articleType: ArticleTypeDto;
    id: number;

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
        data["articleTypeId"] = this.articleType;
        data["id"] = this.id;
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


