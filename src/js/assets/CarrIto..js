import { ajax } from "../helpers/ajax.js";
import my_api from "../helpers/my_api.js";
import { carroDeCompras, usuario, thisSesion } from "../index.js";

const d = document;
// ----------CARRO DE COMPRAS ACCIONES CON EL DOM---------------
function obtenerDataProducto(e){
    if (e.target.dataset.id && e.target.matches('.btn-agregar')){
        return {
            id_producto: +e.target.dataset.id,
            nombre: e.target.dataset.nombre,
            precio: e.target.dataset.precio,
            cantidad_producto: 1
        }
    }
}

function añadirProductoACarrito(item){
    const carritoCompras = d.getElementsByClassName('carrito-compras')[0],
        carritoCantidad = d.getElementsByClassName('carrito-cantidad')[0],
        template = d.getElementById('template-item').content;

    carroDeCompras.agregarProducto(item)
    item = carroDeCompras.getProducto(item.id_producto)

    if (item.cantidad_producto > 1){
        for (const div of carritoCompras.children) {
            if(div.lastElementChild.dataset.id == item.id_producto){
                div.querySelector('.cantidad-item').innerText = item.cantidad_producto
                actualizarTotalParcial()
                return
            }
        }
    }
    carritoCantidad.innerText = carroDeCompras.productos.length
    template.querySelector('.nombre-item').innerText = item.nombre
    template.querySelector('.precio-item').innerText = `$${item.precio}`
    template.querySelector('.cantidad-item').innerText = item.cantidad_producto
    template.querySelector('.delete-svg').dataset.id = item.id_producto
    const clone = d.importNode(template, true)
    carritoCompras.append(clone)

    actualizarTotalParcial()
}

function actualizarTotalParcial(){
    d.getElementById('total-parcial-compra').innerText = `$${carroDeCompras.total()}`
}

function removerProductoDeCarrito(e){
    const carritoCantidad = d.getElementsByClassName('carrito-cantidad')[0];
    if ((e.target.dataset.id && e.target.matches('svg.delete-svg'))){
        e.target.parentElement.parentElement.removeChild(e.target.parentElement)
        carroDeCompras.removerProducto(e.target.dataset.id)
        carritoCantidad.innerText = carroDeCompras.productos.length
        actualizarTotalParcial()
    }
    else if (e.target.matches('.delete-svg')){
        e.target.parentElement.parentElement.parentElement.removeChild(e.target.parentElement.parentElement)
        carroDeCompras.removerProducto(e.target.parentElement.dataset.id)
        carritoCantidad.innerText = carroDeCompras.productos.length
        actualizarTotalParcial()
    }
    
}

function modalCarritoCompras(){
    const $carrito = d.getElementById('carrito'),
        $carritoCompras = d.getElementsByClassName('carrito-compras')[0]

    $carrito.addEventListener('click', e=>{
        // console.log($carritoCompras.style.display)
        if ($carritoCompras.classList.contains('display-none')) {
            $carritoCompras.classList.remove('display-none')
            $carritoCompras.animate([{opacity:"0"}, {opacity:"1"}], {duration: 250, fill: "forwards"})
        }
        else { 
            $carritoCompras.animate([{opacity:"1"}, {opacity:"0"}], {duration: 250, fill: "forwards"})
            setTimeout(() => {
                $carritoCompras.classList.add('display-none')
            }, 250);
        }
        
    })
}

function realizarCompra(){
    const btnCompra = d.getElementById('btn-realizar-compra')
    btnCompra.addEventListener('click', async e=>{
        try {
            if (thisSesion){
                let json = await ajax({url:my_api.SENDORDER, options:{
                    method: 'POST',
                    headers:{
                        "Content-Type":"application/json",
                        "authorization": `Bearer ${thisSesion}`
                    },
                    body: JSON.stringify({
                        rut: usuario.rut,
                        id_direccion: usuario.direccionElegida.id_direccion,
                        productos: [...carroDeCompras.productos]
                    })
                }});
                alert(`Se ha mandado su orden!\nSu total: $${json.total}`)
                carroDeCompras.productos = []
                actualizarTotalParcial()
                const items = d.getElementsByClassName('item')
                Array.from(items).forEach(x=>x.parentElement.removeChild(x))
            } else {
                alert('Inicia sesión!')
            }
            // console.log({
            //     rut: usuario.rut,
            //     id_direccon: usuario.direccionElegida.id_direccion,
            //     productos: [...carroDeCompras.productos]
            // })
            
        } catch (err) {
            console.log(err)
        }
        
    })
}
// -------------------FIN-------------------------


export { obtenerDataProducto, añadirProductoACarrito, removerProductoDeCarrito, modalCarritoCompras, realizarCompra }
