const d = document;
function CardProduct(){
    return {
        template: d.getElementById('card').content,
        getOne({ id_producto, nombre, precio, img, existencias }){
            if (!id_producto) return console.warn('falta id_producto')
            if (!nombre) return console.warn('falta nombre')
            if (!precio) return console.warn('falta precio')
            if (!img) return console.warn('falta img')
            if (!existencias || existencias <= 0) return console.warn('falta existencias')
            this.template.querySelector('.card-title').innerText = nombre
            this.template.querySelector('.precio-antes').innerText = `$${precio + precio*0.2} `
            this.template.querySelector('.precio-actual').innerText = `$${precio} `
            this.template.querySelector('.bg-url').style.backgroundImage = `url(${img})`
            this.template.querySelector('.btn-agregar').dataset.id = id_producto
            this.template.querySelector('.btn-agregar').dataset.nombre = nombre
            this.template.querySelector('.btn-agregar').dataset.precio = precio
            return d.importNode(this.template, true)
        },
        getMany(data = []){
            const fragment = new DocumentFragment()
            data.map(producto=>{
                fragment.append(this.getOne(producto))
            })
            return fragment
        }
    }
}

export default CardProduct