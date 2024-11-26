import { Routes } from '@angular/router';
import { ListarcamionesComponent } from './Components/Camiones/listarcamiones/listarcamiones.component';

export const routes: Routes = [
    //defino mis rutas
    //ruta vacia o por default
    {path: '', component: ListarcamionesComponent},
    //ruta a la lista de camiones
    {path: 'listarcamiones',component: ListarcamionesComponent}
];
