import CarroDeCompras from "./assets/CarroDeCompras.js";
import Usuario from "./assets/Usuario.js";
import { obtenerDataProducto, añadirProductoACarrito, removerProductoDeCarrito } from './assets/CarrIto..js'
// import Loading from "./components/Loading.js";
import Route from "./routes/routes.js";
import Aside from "./components/Aside.js";

const d = document,
    w = window;

const thisSesion = localStorage.getItem('session')

const usuario = new Usuario()
const carroDeCompras = new CarroDeCompras()

const routes = Route()
routes.add("/", "../pages/main.html")
routes.add("/#register", "../pages/registro.html")
routes.add("/#user", "../pages/usuario.html")
routes.add("/#admin", "../pages/administracion.html")

d.addEventListener('DOMContentLoaded', async e=>{
    await routes.init()
    const aside = await Aside()
    aside.showElements()
})

d.addEventListener('click', async e=>{
    const dataProd = obtenerDataProducto(e)
    if (dataProd) añadirProductoACarrito(dataProd);
    removerProductoDeCarrito(e)
    await routes.onClickActivate(e)
})

w.addEventListener('popstate', e=>{
    routes.popstate(e)
})




export { usuario, carroDeCompras, thisSesion, routes }