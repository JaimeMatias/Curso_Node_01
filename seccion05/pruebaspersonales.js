let Direcciones={
    1:'Norte',
    2:'Sur',
    3:'Este',
    5:'oeste'}

console.log({Direcciones});

const readline= require('readline');
const rl=readline.createInterface(
    {
        input:process.stdin,
        output:process.stdout,
    }
);
rl.on('line',(line)=>{
    console.log(`Received: ${line}`);
}
);

const pausa =()=>{
    const readline=require('readline').createInterface({
        input:process.stdin,
        output:process.stdout
    });
    
    readline.question(`\nPresione ${'ENTER'.green} para continuar: \n`,(opt)=>{
        console.log({opt});
        readline.close();
    });
};