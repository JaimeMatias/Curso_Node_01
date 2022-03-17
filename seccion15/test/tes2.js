devolver =async()=>{
    return 'hola'
}

let var1=''
fun2=async()=>{
    var1 = await devolver()
}
fun2()

setTimeout( ()=>{
    console.log(var1)},2000
);
console.log(var1)
