var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var ObjectWrapper = /** @class */ (function () {
    /***
     * 引数のオブジェクトのコピーを this._objに設定
     */
    function ObjectWrapper(_obj) {
        this._obj = __assign({}, _obj);
    }
    Object.defineProperty(ObjectWrapper.prototype, "obj", {
        /**
         * this._objのコピーを返却
         * @return Object
         */
        get: function () {
            return __assign({}, this._obj);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * this._obj[key] に valを設定。keyがthis._objに存在しない場合、falseを返却
     * @param key オブジェクトのキー
     * @param val オブジェクトの値
     */
    ObjectWrapper.prototype.set = function (key, val) {
        if (!this._obj.hasOwnProperty(key))
            return false;
        this._obj[key] = val;
        return true;
    };
    /**
     * 指定したキーの値のコピーを返却
     * 指定のキーが存在しない場合 undefinedを返却
     * @param key オブジェクトのキー
     */
    ObjectWrapper.prototype.get = function (key) {
        return this._obj[key];
    };
    /**
     * 指定した値を持つkeyの配列を返却。該当のものがなければ空の配列を返却。
     */
    ObjectWrapper.prototype.findKeys = function (val) {
        var _this = this;
        if (typeof val !== 'string')
            return [];
        return Object.keys(this._obj).filter(function (key) { return _this._obj[key] === val; });
    };
    return ObjectWrapper;
}());
/**
 * check script
 * 完成したら、以下のスクリプトがすべてOKになる。
 */
var obj1 = { a: '01', b: '02' };
var wrappedObj1 = new ObjectWrapper(obj1);
if (wrappedObj1.obj.a === '01') {
    console.log('OK: get obj()');
}
else {
    console.error('NG: get obj()');
}
if (wrappedObj1.set('c', '03') === false &&
    wrappedObj1.set('b', '04') === true &&
    wrappedObj1.obj.b === '04') {
    console.log('OK: set(key, val)');
}
else {
    console.error('NG: set(key, val)');
}
if (wrappedObj1.get('b') === '04' && wrappedObj1.get('c') === undefined) {
    console.log('OK: get(key)');
}
else {
    console.error('NG: get(key)');
}
var obj2 = { a: '01', b: '02', bb: '02', bbb: '02' };
var wrappedObj2 = new ObjectWrapper(obj2);
var keys = wrappedObj2.findKeys('02');
if (wrappedObj2.findKeys('03').length === 0 &&
    keys.includes('b') &&
    keys.includes('bb') &&
    keys.includes('bbb') &&
    keys.length === 3) {
    console.log('OK: findKeys(val)');
}
else {
    console.error('NG: findKeys(val)');
}
