import Task from "./Task";

class LocalStorage {

    constructor(private listTasks:Task[]) {

    }

    public static createTask(task:Task):Task {
        let allTasks : any = localStorage.getItem("tasks");
        allTasks = JSON.parse(allTasks);
        allTasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(allTasks));
        return task;
    }

    public static selectAll():Task[] {
        let allTasks : any = localStorage.getItem("tasks");
        allTasks = JSON.parse(allTasks);
        return allTasks;
    }

    public static deleteTask(task:Task):number {
        let allTasks : any = localStorage.getItem("tasks");
        allTasks = JSON.parse(allTasks);
        console.log('deleteTask');
        console.log(task);
        console.log('task.id');
        console.log(task.id);
        console.log('allTasks');
        console.log(allTasks);
        allTasks = allTasks.filter((t:Task) => t.id !== task.id);
        console.log('allTasks V2');
        console.log(allTasks);
        localStorage.setItem("tasks", JSON.stringify(allTasks));
        return task.id;
    }

    public static deleteAllTask():void {

    }

    public static updateTask(task:Task):void {

    }
 
}

export default LocalStorage;