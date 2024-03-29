const { resolve } = require('path');

require ('colors');

const mostrarMenu = () => {

    return new Promise(resolve => {

        console.clear();
        console.log('======================'.green);
        console.log('Seleccione una opción:'.red);
        console.log('======================\n'.green);
    
        console.log(`${'1.'.green} Crear tarea`);
        console.log(`${'2.'.green} Listar tareas`);
        console.log(`${'3.'.green} Listar tareas completadas`);
        console.log(`${'4.'.green} Listar tareas pendientes`);
        console.log(`${'5.'.green} Completar tarea(s)`);
        console.log(`${'6.'.green} Borrar tarea`);
        console.log(`${'0.'.green} Salir \n`);
    
        // Praparamos la interfas a precentale al usuario
        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readLine.question('Seleccione una opción: ', (opt) => {
            // Opcion I: Imprimir opcion seleccionada.
            //console.log({opt});
            // Opcion II: Imprimir opcion seleccionada.
            //console.log({opt});
            readLine.close();
            resolve(opt);
        })

    });
}

const pausa = () => {

    return new Promise (resolve => {
        
        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readLine.question(`\nPresione ${'ENTER'.blue} para continuar\n`, (opt) => {
            readLine.close();
            resolve();
        })

    })
}

// Hacemos la exportacion del archivo como un objeto.
module.exports = {
    mostrarMenu,
    pausa
}