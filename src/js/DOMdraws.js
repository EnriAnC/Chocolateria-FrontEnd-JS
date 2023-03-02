const d = document,
    templateTr3Td = templateTr(3),
    templateTr4Td = templateTr(4),
    
    templateTr5Td = templateTr(5);

    
function templateTr(n=0){
    const fragment = new DocumentFragment(),
        $tr = d.createElement('tr');      
    let i = 0;
    while(i<n){
        i++
        $tr.append(d.createElement('td'))
    }
    fragment.append($tr)
    return fragment
}

function drawProductos(data){
    try {
        const table = d.getElementById('tbody-productos')
        const template = templateTr4Td,
            tds = template.firstElementChild.children;
        // console.log(template)
        data.map(producto=>{
            tds[0].innerText = producto.id_producto;
            tds[1].innerText = producto.nombre;
            tds[2].innerText = producto.precio;
            tds[3].innerText = producto.existencias;
            const clone = d.importNode(template, true)
            table.append(clone)
        })
    } catch (err) {
        console.log('Error en DOMdraws: ', err)
    }

}

function drawProductoPorId(data){
    try {
        console.log(data)
        const table = d.getElementById('tbody-producto-id')
        table.innerHTML = ''
        const template = templateTr4Td,
        tds = template.firstElementChild.children;
        tds[0].innerText = data.id_producto;
        tds[1].innerText = data.nombre;
        tds[2].innerText = data.precio;
        tds[3].innerText = data.existencias;
        const clone = d.importNode(template, true)
        table.append(clone)
    } catch (err) {
        console.log('Error en DOMdraws: ', err)
    }

}

function drawClientes(data){
    try {
        const table = d.getElementById('tbody-clientes')
        const template = templateTr3Td,
            tds = template.firstElementChild.children;
        // console.log(template)
        data.map(cliente=>{
            tds[0].innerText = cliente.rut;
            tds[1].innerText = cliente.nombre;
            tds[2].innerHTML = `<button class="btn-delete-cliente" data-rut="${cliente.rut}">Eliminar</button>`
            const clone = d.importNode(template, true)
            table.append(clone)
        })
    } catch (err) {
        console.log('Error en DOMdraws: ', err)
    }

}

function drawOrdenes(data){
    try {
        const table = d.getElementById('tbody-ordenes')
        const template = templateTr5Td,
            tds = template.firstElementChild.children;
        table.innerHTML = ''
        
        // console.log(template)
        data.map(orden=>{
            tds[0].innerText = orden.id_orden;
            tds[1].innerText = orden.rut;
            tds[2].innerText = orden.id_direccion;
            tds[3].innerText = orden.precio_total;
            tds[4].innerHTML = `<button class="btn-delete-orden" data-ordenId="${orden.id_orden}">Eliminar</button>`
            const clone = d.importNode(template, true)
            table.append(clone)
        })
    } catch (err) {
        console.log('Error en DOMdraws: ', err)
    }

}

function drawOrdenesPorRut(data){
    try {
        const table = d.getElementById('tbody-ordenes'),
        template = templateTr5Td,
        tds = template.firstElementChild.children
        table.innerHTML = ''
        
        // console.log()
        data.map(orden=>{
            tds[0].innerText = orden.id_orden;
            tds[1].innerText = orden.rut;
            tds[2].innerText = orden.id_direccion;
            tds[3].innerText = orden.precio_total;
            tds[4].innerHTML = `<button class="btn-delete-orden" data-ordenId="${orden.id_orden}">Eliminar</button>`
            const clone = d.importNode(template, true)
            table.append(clone)
        })        
    } catch (err) {
        console.log('Error en DOMdraws: ', err)
    }

}

function drawCards(data){
    try {
        const template = d.getElementById('card').content
        data.forEach(producto=>{
            template.querySelector('.card-title').innerText = producto.nombre
            template.querySelector('.precio-antes').innerText = `$${producto.precio + producto.precio*0.2} `
            template.querySelector('.precio-actual').innerText = `$${producto.precio} `
            template.querySelector('.bg-url').style.backgroundImage = `url(${producto.img})`
            template.querySelector('.btn-agregar').dataset.id = producto.id_producto
            template.querySelector('.btn-agregar').dataset.nombre = producto.nombre
            template.querySelector('.btn-agregar').dataset.precio = producto.precio
            const clone = d.importNode(template, true)
            d.getElementById('vista-productos').append(clone)
        })
    } catch (err) {
        console.log('Error en DOMdraws: ', err)
    }
    
}

async function drawAllDataFromUser(data){
    try {
        const table = d.getElementById('tbody-clientes-ordenes');
        const template = templateTr4Td,
            tds = template.firstElementChild.children;
    
        table.innerHTML = '';
        // console.log(template)
        let {direcciones, ordenes, listasProductos} = data
        // console.log(direcciones, ordenes, await Promise.all(listasProductos))
        let ordenOfUser = ordenes.map(async (orden)=>{
            const dir_orden = direcciones.filter(dir => dir.id_direccion == orden.id_direccion);
            listasProductos = await Promise.all(listasProductos)
            const list_orden = listasProductos.filter(prod => prod[0].id_orden == orden.id_orden)
            console.log(dir_orden)
            console.log(...list_orden)
            return [...dir_orden, ...list_orden]
        })

        let dataUser = await ordenOfUser
        dataUser = await Promise.all(dataUser);

        dataUser.forEach(arr=>{
            for (const i in arr) {
                let select = d.createElement('select')
                let p = d.createElement('p')
                if (i==0){                   
                    arr[i].rut ? tds[0].innerText = arr[i].rut : undefined;
                    p.innerText = `${arr[i].direccion}`
                    arr[i].direccion != undefined ? tds[1].append(p) : undefined;
                } else {            
                    p = d.createElement('p')
                    p.innerText = arr[i][0].id_orden
                    tds[2].append(p)                                        
                    select = d.createElement('select')
                    arr[i].forEach(el=>{
                        const option = d.createElement('option')
                        option.innerText = `${el.cantidad_producto}u -- ${el.producto.nombre} -- $${el.producto.precio}`
                        select.append(option)
                    })
                    tds[3].append(select);
                }
                
            }    
        })
    
        
        const clone = d.importNode(template, true)
        table.append(clone)
        tds[1].innerHTML = ''
        tds[2].innerHTML = ''
        tds[3].innerHTML = ''
    } catch (err) {
        console.log('Error en DOMdraws: ', err)
    }

}

function drawDirecciones(direcciones){
    if (!direcciones) return
    const dirActual = d.getElementById('dir-actual')
    console.log(dirActual)
    dirActual.innerText = direcciones[0].direccion
}


export { drawProductoPorId, drawAllDataFromUser, drawCards, drawClientes, drawOrdenes, drawOrdenesPorRut, drawProductos, drawDirecciones }