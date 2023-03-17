export async function ajax(props){
    try {
        const { url, options } = props
        const res = options ? await fetch(url, options) : await fetch(url);
        const json = await res.json()
        if (json.name === "TokenExpiredError") throw {msg:"Token Expired"}
        return json
    } catch (err) {
        const message = err.statusText || 'Error en el fetch';
        console.log(err)
        return null
        // return `
        //     <div class='error'>
        //         <p>Error ${err.status}: ${message}</p>
        //     </div>
        // `
    }
}