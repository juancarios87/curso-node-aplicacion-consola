// Primero se importan los paquetes de terceros. Linea 03
// Despues importamos nuestros paquetes. Linea 04 0 05 - 10
require('colors');
//const {mostrarMenu, pausa} = require('./99_helpers/01_mensajes.js');
const 
    {
        inquirerMenu,
        pausa,
        leerInput,
        listadoTareasBorrar,
        confirmarBorrado,
        mostrarListadoCheckList
    } = require('./99_helpers/02_inquirer.js');

const
    { 
        guardarDB,
        leerDB
    } = require('./99_helpers/03_guardarArchivo.js');

//const Tarea = require('./models/tarea.js')
const Tareas = require('./models/tareas.js')

const main = async () => {

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if (tareasDB) {
        
        //Carga las tareas.
        tareas.cargarTareasFromArray(tareasDB);

    }

    do {
        // Imprimir el menu.
        opt = await inquirerMenu();
        //console.log({opt});
        switch (opt) {
            case '1':
                // Crear opcion.
                const desc = await leerInput('Descripción:');
                //console.log(desc);
                tareas.crearTarea(desc);
                break;
            case '2':
                //console.log(tareas.listadoArr);
                tareas.listadoCompleto();
                break;
            case '3':
                //Listar completadas
                tareas.listarPendientesCompletadas(true);
                break;
            case '4':
                //Listar pendientes
                tareas.listarPendientesCompletadas(false);
                break;
            case '5':
                //Completado | Pendiente
                const ids = await mostrarListadoCheckList(tareas.listadoArr);
                //console.log(ids);
                tareas.toggleCompletadas( ids );
                break;
            case '6':
                //Borrar tarea
                const id = await listadoTareasBorrar(tareas.listadoArr);
                
                if (id !== '0') {
                    // Confirmar si se borrara el registro
                    const ok = await confirmarBorrado('¿Está seguro?');
                    
                    if ( ok ) {
                        tareas.borrarTarea( id );
                        console.log('Tarea borrada');
                    }                    
                }                
                break;
        
            default:
                break;
        }

        guardarDB(tareas.listadoArr);
        
        await pausa();

    } while (opt !== '0');    
    
    //pausa();
}

main();