const Deadpool={
    nombre:'Wade',
    apellido:'Winston',
    poder: 'Regeneracion',
    getNombre(){
        return `${this.nombre} ${this.apellido}`
    }
}
function imprimeHeroe(heroe) {
    
const{nombre,apellido,poder,}=heroe;
console.log(nombre,apellido,poder)

}

console.log(Deadpool.getNombre())
imprimeHeroe(Deadpool)

const heroes=['deadpool','superman','batman'];
const h1=heroes[0];
console.log(h1)
const [e1,e2,e3]= heroes;
console.log(e2)
