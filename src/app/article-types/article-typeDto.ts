
export interface IArticleTypeDto {
    name: string | undefined;
    isActive: boolean;
    description: string | undefined;
    id: number;
}

export class ArticleTypeDto implements IArticleTypeDto {
    name: string;
    isActive: boolean;
    description: string;
    id: number;

    constructor(data?: IArticleTypeDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.name = data["name"];
            this.isActive = data["isActive"];
            this.description = data["description"];
            this.id = data["id"];
        }
    }
    static fromJS(data: any): ArticleTypeDto {
        data = typeof data === 'object' ? data : {};
        let result = new ArticleTypeDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["isActive"] = this.isActive;
        data["description"] = this.description;
        data["id"] = this.id;
        return data; 
    }

    
    clone(): ArticleTypeDto {
        const json = this.toJSON();
        let result = new ArticleTypeDto();
        result.init(json);
        return result;
    }
}


export class ArticleTypeDtoPagedResultDto implements IArticleTypeDtoPagedResultDto {
    totalCount: number;
    items: ArticleTypeDto[] | undefined;

    constructor(data?: IArticleTypeDto) {
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
                    this.items.push(ArticleTypeDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): ArticleTypeDtoPagedResultDto {
        data = typeof data === 'object' ? data : {};
        let result = new ArticleTypeDtoPagedResultDto();
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

    clone(): ArticleTypeDtoPagedResultDto {
        const json = this.toJSON();
        let result = new ArticleTypeDtoPagedResultDto();
        result.init(json);
        return result;
    }
}

export interface IArticleTypeDtoPagedResultDto {
    totalCount: number;
    items: ArticleTypeDto[] | undefined;
}
