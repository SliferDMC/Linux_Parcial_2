/*
// variable global
var a = "que pasa mi so"
// variable de bloque
let b = true
b = false
// contante
const PI = 3.1416
// Imprimir en consola
console.log(a)

// Objetos
let persona = {
  nombre: "migue",
  edad: 15,
  contacto:{
    number:"123",
    extension:"555"
  },
  saludar:function (){
    console.log("Hola")
  }
}
  

//agregar una propiedad nueva al objeto
persona.correo = "mail"

let arreglo = [1,2,3,4,5]
let arreglo2 = new Array(1,2,3)
// agregar dato al arreglo
arreglo.push(6)
console.log(arreglo)
console.log(persona)
// funciones o metodos
function imprimirMensaje(cadena) {
  console.log(cadena)
  return "ixi"
}

console.log(imprimirMensaje("sisas"))
*/
class Machine{
  constructor(name, ip, directory){
    this.name = name,
    this.ip = ip,
    this.directory = directory
  }

  get getName(){
    return this.name
  }

  get getIp(){
    return this.ip
  }

  get getDirectory (){
    return this.directory
  }
}

class User{
  constructor(name){
    this.name = name
  }

  get getName(){
    return this.name
  }
}

class Group{
 constructor(name, members){
    this.name = name
    this.members = members
 } 

 get getName(){
   return this.name
 }

 get getMembers(){
   return this.members
 }
}

class file{
  constructor(name, permits){
    this.name = name
    this.permits = permits
  }

  get getName(){
    return this.name
  }

  get getPermits(){
    return this.permits
  }
}

let mach1 = new Machine("machine1", "192.168.0.1", [1,2,3,4])
let mach2 = new Machine("machine2", "192.168.0.2", [1,2,3,4])
let mach3 = new Machine("machine3", "192.168.0.3", [1,2,3,4])
let mach4 = new Machine("machine4", "192.168.0.4", [1,2,3,4])

function limpiarConsola() 
{
  document.getElementById( "textoImprimir" ).innerHTML = ""
  document.getElementById( "entrada" ).value           = "";
}

function addConsola ( texto )
{
  document.getElementById( "textoImprimir" ).innerHTML += texto;
  var consola = document.getElementById( "consola" );
  consola.scrollTop = consola.scrollHeight;
}

function procesarEntrada( e )
{
	if (e.keyCode == 13) {

		procesarComando ( document.getElementById( "entrada" ) );
	}
	
}

function procesarComando ( comando )
{
	var comandoParametros = comando.value.split(" ");

	addConsola ( "Ejecutando : " + comandoParametros[0] + "<br>" );

	for (var i =1 ; i<comandoParametros.length ; i++ )
	{
		addConsola ( "Parametro "+ i + ": " + comandoParametros[i] + "<br>" );
	}

	addConsola ( "<p>" );
		
	if ( comandoParametros[0] == "clear" ) 
	{
		limpiarConsola(); 
	}
	else
	{
		document.getElementById( "entrada" ).value = ""
	}
}


