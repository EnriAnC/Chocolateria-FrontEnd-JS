import Usuario from "../assets/Usuario.js";
import { ajax } from "../helpers/ajax.js";
import my_api from "../helpers/my_api.js";
import { thisSesion, usuario } from "../index.js";


const d = document;


let activeAside = false;
async function Aside(){
    if(thisSesion) await usuario.fetch(thisSesion)
    return{
        thisSesion,
        usuario,
        async showElements(){
            console.log(this.thisSesion)
            if(!this.thisSesion){
                panelUsuario(false)
                panelAdministracion(false)
                mostrarInicioSesion(true)
            }
            else if (this.thisSesion && this.usuario.rut== "1234567890"){
                panelAdministracion(true)
                panelUsuario(true)
                mostrarInicioSesion(false)
            }
            else if (this.thisSesion){
                panelUsuario(true)
                panelAdministracion(false)
                mostrarInicioSesion(false)
            } 
            if (this.thisSesion){
                drawDirecciones(await usuario.direcciones)
            }
        
        }
    }
}

d.addEventListener('click', e=>{
    if (thisSesion){
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
        d.querySelectorAll("[display-sesion]").forEach(el=>{
            el.classList.remove('display-none')
            d.getElementById('active-sesion').innerText = 'Iniciar Sesión'
        })
    
    } else {
        d.querySelectorAll("[display-sesion]").forEach(el=>{
            d.getElementById('active-sesion').innerText = 'Cerrar Sesión'
            el.classList.add('display-none')
        })
    }
}
// ------------------FIN---------------

// --------INICIO DE SESION Y DATOS ASOCIADOS------------


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
        if(!dataUser.token) throw {msg:'Error al iniciar sesión', dataUser}
        console.log(dataUser)
        localStorage.setItem('session', dataUser.token)
        location.href = '/'
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

function cerrarSesion(e){
    if (e.target.innerText == 'Cerrar Sesión'){
        localStorage.removeItem('session')
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

function drawDirecciones(direcciones){
    if (!direcciones || direcciones.length === 0) return
    const dirActual = d.getElementById('dir-actual')
    if ( direcciones[0].hasOwnProperty('direccion')) dirActual.innerText = direcciones[0].direccion
    console.log(dirActual)
    
}


export default Aside