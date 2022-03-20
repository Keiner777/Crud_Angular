import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrls: ['./list-empleados.component.css']
})
export class ListEmpleadosComponent implements OnInit {
  empleados_List: any[] = [];
  
  constructor(firestore: AngularFirestore,
    // inyectamos el servecio para mostrar los datos de firebase en list-empleado 
    private _empleadoService: EmpleadoService,

    private toastr: ToastrService ) { 
    
  }

  ngOnInit(): void {
    this.getEmpleados();
  }

  // creamos este metodo para acceder a la imformacion de la base de datos por medio de un array para despues mostrar los datos en el componente list-empleado.html
  getEmpleados(){
    this._empleadoService.getEmpleados().subscribe(data =>{
      this.empleados_List=[];
      data.forEach((element:any) => {
    
        this.empleados_List.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })

        console.log(this.empleados_List);
        
      });
    })
  }

  eliminarEmpleado_List(id: string){

    this._empleadoService.eliminarEmpleado_Service(id).then(()=>{
      console.log('Empleado eliminado');
      this.toastr.error('Se elimino el empleado con exito!!!', 'Registro Eliminado',{
        positionClass:'toast-bottom-right'
      })
    })
  }

}
