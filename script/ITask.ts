import Category from "./Category";

interface ITask {

     titre:string;
     description:string;
     date:string;
     level:string;
     category:Category;

    createTask():void;
    deleteTask():void;
    modifyTask():void;
}

export default ITask;