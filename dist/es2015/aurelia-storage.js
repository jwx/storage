

export let Storage = class Storage {

    constructor() {
        this.sessionStorage = window.sessionStorage;
        this.localStorage = window.localStorage;

        this.pageStorage = {
            'storage': window.history,
            'setItem': (key, value) => {
                let state = Object.assign({}, this.pageStorage.storage.state);
                state[key] = value;
                this.pageStorage.storage.replaceState(state, null, null);
            },
            'getItem': key => {
                let state = Object.assign({}, this.pageStorage.storage.state);
                return state[key] === undefined ? null : state[key];
            },
            'removeItem': key => {
                let state = Object.assign({}, this.pageStorage.storage.state);
                delete state[key];
                this.pageStorage.storage.replaceState(state, null, null);
            },
            'clear': key => {
                this.pageStorage.storage.replaceState(null, null, null);
            }
        };

        this.stores = {
            '-session': { 'type': 'local', 'store': this.sessionStorage, 'json': false },
            '-local': { 'type': 'local', 'store': this.localStorage, 'json': false },
            '-page': { 'type': 'local', 'store': this.pageStorage, 'json': true }
        };
    }

    store(store, key, value, id) {
        let storage = this.stores[store];
        if (storage.type === 'local') {
            storage.store.setItem(key, storage.json ? value : JSON.stringify(value));
        }
    }

    retrieve(store, key, id) {
        let value;
        let storage = this.stores[store];
        if (storage.type === 'local') {
            value = storage.store.getItem(key);
        }
        if (!storage.json) {
            value = JSON.parse(value);
        }
        return value;
    }

    remove(store, key, id) {
        let storage = this.stores[store];
        if (storage.type === 'local') {
            storage.store.removeItem(key);
        }
    }

    clear(store) {
        let storage = this.stores[store];
        if (storage.type === 'local') {
            storage.store.clear();
        }
    }
};