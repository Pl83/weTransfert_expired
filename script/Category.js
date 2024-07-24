var Category = /** @class */ (function () {
    function Category(_titre) {
        this._titre = _titre;
        this.id = Date.now();
    }
    Object.defineProperty(Category.prototype, "titre", {
        get: function () {
            return this._titre;
        },
        enumerable: false,
        configurable: true
    });
    return Category;
}());
export default Category;
