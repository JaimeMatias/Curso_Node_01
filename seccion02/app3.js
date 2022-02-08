console.log('Inicio de programa');
setTimeout( ()=>{
    console.log('Primer Timeout')
},3000
);

setTimeout( ()=>{
    console.log('Segundo Timeout')
},2000
);
setTimeout( ()=>{
    console.log('Tercer Timeout')
},1000
);

console.log('Fin de primera parte  programa');
setTimeout( ()=>{
    console.log('Cuarto Timeout')
},0
);

console.log('Fin de primera parte  programa');
setTimeout( ()=>{
    console.log('Quinto Timeout')
},1000
);

console.log('Fin de la segunda parte programa');