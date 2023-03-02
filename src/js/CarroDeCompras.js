class CarroDeCompras{
    productos = []

    constructor(){
        
    }

    agregarProducto(item){
        if (this.productos.findIndex(p=>p.id_producto == item.id_producto) != -1){
            this.actualizarCantidad(item)
            return
        }
        this.productos.push(item)
    }

    removerProducto(id){
        this.productos = this.productos.filter(producto => producto.id_producto != id)
    }

    actualizarCantidad(item){
        this.productos.forEach(producto=>{
            if (producto.id_producto == item.id_producto){
                producto.cantidad_producto += item.cantidad_producto
            }
        })
    }

    getProducto(id){
        return this.productos.filter(producto => producto.id_producto == id)[0]
    }

    total(){
        let total = 0;
        this.productos.forEach(producto=>{
            total += producto.cantidad_producto * producto.precio
        })
        return total
    }
}


export default CarroDeCompras