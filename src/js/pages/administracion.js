import { thisSesion, usuario } from "../index.js"
import { deleteCliente, deleteOrden } from "../assets/delete.js"
import { drawAllDataFromUser, drawClientes, drawOrdenes, drawProductoPorId, drawProductos } from "../assets/DOMdraws.js";
import { ajax } from "../helpers/ajax.js";
import my_api from "../helpers/my_api.js";
import Loading from "../components/Loading.js";

const d = document;
const loader = Loading();
const fullscreenLoader = loader.fullscreen()

let productoFromEdit;

async function ControladorAdministracion(){
    d.querySelector('.main').append(fullscreenLoader.cloneNode(true))
    await adminInit()
    d.querySelector('.main').removeChild(d.querySelector('div.fullscreen'))
}

async function adminInit(){
    const options={
        headers: {
            "authorization": `Bearer ${thisSesion}`
        }
    }
    const dataProductos = await ajax({url:my_api.PRODUCTS, options}) 
    const dataClientes = await ajax({url:my_api.CLIENTS, options})
    const dataOrdenes = await ajax({url:my_api.ORDERS, options})
    drawProductos(dataProductos)
    drawClientes(dataClientes)
    drawOrdenes(dataOrdenes)    
}

d.addEventListener('click', e=>{
    if (thisSesion && usuario.rut == '1234567890'){
        deleteOrden(e)
        deleteCliente(e)
        deleteProducto(e)
        editarProducto(e)
    }
})

d.addEventListener('submit', async e=>{
    e.preventDefault()
    if (thisSesion && usuario.rut == '1234567890'){
        if (e.target.id == "form-ordenesPorRut") {
            const data = await getOrdenesPorRut(e)
            drawOrdenes(data)
        }
        if(e.target.id == "form-allDataPorRut"){
            const data = await getAllDataPorRut(e)
            drawAllDataFromUser(data)
        }
        if (e.target.id == "form-obtener-producto"){
            const data = await ajax({url:my_api.PRODUCT + '/'+ Number(e.target.idproducto.value), options:{
                headers: {
                    "authorization": `Bearer ${thisSesion}`
                }
            }})
            productoFromEdit = data
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
        return await ajax({url:my_api.ORDERSBYRUT+'/'+rut, options:{
            headers: {
                "authorization": `Bearer ${thisSesion}`
            }
        }})
    } catch (error) {
        // alert(error.message)
        console.log('Error en get.js: ',error)
    }
}

async function getAllDataPorRut(e){
    try {
        const rut = e.target.rut.value
        const data = await ajax({url:my_api.ALLORDERSBYRUT+'/'+rut, options:{
            headers: {
                "authorization": `Bearer ${thisSesion}`
            }
        }})
        console.log(await data)
        return data
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
            headers: {
                "authorization": `Bearer ${thisSesion}`
            },
            body: data
        }})
        console.log(res)
        return res
    } catch (error) {
        console.log(error)
    }
    
}

async function deleteProducto(e){
    if (e.target.dataset.idproducto && e.target.matches('.btn-eliminar-prod')){
        if (confirm('¿Está seguro?')){
            const res = await ajax({url:my_api.PRODUCT+"/"+Number(e.target.dataset.idproducto), options:{
                method:"DELETE",
                headers: {
                    "authorization": `Bearer ${thisSesion}`
                },
}            })
            console.log(res)
            alert('Se ha eliminado el producto')
            e.target.parentElement.parentElement.parentElement.removeChild(e.target.parentElement.parentElement)
        }
        
    }
}

