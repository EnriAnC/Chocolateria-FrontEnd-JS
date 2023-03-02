import { drawCards, drawClientes, drawOrdenes, drawProductos } from "./DOMdraws.js";
import { modalCarritoCompras, realizarCompra } from "./eventosCarroCompras.js";
import { ajax } from "./helpers/ajax.js";
import my_api from "./helpers/my_api.js";
import { thisSesion } from "./index.js";

const d = document;



async function ControladorMenuPrincipal(){
        
    principalInit()
    
}

async function adminInit(dataProductos){
    const dataClientes = await ajax({url:my_api.CLIENTS})
    const dataOrdenes = await ajax({url:my_api.ORDERS})
    drawProductos(dataProductos)
    drawClientes(dataClientes)
    drawOrdenes(dataOrdenes)    
}

function clienInit(){
    realizarCompra()    
}

async function principalInit(){
    const dataProductos = await ajax({url:my_api.PRODUCTS}) 
    drawCards(dataProductos)
    modalCarritoCompras()
    console.log(thisSesion)
    if(thisSesion == "1234567890"){
        adminInit(dataProductos)
    } 
    if (thisSesion){
        clienInit()
    }
    
}


export { ControladorMenuPrincipal }