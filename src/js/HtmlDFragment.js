class HtmlDocumentFragment{
    constructor(html=''){
        this.fragment = this.parseHTML(html)
    }

    parseHTML(html){
        const template = document.createElement('template');
        template.innerHTML = html
        return template.content
    }

    async fetchHTML(url){
        const res = await fetch(url),
            data = await res.text()
        return this.parseHTML(data)
    }
}

export {HtmlDocumentFragment}