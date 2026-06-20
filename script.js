// CLOCK

function updateDateTime() {
    const now = new Date();

    document.getElementById("clock").textContent =
        now.toLocaleTimeString();

    document.getElementById("date").textContent =
        now.toDateString();

    const hour = now.getHours();

    const name =
        localStorage.getItem("username") || "User";

    let greet = "Good Evening";

    if(hour >= 5 && hour < 12)
        greet = "Good Morning";
    else if(hour < 18)
        greet = "Good Afternoon";

    document.getElementById(
        "greeting"
    ).textContent = `${greet}, ${name}`;
}

setInterval(updateDateTime,1000);
updateDateTime();


// NAME

document.getElementById("saveName")
.addEventListener("click",()=>{

const name =
document.getElementById("username").value;

localStorage.setItem("username",name);

updateDateTime();
});


// THEME

const themeBtn =
document.getElementById("themeToggle");

if(localStorage.getItem("theme")==="dark"){
document.body.classList.add("dark");
}

themeBtn.addEventListener("click",()=>{

document.body.classList.toggle("dark");

localStorage.setItem(
"theme",
document.body.classList.contains("dark")
? "dark"
: "light"
);
});


// TIMER

let time = 1500;
let interval;

function displayTimer(){
let minutes = Math.floor(time/60);
let seconds = time%60;

document.getElementById("timer")
.textContent =
`${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;
}

displayTimer();

document.getElementById("startBtn")
.onclick=()=>{

interval=setInterval(()=>{
if(time>0){
time--;
displayTimer();
}
},1000);

};

document.getElementById("stopBtn")
.onclick=()=>clearInterval(interval);

document.getElementById("resetBtn")
.onclick=()=>{
clearInterval(interval);
time=1500;
displayTimer();
};


// TASKS

let tasks =
JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks(){

const list =
document.getElementById("taskList");

list.innerHTML="";

tasks.forEach((task,index)=>{

const li=document.createElement("li");

li.innerHTML=`
<span class="${task.done ? "completed":""}">
${task.text}
</span>

<div>
<button onclick="toggleTask(${index})">✓</button>
<button onclick="deleteTask(${index})">🗑</button>
</div>
`;

list.appendChild(li);
});

localStorage.setItem(
"tasks",
JSON.stringify(tasks)
);
}

function toggleTask(index){
tasks[index].done=!tasks[index].done;
renderTasks();
}

function deleteTask(index){
tasks.splice(index,1);
renderTasks();
}

document.getElementById("addTask")
.onclick=()=>{

const input =
document.getElementById("taskInput");

const text=input.value.trim();

if(!text) return;

if(tasks.some(
t=>t.text.toLowerCase()===text.toLowerCase()
)){
alert("Task already exists!");
return;
}

tasks.push({
text,
done:false
});

input.value="";

renderTasks();
};

renderTasks();


// LINKS

let links =
JSON.parse(localStorage.getItem("links")) || [];

function renderLinks(){

const container =
document.getElementById("linksContainer");

container.innerHTML="";

links.forEach(link=>{

const a =
document.createElement("a");

a.href=link.url;
a.target="_blank";
a.textContent=link.name;

container.appendChild(a);
});

localStorage.setItem(
"links",
JSON.stringify(links)
);
}

document.getElementById("addLink")
.onclick=()=>{

const name =
document.getElementById("linkName").value;

const url =
document.getElementById("linkUrl").value;

if(!name || !url) return;

links.push({name,url});

renderLinks();
};

renderLinks();