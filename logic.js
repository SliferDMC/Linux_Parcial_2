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
  constructor(name, permits, owner, group, date){
    this.name = name
    this.permits = permits
    this.owner = owner
    this.group = group
    this.date = date
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

  get getGroup(){
    return this.group
  }

  get getDate(){
    return this.date
  }
}

var users1 = [new User("daniel"),new User("miguel"),new User("juan"),new User("pedro")];
var users2 = [new User("pablo"),new User("pacho"),new User("simon"),new User("roberto")];
var users3 = [new User("jose"),new User("ana"),new User("maria"),new User("abigail")];
var users4 = [new User("nero"),new User("dante"),new User("vergil"),new User("trist")];

var files1 = [new file("file1", "-rw-r-----", "daniel"), new file("file2", "-rw-r-----", "miguel"),
              new file("file3", "-rw-r-----", "juan"), new file("file4", "-rw-r-----", "pedro")]
var files2 = [new file("file1", "-rw-r-----", "pablo"), new file("file2", "-rw-r-----", "pacho"), 
              new file("file3", "-rw-r-----", "simon"), new file("file4", "-rw-r-----", "roberto")]
var files3 = [new file("file1", "-rw-r-----", "jose"), new file("file2", "-rw-r-----", "ana"), 
              new file("file3", "-rw-r-----", "maria"), new file("file4", "-rw-r-----", "abigail")]
var files4 = [new file("file1", "-rw-r-----", "nero"), new file("file2", "-rw-r-----", "dante"), 
              new file("file3", "-rw-r-----", "vergil"), new file("file4", "-rw-r-----", "trist")]

var group1 = []
var group2 = []
var group3 = []
var group4 = []
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

var mach1 = new Machine("machine1", "192.168.0.1", files1, users1, group1)
var mach2 = new Machine("machine2", "192.168.0.2", files2, users2, group2)
var mach3 = new Machine("machine3", "192.168.0.3", files3, users3, group3)
var mach4 = new Machine("machine4", "192.168.0.4", files4, users4, group4)

//------------------------------------------------------------------------------------------------------------------//
var userLogged="";
var rootUser=false;
var currentMachine=mach1

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

    verificarComandos(comandoParametros);

    addConsola ( "<p>" )
		
	if ( comandoParametros[0] == "clear" ) 
	{
		limpiarConsola(); 
	}
	else
	{
		document.getElementById( "entrada" ).value = ""
	}
}


function verificarComandos (parametros){
    if(userLogged!=""){
        switch (parametros[0]){
            case "sudo": addConsola (" el comando usado es sudo <br>");    
            break;
            case "logout":  cerrarUsuario(parametros);   
            break;
            case "login":  addConsola ("ya esta registrado con el usuario: "+userLogged+" <br>");   
            break;
            case "touch": crearArchivo(parametros)
            break;
            default: addConsola ("no se reconoce el comando <br>");
        }
    }else{
        if(parametros[0]=="login"){
               iniciarUsuario(parametros);
        }else{
            addConsola ("Primero debe identificarse, pruebe utilizando: login (usuario)");
		}
	}
}

function iniciarUsuario (parametros){ 
    if(parametros.length==2){
        for(var i =0 ; i<this.users1.length ; i++){
             if(this.users1[i].getName==parametros[1]){
                this.userLogged=parametros[1];
                addConsola ("bienvenido "+parametros[1]+"<br>");  
                i=this.users1.length;
			      }
		}
        if(userLogged==""){
            addConsola ("no se encuentra el usuario "+parametros[1]+", compruebe si el nombre es correcto");
        }
	}else{
        addConsola ("la cantidad de parametros no coincide con el comando login. pruebe utilizando: login (usuario)"+"<br>");
	}   
}

function cerrarUsuario (parametros){
    if(parametros.length==1){
        addConsola ("hasta la proxima "+userLogged+"<br>");
        userLogged="";
	}else{
        addConsola ("la cantidad de parametros no coincide con el comando logout. pruebe utilizando: logout"+"<br>");
	}   
}

function crearArchivo(parametros){
  if (parametros.length!=2) {
    addConsola ("la cantidad de parametros no coincide con el comando touch. pruebe utilizando: touch (nombre)"+"<br>");
  } else {
    for (let i = 0; i < currentMachine.getGroups.length; i++) {
      
      
    }
    let f = new file(parametros[1], "-rw-r-----", userLogged, )

  }
}