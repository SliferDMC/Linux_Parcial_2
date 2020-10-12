
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

  set setGroup(group){
    this.group = group
  }

  set setOwner(owner){
    this.owner = owner
  }
}

var users1 = [new User("daniel"),new User("miguel"),new User("juan"),new User("pedro")];
var users2 = [new User("pablo"),new User("pacho"),new User("simon"),new User("roberto")];
var users3 = [new User("jose"),new User("ana"),new User("maria"),new User("abigail")];
var users4 = [new User("nero"),new User("dante"),new User("vergil"),new User("trist")];

var files1 = [new file("file1", "-rw-r-----", "daniel", "daniel", crearFechaActual()), new file("file2", "-rw-r-----", "miguel", "miguel", crearFechaActual()),
              new file("file3", "-rw-r-----", "juan", "juan", crearFechaActual()), new file("file4", "-rw-r-----", "pedro", "pedro", crearFechaActual())]
var files2 = [new file("file1", "-rw-r-----", "pablo", "pablo", crearFechaActual()), new file("file2", "-rw-r-----", "pacho", "pacho", crearFechaActual()), 
              new file("file3", "-rw-r-----", "simon", "simon", crearFechaActual()), new file("file4", "-rw-r-----", "roberto", "roberto", crearFechaActual())]
var files3 = [new file("file1", "-rw-r-----", "jose", "jose", crearFechaActual()), new file("file2", "-rw-r-----", "ana", "ana", crearFechaActual()), 
              new file("file3", "-rw-r-----", "maria", "maria", crearFechaActual()), new file("file4", "-rw-r-----", "abigail", "abigail", crearFechaActual())]
var files4 = [new file("file1", "-rw-r-----", "nero", "nero", crearFechaActual()), new file("file2", "-rw-r-----", "dante", "dante", crearFechaActual()), 
              new file("file3", "-rw-r-----", "vergil", "vergil", crearFechaActual()), new file("file4", "-rw-r-----", "trist", "trist", crearFechaActual())]

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
            case "sudo": comandoSudo(parametros);
            break;
            case "chown": addConsola (" para usara el comando chown necesita el uso de sudo: sudo chown (nombre):(grupo archivo) <br>");    
            case "logout":  cerrarUsuario(parametros); 
            break;
            case "login":  addConsola ("ya esta registrado con el usuario: "+userLogged+" <br>");
            break;
            case "touch": crearArchivo(parametros)
            console.log(currentMachine.getDirectory)
            break;
            case "ls": mostrarArchivos(parametros);   
            break;
            case "cat": leerContenido(parametros);   
            break;
            case "nano": escribirContenido(parametros);   
            break;
            case "rm": borrarContenido(parametros);
            break;
            default: addConsola ("no se reconoce el comando "+parametros[0]+"<br>");
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
        if(buscarUsuario(parametros[1])){
            this.userLogged=parametros[1];
            addConsola ("bienvenido "+parametros[1]+"<br>"); 
            document.getElementById("prompt").innerHTML = parametros[1]+"@"+currentMachine.getName;
		}else{
            addConsola ("no se encuentra el usuario "+parametros[1]+", compruebe si el nombre es correcto");
        }
	}else{
        addConsola ("la cantidad de parametros no coincide con el comando login. pruebe utilizando: login (usuario)"+"<br>");
	}   
}

function cerrarUsuario (parametros){
    if(parametros.length==1){
        addConsola ("hasta la proxima "+userLogged+"<br>");
        document.getElementById("prompt").innerHTML = ""
        userLogged="";
	}else{
        addConsola ("la cantidad de parametros no coincide con el comando logout. pruebe utilizando: logout"+"<br>");
	}   
}

