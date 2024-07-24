var LocalStorage = /** @class */ (function () {
    function LocalStorage(listTasks) {
        this.listTasks = listTasks;
    }
    LocalStorage.createTask = function (task) {
        var allTasks = localStorage.getItem("tasks");
        allTasks = JSON.parse(allTasks);
        allTasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(allTasks));
        return task;
    };
    LocalStorage.selectAll = function () {
        var allTasks = localStorage.getItem("tasks");
        allTasks = JSON.parse(allTasks);
        return allTasks;
    };
    LocalStorage.deleteTask = function (task) {
        var allTasks = localStorage.getItem("tasks");
        allTasks = JSON.parse(allTasks);
        console.log('deleteTask');
        console.log(task);
        console.log('task.id');
        console.log(task.id);
        console.log('allTasks');
        console.log(allTasks);
        allTasks = allTasks.filter(function (t) { return t.id !== task.id; });
        console.log('allTasks V2');
        console.log(allTasks);
        localStorage.setItem("tasks", JSON.stringify(allTasks));
        return task.id;
    };
    LocalStorage.deleteAllTask = function () {
    };
    LocalStorage.updateTask = function (task) {
    };
    return LocalStorage;
}());
export default LocalStorage;
