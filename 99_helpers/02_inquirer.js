//const { default: inquirer } = require('inquirer');

//const inquirer = require('inquirer');
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1'.blue}. Crear tarea`
            },
            {
                value: '2',
                name: `${'2'.blue}. Listar tarea(s)`
            },
            {
                value: '3',
                name: `${'3'.blue}. Listar tarea(s) completada(s)`
            },
            {
                value: '4',
                name: `${'4'.blue}. Listar tarea(s) pendiente(s)`
            },
            {
                value: '5',
                name: `${'5'.blue}. Completar tarea(s)`
            },
            {
                value: '6',
                name: `${'6'.blue}. Borrar tareas`
            },
            {
                value: '0',
                name: `${'0'.blue}. Salir`
            }
        ]
    }
];

const inquirerMenu = async() => {

    const inquirer = await import('inquirer');
    console.clear();
    console.log('======================'.green);
    console.log('Seleccione una opción:'.red);
    console.log('======================\n'.green);

    const {opcion} = await inquirer.default.prompt(preguntas);
    //const opt = await inquirer.default.prompt(preguntas);
    //const opt = await inquirer.prompt (preguntas);
    //return opt;
    return opcion;
}

const pausa = async() => {

    const inquirer = await import('inquirer');
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'enter'.green} para continuar.`
        }
    ];

    console.log('\n')
    await inquirer.default.prompt(question);
}

const leerInput = async(message) => {
    const inquirer = await import('inquirer');
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value){
                if (value.length === 0) {
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    const {desc} = await inquirer.default.prompt(question);
    return desc;
}

const listadoTareasBorrar = async( tareas = [] ) => {
    
    const inquirer = await import('inquirer');
    const choices = tareas.map( (tarea, i) => {
        
        const idx = `${ i + 1}.`.green;

        return {
            // Arreglo donde todos sus hijos tendran el mensaje Hola
            //msg: 'Hola'
            value: tarea.id,
            name: `${ idx } ${ tarea.desc }`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]
    const {id} = await inquirer.default.prompt(preguntas);
    return id;

}

const confirmarBorrado = async(message) => {

    const inquirer = await import('inquirer');
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.default.prompt(question); 
    return ok;
}

const mostrarListadoCheckList = async ( tareas = [] ) => {
    
    const inquirer = await import('inquirer');
    const choices = tareas.map( (tarea, i) => {
        
        const idx = `${ i + 1}.`.green;

        return {
            // Arreglo donde todos sus hijos tendran el mensaje Hola
            //msg: 'Hola'
            value: tarea.id,
            name: `${ idx } ${ tarea.desc }`,
            checked: (tarea.completadoEn) ? true : false
        }
    });

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ]
    const {ids} = await inquirer.default.prompt(pregunta);
    return ids;
}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmarBorrado,
    mostrarListadoCheckList
}