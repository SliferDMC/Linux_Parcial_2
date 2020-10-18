/////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
/////////    Creacion de las clases   //////////////////////////
/////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

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

  set setName(name){
    this.name = name
  }

  set setPermits(permits){
    this.permits = permits
  }

  set setOwner(owner){
    this.owner = owner
  }

  set setGroup(group){
    this.group = group
  }

  set setDate(date){
    this.date = date
  }
  
}

//////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////// Creacion de las instancias de los objetos //////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////777
/////////////////////////////////////////////////////////////////////////////////////////////////

var users1 = [new User("daniel"),new User("miguel"),new User("juan"),new User("pedro"),new User("root")];
var users2 = [new User("pablo"),new User("pacho"),new User("simon"),new User("roberto"),new User("root")];
var users3 = [new User("jose"),new User("ana"),new User("maria"),new User("abigail"),new User("root")];
var users4 = [new User("nero"),new User("dante"),new User("vergil"),new User("trist"),new User("root")];

var files1 = [new file("file1", "-rw-r-----", "daniel", "daniel", "1/10/2020"), new file("file2", "-rw-r-----", "miguel", "miguel", "9/10/2020"),
              new file("file3", "-rw-r-----", "juan", "juan", "2/10/2020"), new file("file4", "-rw-r-----", "pedro", "pedro", "10/10/2020")]
var files2 = [new file("file5", "-rw-r-----", "pablo", "pablo", "3/10/2020"), new file("file6", "-rw-r-----", "pacho", "pacho", "11/10/2020"), 
              new file("file7", "-rw-r-----", "simon", "simon", "4/10/2020"), new file("file8", "-rw-r-----", "roberto", "roberto", "12/10/2020")]
var files3 = [new file("file9", "-rw-r-----", "jose", "jose", "5/10/2020"), new file("file10", "-rw-r-----", "ana", "ana", "13/10/2020"), 
              new file("file11", "-rw-r-----", "maria", "maria", "6/10/2020"), new file("file12", "-rw-r-----", "abigail", "abigail", "14/10/2020")]
var files4 = [new file("file13", "-rw-r--rw-", "nero", "nero", "7/10/2020"), new file("file14", "-rw-r-----", "dante", "dante", "15/10/2020"), 
              new file("file15", "-rw-r-----", "vergil", "vergil", "8/10/2020"), new file("file16", "-rw-r-----", "trist", "trist", "16/10/2020")]

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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//----------------------------------------Logica del simulador de terminal de linux ----------------------------------------------//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var userLogged="";
var rootUser=false;
var currentMachine=mach1
var tempMachine = null
var tempUser = null

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
      if (parametros[0].charAt(0) == '.' && parametros[0].charAt(1) == '/') {
        let aux = ""
        aux = parametros[0].charAt(0) + parametros[0].charAt(1);
        if (aux == "./") {
          ejecutarArchivo(parametros)
        } 
      } else {
        switch (parametros[0]){
            case "sudo": comandoSudo(parametros);
            break;
            case "chown": addConsola (" para usar el comando chown necesita el uso de sudo: sudo chown (nombre):(grupo) (archivo) <br>"); 
            break;   
            case "logout": if (tempUser == null && tempMachine == null) {
                              cerrarUsuario(parametros); 
                            } else {
                              salirDeSSH(parametros)
                            }
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
            case "ssh": conectarAOtraMaquina(parametros);
            break;
            case "exit": salirDeSSH(parametros)
            break;
            case "chmod":  cambiarPermisos(parametros);
            break;
            case "scp": copiarArchivo(parametros);
                        console.log(mach4.getDirectory)
                        console.log(mach1.getDirectory)
            break;
            default: addConsola ("no se reconoce el comando "+parametros[0]+"<br>");
        }
      }
    }else{
        if(parametros[0]=="login"){
               iniciarUsuario(parametros);
        }else{
            addConsola ("Primero debe identificarse, pruebe utilizando: login (usuario)");
		}
	}
}

/**
 * Comando login
 */
