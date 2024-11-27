import { Component, ElementRef, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { CamionesService } from '../../../Services/camiones.service';

@Component({
  selector: 'app-insertarcamion',
  imports: [],
  templateUrl: './insertarcamion.component.html',
  styleUrl: './insertarcamion.component.css'
})
export class InsertarcamionComponent {
  selectFile : File | null = null;

  @ViewChild('matricula') private matricula!: ElementRef;
  @ViewChild('capacidad') private capacidad!: ElementRef;
  @ViewChild('marca') private marca!: ElementRef;
  @ViewChild('modelo') private modelo!: ElementRef;
  @ViewChild('disponibilidad') private disponibilidad!: ElementRef;
  @ViewChild('kilometraje') private kilometraje!: ElementRef;
  @ViewChild('tipo_Camion') private tipo_Camion!: ElementRef;

  constructor(private service: CamionesService){}

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

        this.service.insertCamion(
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
      Swal.fire('Error', 'Debe seleccionar una imagen', 'error');
    }
  }
}
