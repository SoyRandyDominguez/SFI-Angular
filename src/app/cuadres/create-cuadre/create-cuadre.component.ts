import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CuadreService } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { CuadreBancasDto, CuadreBancasDtoPagedResultDto } from '../cuadre-dto';

@Component({
  selector: 'app-create-cuadre',
  templateUrl: './create-cuadre.component.html',
  styleUrls: ['./create-cuadre.component.css']
})
export class CreateCuadreComponent extends AppComponentBase implements OnInit {
  saving = false;
  @Output() onSave = new EventEmitter<any>();
  cuadre:CreateCuadre = new CreateCuadre();
  bancas:CuadreBancasDto[] = [];
  constructor(
    injector: Injector,
    private _cuadreService: CuadreService,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }
 

  ngOnInit(): void {
    this.cuadre.fecha = moment().add(-1, 'days').format('YYYY-MM-DD');
    this._cuadreService
    .getBancas()
    .subscribe((result: CuadreBancasDtoPagedResultDto) => {
      this.bancas = result.items;

    });
  }


  
  save(): void {
    this.saving = true;
    this.cuadre.noRecogido = 0;
    this.cuadre.supervisorId = 1;
    this._cuadreService
      .create(this.cuadre)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe(() => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.bsModalRef.hide();
        this.onSave.emit();
      });
  }

}

export class CreateCuadre {
  porRecoger?:   number;
  noRecogido?:   number;
  fecha?:        string | undefined;
  bancaId?:      number;
  supervisorId?: number;
}

