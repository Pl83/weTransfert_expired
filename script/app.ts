import Category from "./Category.js";
import Task from "./Task.js";
import LocalStorage from "./LocalStorage.js";

try {
    localStorage.getItem("tasks");
    if (!localStorage.getItem("tasks")) {
        localStorage.setItem("tasks", JSON.stringify([]));
        let task1 : Task = new Task("Tache n°1", "blabla", "2022-01-01","high",new Category("cat1"));
        let task2 : Task = new Task("Tache n°2", "bddlabla", "2022-01-01","medium",new Category("cat1"));
        let task3 : Task = new Task("Tache n°3", "blabzzza", "2022-04-21","medium",new Category("cat2"));
        let task4 : Task = new Task("Tache n°4", "truc", "2022-12-21","low",new Category("cat2"));

        task1.createTask();
        task2.createTask();
        task3.createTask();
        task4.createTask();
    }
} catch (e) {
    console.error(e);
}

function displayTasks(array : any) {
    const container = (<HTMLInputElement>document.getElementById("tasks"));
    // console.log('displayTasks');
    // console.log(array);
    // console.log(array[0]);
    // console.log(array[0]._titre);
    array = array.reverse();
    let content : string = "";
    array.forEach((task : any) => {
        content += `<div class="task ${task._level}">
        <h3>${task._titre} <span>– Priorité ${task._level}</span></h3>
        <p>Date d'échéance: ${task._date}</p>
        <p>${task._description}</p>
        <button class="delete ${task.id}" type="button">Supprimer</button>
        <button class="edit-btn ${task.id}">Modifier</button>
        </div>`;
    });
    // console.log(content);
    // console.log('container');
    // console.log(container);
    container.innerHTML = content;

    // CAPTER L'ÉVÉNEMENT JE SUPPRIME UNE TACHE

    let deleteButtons = (<HTMLCollection>document.getElementsByClassName("delete"));
    if (deleteButtons) {
        for (let i = 0; i < deleteButtons.length; i++) {
            deleteButtons[i].addEventListener("click", (e) => {
                let id : number = parseInt(deleteButtons[i].classList[1]);
                // console.log('id to delete :');
                // console.log(id);
                // console.log(typeof id);
                //id.deleteTask(); // J'ai pas réussi a faire fonctionner la méthode deleteTask j'ai une erreur Property 'deleteTask' does not exist on type 'number'
                let tasks = LocalStorage.selectAll();
                tasks = tasks.filter((t : Task) => t.id !== id);
                localStorage.setItem("tasks", JSON.stringify(tasks));
                // console.log('Current tasks :');
                // console.log(tasks);
                displayTasks(tasks);
            });
        }
    }

    // CAPTER L'ÉVENEMENT JE MODIFIE UNE TACHE

    let editButtons = (<HTMLCollection>document.getElementsByClassName("edit-btn"));
    if (editButtons) {
        for (let i = 0; i < editButtons.length; i++) {
            editButtons[i].addEventListener("click", (e) => {
                let id : number = parseInt(editButtons[i].classList[1]);
                let tasks = LocalStorage.selectAll();
                let task = tasks.filter((t : Task) => t.id === id);
                (<HTMLInputElement>document.getElementById("taskTitle")).value = task[0]._titre;
                (<HTMLInputElement>document.getElementById("taskDescription")).value = task[0]._description;
                (<HTMLInputElement>document.getElementById("taskDueDate")).value = task[0]._date;
                (<HTMLInputElement>document.getElementById("taskPriority")).value = task[0]._level;
                (<HTMLInputElement>document.getElementById("taskCat")).value = task[0]._category._titre;
                tasks = tasks.filter((t : Task) => t.id !== id);
                localStorage.setItem("tasks", JSON.stringify(tasks));
                displayTasks(tasks);
            });
        
        }
    }
}
/// CRUD

    // ON PAGE LOAD RÉCUPÉRER TOUTES LES TACHES DANS LE LOCALSTORAGE
    let tasks = LocalStorage.selectAll();
    // console.log('Current tasks :');
    // console.log(tasks);
    displayTasks(tasks);

    // CAPTER L'ÉVÉNEMENT AJOUTER UNE TACHE
    let taskForm = document.getElementById("taskForm");
    if (taskForm) {
        taskForm.addEventListener("submit", (e) => {
            e.preventDefault();
            let titre = (<HTMLInputElement>document.getElementById("taskTitle")).value;
            let description = (<HTMLInputElement>document.getElementById("taskDescription")).value;
            let date = (<HTMLInputElement>document.getElementById("taskDueDate")).value;
            let level = (<HTMLInputElement>document.getElementById("taskPriority")).value;
            let category = (<HTMLInputElement>document.getElementById("taskCat")).value;
            //console.log(titre, description, date, level, category);
            let task : Task = new Task(titre, description, date, level, new Category(category));
            // console.log(task);
            task.createTask();
            let tasks = LocalStorage.selectAll();
            // console.log('Current tasks :');
            // console.log(tasks);
            displayTasks(tasks);
        });
    }


// J'APPLIQUE UN FILTRE
let applyFilter = document.getElementById("applyFilter");
if (applyFilter) {
    applyFilter.addEventListener("click", (e) => {
        e.preventDefault();
        let filterPriority = (<HTMLInputElement>document.getElementById("filterPriority")).value;
        let filterDate = (<HTMLInputElement>document.getElementById("filterDate")).value;
        let task :any = (<HTMLCollection>document.getElementsByClassName("task"));
        // console.log(filterPriority, filterDate);
        // console.log(task);
        let i = 0;
        for (i = 0; i < task.length; i++) {
            if (filterPriority === "all" && filterDate === "") {
                task[i].style.display = "block";
            } else if (filterPriority === "all" && filterDate !== "") {
                if (task[i].children[1].innerText.includes(filterDate)) {
                    task[i].style.display = "block";
                } else {
                    task[i].style.display = "none";
                }
            } else if (filterPriority !== "all" && filterDate === "") {
                if (task[i].classList.contains(filterPriority)) {
                    task[i].style.display = "block";
                } else {
                    task[i].style.display = "none";
                }
            } else {
                if (task[i].classList.contains(filterPriority) && task[i].children[1].innerText.includes(filterDate)) {
                    task[i].style.display = "block";
                } else {
                    task[i].style.display = "none";
                }
            }
        }

    });
}


// JE FAIS UNE RECHERCHE

let searchButton = (<HTMLInputElement>document.getElementById("searchButton"));

if (searchButton) {
    searchButton.addEventListener("click", (e) => {
        e.preventDefault();
        let searchValue = (<HTMLInputElement>document.getElementById("searchInput")).value;
        let task :any = (<HTMLCollection>document.getElementsByClassName("task"));
        // console.log(searchValue);
        // console.log(task);
        let i = 0;
        for (i = 0; i < task.length; i++) {
            if (task[i].children[0].innerText.includes(searchValue) || task[i].children[2].innerText.includes(searchValue)) {
                task[i].style.display = "block";
            } else {
                task[i].style.display = "none";
            }
        }
    });
}

