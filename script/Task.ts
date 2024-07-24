import Category from './Category';
import ITask from './ITask';
import LocalStorage from './LocalStorage.js';

class Task implements ITask{

    readonly id:number;

    constructor(readonly _titre:string, readonly _description:string, readonly _date:string, readonly _level:string, readonly _category:Category){
        this.id = Date.now();
        
    }

    createTask(){
        try {
            LocalStorage.createTask(this);
        } catch (error) {
            console.error(error);
        }
    }

    deleteTask(){
        try {
            LocalStorage.deleteTask(this);
        } catch (error) {
            console.error(error);
        }
    }

    modifyTask(){
        try {
            LocalStorage.updateTask(this);
        } catch (error) {
            console.error(error);
        }
    }

    get titre():string {
        return this._titre;
    }

    get description():string {
        return this._description;
    }

    get date():string {
        return this._date;
    }

    get level():string {
        return this._level;
    }

    get category():Category {
        return this._category;
    }
}

export default Task;