function crearArchivo(parametros){
  if (parametros.length!=2) {
    addConsola ("la cantidad de parametros no coincide con el comando touch. pruebe utilizando: touch (nombre)"+"<br>");
  } else {

    let bool = false
    let fileAux
    let pos
    for (let i = 0; i < currentMachine.getDirectory.length; i++) {
      if (currentMachine.getDirectory[i].getName == parametros[1]) {
        bool = true
        fileAux = currentMachine.getDirectory[i]
        pos = i
      }  
    }

    if (bool) {
      if (comprobarPermiso(fileAux, 'w')) {
        let f1 = new file(parametros[1], "-rw-r-----", userLogged, userLogged, crearFechaActual())
        currentMachine.getDirectory[pos] = f1
      } else {
        addConsola ("El usuario "+ userLogged +" no posee permisos de escritura sobre el archivo."+"<br>");
      }
    } else {
      let f2 = new file(parametros[1], "-rw-r-----", userLogged, userLogged, crearFechaActual())
      currentMachine.getDirectory.push(f2)
    }

  }
}

function crearFechaActual(){
  let currentDate = ""
  let date  = new Date()
  currentDate += date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()
  return currentDate
}

function buscarGrupoDeUsuario(name){
  let g = ""
    for (let i = 0; i < currentMachine.getGroups.length; i++) {
      
      let aux = currentMachine.getGroups[i];

      if (aux.getMembers.includes(name) && aux.getName!=name) {
        g = aux.getName
        break
      }
    }
  return g
}

function comprobarPermiso(file, permiso){
  let p1, p2, p3
  if(permiso == 'r') {
    p1 = 1, p2 = 4, p3 = 7
  } else if (permiso == 'w') {
    p1 = 2, p2 = 5, p3 = 8
  } else {
    p1 = 3, p2 = 6, p3 = 9
  }

  if (file.getOwner == userLogged) {
    if (file.getPermits.charAt(p1) == permiso) {
      return true
    }
  }
  if (file.getGroup == buscarGrupoDeUsuario(userLogged)) {
    if (file.getPermits.charAt(p2) == permiso) {
      return true
    }
  }
  if (file.getOwner != userLogged && file.getGroup != buscarGrupoDeUsuario(userLogged)) {
    if (file.getPermits.charAt(p3) == permiso) {
      return true
    }
  }
}

function mostrarArchivos (parametros){
    if(parametros.length==1){
        if(this.currentMachine.getDirectory.length==0){
             addConsola ("no hay archivos a mostrar");
		}else{
            for(var i =0 ; i<this.currentMachine.getDirectory.length ; i++){
                addConsola (currentMachine.getDirectory[i].getName+" ");
		    }
		}
        addConsola (" "+"<br>");
	}else if(parametros.length==2){
        if(parametros[1]=="-l"){
            if(this.currentMachine.getDirectory.length==0){
                addConsola ("no hay archivos a mostrar");
		    }else{
                for(var i =0 ; i<this.currentMachine.getDirectory.length ; i++){
                    addConsola (currentMachine.getDirectory[i].getPermits+" "+currentMachine.getDirectory[i].getDate+" "
                                +currentMachine.getDirectory[i].getGroup+" "+currentMachine.getDirectory[i].getOwner+" "
                                +currentMachine.getDirectory[i].getName+"<br>");
		        }
		    }
            addConsola (" "+"<br>");   
		}else{
            addConsola ("no se reconoce el parametro "+parametros[1]+". intente con: ls -l O utilizando: ls "+"<br>");
		}
	}else{
        addConsola ("la cantidad de parametros no coincide con el comando ls. pruebe utilizando: ls O utilizando: ls -l"+"<br>");
	}     
}

function leerContenido(parametros){
  for (let i = 0; i < currentMachine.getDirectory.length; i++) {
    if (currentMachine.getDirectory[i].getName == parametros[1]) {
      let fileAux = currentMachine.getDirectory[i]
      if (comprobarPermiso(fileAux, 'r')) {
        addConsola ("Leyendo el contenido del archivo "+fileAux.getName+"<br>");
      } else {
        addConsola ("Usted no posee permisos de lectura del archivo "+fileAux.getName+"<br>");
      }
      return
    } 
  }
  addConsola ("El archivo solicitado no se encuentra en el disco, por favor verifique el nombre"+"<br>");
   
}

function escribirContenido(parametros){
  for (let i = 0; i < currentMachine.getDirectory.length; i++) {
    if (currentMachine.getDirectory[i].getName == parametros[1]) {
      let fileAux = currentMachine.getDirectory[i]
      if (comprobarPermiso(fileAux, 'w')) {
        addConsola ("Escribiendo en el archivo "+fileAux.getName+"<br>");
      } else {
        addConsola ("Usted no posee permisos de escritura del archivo "+fileAux.getName+"<br>");
      }
      return
    }
  }
  addConsola ("El archivo solicitado no se encuentra en el disco, por favor verifique el nombre"+"<br>");
}

