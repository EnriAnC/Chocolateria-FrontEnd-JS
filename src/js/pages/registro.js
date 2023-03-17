import Loading from "../components/Loading.js";
import { ajax } from "../helpers/ajax.js";
import my_api from "../helpers/my_api.js";

const d = document;

async function ControladorRegistro(){

    contactFormValidations()

}

d.addEventListener('submit', async e=>{
    e.preventDefault()
    if (e.target.id === 'register-form'){
        
        await submmitAndDrawRegister(e)

    }   
})

async function submmitAndDrawRegister(e){
    const $response = d.querySelectorAll(".contact-form-response");
    const loader = Loading(0.5, 0.5, "#000").fullscreen()
    loader.firstElementChild.style.backgroundColor = "#fff"
    e.target.append(loader)
    const res = await submitRegister(e)
    e.target.removeChild(e.target.lastElementChild)
    if (res.code == 600){
        $response[0].classList.remove('display-none')
        setTimeout(() => { $response[0].classList.add("display-none") }, 3000); 
        // alert(`${res.msg}`)
    }
    else if (res.code == 601){
        $response[1].classList.remove('display-none')
        setTimeout(() => { $response[1].classList.add("display-none") }, 3000); 
        // alert(`${res.msg}`)
    } else {
        alert(res.usuario ? `Hola ${res.usuario}, te has registrado correctamente ` : res.msg )
        e.target.innerHTML = `
            <h3>Se ha registrado correctamente!</h3>
            <p>Se rediccionará a la pagina principal</p>
        `
        setTimeout(() => { location.href = '/' }, 500); 
    }
}

async function submitRegister(e){
    try {
        
        const data = await ajax({url:my_api.REGISTER, options:{
            method: 'POST',
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                usuario: e.target.usuario.value,
                email: e.target.email.value,
                password: e.target.password.value
            })
        }})
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
        return data
    }
}

function contactFormValidations(){
    const $form = d.querySelector(".contact-form"),
    $inputs = d.querySelectorAll(".contact-form [required]");
    console.log($inputs)

    $inputs.forEach(input =>{
        const $span = d.createElement("span");
        $span.id = input.name;
        $span.textContent = input.title;
        $span.classList.add("contact-form-error", "none")
        input.insertAdjacentElement("afterend", $span)
    });

    d.addEventListener("keyup", e => {
        if(e.target.matches(".contact-form [required]")){
            let $input = e.target,
            pattern = $input.pattern || $input.dataset.pattern;
            //console.log($input, pattern)
            if (pattern && $input.value != ""){
                console.log("input con Patron");
                let regex = new RegExp(pattern)
                return !regex.exec($input.value)
                ? d.getElementById($input.name).classList.add("is-active")
                : d.getElementById($input.name).classList.remove("is-active");
            }

            if (!pattern){
                console.log("input sin Patron")
                return $input.value === ""
                ? d.getElementById($input.name).classList.add("is-active")
                : d.getElementById($input.name).classList.remove("is-active");
            }
        }
    })

        
            
}

export default ControladorRegistro