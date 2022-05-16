
const jsFetch = {

    /*
        CURRENT OPTIONS
        url: String,
        renderTarget: HTML Element,
    */
    putAndRender: async (options) => {
        const repsonse = await fetch(options.url, {
            method: "PUT",
        })
        let data = await repsonse.json()
        options.renderTarget.innerText =  String(data.cost)
    },

    /*
        CURRENT OPTIONS
        url: String,
        elements: {HTML Elements},
        parent: HTML Element,
    */
    deleteAndRemove: async (options) => {
        const response = await fetch(options.url, {
            method: "DELETE",
        })
        let data = await response.json()
        Object.values(options.elements).forEach(element => {
            element.remove()
        })
        if (options.parent.children.length == 0){
            options.parent.remove()
        }
    }

}