function iniciarUsuario (parametros){ 
    if(parametros.length==2){
        if(buscarUsuario(parametros[1])){
            this.userLogged=parametros[1];
            addConsola ("Bienvenido "+parametros[1]+"<br>"); 
            document.getElementById("prompt").innerHTML = parametros[1]+"@"+currentMachine.getName;
		}else{
            addConsola ("no se encuentra el usuario "+parametros[1]+", compruebe si el nombre es correcto");
        }
	}else{
        addConsola ("la cantidad de parametros no coincide con el comando login. pruebe utilizando: login (usuario)"+"<br>");
	}   
}

/**
 * Comando logout
 */
function cerrarUsuario (parametros){
  if(parametros.length==1){
        addConsola ("hasta la proxima "+userLogged+"<br>");
        document.getElementById("prompt").innerHTML = ""
        userLogged="";
	}else{
        addConsola ("la cantidad de parametros no coincide con el comando logout. pruebe utilizando: logout"+"<br>");
	}   
}

/**
 * Comando touch
 */
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
        addConsola ("El archivo a sido sobrescrito con exito"+"<br>");
      } else {
        addConsola ("El usuario "+ userLogged +" no posee permisos de escritura sobre el archivo."+"<br>");
      }
    } else {
      let f2 = new file(parametros[1], "-rw-r-----", userLogged, userLogged, crearFechaActual())
      currentMachine.getDirectory.push(f2)
      addConsola ("El archivo a sido creado con exito"+"<br>");
    }

  }
}

/**
 * Retorna un String con la fecha actual en formato dd/mm/aaaa
 */
function crearFechaActual(){
  let currentDate = ""
  let date  = new Date()
  currentDate += date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()
  return currentDate
}

/**
 * Dado el nombre del usuario, retorna el nombre del grupo al que pertenece
 */
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

/**
 * Dado el objeto file y un char 'r''w''x', retorna true o false si tiene o no el permiso
 */
function comprobarPermiso(file, permiso){
  if (userLogged == "root") {
    return true
  }

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
  return false
}

/**
 * Comando ls
 */
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

/**
 * Comando cat
 */
function leerContenido(parametros){
  if (parametros.length == 2) {
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
  } else {
    addConsola ("la cantidad de parametros no coincide con el comando cat. pruebe utilizando: cat (Archivo)"+"<br>");
  }
  
   
}

/**
 * Comando nano
 */
function escribirContenido(parametros){
  if (parametros.length == 2) {
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
  } else {
    addConsola ("la cantidad de parametros no coincide con el comando nano. pruebe utilizando: nano (Archivo)"+"<br>");
  }
}

/**
 * Comando rm
 */
function borrarContenido(parametros){
  if (parametros.length == 2) {
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
  } else {
    addConsola ("la cantidad de parametros no coincide con el comando rm. pruebe utilizando: rm (Archivo)"+"<br>");
  }
}

/**
 * Comando ./archivo
 */
function ejecutarArchivo(parametros){
  if (parametros.length == 1) {
    let aux = parametros[0].split("/")[1]
  for (let i = 0; i < currentMachine.getDirectory.length; i++) {
    if (currentMachine.getDirectory[i].getName == aux) {
      let fileAux = currentMachine.getDirectory[i]
      if (comprobarPermiso(fileAux, 'x')) {
        addConsola ("Ejecutando el archivo "+fileAux.getName+"<br>");
      } else {
        addConsola ("Usted no posee permisos de ejecucion sobre el archivo "+fileAux.getName+"<br>");
      }
      return
    }
  }
    addConsola ("El archivo solicitado no se encuentra en el disco, por favor verifique el nombre"+"<br>");
  } else {
    addConsola ("la cantidad de parametros no coincide con el comando de ejecucion. pruebe utilizando: ./(Archivo)"+"<br>");
  }
  
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

/**
 * Comando chown
 */
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
                 addConsola ("la cantidad de parametros no coincide con el comando chown. pruebe utilizando: sudo chown (nombre):(grupo) (archivo)"+"<br>");
			}
		}else{
             addConsola ("la cantidad de parametros no coincide con el comando chown. pruebe utilizando: sudo chown (nombre):(grupo) (archivo)"+"<br>");
		}
}

