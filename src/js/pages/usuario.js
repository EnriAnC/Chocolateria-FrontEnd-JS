import { thisSesion, usuario } from "../index.js";

const d = document;

async function ControladorUsuario(){
    drawInfoUsuario()
}

d.addEventListener('click', async e=>{
    updateInfoUsuario(e)
})

d.addEventListener('submit', async e=>{

})

async function updateInfoUsuario(e){
    // await usuario.fetch(thisSesion)
    if (e.target.matches('#cambiar-nombre')){
        const $nombre = d.querySelector('.nombre-info')
        if (e.target.innerText == 'Cambiar') {
            e.target.setAttribute('form', 'form-info-usuario')
            $nombre.innerHTML = `<input type="text" form="form-info-usuario" name="nombre" placeholder="Ingrese nuevo nombre" required>`
            e.target.innerText = 'Confirmar'
            e.target.nextElementSibling.style.display = 'block'
        }
        else if (e.target.innerText == 'Confirmar') {
            const res = await actualizarCliente()
            $nombre.innerText = res.nombreNuevo
            e.target.nextElementSibling.style.display = 'none'
            e.target.removeAttribute('form')
            e.target.innerText = 'Cambiar'
        }
        else if (e.target.innerText == 'Cancelar') {
            $nombre.innerText = usuario.nombre
            e.target.style.display = 'none'
            e.target.previousElementSibling.innerText = 'Cambiar'
            e.target.removeAttribute('form')
            
        }
    
    }
    else if (e.target.matches('#cambiar-correo')){
        
    }
    else if (e.target.matches('#agregar-direccion')){
        
    }
}

async function drawInfoUsuario(){
    try {
        d.querySelector('.title-usuario').innerText = 'Panel de usuario';
        d.querySelector('.nombre-info').innerText =  usuario.nombre;
        d.querySelector('.direcciones-info').innerHTML = `
            <select>
                ${usuario.direcciones.map(el=>`<option>${el.direccion}</option>`)}
            </select>
        `;
        d.querySelector('.correo-info').innerText = usuario.email;
    } catch (error) {
        console.log(error)
    }
    
}

async function actualizarCliente(){
    const form = d.getElementById('form-info-usuario')
    const nombre = form.elements.nombre ? form.nombre.value : false
        const correo = form.elements.correo ? form.correo.value : false;
        const direccion = form.elements.direccion ? form.direccion.value : false;
        if (nombre){
            try {
                return await usuario.putNombre(nombre)          
            } catch (error) {
                console.log(error)
            }
            
        }
        else if(correo){
            const correo = form.correo.value;
        }
        else if(direccion){
            const direccion = form.direccion.value;

        }
}

export default ControladorUsuario