let tattoos =
JSON.parse(localStorage.getItem("tattoos")) || [];

function save(){
localStorage.setItem("tattoos",JSON.stringify(tattoos));
}

/* MODAL */
function openUpload(){
uploadModal.style.display="flex";
}

function closeUpload(){
uploadModal.style.display="none";
}

/* UPLOAD */
function uploadTattoo(){

tattoos.unshift({
artist:artist.value,
image:image.value,
category:category.value,
likes:0,
comments:[]
});

save();
render();
closeUpload();
}

/* FILTER */
let currentFilter="all";

function filterTattoo(cat){
currentFilter=cat;
render();
}

/* LIKE */
function likeTattoo(i){
tattoos[i].likes++;
save();
render();
}

/* COMMENT */
function addComment(i,input){

if(input.value==="") return;

tattoos[i].comments.push(input.value);
input.value="";

save();
render();
}

/* RENDER */
function render(){

gallery.innerHTML="";

tattoos.forEach((t,i)=>{

if(currentFilter!=="all" && t.category!==currentFilter)
return;

let comments=t.comments
.map(c=>`<div>💬 ${c}</div>`)
.join("");

gallery.innerHTML+=`
<div class="card">
<img src="${t.image}">
<div class="info">

<b>${t.artist}</b>

<div class="like"
onclick="likeTattoo(${i})">
❤️ ${t.likes}
</div>

${comments}

<input class="comment-box"
placeholder="Add comment..."
onkeydown="if(event.key==='Enter')addComment(${i},this)">
</div>
</div>
`;
});
}

render();