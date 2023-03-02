import CarroDeCompras from "./CarroDeCompras.js";
import Usuario from "./Usuario.js";
import { drawDirecciones } from "./DOMdraws.js"
import { goToHrefHTML, initMenuPrincipal, initUsuario, initAdministracion } from "./entrePaginas.js";
import { obtenerDataProducto, añadirProductoACarrito, removerProductoDeCarrito } from './eventosCarroCompras.js'
import { ajax } from "./helpers/ajax.js";
import my_api from "./helpers/my_api.js";

const d = document;

const thisLocation = location.hash;
let thisSesion = localStorageSesion();
// console.log(thisSesion)
let activeAside = false;

const usuario = new Usuario()
const carroDeCompras = new CarroDeCompras()

console.log(usuario)

window.addEventListener('hashchange',e=>{
    console.log(e)
})

d.addEventListener('DOMContentLoaded', async e=>{
    await usuario.fetch(thisSesion) 
    if (thisSesion){
        drawDirecciones(usuario.direcciones)
    }

    if (thisLocation == ''){
        await initMenuPrincipal()
    }
    else if (thisLocation == '#usuario'){
        await initUsuario()
    }
    else if (thisLocation == '#administracion'){
        await initAdministracion()
    }


    if(!thisSesion){
        panelUsuario(false)
        panelAdministracion(false)
        mostrarInicioSesion(true)
    }
    else if (thisSesion && usuario.rut== "1234567890"){
        panelAdministracion(true)
        panelUsuario(true)
        mostrarInicioSesion(false)
    }
    else if (thisSesion){
        panelUsuario(true)
        panelAdministracion(false)
        mostrarInicioSesion(false)
    } 

    expandAsideAnimation()
    goToHrefHTML()
})

d.addEventListener('click', e=>{
    if (thisSesion){
        const dataProd = obtenerDataProducto(e)
        if (dataProd) añadirProductoACarrito(dataProd);
        removerProductoDeCarrito(e)
        cerrarSesion(e) 
        cambiarDireccion(e)
    }
})

d.addEventListener('submit', async e=>{
    e.preventDefault()
    if (e.target.id == "form-inicio-sesion"){
        formInicioSesion(e)
    }
})





// -------------FUNCIONES--------------

// --------MOSTRAR Y NO MOSTRAR DEPENDIENDO DE USUARIO----------
function panelAdministracion(boolean){
    if (boolean){
        d.querySelectorAll("[display]").forEach(el=>{
            el.classList.remove('display-none')
        })
    } else {
        d.querySelectorAll("[display]").forEach(el=>{
            el.classList.add('display-none')
        })
    }
}

function panelUsuario(boolean){
    if (boolean){
        d.querySelectorAll("[display-user]").forEach(el=>{
            el.classList.remove('display-none')
        })
    } else {
        d.querySelectorAll("[display-user]").forEach(el=>{
            el.classList.add('display-none')
        })
    }
}

function mostrarInicioSesion(boolean){
    if (boolean){
        d.getElementById('div-form-sesion').classList.remove('display-none')
    
    } else {
        d.getElementById('div-form-sesion').classList.add('display-none')
    }
}
// ------------------FIN---------------

// --------INICIO DE SESION Y DATOS ASOCIADOS------------
function localStorageSesion(){
    const sesion = localStorage.getItem('sesion');
    // console.log(sesion)
    if (sesion){
        d.getElementById('active-sesion').innerText = 'Cerrar Sesión'
        return sesion
    } 
    else if (!sesion) {
        d.getElementById('active-sesion').innerText = 'Iniciar Sesión'
        return sesion
    }
}

async function formInicioSesion(e){
    sesion({
        usuario: e.target.usuario.value,
        password: e.target.password.value
    })
}

async function sesion(credenciales){
    try {
        const url = my_api.LOGIN,
            options = {
                method:"POST",
                headers:{"Content-type":"application/json"},
                body: JSON.stringify({
                    usuario: credenciales.usuario,
                    password: credenciales.password
                })
            }
        const dataUser = await ajax({url, options})
        if(typeof dataUser !== 'object') throw {msg:'Error al iniciar sesión', dataUser}
        console.log(dataUser)
        localStorage.setItem('sesion', dataUser.token)
        window.location.reload()
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

function cerrarSesion(e){
    if (e.target.innerText == 'Cerrar Sesión'){
        localStorage.removeItem('sesion')
        window.location.reload()
    }
}

// ------------FIN----------------



// ----------ANIMATION ASIDE----------
function expandAsideAnimation(){
    const $arrow = d.getElementById('expand-arrow')
    const $aside = d.getElementsByClassName('aside')[0]
    const rightTranslate = [
        { left: "-170px" },
        { left: "0px" },
    ];
    
    const translateTiming = {
        duration: 250,
        fill: "forwards"
    }
    $arrow.addEventListener('click', function(e){
        
        if (!activeAside){
            $aside.animate(rightTranslate, translateTiming)
            $arrow.firstElementChild.animate([{transform: "rotateY(180deg)", paddingLeft: "5px"}], {duration: 500, fill:"forwards"})
            activeAside = true
        } else {
            $aside.animate(rightTranslate, {...translateTiming, direction:"reverse"})
            $arrow.firstElementChild.animate([{transform: "rotateY(0deg)", paddingLeft: "15px"}], {duration: 500, fill:"forwards"})
            activeAside = false
        }
        
    })    
}




function cambiarDireccion(e){
    if (e.target.matches('span.btn-cambiar')){
        const dirActual = d.getElementById('dir-actual');
        if (e.target.innerText == 'Confirmar'){
            let value = dirActual.children[0].value
            dirActual.innerText = value.split('-')[1]
            usuario.setDireccionElegida({id_direccion: Number(value.split('-')[0]), direccion:value.split('-')[1]})
            console.log(usuario.direccionElegida)
            e.target.innerText = "Cambiar"
            return
        }
        else if(e.target.innerText == 'Cambiar'){
            dirActual.innerHTML = ''
            const select = d.createElement('select')
            usuario.direcciones.forEach(dir=>{
                const option = d.createElement('option')
                option.innerText = dir.direccion
                option.value = `${dir.id_direccion}-${dir.direccion}`
                select.appendChild(option)
            })
            console.log(usuario.direccionElegida)

            dirActual.append(select)
            e.target.innerText = "Confirmar"
        }
    }
}


export { usuario, carroDeCompras, thisSesion }