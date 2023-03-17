const d = document;
function Row(){
    return {
        row: d.createElement('tr'),
        columns(n=0){
            let i = 0;
            while(i<n){
                i++
                this.row.append(d.createElement('td'))
            }
            return {
                template: this.row,
                templateWithData(data){
                    Object.values(data).forEach((el, i)=>{
                        if (el.type === 'html') return this.template.children[i].innerHTML = el.content 
                        if (this.template.children[i]) this.template.children[i].textContent = el 
                    })
                    const clone = d.importNode(this.template, true)
                    Array.from(this.template.children).forEach(el=>{
                        el.textContent = ''
                    })
                    return clone
                },
                templateWithManyData(data){
                    const fragment = d.createDocumentFragment()
                    data.map(x=>{
                        const clone = this.templateWithData(x)
                        fragment.append(clone)
                    });
                    return fragment
                }
            }
        },
        
    }
}

export default Row