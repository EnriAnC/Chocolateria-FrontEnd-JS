import { ajax } from "../helpers/ajax.js";
import my_api from "../helpers/my_api.js";

// ----------------DELETE CLIENTE Y ORDEN---------------
async function deleteCliente(e){
    try {
        const rut = e.target.dataset.rut ? e.target.dataset.rut : false
        if (rut && e.target.matches('.btn-delete-cliente')){
            if (confirm('¿Esta seguro de eliminar el cliente?')){
                const res = await ajax({url:my_api.CLIENTBYRUT+"/"+rut, options:{method:"DELETE"}});
                alert('Se ha eliminado al cliente y todos sus datos asociados ')
                deleteRowCliente(e.target)
            } else {

            }
        }
    } catch (err) {
        console.log('Error en Delete', err)
    }
}

function deleteRowCliente($button){
    $button.parentElement.parentElement.parentElement.removeChild($button.parentElement.parentElement)
}

async function deleteOrden(e){
    try {
        const id_orden = e.target.dataset.ordenid ? e.target.dataset.ordenid : false
        if (id_orden && e.target.matches('.btn-delete-orden')){            
            if (confirm('¿Esta seguro de eliminar la orden?')){
                const res = await ajax({url:my_api.ORDER+"/"+id_orden, options:{method:"DELETE"}});
                deleteRowCliente(e.target)
                alert('Se ha eliminado la orden y restaurado el stock')
            } else {
                console.log('Proceso cancelado')
            }
        }
    } catch (err) {
        console.log('Error en Delete', err)
    }
}

export { deleteCliente, deleteOrden }