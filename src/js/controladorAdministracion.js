import { thisSesion, usuario } from "./index.js"
import { deleteCliente, deleteOrden } from "./delete.js"
import { drawAllDataFromUser, drawOrdenesPorRut, drawProductoPorId } from "./DOMdraws.js";
import { ajax } from "./helpers/ajax.js";
import my_api from "./helpers/my_api.js";

const d = document;

async function ControladorAdministracion(){
    console.log('Pagina administración')
}

d.addEventListener('click', e=>{
    if (thisSesion && usuario.rut == '1234567890'){
        deleteOrden(e)
        deleteCliente(e)
    }
})

d.addEventListener('submit', async e=>{
    e.preventDefault()
    if (thisSesion && usuario.rut == '1234567890'){
        if (e.target.id == "form-ordenesPorRut") {
            const data = await getOrdenesPorRut(e)
            drawOrdenesPorRut(data)
        }
        if(e.target.id == "form-allDataPorRut"){
            const data = await getAllDataPorRut(e)
            drawAllDataFromUser(data)
        }
        if (e.target.id == "form-obtener-producto"){
            const data = await ajax({url:my_api.PRODUCT + '/'+ Number(e.target.idproducto.value)})
            console.log(data)
            drawProductoPorId(data)
        }
        if (e.target.id == "form-add-product"){
            const data = await subirProducto(e)
            console.log(data)
            let text = `${data.id_producto}----${data.nombre}----${data.precio}----${data.existencias}----${data.img}`
            alert('Producto subido!\r'+text)
            e.submitter.setAttribute('disabled', "false")
        }
    }    
})

async function getOrdenesPorRut(e){
    try {
        const rut = e.target.rut.value
        return await ajax({url:my_api.ORDERSBYRUT+'/'+rut})
    } catch (error) {
        // alert(error.message)
        console.log('Error en get.js: ',error)
    }
}

async function getAllDataPorRut(e){
    try {
        const rut = e.target.rut.value
        const ordenes = await ajax({url:my_api.ORDERSBYRUT+'/'+rut})
        const direcciones = await ajax({url:my_api.ADDRRESSBYRUT+'/'+rut})
        const listasProductos = ordenes.map(async orden=>{
            return ajax({url:my_api.PRODUCTBYORDER+'/'+orden.id_orden})
        })
        console.log(await listasProductos)
        return {direcciones, ordenes, listasProductos}
    } catch (error) {
        // alert(error.message)
        console.log('Error en get.js: ',error)
    }
}

async function subirProducto(e){
    try {
        const data = new FormData(e.target);
        e.submitter.setAttribute('disabled', "true")
        const res = await ajax({url:my_api.ADDPRODUCT, options:{
            method:"POST",
            body: data
        }})
        console.log(res)
        return res
    } catch (error) {
        console.log(error)
    }
    
}

export {ControladorAdministracion}