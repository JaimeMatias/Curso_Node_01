var nombre='Wolverine';
if(true){
    var nombre='Magneto';
}

console.log(`Modificación global de la variables: ${nombre}`);

let apellido='Wolverine';
if(true){
    let apellido='Magneto'
}
console.log(`Modificación local de la variable: ${apellido}`);