/**
 * Dado el nombre del usuario, retorna true o false si existe
 */
function buscarUsuario(parametros){
    for(var i =0 ; i<this.currentMachine.getUsers.length ; i++){
        if(this.currentMachine.getUsers[i].getName==parametros){
            return true;
	    }
	}
    return false;
}

/**
 * Dado el nombre del grupo, retorna true o false si existe
 */
function buscarGrupo(parametros){
    for(var i =0 ; i<this.currentMachine.getGroups.length ; i++){
        if(this.currentMachine.getGroups[i].getName==parametros){
            return true;
	    }
	}
    return false;
}

/**
 *Dado el nombre del archivo, retorna true o false si el archivo existe
 */
function buscarDirectorio(parametros){
    for(var i =0 ; i<this.currentMachine.getDirectory.length ; i++){
        if(this.currentMachine.getDirectory[i].getName==parametros){
            return true;
	    }
	}
    return false;
}

/**
 * Comando ssh
 */
function conectarAOtraMaquina(parametros){
  if (parametros.length == 2) {
    if (tempUser == null && tempMachine == null) {
      if (parametros[1].includes('@')) {
        let name = parametros[1].split('@')[0]
        let ip = parametros[1].split('@')[1]
        m = identificarMaquina(ip)
        if (m == null) {
          addConsola ("No se identifica una maquina con esa IP, verifique por favor la información"+"<br>");
        } else {
          if (m.getIp == currentMachine.getIp) {
            addConsola ("Ya se encuentra ubicado en la maquina con la IP: "+ip+"<br>");
          }
          tempMachine = currentMachine
          currentMachine = m
          if (buscarUsuario(name)) {
            tempUser = userLogged
            userLogged = name
            document.getElementById("prompt").innerHTML = userLogged+"@"+currentMachine.getName;
          } else {
            addConsola ("No se identifica el usuario en la maquina con esa IP, verifique por favor la información"+"<br>");
          }
        }
      } else {
        addConsola ("No se reconoce el comando, pruebe con: ssh (nombreUsuario)@(IP)"+"<br>");
      }
    } else {
      addConsola ("No puede ejecutar el comando ssh porque ya esta conectado a una maquina externa"+"<br>");
    }
  } else {
    addConsola ("la cantidad de parametros no coincide con el comando ssh. pruebe utilizando: ssh (nombreUsuario)@(IP)"+"<br>");
  }
}

/**
 * Dada la ip, retorna la maquina, o null si no existe
 */
function identificarMaquina(ip){
  if (ip == mach1.getIp) {
    return mach1
  } else if(ip == mach2.getIp){
    return mach2
  } else if(ip == mach3.getIp){
    return mach3
  } else if(ip == mach4.getIp){
    return mach4
  } else {
    return null
  }
}

/**
 * Comando exit en ssh
 */
function salirDeSSH(parametros){
  if (parametros.length == 1) {
    if (tempMachine != null && tempUser != null) {
      currentMachine = tempMachine
      userLogged = tempUser
      tempMachine = null
      tempUser = null
      document.getElementById("prompt").innerHTML = userLogged+"@"+currentMachine.getName;
    }
  } else {
    addConsola ("la cantidad de parametros no coincide con el comando exit. pruebe utilizando solo: exit"+"<br>");
  }
  
}

/**
 * Comando chmod
 */
