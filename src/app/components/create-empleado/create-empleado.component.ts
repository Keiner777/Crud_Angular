import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-create-empleado',
  templateUrl: './create-empleado.component.html',
  styleUrls: ['./create-empleado.component.css']
})
export class CreateEmpleadoComponent implements OnInit {

  createEmpleados: FormGroup;
  submitted = false;
  loading = false;
  id: string | null;
  text = 'Agregar Empleado'
  constructor(private fb: FormBuilder,
              // con esto inyectamos el servicio y lo utilizamos 
              private _empleadoService: EmpleadoService,
              // con esto redireccionamos a la ruta list-empleados 
              private router: Router,

              private aRoute_Id: ActivatedRoute,

              private toastr: ToastrService) { 


    this.createEmpleados = this.fb.group({
      nombre: ['',Validators.required],
      apellido: ['',Validators.required],
      documento: ['',Validators.required],
      salario: ['',Validators.required]
    })

    this.id = this.aRoute_Id.snapshot.paramMap.get('id');
    console.log(this.id)
  }

  ngOnInit(): void {
    this.editarEmpleado_Create()
  }


  // metodos guardar
  agregar_Editar_Empleado(){

    this.submitted = true;

    if(this.createEmpleados.invalid){
      return;
    }

    if(this.id === null){

      this.agregarEmpleado();
    }else{
      this.editarEmpleado(this.id);
    }

   
  }


  agregarEmpleado(){

    
    const empleado_Create: any = {
      nombre: this.createEmpleados.value.nombre,
      apellido: this.createEmpleados.value.apellido,
      documento: this.createEmpleados.value.documento,
      salario: this.createEmpleados.value.salario,

      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }

    this.loading = true;
    
    // todo esto hace referencia al empleado.service para que pueda guardar en la base de datos de firebase
    this._empleadoService.agregarEmpleado_Service(empleado_Create).then(()=>{
      this.toastr.success('Se registró el empleado con exito!!!', 'Empleado registrado',{
        positionClass:'toast-bottom-right'
      })
      // con esto redirecionamos al componente list-empleado 
      this.router.navigate(['/list-empleados']);

    }).catch(error =>{
      console.log(error);
    })
  }

  // metodos para editar 

  editarEmpleado(id: string){
    
    const empleado_Create: any = {
      nombre: this.createEmpleados.value.nombre,
      apellido: this.createEmpleados.value.apellido,
      documento: this.createEmpleados.value.documento,
      salario: this.createEmpleados.value.salario,

    
      fechaActualizacion: new Date()
    }



    this.loading = true;
    this._empleadoService.actualizarEmpleado_service(id, empleado_Create).then(()=>{
      this.loading = false;
      this.toastr.info('Se actualizó el empleado con exito!!!', 'Empleado Actualizado',{
        positionClass:'toast-bottom-right'
      })
      this.router.navigate(['/list-empleados']);
    })


  }


  editarEmpleado_Create(){
    
    if(this.id !== null){
      this.loading = true;
      this.text='Editar Empleado'
      this._empleadoService.get_Id(this.id).subscribe(data =>{
        this.loading = false;
        console.log(data.payload.data()['nombre']);
        this.createEmpleados.setValue({
          nombre: data.payload.data()['nombre'],
          apellido: data.payload.data()['apellido'],
          documento: data.payload.data()['documento'],
          salario: data.payload.data()['salario']

        })
      })

    }
  }

  

}
