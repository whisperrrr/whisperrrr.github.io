var todoList = document.getElementById("todo-list");
var flag = "all";
//读取数据库并初始化
var active = getData("activeData");
if (!active) {
  active = {};
}
var complete = getData("completeData");
if (!complete) {
  complete = {};
}
var all = getData("allData");
if (!all) {
  all = {};
}      
window.onload = function() {
  showTodoList(all,todoList);
  addTodoList();
  changeTodoListStatus();
  shiftTodoList();
}
//添加todolist并保存数据
function addTodoList() {
var textInput = document.getElementsByClassName("text-input")[0];
var addButton = document.getElementsByClassName("pink-button")[0];
addButton.onclick = addTodo;
document.onkeydown = function (event) {
  if (event && event.keyCode == 13) {
    addTodo();
  }
}
function addTodo() {
  var textInputValue = textInput.value;
  if (textInputValue) {
    if (flag === "all") {
      all[textInputValue] = 0;
      active[textInputValue] = 0;
      showTodoList(all,todoList);
      saveData("allData",all);
      saveData("activeData",active);
    }else if (flag === "active"){
      all[textInputValue] = 0;
      active[textInputValue] = 0;
      showTodoList(active,todoList);
      saveData("allData",all);
      saveData("activeData",active);
    }else {
      showTodoList(complete,todoList);
    }
    textInput.value = "";
  }  
}
}
//改变todolist的状态并保存
function changeTodoListStatus() {
  var listContent =document.getElementById("list-content");
  listContent.addEventListener("click",function (event) {
    var listClick = event.target;
    var listName = listClick.nextElementSibling.innerHTML;
    if (listClick.checked) {
      delete active[listName];
      complete[listName] = 1;
      all[listName] = 1;
    }else {
      delete complete[listName];
      active[listName] = 0;
      all[listName] = 0;            
    }
    saveData("allData",all);
    saveData("activeData",active);  
    saveData("completeData",complete);  
    showTodoList(all,todoList);        
  });
}       
//all,active,complete页面转换
function shiftTodoList() {
  var footer = document.getElementById("footer");
  footer.addEventListener("click",function (event) {
    var taskType = event.target.value;
    taskType = taskType.toLowerCase();
    switch (taskType) {
      case "active":
        showTodoList(active,todoList);
        flag = "active";
        break;
      case "complete":
        showTodoList(complete,todoList);
        flag = "complete"; 
        break;     
      default:
        showTodoList(all,todoList);
        flag = "all";               
    }      
  })
}
//展示数据库里的todolist列表
function showTodoList(data,list) {
  var grayBackground = false;
  list.innerHTML = "";
  if (data) {
    for (var keys in data) {
      var newList = document.createElement("li");
      var listText = keys;
      var listStatus = data[keys];                  
      newList.innerHTML = 
        '<input type="checkbox"  />' + 
        '<span>' + 
        listText +
        '</span>';
      if (listStatus) {
        newList.style.textDecoration = "line-through";
        newList.style.color = "rgb(128, 128, 128)";
        newList.firstElementChild.setAttribute("checked","checked");
      }else {
        delete newList.firstElementChild.checked;
      }
      if (grayBackground) {
        newList.style.backgroundColor = "rgb(244, 236, 236)";  
      }
      grayBackground = !grayBackground;
      list.appendChild(newList);
    }
  }
}
//获取本地存储数据
function getData(type) {
  return JSON.parse(localStorage.getItem(type));
}
//保存本地的数据
function saveData(type,data) {
  window.localStorage.setItem(type,JSON.stringify(data));
}