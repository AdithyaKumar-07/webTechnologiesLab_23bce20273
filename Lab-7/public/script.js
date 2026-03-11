const API="http://localhost:3000/notes"

function addNote(){

const title=document.getElementById("title").value
const subject=document.getElementById("subject").value
const description=document.getElementById("description").value

fetch(API,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({title,subject,description})
})
.then(()=>getNotes())

}

function getNotes(){

fetch(API)
.then(res=>res.json())
.then(data=>{

let output=""

data.forEach(note=>{

output+=`
<div>
<h3>${note.title}</h3>
<p>${note.subject}</p>
<p>${note.description}</p>

<button onclick="deleteNote('${note._id}')">Delete</button>

</div>
<hr>
`

})

document.getElementById("notes").innerHTML=output

})

}

function deleteNote(id){

fetch(API+"/"+id,{
method:"DELETE"
})
.then(()=>getNotes())

}

getNotes()