//
const costoTicket = 200;
let nombre=document.getElementById("nombre"),apellido=document.getElementById("apellido"),
    Email=document.getElementById("mail"),cantTickets=document.getElementById("cantidadTickets"),
    cat=document.getElementById("categoriaSelect");
//
//
botonBorrar.addEventListener('click', limpiarCampos);       // Función para limpiar los campos
botonResumen.addEventListener('click', total_a_Pagar);      // Función para Calcular el total a pagar del Resumen
//
//
function limpiarCampos() {                                  // Función para limpiar los campos, en el cual verifica que se haya llenado alguno de los mismos
    if((nombre.value != "") || (apellido.value != "") || (Email.value != "") || (cantTickets.value != 0) || (cat.value != "")) {
        if (confirm("¿ Desea Borrar los datos ingresados ?")== true){           // Pregunta al usuario si quiere borrar los datos ingresados,
            quitarErrorCampos();                                                // pero solo lo pregunta si es que completaron algún campo
            totalPago.innerHTML = "";                                           // Limpia el campo total a pagar
            //
        }else{                        
            return;
        }    
    }else{
        alert("No hay ningún dato para limpiar, los campos están vacios...")    // Le informa al usuario que los campos están vacios, los mismos no se van a limpiar
        return;    
    }    
}
//
//
function total_a_Pagar() {                                                                      // Es la función que calcula el total del resumen de la compra     
    let resumenTicketsTotal=0,descStudent=80/100,descTrainee=50/100,descJunior=15/100,nomCategoria="";
    //
    if (confirm("¿ Desea Confirmar los datos ingresados y visualizar el resumen ?")== true){    // Pregunta al usuario si efectivamente quiere realizar el pago
        if (nombre.value === ""){
            alert("Debe escribir un nombre para éste campo!");
            nombre.classList.add("is-invalid");
            nombre.focus();
            return;            
        }else if (apellido.value === ""){
            alert("Debe escribir un apellido para éste campo!");
            apellido.classList.add("is-invalid");
            apellido.focus();
            return;
        }else if (Email.value === ""){
            alert("Debe escribir una dirección de E-Mail válida para éste campo!");
            Email.classList.add("is-invalid");
            Email.focus();
            return;
        }else if ( (cantTickets.value == 0) || (isNaN(cantTickets.value)) ){
            alert("Debe ingresar la cantidad de tickets para \npoder realizar el calculo del total a pagar!");
            cantTickets.classList.add("is-invalid");
            cantTickets.focus();
            return;          
        }else if (cat.value == ""){
            alert("Debe ingresar una categoría del menú desplegable \npara poder calcular el total a pagar!");
            cat.classList.add("is-invalid");
            cat.focus();
            return;            
        }
        //                
        verificaEmail();              // Realiza una verificación adicional para constatar que se ingrese un formato de E-Mail válido
        //  
        resumenTicketsTotal=cantTickets.value*costoTicket;
        //
        switch (cat.value) {          // Evaluo la expresión via la estructura Switch
            case "0":                 // Sin categoría
                resumenTicketsTotal = resumenTicketsTotal;
                nomCategoria="Sin Categoría";
                break;
            case "1":                 // Student                                  
                resumenTicketsTotal = resumenTicketsTotal-(descStudent*resumenTicketsTotal);
                nomCategoria="Estudiante";
                break;
            case "2":                 // Trainee
                resumenTicketsTotal = resumenTicketsTotal-(descTrainee*resumenTicketsTotal);
                nomCategoria="Trainee";
                break;                
            case "3":                 // Junior                    
                resumenTicketsTotal = resumenTicketsTotal-(descJunior*resumenTicketsTotal);
                nomCategoria="Junior";
                break;
        }
        totalPago.innerHTML = resumenTicketsTotal;      // Muestra en la pantalla el total del resumen de acuerdo a la selección del usuario            
        quitarErrorCampos();
        //        
        alert("Resumen de la Compra:\n\nNombre: "+nombre.value+"\nApellido: "+apellido.value+       // Muestra en un alert el resumen de los datos ingresados
              "\nE-Mail: "+Email.value+"\nCantidad de Tickets: "+cantTickets.value+                 // por el usuario 
              "\nCategoría: "+nomCategoria+"\n\nTotal a Pagar: $ "+resumenTicketsTotal);        
        //           
        return;
        //               
    }else{                                              // No confirma los datos ingresados, hace un return por si el usuario
        return;                                         // decide realizar alguna modificación
    }    
}
//
//
// Funciones adicionales que verifican que ingresen un formato de E-Mail válido y quita los errores de los campos cuando confirman el resumen de la compra
//
//
function verificaEmail(){
   let emailestructuraValida = Email => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email);
    }
    if (!emailestructuraValida(Email.value)) {
        alert("La dirección de Email no es correcta \no no presenta el formato de un Email!");
        Email.classList.add("is-invalid");
        Email.focus();    
        return;
    }
    return;
}
//
//
function quitarErrorCampos() {
    let x = document.querySelectorAll(".form-control, .form-select");
    let i;
    for (i = 0; i < x.length; i++) {
        x[i].classList.remove('is-invalid');
    }
    return;
}
//
//
