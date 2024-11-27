import { Component, ElementRef, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { CamionesService } from '../../../Services/camiones.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editarcamion',
  imports: [],
  templateUrl: './editarcamion.component.html',
  styleUrl: './editarcamion.component.css'
})
export class EditarcamionComponent {
  private id_param: any;
  public ID_Camion: number = 0;
  selectFile: File | null = null;

  @ViewChild('matricula') private matricula!: ElementRef;
  @ViewChild('capacidad') private capacidad!: ElementRef;
  @ViewChild('marca') private marca!: ElementRef;
  @ViewChild('modelo') private modelo!: ElementRef;
  @ViewChild('disponibilidad') private disponibilidad!: ElementRef;
  @ViewChild('kilometraje') private kilometraje!: ElementRef;
  @ViewChild('tipo_Camion') private tipo_Camion!: ElementRef;

  constructor(
    private service: CamionesService,
    private router: ActivatedRoute
  ){
    this.id_param = this.router.params.subscribe((params)=>{
      console.log('ID Recupero: ' + params['id']);
      this.ID_Camion = params['id'];
      this.service.getCamion(this.ID_Camion);
    });
  }

  get camion(){
    return this.service.camion;
  }

  onFileSelected($event: any){
    this.selectFile = $event.target.files[0];
  }

  guardar(){
    if(this.selectFile){
      const  formData = new FormData();
      formData.append('image',this.selectFile);
      this.service.uploadImage(formData).subscribe((response: any)=>{
        const url_Foto = response;
        const matricula = this.matricula.nativeElement.value;
        const capacidad = this.capacidad.nativeElement.value;
        const marca = this.marca.nativeElement.value;
        const modelo = this.modelo.nativeElement.value;
        const disponibilidad = this.disponibilidad.nativeElement.value;
        const kilometraje = this.kilometraje.nativeElement.value;
        const tipo_Camion = this.tipo_Camion.nativeElement.value;

        this.service.updateCamion(
          this.ID_Camion,
          matricula,
          tipo_Camion,
          marca,
          modelo,
          capacidad,
          kilometraje,
          url_Foto,
          disponibilidad
        );
      });
    }else{
      const url_Foto = this.service.camion.url_Foto;
      const matricula = this.matricula.nativeElement.value;
      const capacidad = this.capacidad.nativeElement.value;
      const marca = this.marca.nativeElement.value;
      const modelo = this.modelo.nativeElement.value;
      const disponibilidad = this.disponibilidad.nativeElement.value;
      const kilometraje = this.kilometraje.nativeElement.value;
      const tipo_Camion = this.tipo_Camion.nativeElement.value;

      this.service.updateCamion(
        this.ID_Camion,
        matricula,
        tipo_Camion,
        marca,
        modelo,
        capacidad,
        kilometraje,
        url_Foto,
        disponibilidad
      );
    }
  }

}
