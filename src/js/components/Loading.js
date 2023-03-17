import { HtmlDocumentFragment } from "../assets/HtmlDFragment.js"

const d = document;

export default function Loading(scaleX=1, scaleY=1, color="#fff"){
    return {
        scaleX,
        scaleY,
        svg(){
            const { fragment } = new HtmlDocumentFragment(`
                <svg width="105" height="105" xmlns="http://www.w3.org/2000/svg" fill=${color}>
                    <use class="delete-svg" xlink:href="#loading-svg">
                </svg>
            `)
            fragment.firstElementChild.style.transform = `scale(${this.scaleX},${this.scaleY})`
            return fragment.firstElementChild
        },
        fullscreen(){
            const { fragment } = new HtmlDocumentFragment(`
                <div class="fullscreen">
                    <div class="modal">
                        <div class="content-modal">

                        </div>
                    </div>
                </div>
            `)
            fragment.querySelector('.content-modal').append(this.svg())
            return d.importNode(fragment, true)
        }
    }
}