let editActivo = false
let idproducto;
async function editarProducto(e){
    if (e.target.matches('.btn-editar-prod') && !editActivo){
        idproducto = e.target.dataset.idproducto
        const template = d.createElement('template')
        template.innerHTML = `
        <svg viewBox="0 0 20 20" style="width:18px;" xmlns="http://www.w3.org/2000/svg">
            <use class="edit-svg" xlink:href="#edit-svg">
        </svg>
        `
        const svg = template.content
        const tr = e.target.parentElement.parentElement
        tr.children[1].append(svg.cloneNode(true))
        tr.children[1].firstElementChild.id = "edit-nombre"
        tr.children[2].append(svg.cloneNode(true))
        tr.children[2].firstElementChild.id = "edit-precio"
        tr.children[3].append(svg.cloneNode(true))
        tr.children[3].firstElementChild.id = "edit-stock"
        editActivo = true
        e.target.classList.add('display-none')
        tr.querySelector('.btn-eliminar-prod').classList.add('display-none')

        tr.querySelector('.btn-cancelar-prod').classList.remove('display-none')
    }
    if (e.target.matches('.btn-cancelar-prod')){
        const tr = e.target.parentElement.parentElement;
        // tr.children[1].removeChild(tr.querySelector('svg'))
        // tr.children[2].removeChild(tr.querySelector('svg'))
        // tr.children[3].removeChild(tr.querySelector('svg'))
        tr.children[1].textContent = productoFromEdit.nombre
        tr.children[2].textContent = productoFromEdit.precio
        tr.children[3].textContent = productoFromEdit.existencias
        editActivo = false
        e.target.classList.add('display-none')

        tr.querySelector('.btn-editar-prod').classList.remove('display-none')
        tr.querySelector('.btn-eliminar-prod').classList.remove('display-none')
    }


    if(e.target.parentElement.matches('#edit-nombre')){
        e.target.parentElement.parentElement.innerHTML = `

            <input type="text" name="nombre" id="nombre">

        <svg viewBox="0 0 32 32" style="width:24px;" xmlns="http://www.w3.org/2000/svg">
            <use class="confirm-nombre-svg" xlink:href="#confirm-svg" data-idproducto=${idproducto}>
        </svg>`
        
    }
    if(e.target.matches('.confirm-nombre-svg') && e.target.dataset.idproducto){
        console.log(e.target.dataset.idproducto)
        const data = await ajax({url:my_api.ADDPRODUCT, options:{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "authorization": `Bearer ${thisSesion}`
            },
            body:JSON.stringify({
                id_producto: e.target.dataset.idproducto,
                nombre:d.getElementById('nombre').value
            })
        }})
        if (!data) return console.log("Error al actualizar nombre producto")
        alert("Se ha modificado con éxito")
        const span = d.createElement('span').textContent = data.nombre
        productoFromEdit.nombre = data.nombre
        e.target.parentElement.parentElement.innerHTML = span
    }


    if(e.target.parentElement.matches('#edit-precio')){
        e.target.parentElement.parentElement.innerHTML = `

            <input type="text" name="nombre" id="nombre">

        <svg viewBox="0 0 32 32" style="width:24px;" xmlns="http://www.w3.org/2000/svg">
            <use class="confirm-precio-svg" xlink:href="#confirm-svg" data-idproducto=${idproducto}>
        </svg>`
        
    }
    if(e.target.matches('.confirm-precio-svg') && e.target.dataset.idproducto){
        console.log(e.target.dataset.idproducto)
        const data = await ajax({url:my_api.ADDPRODUCT, options:{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "authorization": `Bearer ${thisSesion}`
            },
            body:JSON.stringify({
                id_producto: e.target.dataset.idproducto,
                precio: +d.getElementById('nombre').value
            })
        }})
        if (!data) return console.log("Error al actualizar precio producto")
        alert("Se ha modificado con éxito")
        const span = d.createElement('span').textContent = data.precio
        productoFromEdit.precio = data.precio
        e.target.parentElement.parentElement.innerHTML = span
    }


    if(e.target.parentElement.matches('#edit-stock')){
        e.target.parentElement.parentElement.innerHTML = `

            <input type="text" name="nombre" id="nombre">

        <svg viewBox="0 0 32 32" style="width:24px;" xmlns="http://www.w3.org/2000/svg">
            <use class="confirm-stock-svg" xlink:href="#confirm-svg" data-idproducto=${idproducto}>
        </svg>`
        
    }
    if(e.target.matches('.confirm-stock-svg') && e.target.dataset.idproducto){
        console.log(e.target.dataset.idproducto)
        const data = await ajax({url:my_api.ADDPRODUCT, options:{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "authorization": `Bearer ${thisSesion}`
            },
            body:JSON.stringify({
                id_producto: e.target.dataset.idproducto,
                existencias: +d.getElementById('nombre').value
            })
        }})
        console.log(data)
        if (!data) return console.log("Error al actualizar stock producto")
        alert("Se ha modificado con éxito")
        const span = d.createElement('span').textContent = data.existencias
        productoFromEdit.existencias = data.existencias
        e.target.parentElement.parentElement.innerHTML = span
    }
}

export default ControladorAdministracion