function cambiarPermisos (parametros){ 
    if(parametros.length>1 && parametros.length<4){
        var aviso=false;
        for(var i =0 ; i<this.currentMachine.getDirectory.length ; i++){
            if(this.currentMachine.getDirectory[i].getName==parametros[2]){
                var aviso=true;
                if(comprobarPermiso(this.currentMachine.getDirectory[i],'w')){
                    var temp=parametros[1].split("");
                    if(temp.length==3){
                        if(temp[0]<8 && temp[1]<8 && temp[2]<8){
                            var temp2=this.currentMachine.getDirectory[i].getPermits.charAt(0);
                            
                                if(temp[0]>3){
                                    temp2+="r";
				                }else{
                                    temp2+="-";                
							    }
                                if(Math.floor(temp[0]/2)%2==1){
                                    temp2+="w";
				                }else{
                                    temp2+="-";                
							    }
                                if(temp[0]%2==1){
                                    temp2+="x";
				                }else{
                                    temp2+="-";                
							    }

                                if(temp[1]>3){
                                    temp2+="r";
				                }else{
                                    temp2+="-";                
							    }
                                if(Math.floor(temp[1]/2)%2==1){
                                    temp2+="w";
				                }else{
                                    temp2+="-";                
							    }
                                if(temp[1]%2==1){
                                    temp2+="x";
				                }else{
                                    temp2+="-";                
							    }

                                if(temp[2]>3){
                                    temp2+="r";
				                }else{
                                    temp2+="-";                
							    }
                                if(Math.floor(temp[2]/2)%2==1){
                                    temp2+="w";
				                }else{
                                    temp2+="-";                
							    }
                                if(temp[2]%2==1){
                                    temp2+="x";
				                }else{
                                    temp2+="-";                
							    }
							 this.currentMachine.getDirectory[i].setPermits=temp2;
                            addConsola ("cambios realizados con exito <br>");
                            i=this.currentMachine.getDirectory.length;   
		                }else{
                            addConsola ("no se reconoce "+parametros[1]+" como parametro valido, deben de ser digitos del 0 al 7<br>"); 
		                }
		            }else{
                        addConsola ("no se reconoce "+parametros[1]+" como parametro valido, se necesitan exactamente 3 caracteres<br>"); 
		            }           
		        }else{
                    addConsola ("el usuario "+userLogged+" no tiene permisos de escritura sobre el archivo "+parametros[2]+"<br>");
				}
	        }
	    }
        if(!aviso){
            addConsola ("no fue posible encontrar el archivo "+parametros[2]+"<br>");  
		}
	}else{
        addConsola ("la cantidad de parametros no coincide con el comando chmod. pruebe utilizando: chmod (permiso) (archivo)"+"<br>");
	}   
}

/**
 * Comando scp
 */
