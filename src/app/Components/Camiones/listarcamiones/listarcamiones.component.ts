import { Component } from '@angular/core';
import { CamionesService } from '../../../Services/camiones.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-listarcamiones',
  imports: [CommonModule],//CommonModule
  templateUrl: './listarcamiones.component.html',
  styleUrl: './listarcamiones.component.css'
})
export class ListarcamionesComponent {
  //constructor que utilice una dependencia de mi servicio (camionesservice)
  constructor (private camionesservice: CamionesService){
    //en cuanto inicie mi componente, llamo/invoco al servicio que consume la api
    this.camionesservice.getCamiones();
    //alt+z para saltar renglon al escribir   
  }

  //recupero la lista de camiones del servicio que se declaró en el mismo, creando así una instancia Singletone(patron de diseño).
  get listCamiones(){
    return this.camionesservice.listacamiones;
  } 

  eliminarCamion(id:any){}

}
