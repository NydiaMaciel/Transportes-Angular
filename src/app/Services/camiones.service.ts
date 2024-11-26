import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CamionesService {
  // crear una lista que recibira cualquier tipo de dato
  public listacamiones: any[] = []; //asi se define una variable en TypeScript
  //dentro del constructor genero dependencias para consumir mis servicios
  constructor(private http: HttpClient) 
  {
    //inicializo la lista
    this.listacamiones = [];
  }

  //consumir API que recupera mi lista de camiones
  getCamiones(){
    //con mi cliente HTTP haré la petición mi URL de listarCamiones
    //Creando así una promesa (suscribe) que espera cualquier tipo de respuesta
    //(data:any) y finalmente, cuando obtenga dicha respuesta, la imprimo en consola
    //y lleno mi objeto listaCamiones
    this.http.get('http://localhost:5278/api/Camiones/getCamiones').subscribe((data:any)=>{
      console.log(data);
      console.log('Hola Bryan');
      this.listacamiones = data;
    })
  }
}