function copiarArchivo(parametros){

  if (parametros.length == 3) {
    let nombreArchivo = ""
    let nombreArchivoD = ""
    let usuario = ""
    let ip = ""
    if (parametros.length == 3) {
  
      //Traer el archivo
      if (parametros[1].includes("@")) {
        ip = parametros[1].split("@")[1].split(":")[0]
        maquina = identificarMaquina(ip)
  
        if (maquina != null) {
          
          if (maquina == currentMachine) {
            addConsola ("La ip proporcionada corresponde a la maquina actual" +"<br>");
            return
          }
          usuario = parametros[1].split("@")[0]
          // Verifica si el usuario que va quedar como propietario existe
          if (buscarUsuarioPorMaquina(usuario, currentMachine)) {
            nombreArchivo = parametros[1].split("@")[1].split(":")[1]
            // Se verifica si el archivo existe
            let arch = buscarArchivoPorMaquina(nombreArchivo, maquina)
            if (arch != null) {
              if (comprobarPermisoPorUsuario(arch, 'r', userLogged)) {
                nombreArchivoD = parametros[2]
                let archD = null
                if (nombreArchivoD == ".") {
                  // Se debe verificar si el nombre del archivo original existe en la maquina destino
                  archD = buscarArchivoPorMaquina(nombreArchivo, currentMachine)
                  if (archD != null) {
                  // Se verifican los permisos de escritura en el archivo destino
                    if (comprobarPermisoPorUsuario(archD,'w',userLogged)) {
                    archD.setPermits = arch.getPermits
                    archD.setOwner = usuario
                    archD.setGroup = usuario
                    archD.setDate = crearFechaActual()
                    addConsola ("El envio del archivo fue exitoso" +"<br>");
                    } else {
                      addConsola ("Actualmente no se poseen permisos de escritura sobre el archivo destino" +"<br>");
                    }
                  } else {
                    currentMachine.getDirectory.push(new file(arch.getName,arch.getPermits,usuario,usuario,crearFechaActual()))
                    addConsola ("El envio del archivo fue exitoso" +"<br>");
                  }
                } else if (buscarArchivoPorMaquina(nombreArchivoD, currentMachine) != null) {
                  archD = buscarArchivoPorMaquina(nombreArchivoD, currentMachine)
                  // Se verifican los permisos de escritura en el archivo destino
                  if (comprobarPermisoPorUsuario(archD,'w',userLogged)) {
                    archD.setPermits = arch.getPermits
                    archD.setOwner = usuario
                    archD.setGroup = usuario
                    archD.setDate = crearFechaActual()
                    addConsola ("El envio del archivo fue exitoso" +"<br>");
                    } else {
                     addConsola ("Actualmente no se poseen permisos de escritura sobre el archivo destino" +"<br>");
                    }
                } else {
                  currentMachine.getDirectory.push(new file(nombreArchivoD,arch.getPermits,usuario,usuario,crearFechaActual()))
                  addConsola ("El envio del archivo fue exitoso" +"<br>");
                } 
              } else {
                addConsola ("Actualmente no se poseen permisos de lectura sobre el archivo original" +"<br>");
              }
            } else {
              addConsola ("No se reconoce el archivo: "+nombreArchivo+" en la maquina con IP: "+ ip +" por favor compruebe la informacion" +"<br>");
            }
          } else {
            addConsola ("No se reconoce el usuario: "+usuario+" por favor compruebe la informacion" +"<br>");
          }
        } else {
          addConsola ("No se reconoce la ip: "+ip+" por favor compruebe la informacion" +"<br>"); 
        }
  
      } else if (parametros[2].includes("@")) {
        /////////////////////////////////////////
        /////////////////////////////////////////
        ///////////////////////////////////////
        ip = parametros[2].split("@")[1].split(":")[0]
        maquina = identificarMaquina(ip)
  
        if (maquina != null) {
  
          if (maquina == currentMachine) {
            addConsola ("La ip proporcionada corresponde a la maquina actual" +"<br>");
            return
          }
  
          usuario = parametros[2].split("@")[0]
          if (buscarUsuarioPorMaquina(usuario, maquina)) {
  
            nombreArchivo = parametros[1]
            // Se verifica si el archivo existe
            let arch = buscarArchivoPorMaquina(nombreArchivo, currentMachine)
  
            if (arch != null) {
              if (comprobarPermisoPorUsuario(arch, 'r', userLogged)) {
                nombreArchivoD = parametros[2].split("@")[1].split(":")[1]
                let archD = null
                if (nombreArchivoD == ".") {
                  // Se debe verificar si el nombre del archivo original existe en la maquina destino
                  archD = buscarArchivoPorMaquina(nombreArchivo, maquina)
                  if (archD != null) {
                  // Se verifican los permisos de escritura en el archivo destino
                    if (comprobarPermisoPorUsuario(archD,'w',userLogged)) {
                      archD.setPermits = arch.getPermits
                      archD.setOwner = usuario
                      archD.setGroup = usuario
                      archD.setDate = crearFechaActual()
                      addConsola ("El envio del archivo fue exitoso" +"<br>");
                    } else {
                      addConsola ("Actualmente no se poseen permisos de escritura sobre el archivo destino" +"<br>");
                    }
                  } else {
                    maquina.getDirectory.push(new file(arch.getName,arch.getPermits,usuario,usuario,crearFechaActual()))
                    addConsola ("El envio del archivo fue exitoso" +"<br>");
                  }
                } else if (buscarArchivoPorMaquina(nombreArchivoD, maquina) != null) {
                  archD = buscarArchivoPorMaquina(nombreArchivoD, maquina)
                  // Se verifican los permisos de escritura en el archivo destino
                  if (comprobarPermisoPorUsuario(archD,'w',userLogged)) {
                    archD.setPermits = arch.getPermits
                    archD.setOwner = usuario
                    archD.setGroup = usuario
                    archD.setDate = crearFechaActual()
                    addConsola ("El envio del archivo fue exitoso" +"<br>");
                    } else {
                     addConsola ("Actualmente no se poseen permisos de escritura sobre el archivo destino" +"<br>");
                    }
                } else {
                  maquina.getDirectory.push(new file(nombreArchivoD,arch.getPermits,usuario,usuario,crearFechaActual()))
                  addConsola ("El envio del archivo fue exitoso" +"<br>");
                }
              } else {
                addConsola ("Actualmente no se poseen permisos de lectura sobre el archivo original" +"<br>");
              }
            } else {
              addConsola ("No se reconoce el archivo: "+nombreArchivo+" en la maquina con IP: "+ ip +" por favor compruebe la informacion" +"<br>");
            }
          } else {
            addConsola ("No se reconoce el usuario: "+usuario+" por favor compruebe la informacion" +"<br>");
          }
  
        } else {
          addConsola ("No se reconoce la ip: "+ip+" por favor compruebe la informacion" +"<br>");
        }
  
      } else {
        addConsola ("Existe un error de sintaxis con el comando scp. pruebe utilizando: scp archivo usuario@ip:archivoD \n"+
                  "o con: scp archivo usuario@ip:. \n"+
                  "o con: scp usuario@ip:archivo archivoD \n"+
                  "o con: scp usuario@ip:archivo ."+"<br>");
      }
    } else {
      addConsola ("la cantidad de parametros no coincide con el comando scp. pruebe utilizando: scp archivo usuario@ip:archivoD \n"+
                  "o con: scp archivo usuario@ip:. \n"+
                  "o con: scp usuario@ip:archivo archivoD \n"+
                  "o con: scp usuario@ip:archivo ."+"<br>");
    }
  } else {
    addConsola ("la cantidad de parametros no coincide con el comando scp. pruebe utilizando los siguentes formatos: \n"+ 
    "scp archivo (usuario)@(ip):. \n"+
    "scp archivo (usuario)@(ip):(archivoD) \n"+
    "scp (usuario)@(ip):(archivo) . \n"+
    "scp (usuario)@(ip):(archivo) (archivoD) "+"<br>");
  } 
}

