import Category from "./Category.js";
import Task from "./Task.js";
import LocalStorage from "./LocalStorage.js";
try {
    localStorage.getItem("tasks");
    if (!localStorage.getItem("tasks")) {
        localStorage.setItem("tasks", JSON.stringify([]));
        var task1 = new Task("Tache n°1", "blabla", "2022-01-01", "high", new Category("cat1"));
        var task2 = new Task("Tache n°2", "bddlabla", "2022-01-01", "medium", new Category("cat1"));
        var task3 = new Task("Tache n°3", "blabzzza", "2022-04-21", "medium", new Category("cat2"));
        var task4 = new Task("Tache n°4", "truc", "2022-12-21", "low", new Category("cat2"));
        task1.createTask();
        task2.createTask();
        task3.createTask();
        task4.createTask();
    }
}
catch (e) {
    console.error(e);
}
function displayTasks(array) {
    var container = document.getElementById("tasks");
    // console.log('displayTasks');
    // console.log(array);
    // console.log(array[0]);
    // console.log(array[0]._titre);
    array = array.reverse();
    var content = "";
    array.forEach(function (task) {
        content += "<div class=\"task ".concat(task._level, "\">\n        <h3>").concat(task._titre, " <span>\u2013 Priorit\u00E9 ").concat(task._level, "</span></h3>\n        <p>Date d'\u00E9ch\u00E9ance: ").concat(task._date, "</p>\n        <p>").concat(task._description, "</p>\n        <button class=\"delete ").concat(task.id, "\" type=\"button\">Supprimer</button>\n        <button class=\"edit-btn ").concat(task.id, "\">Modifier</button>\n        </div>");
    });
    // console.log(content);
    // console.log('container');
    // console.log(container);
    container.innerHTML = content;
    // CAPTER L'ÉVÉNEMENT JE SUPPRIME UNE TACHE
    var deleteButtons = document.getElementsByClassName("delete");
    if (deleteButtons) {
        var _loop_1 = function (i) {
            deleteButtons[i].addEventListener("click", function (e) {
                var id = parseInt(deleteButtons[i].classList[1]);
                // console.log('id to delete :');
                // console.log(id);
                // console.log(typeof id);
                //id.deleteTask(); // J'ai pas réussi a faire fonctionner la méthode deleteTask j'ai une erreur Property 'deleteTask' does not exist on type 'number'
                var tasks = LocalStorage.selectAll();
                tasks = tasks.filter(function (t) { return t.id !== id; });
                localStorage.setItem("tasks", JSON.stringify(tasks));
                // console.log('Current tasks :');
                // console.log(tasks);
                displayTasks(tasks);
            });
        };
        for (var i = 0; i < deleteButtons.length; i++) {
            _loop_1(i);
        }
    }
    // CAPTER L'ÉVENEMENT JE MODIFIE UNE TACHE
    var editButtons = document.getElementsByClassName("edit-btn");
    if (editButtons) {
        var _loop_2 = function (i) {
            editButtons[i].addEventListener("click", function (e) {
                var id = parseInt(editButtons[i].classList[1]);
                var tasks = LocalStorage.selectAll();
                var task = tasks.filter(function (t) { return t.id === id; });
                document.getElementById("taskTitle").value = task[0]._titre;
                document.getElementById("taskDescription").value = task[0]._description;
                document.getElementById("taskDueDate").value = task[0]._date;
                document.getElementById("taskPriority").value = task[0]._level;
                document.getElementById("taskCat").value = task[0]._category._titre;
                tasks = tasks.filter(function (t) { return t.id !== id; });
                localStorage.setItem("tasks", JSON.stringify(tasks));
                displayTasks(tasks);
            });
        };
        for (var i = 0; i < editButtons.length; i++) {
            _loop_2(i);
        }
    }
}
/// CRUD
// ON PAGE LOAD RÉCUPÉRER TOUTES LES TACHES DANS LE LOCALSTORAGE
var tasks = LocalStorage.selectAll();
// console.log('Current tasks :');
// console.log(tasks);
displayTasks(tasks);
// CAPTER L'ÉVÉNEMENT AJOUTER UNE TACHE
var taskForm = document.getElementById("taskForm");
if (taskForm) {
    taskForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var titre = document.getElementById("taskTitle").value;
        var description = document.getElementById("taskDescription").value;
        var date = document.getElementById("taskDueDate").value;
        var level = document.getElementById("taskPriority").value;
        var category = document.getElementById("taskCat").value;
        //console.log(titre, description, date, level, category);
        var task = new Task(titre, description, date, level, new Category(category));
        // console.log(task);
        task.createTask();
        var tasks = LocalStorage.selectAll();
        // console.log('Current tasks :');
        // console.log(tasks);
        displayTasks(tasks);
    });
}
// J'APPLIQUE UN FILTRE
var applyFilter = document.getElementById("applyFilter");
if (applyFilter) {
    applyFilter.addEventListener("click", function (e) {
        e.preventDefault();
        var filterPriority = document.getElementById("filterPriority").value;
        var filterDate = document.getElementById("filterDate").value;
        var task = document.getElementsByClassName("task");
        // console.log(filterPriority, filterDate);
        // console.log(task);
        var i = 0;
        for (i = 0; i < task.length; i++) {
            if (filterPriority === "all" && filterDate === "") {
                task[i].style.display = "block";
            }
            else if (filterPriority === "all" && filterDate !== "") {
                if (task[i].children[1].innerText.includes(filterDate)) {
                    task[i].style.display = "block";
                }
                else {
                    task[i].style.display = "none";
                }
            }
            else if (filterPriority !== "all" && filterDate === "") {
                if (task[i].classList.contains(filterPriority)) {
                    task[i].style.display = "block";
                }
                else {
                    task[i].style.display = "none";
                }
            }
            else {
                if (task[i].classList.contains(filterPriority) && task[i].children[1].innerText.includes(filterDate)) {
                    task[i].style.display = "block";
                }
                else {
                    task[i].style.display = "none";
                }
            }
        }
    });
}
// JE FAIS UNE RECHERCHE
var searchButton = document.getElementById("searchButton");
if (searchButton) {
    searchButton.addEventListener("click", function (e) {
        e.preventDefault();
        var searchValue = document.getElementById("searchInput").value;
        var task = document.getElementsByClassName("task");
        // console.log(searchValue);
        // console.log(task);
        var i = 0;
        for (i = 0; i < task.length; i++) {
            if (task[i].children[0].innerText.includes(searchValue) || task[i].children[2].innerText.includes(searchValue)) {
                task[i].style.display = "block";
            }
            else {
                task[i].style.display = "none";
            }
        }
    });
}
