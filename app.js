initStreak();

function initStreak(){
let today=new Date().toDateString();
let last=localStorage.getItem('lastVisit');
let streak=parseInt(localStorage.getItem('streak')||0);

if(last!==today){
  streak++;
  localStorage.setItem('streak',streak);
  localStorage.setItem('lastVisit',today);
}

document.getElementById('streak').innerText=streak;
}

function show(type){
let html='';

if(type==='currency'){
html=`
<h3>تحويل الدولار إلى دينار</h3>
<input id="usd" placeholder="USD">
<button onclick="convert()">تحويل</button>
<div id="res"></div>`;
}

if(type==='calc'){
html=`
<h3>آلة حاسبة</h3>
<input id="exp" placeholder="5+5">
<button onclick="calc()">احسب</button>
<div id="res"></div>`;
}

if(type==='notes'){
html=`
<h3>ملاحظات</h3>
<input id="note">
<button onclick="saveNote()">حفظ</button>
<div id="notesList"></div>`;
setTimeout(loadNotes,100);
}

if(type==='time'){
html=`<h3>الوقت</h3><div id="clock"></div>`;
setInterval(()=>{
let now=new Date();
document.getElementById('clock').innerText=now.toLocaleString();
},1000);
}

if(type==='todo'){
html=`
<h3>مهامي اليومية</h3>
<input id="taskInput" placeholder="مهمة جديدة">
<button onclick="addTask()">إضافة</button>
<div id="taskList"></div>`;
setTimeout(loadTasks,100);
}

document.getElementById('tool').innerHTML=html;
}

function convert(){
let usd=document.getElementById('usd').value;
document.getElementById('res').innerText=(usd*1300)+' IQD';
}

function calc(){
try{
let exp=document.getElementById('exp').value;
document.getElementById('res').innerText=eval(exp);
}catch{
document.getElementById('res').innerText='خطأ';
}
}

function saveNote(){
let note=document.getElementById('note').value;
let notes=JSON.parse(localStorage.getItem('notes')||'[]');
notes.push(note);
localStorage.setItem('notes',JSON.stringify(notes));
loadNotes();
}

function loadNotes(){
let notes=JSON.parse(localStorage.getItem('notes')||'[]');
let html='';
notes.forEach(n=> html+=`<p>• ${n}</p>`);
document.getElementById('notesList').innerHTML=html;
}

function addTask(){
let t=document.getElementById('taskInput').value;
let tasks=JSON.parse(localStorage.getItem('tasks')||'[]');
tasks.push(t);
localStorage.setItem('tasks',JSON.stringify(tasks));
loadTasks();
}

function loadTasks(){
let tasks=JSON.parse(localStorage.getItem('tasks')||'[]');
let html='';
tasks.forEach(t=> html+=`<div class="task">✅ ${t}</div>`);
document.getElementById('taskList').innerHTML=html;
}
