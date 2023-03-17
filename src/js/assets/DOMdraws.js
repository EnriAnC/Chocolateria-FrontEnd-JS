import Row from "../components/Row.js";

const d = document,
    templateTr3Td = Row().columns(3),
    templateTr4Td = Row().columns(4),
    templateTr5Td = Row().columns(5);


function drawProductos(data){
    try {
        const table = d.getElementById('tbody-productos')
        console.log(data)
        data.map(producto=>{
            // producto["img"] = {
            //     content: `<button class="btn-delete-producto" data-idproducto="${producto.id_producto}">Eliminar</button>
            //     <button class="btn-cancelar-prod display-none">Cancelar</button>
            //     <button class="btn-editar-prod">Editar</button>
            //     <button class="btn-confirmar-prod display-none" type="submit" form="form-editar-producto">Confirmar</button>`,
            //     type: 'html'
            // }
            const clone = templateTr4Td.templateWithData(producto)
            table.append(clone)
        });
    } catch (err) {
        console.log('Error en DOMdraws: ', err)
    }

}

function drawProductoPorId(producto){
    try {
        const table = d.getElementById('tbody-producto-id')
        table.innerHTML = ''
        producto["img"] = {
            content: `<button class="btn-eliminar-prod" data-idproducto="${producto.id_producto}">Eliminar</button>
            <button class="btn-cancelar-prod display-none">Terminar</button>
            <button class="btn-editar-prod" data-idproducto="${producto.id_producto}">Editar</button>`,
            type: 'html'
        }
        const clone = templateTr5Td.templateWithData(producto)
        table.append(clone)
    } catch (err) {
        console.log('Error en DOMdraws: ', err)
    }
}

function drawClientes(data){
    try {
        const fragment = d.createDocumentFragment()
        const table = d.getElementById('tbody-clientes')
        data.map(cliente=>{
            cliente["id_usuario"] = {
                content: `<button class="btn-delete-cliente" data-rut="${cliente.rut}">Eliminar</button>`,
                type: 'html'
            }
            const clone = templateTr3Td.templateWithData(cliente)
            table.append(clone)
        })
        table.append(fragment)
     
    } catch (err) {
        console.log('Error en DOMdraws: ', err)
    }

}

function drawOrdenes(data){
    try {
        const table = d.getElementById('tbody-ordenes')
        table.innerHTML = ''
        data.map(orden=>{
            orden.deleteBtn = {
                content: `<button class="btn-delete-orden" data-ordenId="${orden.id_orden}">Eliminar</button>`,
                type: 'html'
            }
            const clone = templateTr5Td.templateWithData(orden)
            table.append(clone)
        })
    } catch (err) {
        console.log('Error en DOMdraws: ', err)
    }

}

async function drawAllDataFromUser(data){
    try {
        const table = d.getElementById('tbody-clientes-ordenes');
        const template = templateTr4Td.template,
            tds = template.children;
    
        table.innerHTML = '';
        // console.log(template)
        let {nombre, rut, direccions} = data[0]
        tds[0].textContent = rut

        direccions.forEach((x)=>{
            tds[1].textContent = x.direccion
            x.ordens.forEach((y)=>{
                console.log(y.id_orden)
                tds[2].textContent += y.id_orden+",\t\n"
                let select = d.createElement('select')
                y.listaProductos.forEach((z)=>{
                    console.log(z)
                    const option = d.createElement('option')
                    option.innerText = `${z.cantidad_producto}u -- ${z.producto.nombre} -- $${z.producto.precio}`
                    select.append(option)
                })
                tds[3].append(select);
            })
            const clone = d.importNode(template, true)
            table.append(clone)
            // tds[1].textContent = ''
            tds[2].textContent = ''   
            tds[3].textContent = ''
            
        })
        
    } catch (err) {
        console.log('Error en DOMdraws: ', err)
    }

}




export { drawProductoPorId, drawAllDataFromUser, drawClientes, drawOrdenes, drawProductos }