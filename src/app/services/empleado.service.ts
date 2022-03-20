import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor( private fireStore: AngularFirestore) {}

  // con este metodo agregamos y guardamos los datos del formulario a la base de datos de firebase
  agregarEmpleado_Service(empleado_Service: any): Promise<any>{

    return this.fireStore.collection('empleados').add(empleado_Service);
  }

  
  // mostramos los datos ingresados en el formulario en tiempo real, para despues obtener los datos de la bd y mostrarlo con una variable creada en lis-empleado.ts

  getEmpleados(): Observable<any> {
    return this.fireStore.collection('empleados', ref =>ref.orderBy('fechaCreacion','asc')).snapshotChanges();
  }

  // metodo para eliminar los datos de la bd por el Id

  eliminarEmpleado_Service(id: string):Promise<any> {
    return this.fireStore.collection('empleados').doc(id).delete();
  }


  get_Id(id_service: string): Observable<any> {
    return this.fireStore.collection('empleados').doc(id_service).snapshotChanges();
  }


  actualizarEmpleado_service(id: string, data:any):Promise<any>{

    return this.fireStore.collection('empleados').doc(id).update(data)
  }

}
