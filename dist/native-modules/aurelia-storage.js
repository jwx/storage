

var Storage = function () {
    function Storage() {
        var _this = this;

        

        this.sessionStorage = window.sessionStorage;
        this.localStorage = window.localStorage;

        this.pageStorage = {
            'storage': window.history,
            'setItem': function setItem(key, value) {
                var state = Object.assign({}, _this.pageStorage.storage.state);
                state[key] = value;
                _this.pageStorage.storage.replaceState(state, null, null);
            },
            'getItem': function getItem(key) {
                var state = Object.assign({}, _this.pageStorage.storage.state);
                return state[key] === undefined ? null : state[key];
            },
            'removeItem': function removeItem(key) {
                var state = Object.assign({}, _this.pageStorage.storage.state);
                delete state[key];
                _this.pageStorage.storage.replaceState(state, null, null);
            },
            'clear': function clear(key) {
                _this.pageStorage.storage.replaceState(null, null, null);
            }
        };

        this.stores = {
            '-session': { 'type': 'local', 'store': this.sessionStorage, 'json': false },
            '-local': { 'type': 'local', 'store': this.localStorage, 'json': false },
            '-page': { 'type': 'local', 'store': this.pageStorage, 'json': true }
        };
    }

    Storage.prototype.store = function store(_store, key, value, id) {
        var storage = this.stores[_store];
        if (storage.type === 'local') {
            storage.store.setItem(key, storage.json ? value : JSON.stringify(value));
        }
    };

    Storage.prototype.retrieve = function retrieve(store, key, id) {
        var value = void 0;
        var storage = this.stores[store];
        if (storage.type === 'local') {
            value = storage.store.getItem(key);
        }
        if (!storage.json) {
            value = JSON.parse(value);
        }
        return value;
    };

    Storage.prototype.remove = function remove(store, key, id) {
        var storage = this.stores[store];
        if (storage.type === 'local') {
            storage.store.removeItem(key);
        }
    };

    Storage.prototype.clear = function clear(store) {
        var storage = this.stores[store];
        if (storage.type === 'local') {
            storage.store.clear();
        }
    };

    return Storage;
}();

export { Storage };