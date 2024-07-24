import LocalStorage from './LocalStorage.js';
var Task = /** @class */ (function () {
    function Task(_titre, _description, _date, _level, _category) {
        this._titre = _titre;
        this._description = _description;
        this._date = _date;
        this._level = _level;
        this._category = _category;
        this.id = Date.now();
    }
    Task.prototype.createTask = function () {
        try {
            LocalStorage.createTask(this);
        }
        catch (error) {
            console.error(error);
        }
    };
    Task.prototype.deleteTask = function () {
        try {
            LocalStorage.deleteTask(this);
        }
        catch (error) {
            console.error(error);
        }
    };
    Task.prototype.modifyTask = function () {
        try {
            LocalStorage.updateTask(this);
        }
        catch (error) {
            console.error(error);
        }
    };
    Object.defineProperty(Task.prototype, "titre", {
        get: function () {
            return this._titre;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Task.prototype, "description", {
        get: function () {
            return this._description;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Task.prototype, "date", {
        get: function () {
            return this._date;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Task.prototype, "level", {
        get: function () {
            return this._level;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Task.prototype, "category", {
        get: function () {
            return this._category;
        },
        enumerable: false,
        configurable: true
    });
    return Task;
}());
export default Task;
