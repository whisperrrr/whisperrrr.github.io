window.onload = function() {
  //读取数据库并初始化
  var todoList = document.getElementById("todo-list");
  var active = getData("activeData");
  var flag = "all";
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
  showTodoList(all,todoList);
  //添加todolist并保存数据
  var textInput = document.getElementsByClassName("text-input")[0];
  var addButton = document.getElementsByClassName("pink-button")[0];
  addButton.onclick = function () {
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
  //改变todolist的状态并保存
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
  //all,active,complete页面转换
  var footer = document.getElementById("footer");
  footer.addEventListener("click",function (event) {
    var taskType = event.target.value;
    taskType = taskType.toLowerCase();
    if (taskType === "active") {
      showTodoList(active,todoList);
      flag = "active";
    }else if (taskType === "complete") {
      showTodoList(complete,todoList);
      flag = "complete";
    }else {
      showTodoList(all,todoList);
      flag = "all";
    }         
  })
  //展示数据库里的todolist列表
  function showTodoList(data,list) {
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
          newList.style.color = "gray";
          newList.firstElementChild.setAttribute("checked","checked");
        }
        else {
          delete newList.firstElementChild.checked;
        }
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
}