import ICategory from "./ICategory";

class Category implements ICategory{

    private id:number;

    constructor(readonly _titre:string){
        this.id = Date.now();
        
    }

    get titre():string {
        return this._titre;
    }

}

export default Category;