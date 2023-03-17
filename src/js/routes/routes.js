import { HtmlDocumentFragment } from "../assets/HtmlDFragment.js"
const d = document;

function Route(){
    return {
        routes:{},
        add(url, src, cb=null, name=null, data=null, html=null){
            if (this.routes[url]) return
            if(!this.routes[src]) this.routes[src] = {url}
            name = src.split('/')[2].split('.')[0]
            data = {data, name, url}
            if(!this.routes[url]) this.routes[url] = {url, src, cb, name, data, html}
        },
        async init(querySelector = '.main'){
            const route = this.routes[`/${location.hash}`] ? this.routes[`/${location.hash}`] : this.routes[`/${location.hash.split('?=')[0]}`]
            await this.importCB(route)
            if (route){
                route.url = `/${location.hash}`
                this.goToPage(route, true, querySelector)
            }            
        },
        async onClickActivate(e, querySelector='.main'){
            if(e.target.matches('[srchtml]')){
                
                let route = this.routes[`.${e.target.getAttribute('srchtml')}`]
                if (route){
                    if (location.hash == route.url.split('/')[1]) return
                    const boxAnimado = d.getElementsByClassName('box-change-page')[0]
                        boxAnimado.style.display = 'block'
                        boxAnimado.classList.add('changing')
                    route = this.routes[route.url] ? this.routes[route.url] : null
                    await this.importCB(route)
                    setTimeout(async () => {
                        boxAnimado.classList.add('next')
                        await this.goToPage(route, true, querySelector)
                        setTimeout(() => {
                            boxAnimado.classList.remove('changing')
                            boxAnimado.classList.remove('next') 
                        }, 1000);
                    }, 750);
                }   
            }
        },
        async goToPage(route, pushstate=true, querySelector='.main'){
            // if (location.hash == route.url.split('/')[1]) return
            
            await this.importCB(route)
            if(pushstate) history.pushState(route.data, "hey", route.url);
            await this.insertHtml(route, querySelector)
            if(route.cb) route.cb()
            d.getElementById('dinamyc-link').href = `./src/css/${route.name}.css`
            
        }
        ,
        async popstate(e){
            await this.goToPage(this.routes[e.state.url], false)
        },
        async importCB(route){
            if (!route.cb){
                const cb = await import(`../pages/${route.name}.js`)
                route.cb = cb.default
            }
        },
        async insertHtml(route, querySelector='.main'){          
            if (!route.html){
                route.html = await new HtmlDocumentFragment().fetchHTML(route.src)
            }
            d.querySelector(querySelector).textContent = ''
            d.querySelector(querySelector).append(route.html.cloneNode(true))
        }
    }
};

function animacionCambioDePagina(router=null){
    const boxAnimado = d.getElementsByClassName('box-change-page')[0]
    boxAnimado.style.display = 'block'
    boxAnimado.classList.add('changing')
    
    setTimeout(() => {
        router ? router.init() : null
        boxAnimado.classList.add('next')
        setTimeout(() => {
            boxAnimado.style.display = 'none'
            boxAnimado.classList.remove('changing')
            boxAnimado.classList.remove('next')
        }, 1000);
    }, 1000);   
}

export default Route