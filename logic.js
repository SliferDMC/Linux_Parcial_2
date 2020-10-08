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




