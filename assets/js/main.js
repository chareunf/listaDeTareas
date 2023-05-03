const btn = document.querySelector(".btn-agregar")
const divLista = document.querySelector(".lista-tarea")
const texto = document.querySelector(".tarea")
const template = document.querySelector("template").content
const fragment = document.createDocumentFragment()

let tareas = []


btn.addEventListener("click", () => {
    setTarea()
})

divLista.addEventListener("click", e => {
    btnAccion(e)

})

function setTarea() {
    const tarea = {
        id: Date.now(),
        texto: texto.value,
        estado: false
    }
    tareas.push(tarea)
    texto.value = ""

    mostrarTarea()

}

function mostrarTarea() {
    divLista.textContent = "" //o innerHTML
    tareas.forEach(tarea => {
        let clone = template.cloneNode(true)

        clone.querySelector(".nombre-tarea").textContent = (!tarea.estado)?tarea.texto:`${tarea.texto}  OK`
        
        clone.querySelector(".check").setAttribute("id", tarea.id)
        //clone.querySelector(".check").dataset.name=tarea.texto
        clone.querySelector(".delete").setAttribute("id", tarea.id)
        fragment.appendChild(clone)
    })
    divLista.appendChild(fragment)
}


function btnAccion(e) {
    e.preventDefault()

    const ID = Number(e.target.id)
    
    //console.log(e.target.className.contains("check"))
    if (e.target.classList.contains("check")) {
       //console.log(e.target.classList)
       const checkIndex = tareas.map(tarea=>{
        //console.log(tarea)
        if(tarea.id===ID){
            return tarea.estado=!tarea.estado
        }
        return
       })
       
    }

    if (e.target.classList.contains("delete")) {
        // console.log("diste click en deleteeeeee")

        const deleteIndex = tareas.map(nombre=> nombre.id).indexOf(ID)
        //console.log(deleteIndex)
        
        tareas.splice(deleteIndex,1)
    }
    mostrarTarea()
}