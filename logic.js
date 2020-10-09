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
  constructor(name, ip, directory, users, groups){
    this.name = name,
    this.ip = ip,
    this.directory = directory
    this.users = users
    this.groups = groups
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

  get getUsers(){
    return this.users
  }

  get getGroups(){
    return this.groups
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
  constructor(name, permits, owner){
    this.name = name
    this.permits = permits
    this.owner = owner
  }

  get getName(){
    return this.name
  }

  get getPermits(){
    return this.permits
  }

  get getOwner(){
    return this.owner
  }
}

let users1 = [new User("daniel"),new User("miguel"),new User("juan"),new User("pedro")];
let users2 = [new User("pablo"),new User("pacho"),new User("simon"),new User("roberto")];
let users3 = [new User("jose"),new User("ana"),new User("maria"),new User("abigail")];
let users4 = [new User("nero"),new User("dante"),new User("vergil"),new User("trist")];

let files1 = [new file("file1", "-rw-r-----", "daniel"), new file("file2", "-rw-r-----", "miguel"),
              new file("file3", "-rw-r-----", "juan"), new file("file4", "-rw-r-----", "pedro")]
let files2 = [new file("file1", "-rw-r-----", "pablo"), new file("file2", "-rw-r-----", "pacho"), 
              new file("file3", "-rw-r-----", "simon"), new file("file4", "-rw-r-----", "roberto")]
let files3 = [new file("file1", "-rw-r-----", "jose"), new file("file2", "-rw-r-----", "ana"), 
              new file("file3", "-rw-r-----", "maria"), new file("file4", "-rw-r-----", "abigail")]
let files4 = [new file("file1", "-rw-r-----", "nero"), new file("file2", "-rw-r-----", "dante"), 
              new file("file3", "-rw-r-----", "vergil"), new file("file4", "-rw-r-----", "trist")]

let group1 = []
let group2 = []
let group3 = []
let group4 = []
for (let index = 0; index < users1.length; index++) {
  group1.push(new Group(users1[index].getName, [users1[index].getName]))
  group2.push(new Group(users2[index].getName, [users2[index].getName]))
  group3.push(new Group(users3[index].getName, [users3[index].getName]))
  group4.push(new Group(users4[index].getName, [users4[index].getName]))
}
group1.push(new Group("ventas", ["daniel", "miguel"]))
group1.push(new Group("mercadeo", ["juan","pedro"]))
group2.push(new Group("iluminatis", ["pablo", "pacho"]))
group2.push(new Group("NierAutomata", ["simon","roberto"]))
group3.push(new Group("InfantAnnihilator", ["jose", "ana"]))
group3.push(new Group("HewlettPackard", ["maria","abigail"]))
group4.push(new Group("DMC", ["nero", "dante"]))
group4.push(new Group("DMCED", ["vergil","trist"]))

let mach1 = new Machine("machine1", "192.168.0.1", files1, users1, group1)
let mach2 = new Machine("machine2", "192.168.0.2", files2, users2, group2)
let mach3 = new Machine("machine3", "192.168.0.3", files3, users3, group3)
let mach4 = new Machine("machine4", "192.168.0.4", files4, users4, group4)

console.log(mach1)
console.log(group1)
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


