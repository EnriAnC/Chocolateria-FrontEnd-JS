// ----------------DELETE CLIENTE Y ORDEN---------------
async function deleteCliente(e){
    try {
        const rut = e.target.dataset.rut ? e.target.dataset.rut : false
        if (rut && e.target.matches('.btn-delete-cliente')){
            if (confirm('¿Esta seguro de eliminar el cliente?')){
                const res = await fetch('http://192.168.0.3:3000/api/clientes/rut/'+rut, {method:"DELETE"});
                if (!res.ok) throw {status:res.status}
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
                const res = await fetch('http://192.168.0.3:3000/api/productos/orden/'+id_orden, {method:"DELETE"});
                if (!res.ok) throw {status:res.status}
                const data = res.json()
                // console.log(data)
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