/**
 * Dado el nombre y la maquina, retorna true o false si esta alli
 */
function buscarUsuarioPorMaquina(nombre, maquina){
  for(var i =0 ; i<maquina.getUsers.length ; i++){
    if(maquina.getUsers[i].getName==nombre){
        return true;
    }
  }
return false;
}

/** 
 * Dado el nombre del archivo y la maquina, retorna el archivo o null
*/
function buscarArchivoPorMaquina(nombre, maq){
  for (let i = 0; i < maq.getDirectory.length; i++) {
    if (maq.getDirectory[i].getName == nombre) {
      return maq.getDirectory[i]
    }
  }
  return null
}

/**
 * Dado el archivo, permiso y el usuario, comprueba si este tiene el permiso en ese archivo
 */
function comprobarPermisoPorUsuario(file, permiso, user){
  if (userLogged == "root") {
    return true
  }

  let p1, p2, p3
  if(permiso == 'r') {
    p1 = 1, p2 = 4, p3 = 7
  } else if (permiso == 'w') {
    p1 = 2, p2 = 5, p3 = 8
  } else {
    p1 = 3, p2 = 6, p3 = 9
  }

  if (file.getOwner == user) {
    if (file.getPermits.charAt(p1) == permiso) {
      return true
    }
  }
  if (file.getGroup == buscarGrupoDeUsuario(user)) {
    if (file.getPermits.charAt(p2) == permiso) {
      return true
    }
  }
  if (file.getOwner != user && file.getGroup != buscarGrupoDeUsuario(user)) {
    if (file.getPermits.charAt(p3) == permiso) {
      return true
    }
  }
  return false
}