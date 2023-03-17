import { modalCarritoCompras, realizarCompra } from "../assets/CarrIto..js";
import { ajax } from "../helpers/ajax.js";
import my_api from "../helpers/my_api.js";
import { thisSesion } from "../index.js";
import CardProduct from "../components/cardProduct.js";

const d = document;



async function ControladorMenuPrincipal(){
        
    principalInit()
    
}

async function principalInit(){
    const dataProductos = await ajax({url:my_api.PRODUCTS}) 
    drawCards(dataProductos)
    console.log(dataProductos)
    modalCarritoCompras()
    if (thisSesion){
        realizarCompra()  
    }
    
}


function drawCards(data){
    try {
        const cards = CardProduct().getMany(data)
        d.getElementById('vista-productos').append(cards)

    } catch (err) {
        console.log('Error en DOMdraws: ', err)
    }
}


export default ControladorMenuPrincipal