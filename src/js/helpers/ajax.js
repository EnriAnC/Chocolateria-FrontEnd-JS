export async function ajax(props){
    try {
        const { url, options } = props
        const res = options ? await fetch(url, options) : await fetch(url);
        if (!res.ok) throw res
        const json = await res.json()
        return json
    } catch (err) {
        const message = err.statusText || 'Error en el fetch';
        console.log(err)
        return `
            <div class='error'>
                <p>Error ${err.status}: ${message}</p>
            </div>
        `
    }
}