function borrarContenido(parametros){
  for (let i = 0; i < currentMachine.getDirectory.length; i++) {
    if (currentMachine.getDirectory[i].getName == parametros[1]) {
      let fileAux = currentMachine.getDirectory[i]
      if (comprobarPermiso(fileAux, 'w')) {
      currentMachine.getDirectory.splice(i,1)
      addConsola ("EL archivo "+fileAux.getName+" ha sido eliminado"+"<br>");
      console.log(currentMachine.getDirectory)
      } else {
      addConsola ("Usted no posee permisos de escritura del archivo "+fileAux.getName+"<br>");
      }
      return
    }
  }
  addConsola ("El archivo solicitado no se encuentra en el disco, por favor verifique el nombre"+"<br>");
}

///&& parametros.length<5
function comandoSudo(parametros){
    if(parametros.length>1 ){
        if(parametros[1]=="chown"){
            cambiarPropietarios(parametros);
		}else{
            addConsola ("en este momento no se puede procesar el comando "+parametros[1]+", intente utilizando: sudo chown (nombre):(grupo) (archivo) <br>"); 
		}        
	}else{
        addConsola ("la cantidad de parametros no coincide con el comando sudo. pruebe utilizando: sudo chown (nombre):(grupo) (archivo)"+"<br>");
	} 
}

function cambiarPropietarios(parametros){
    if(parametros.length>2){
        if(parametros.length<5){
            var temp = parametros[2].split(":");
                if(temp.length==2){
                    if(buscarUsuario(temp[0])){
                        if(buscarGrupo(temp[1])){
                            if(buscarDirectorio(parametros[3])){
                            //sudo chown daniel:daniel file3
                                 for(var i =0 ; i<this.currentMachine.getDirectory.length ; i++){
                                    if(this.currentMachine.getDirectory[i].getName==parametros[3]){
                                       this.currentMachine.getDirectory[i].setOwner=temp[0];
                                       this.currentMachine.getDirectory[i].setGroup=temp[1];
                                       addConsola ("cambios realizados con exito <br>");
                                       i=this.currentMachine.getDirectory.length;
	                                }
	                             }
					        }else{
                                addConsola ("no se encuentra el archivo "+parametros[3]+", compruebe que se ha escrito correctamente "+" <br>");
					        }
					    }else{
                            addConsola ("no se encuentra el grupo "+temp[1]+", compruebe que se ha escrito correctamente "+" <br>");
					    } 
					}else{
                        addConsola ("no se encuentra el usuario "+temp[0]+", compruebe que se ha escrito correctamente "+" <br>");
					}                    
				}else{
                    addConsola ("no se puede detectar el nombre y el grupo de manera correcta. pruebe utilizando: sudo chown (nombre):(grupo) (archivo)"+"<br>");            
				}
            }else{
                 addConsola ("debe especificar el nombre, el grupo y el archivo a modificar. pruebe utilizando: sudo chown (nombre):(grupo) (archivo)"+"<br>");
			}
		}else{
             addConsola ("la cantidad de parametros no coincide con el comando chown. pruebe utilizando: sudo chown (nombre):(grupo) (archivo)"+"<br>");
		}
}

function buscarUsuario(parametros){
    for(var i =0 ; i<this.currentMachine.getUsers.length ; i++){
        if(this.currentMachine.getUsers[i].getName==parametros){
            return true;
	    }
	}
    return false;
}

function buscarGrupo(parametros){
    for(var i =0 ; i<this.currentMachine.getGroups.length ; i++){
        if(this.currentMachine.getGroups[i].getName==parametros){
            return true;
	    }
	}
    return false;
}

function buscarDirectorio(parametros){
    for(var i =0 ; i<this.currentMachine.getDirectory.length ; i++){
        if(this.currentMachine.getDirectory[i].getName==parametros){
            return true;
	    }
	}
    return false;
}