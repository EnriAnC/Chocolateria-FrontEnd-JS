import { ajax } from "./helpers/ajax.js"
import my_api from "./helpers/my_api.js"

class Usuario{
    constructor(rut="", nombre="", email="", direcciones=[]){
        this.rut = rut
        this.nombre = nombre
        this.email = email
        this.direcciones = direcciones
        this.direccionElegida = direcciones[0]
    }

    setNombre(nombre){
        this.nombre = nombre
    }
    
    setRut(rut){
        this.rut = rut
    }

    setDirecciones(direcciones){
        this.direcciones = direcciones
    }
    
    setDireccionElegida(direccion){
        this.direccionElegida = direccion
    }

    async fetchDirecciones(){
        const direcciones = await ajax({url:my_api.ADDRRESSBYRUT+'/'+this.rut})
        this.direcciones = direcciones
        this.direccionElegida = direcciones[0]
        return this.direcciones
    }

    async fetch(token){
        try {
            let cliente = await ajax({url:my_api.CLIENT, options:{
                headers: new Headers({
                    "authorization": `Bearer ${token}`
                })
            }});
            let usuario = await ajax({url:my_api.USER, options:{
                headers: new Headers({
                    "authorization": `Bearer ${token}`
                })
            }});
            this.rut = cliente.rut;
            this.nombre = cliente.nombre
            this.email = usuario.email
            await this.fetchDirecciones()
            return {rut:this.rut, nombre:this.nombre, active:true}
        } catch (error) {
            console.log(error)
        }
        
    }

    async putNombre(nombre){
        try {
            const res = await ajax({url:my_api.CLIENTBYRUT+'/'+this.rut, options:{
                    method: 'PUT',
                    headers:{"Content-Type":"application/json"},
                    body: JSON.stringify({ nombre })
                }});
            return res  
        } catch (error) {
            console.log(error)
        }
        
    }

}

export default Usuario