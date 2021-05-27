import { Component, Injector, OnInit } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { CuadreService } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { CreateCuadreComponent } from './create-cuadre/create-cuadre.component';
import { CuadreBancasDto, CuadreBancasDtoPagedResultDto, CuadreDto, CuadreDtoPagedResultDto, CuadrePagedRequestDto, ICuadreBancasDto } from './cuadre-dto';
import { EditCuadreComponent } from './edit-cuadre/edit-cuadre.component';

@Component({
  selector: 'app-cuadres',
  templateUrl: './cuadres.component.html',
  styleUrls: ['./cuadres.component.css'],
  animations: [appModuleAnimation()]
})
export class CuadresComponent extends PagedListingComponentBase<CuadreDto> {

  cuadres: CuadreDto[] = [];
  bancas: CuadreBancasDto[] = [];
  valorNull :number = 0;
  fecha: string | null = moment().add(-1, 'days').format('YYYY-MM-DD');
  bancaNumber: number | null = 0;
  wasVisit: boolean | null;
  protected list(request: CuadrePagedRequestDto, pageNumber: number, finishedCallback: Function): void {
    request.fecha = this.fecha;


    request.bancaId = this.bancaNumber;


    console.log(this.bancaNumber)
    console.log(request.bancaId)
    request.wasVisit = this.wasVisit;

    this._cuadreService
      .getAll(
        request.fecha,
        request.bancaId,
        request.wasVisit,
        request.skipCount,
        request.maxResultCount
      )
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: CuadreDtoPagedResultDto) => {
        this.cuadres = result.items;
        this.showPaging(result, pageNumber, 10);
      });


  }
  protected delete(entity: CuadreDto): void {
    throw new Error('Method not implemented.');
  }

  constructor(
    injector: Injector,
    private _cuadreService: CuadreService,
    private _modalService: BsModalService
  ) {
    super(injector);

    this._cuadreService
      .getBancas()
      .subscribe((result: CuadreBancasDtoPagedResultDto) => {
        this.bancas = result.items;

      });
  }



  createCuadre():void {
    this.showCreateOrEditCuadreDialog();
  }

  
  editCuadre(cuadre:CuadreDto):void {
    this.showCreateOrEditCuadreDialog(cuadre.banca.id);
  }

  
 

  private showCreateOrEditCuadreDialog(id?: number): void {
    let createOrEditUserDialog: BsModalRef;
    if (!id) {
      createOrEditUserDialog = this._modalService.show(
        CreateCuadreComponent,
        {
          class: 'modal-lg',
        }
      );
    } else {
      createOrEditUserDialog = this._modalService.show(
        EditCuadreComponent,
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


