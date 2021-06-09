
import { PagedRequestDto } from '@shared/paged-listing-component-base';
import * as moment from 'moment';
export interface ICuadreDto {
    porRecoger: number;
    noRecogido: number;
    id: number;
    banca?: ICuadreBancasDto;
    supervisor?: ICuadreSupervisoresDto;
    wasVisit: boolean;
    fecha: moment.Moment | undefined;
 
}

export interface ICuadreBancasDto {
    id: number;
    nombre: string;
    numero: number;
    direccion: string;
    empleado: string;
}

export class CuadreBancasDto implements ICuadreBancasDto {
    id: number;
    nombre: string;
    numero: number;
    direccion: string;
    empleado: string;

    constructor(data?: ICuadreBancasDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
  

    init(data?: any) {
        if (data) { 
            this.id = data["id"]; 
            this.nombre = data["nombre"]
            this.numero = data["numero"]
            this.empleado = data["empleado"]
            this.direccion = data["direccion"]
        }
    }
    static fromJS(data: any): CuadreBancasDto {
        data = typeof data === 'object' ? data : {};
        let result = new CuadreBancasDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id; 
        data["nombre"] = this.nombre; 
        data["numero"] = this.numero; 
        data["empleado"] = this.empleado; 
        data["direccion"] = this.direccion; 
        
        return data; 
    }

    
    clone(): CuadreBancasDto {
        const json = this.toJSON();
        let result = new CuadreBancasDto();
        result.init(json);
        return result;
    }
}

export interface ICuadrePagedRequestDto extends PagedRequestDto {
    fecha:string | undefined;
    bancaId:number | undefined;
    wasVisit:boolean| undefined;
}
export class CuadrePagedRequestDto implements ICuadrePagedRequestDto {
    fecha: string | undefined;
    bancaId: number | undefined;
    wasVisit: boolean | undefined;
    skipCount: number | undefined;
    maxResultCount: number | undefined;
}
export interface ICuadreSupervisoresDto {
    id: number;
    nombre: string;
}

export class CuadreDto implements ICuadreDto {
    porRecoger: number;
    noRecogido: number;
    id: number;
    banca?: ICuadreBancasDto;
    supervisor?: ICuadreSupervisoresDto;
    wasVisit: boolean;
    fecha: moment.Moment;

    constructor(data?: ICuadreDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
  

    init(data?: any) {
        if (data) { 
            this.id = data["id"]; 
            this.porRecoger = data["porRecoger"];
            this.noRecogido = data["noRecogido"];
            this.fecha = data["fecha"];
            this.banca = data["banca"];
            this.supervisor = data["supervisor"];
            this.wasVisit = data["wasVisit"];
        }
    }
    static fromJS(data: any): CuadreDto {
        data = typeof data === 'object' ? data : {};
        let result = new CuadreDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id; 
        data["porRecoger"]= this.porRecoger;
        data["noRecogido"]= this.noRecogido;
        data["fecha"]= this.fecha;
        data["banca"]= this.banca;
        data["supervisor"]= this.supervisor;
        data["wasVisit"]= this.wasVisit;
        
        return data; 
    }

    
    clone(): CuadreDto {
        const json = this.toJSON();
        let result = new CuadreDto();
        result.init(json);
        return result;
    }
}


export class CuadreDtoPagedResultDto implements ICuadreDtoPagedResultDto {
    totalCount: number;
    items: CuadreDto[] | undefined;

    constructor(data?: ICuadreDto) {
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
                    this.items.push(CuadreDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): CuadreDtoPagedResultDto {
        data = typeof data === 'object' ? data : {};
        let result = new CuadreDtoPagedResultDto();
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

    clone(): CuadreDtoPagedResultDto {
        const json = this.toJSON();
        let result = new CuadreDtoPagedResultDto();
        result.init(json);
        return result;
    }
}

export interface ICuadreDtoPagedResultDto {
    totalCount: number;
    items: CuadreDto[] | undefined;
}


 
export class CuadreBancasDtoPagedResultDto implements ICuadreBancasDtoPagedResultDto {
    totalCount: number;
    items: CuadreBancasDto[] | undefined;

    constructor(data?: ICuadreDto) {
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
                    this.items.push(CuadreBancasDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): CuadreBancasDtoPagedResultDto {
        data = typeof data === 'object' ? data : {};
        let result = new CuadreBancasDtoPagedResultDto();
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

    clone(): CuadreBancasDtoPagedResultDto {
        const json = this.toJSON();
        let result = new CuadreBancasDtoPagedResultDto();
        result.init(json);
        return result;
    }
}

export interface ICuadreBancasDtoPagedResultDto {
    totalCount: number;
    items: CuadreBancasDto[] | undefined;
}

