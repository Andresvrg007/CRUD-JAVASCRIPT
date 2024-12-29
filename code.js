//Global variables 
const d=document;
const $frament=d.createDocumentFragment();
const $cards=d.querySelector(".cards");
const $addBotton=d.querySelector(".add");
const $editBotton=d.querySelector(".edit");
const $inputText=d.querySelector(".text");

//I WILL USE FETCH HERE TO GET DATA FROM MY SERVE AND PUT IN MY HTML
let $contador=0;
//READ
const card=()=>{
    
    fetch('http://localhost:3000/usuarios')
    .then((res)=>{
        if(res.ok){ //If the asnwer is fine get the data
            return res.json()
        }else{ //Otherwise go to the catch section
            Promise.reject()
        }
    })
    .then((res)=>{
        res.forEach(e => {
            let $div=d.createElement('div');
            $div.innerHTML=` <div class="card">
                        <h3>${e.name}</h3>
                        <div>
                            <button class="$edit"data-id=${$contador+1}>Edit</button>
                            <button class="delete" data-id=${$contador+1}>Delete</button>
                        </div>`
                    $frament.appendChild($div)
                    $contador=$contador+1
        }); 
        

    $cards.appendChild($frament)})

        .catch((err)=>{
        console.log(err)
    })
    }

card()
// CLICK EVENTS ADD, DELETE, EDIT 

d.addEventListener("click",(e)=>{
  //ADD USER
  e.preventDefault();
    if(e.target == $addBotton){
        if($inputText.value===""){
            alert('INPUT EMPTY, PLEASE TRY AGAIN')
        }else{
            fetch('http://localhost:3000/usuarios', {
                method: 'POST', // Método HTTP
                headers: {
                    'Content-Type': 'application/json' // Tipo de contenido
                },
                body: JSON.stringify({id: `${$contador+1}` , name:$inputText.value}) // Convertir los datos a JSON
                
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error en la solicitud');
                    }
                    return response.json(); // Parsear la respuesta como JSON
                })
                .then(result => {
                    $contador++
                    alert('DATOS AGREGADOR SATIFACTORIAMENTE')
                })
                .catch(error => {
                    console.error('Error:', error);
                });
                
        }
    }
    
    



    //DELETE USER
    if(e.target.className == 'delete'){
       e.preventDefault()
        let $id=e.target.getAttribute("data-id")
        fetch(`http://localhost:3000/usuarios/${$id}`,{
            method: 'DELETE'
        }).then(response => {
            if (response.ok) {
                return response.json(); // O cualquier tipo de respuesta que el servidor devuelva
            }
            throw new Error('Error al eliminar el recurso');
        })
        .then(data => {
           
            alert('Recurso eliminado:'); // Maneja la respuesta del servidor
            card()
        })
        .catch(error => {
            console.error('Hubo un problema con la solicitud DELETE:', error);
        });
    }

    //EDIT USER
    
    if(e.target.className == '$edit'){
       $inputText.value=e.target.parentNode.parentNode.firstElementChild.textContent;
       $editBotton.dataset.id=`${e.target.getAttribute("data-id")}`;
      
       
       
        
    }
    
    if(e.target==$editBotton){
        e.preventDefault();
        let $text= $inputText.value;
        
        let $id=$editBotton.getAttribute("data-id")
        
        console.log($id)
        fetch(`http://localhost:3000/usuarios/${$id}`,{
            method:'PATCH', 
            headers: {
                'Content-Type': 'application/json' // Tipo de contenido
            },
            body:JSON.stringify({name:$text})
        })
        .then((res)=>{
            if(!res.ok) {
                throw new Error("ERROR EDITANDO DATOS")
            }
            return res.json()
        }).then((res)=>{
            console.log(res)
            
        }).catch((e)=>{
            console.log(e)
            alert('DATO EDITADO SACTIFACTORIAMENTE')
            card()
        })
       }
   
       

   


})