import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CuadreService } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { CuadreDto } from '../cuadre-dto';

@Component({
  selector: 'app-visit-banca',
  templateUrl: './visit-banca.component.html',
  styleUrls: ['./visit-banca.component.css']
})
export class VisitBancaComponent extends AppComponentBase implements OnInit {

  @Output() onSave = new EventEmitter<any>();
  cuadre:CuadreDto ;
  entregado:number = 0;
  saving = false;
  constructor(
    injector: Injector,
    private _cuadreService: CuadreService,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }
 

  ngOnInit(): void {
  }

  save(): void {
    this.saving = true;
    this.cuadre.noRecogido = this.cuadre.porRecoger - this.entregado;
    this.cuadre.wasVisit = true;
    
    this._cuadreService
      .visit(this.cuadre)
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
