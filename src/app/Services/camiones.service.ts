import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import Swal  from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CamionesService {
  // crear una lista que recibira cualquier tipo de dato
  public listacamiones: any[] = []; //asi se define una variable en TypeScript
  public camion: any;
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
      this.listacamiones = data;
    })
  }

  getCamion(id:number){
    this.http.get('http://localhost:5278/api/Camiones/getCamiones/'+id).subscribe((data:any)=>{
      console.log(data);
      this.camion = data;
    });
  }
  //subir una imagen por medio de la API
  uploadImage(formData: FormData): Observable<string>{
    console.log(formData);
    //hago la peticion POST para enviar la umagen al servidor
    return this.http.post('http://localhost:5278/api/Camiones/upload',formData).pipe(
      //agrego la importación desde RcJS para 'map'
      map((response:any)=>{
        console.log(response);
        return response.uniqueFileName;
      })
    )
  }

  insertCamion(
    matricula:string,
    tipo_Camion:string,
    marca:string,
    modelo:string,
    capacidad:string,
    kilometraje:number,
    urlFoto:string,
    disponibilidad:string
  ){
    let bool: boolean = true;
    bool = disponibilidad == '0' ? false:true;

    this.http.post('http://localhost:5278/api/Camiones/insertCamion',{
      id_Camion: 0,
      matricula: matricula,
      tipo_Camion: tipo_Camion,
      marca: marca,
      modelo: modelo,
      capacidad: capacidad,
      kilometraje: kilometraje,
      urlFoto: urlFoto,
      disponibilidad: bool
    }).subscribe((response:any)=>{
      if(response.respuesta.toUpperCase().includes('ERROR')){
        Swal.fire('Error', response.respuesta, 'error');
      }else{
        Swal.fire('Correcto!', response.respuesta, 'success').then(()=>{
          window.location.replace('/listarcamiones');
        });
      }
    })
  }

  updateCamion(
    id_Camion: number,
    matricula:string,
    tipo_Camion:string,
    marca:string,
    modelo:string,
    capacidad:string,
    kilometraje:number,
    urlFoto:string,
    disponibilidad:string
  ){
    let bool: boolean = true;
    bool = disponibilidad == '0' ? false:true;

    this.http.put('http://localhost:5278/api/Camiones/updateCamion',{
      id_Camion: id_Camion,
      matricula: matricula,
      tipo_Camion: tipo_Camion,
      marca: marca,
      modelo: modelo,
      capacidad: capacidad,
      kilometraje: kilometraje,
      urlFoto: urlFoto,
      disponibilidad: bool
    }).subscribe((response:any)=>{
      if(response.respuesta.toUpperCase().includes('ERROR')){
        Swal.fire('Error', response.respuesta, 'error');
      }else{
        Swal.fire('Correcto!', response.respuesta, 'success').then(()=>{
          window.location.replace('/listarcamiones');
        });
      }
    })
  }
  
  deleteCamion(id: any) {
    const swalWithTailwindButtons = Swal.mixin({
      customClass: {
        confirmButton: 'bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded',
        cancelButton: 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded',
      },
      buttonsStyling: false,
    });
  
    swalWithTailwindButtons
      .fire({
        title: 'Estás seguro?',
        text: 'Esta acción no se puede revertir',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Siuuuuuu',
        cancelButtonText: 'Tons no',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          // Llamada a la API para eliminar el camión
          this.http
            .delete('http://localhost:5278/api/Camiones/delete/' + id)
            .subscribe((response: any) => {
              console.log(response);
              if (response.respuesta.toUpperCase().includes('ERROR')) {
                swalWithTailwindButtons.fire({
                  title: 'Error',
                  text: response.respuesta,
                  icon: 'error',
                });
              } else {
                if (response.respuesta.toUpperCase().includes('IDENTIFICADOR')) {
                  swalWithTailwindButtons.fire({
                    title: 'Ops!',
                    text: response.respuesta,
                    icon: 'info',
                  });
                } else {
                  swalWithTailwindButtons
                    .fire({
                      title: 'Eliminado',
                      text: response.respuesta,
                      icon: 'success',
                    })
                    .then(() => {
                      window.location.reload();
                    });
                }
              }
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithTailwindButtons.fire({
            title: 'Cancelado',
            text: 'Tu operación ha sido cancelada',
            icon: 'info',
          });
        }
      });
  }

  deleteCamion1(iD_Camion: number){
    this.http.delete('http://localhost:5278/api/Camiones/delete/'+iD_Camion).subscribe((response:any)=>{
      if(response.respuesta.toUpperCase().includes('ERROR')){
        Swal.fire('Error', response.respuesta, 'error');
      }else{
        Swal.fire('Correcto!', response.respuesta, 'success').then(()=>{
          window.location.replace('/listarcamiones');
        });
      }
    })
  }
}
