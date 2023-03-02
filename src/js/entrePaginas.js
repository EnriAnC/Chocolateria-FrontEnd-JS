import {ControladorAdministracion} from "./controladorAdministracion.js";
import { ControladorMenuPrincipal } from "./controladorMenuPrincipal.js";
import { ControladorUsuario } from "./controladorUsuario.js";
import { HtmlDocumentFragment } from "./HtmlDFragment.js";

const d = document;

async function cambiarPaginaA(htmlDocumentFragment){
    d.querySelector('.main').innerHTML = ''
    d.querySelector('.main').append(await htmlDocumentFragment)
}

async function pageDOM(url){
    const pageDom = await new HtmlDocumentFragment().fetchHTML(url) 
    cambiarPaginaA(pageDom)
    return pageDom
}

async function initMenuPrincipal(href='../../pages/main.html'){
    d.getElementById('dinamyc-link').href = "./src/css/main.css"
    await pageDOM(href)
    ControladorMenuPrincipal()
}

async function initUsuario(href='../../pages/usuario.html'){
    d.getElementById('dinamyc-link').href = "./src/css/usuario.css"
    await pageDOM(href)
    ControladorUsuario()
}

async function initAdministracion(href='../../pages/administracion.html'){
    d.getElementById('dinamyc-link').href = "./src/css/administracion.css"
    await pageDOM(href)
    ControladorAdministracion()
}

async function goToHrefHTML(){
    const hrefHTML = d.querySelectorAll('[hrefhtml]')
    hrefHTML.forEach(x=>x.addEventListener('click', async e=>{
        console.log(location)
        if (x.firstChild.innerText == 'Administrar cuenta'){
            if (location.hash == '#usuario') return
            animacionCambioDePagina()
            history.pushState({page:'usuario'}, "", `/#usuario`);
            setTimeout(async () => {
                initUsuario(x.getAttribute('hrefhtml'))
            }, 500);
        }
        if (x.firstChild.innerText == 'Menu principal'){
            if (location.hash == '') return
            animacionCambioDePagina()
            history.pushState({page:'index'}, "", `/`);
            setTimeout(async () => {
                initMenuPrincipal(x.getAttribute('hrefhtml'))
            }, 500);
            
           
        }    
        if (x.innerText == 'Panel de administración'){
            if (location.hash == '#administracion') return
            animacionCambioDePagina()
            history.pushState({page:'administracion'}, "", `/#administracion`);
            setTimeout(async () => {
                initAdministracion(x.getAttribute('hrefhtml'))
            }, 500);           
        }      
    }))
}

function animacionCambioDePagina(){
    const boxAnimado = d.getElementsByClassName('box-change-page')[0]
    boxAnimado.style.display = 'block'
    boxAnimado.classList.add('changing')
    setTimeout(() => {
        boxAnimado.classList.add('next')
        setTimeout(() => {
            boxAnimado.style.display = 'none'
            boxAnimado.classList.remove('changing')
            boxAnimado.classList.remove('next')
        }, 1000);
    }, 1000);   
}

export { goToHrefHTML, initAdministracion, initMenuPrincipal, initUsuario }