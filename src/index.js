// Jürgen Wenzel <jurgen@jwenzel.se> (2006-)
/**
* Storage
* 
* Implements a unified store and retrieve storage for local and remote stores
*  -page       The current active page in browser history
*  -session    The current browser session
*  -local      The local browser
*  -cookie     The domain cookie for the browser
*  -header     The headers to and from a domain server
*  'other'     Any other store (probably a remote server) added with addStore()
* 
* Dependencies:
*  replaceState polyfill (lte IE9)
*  Object.assign polyfill (IE)
*/

export class Storage {
    stores: any;
    sessionStorage: any;
    localStorage: any;
    pageStorage: any;

    constructor() {
        this.sessionStorage = window.sessionStorage;
        this.localStorage = window.localStorage;

        this.pageStorage = {
            'storage': window.history,
            'setItem': (key: string, value: any): void => {
                let state = Object.assign({}, this.pageStorage.storage.state);
                state[key] = value;
                this.pageStorage.storage.replaceState(state, null, null);
            },
            'getItem': (key: string): any => {
                let state = Object.assign({}, this.pageStorage.storage.state);
                return (state[key] === undefined ? null : state[key]);
            },
            'removeItem': (key: string): void => {
                let state = Object.assign({}, this.pageStorage.storage.state);
                delete state[key];
                this.pageStorage.storage.replaceState(state, null, null);
            },
            'clear': (key: string): void => {
                this.pageStorage.storage.replaceState(null, null, null);
            },
        };

        this.stores = {
            '-session': { 'type': 'local', 'store': this.sessionStorage, 'json': false },
            '-local': { 'type': 'local', 'store': this.localStorage, 'json': false },
            '-page': { 'type': 'local', 'store': this.pageStorage, 'json': true },
        };
    }

    /**
    * Sets a key to value in specified store (for a possibly specified id).
    *
    * @param store The store in which to store the value.
    * @param key The key in which to store the value.
    * @param value The value to store.
    * @param id The (possible) id in which to store the value.
    */
    store(store: string, key: string, value: any, id?: any): void {
        let storage = this.stores[store];
        if (storage.type === 'local') {
            storage.store.setItem(key, (storage.json ? value : JSON.stringify(value)));
        }
    }

    /**
    * Gets a value for a key in specified store (for a possibly specified id).
    *
    * @param store The store from which to retrieve the value.
    * @param key The key from which to retrieve the value.
    * @param id The (possible) id from which to retrieve the value.
    * @returns The value in the store, null if key is missing.
    */
    retrieve(store: string, key: string, id?: any): any {
        let value: any;
        let storage = this.stores[store];
        if (storage.type === 'local') {
            value = storage.store.getItem(key);
        }
        if (!storage.json) {
            value = JSON.parse(value);
        }
        return value;
    }

    /**
    * Remove an item/a key in specified store (for a possibly specified id).
    *
    * @param store The store from which to remove the key.
    * @param key The key to remove.
    * @param id The (possible) id from which to remove the key.
    */
    remove(store: string, key: string, id?: any): void {
        let storage = this.stores[store];
        if (storage.type === 'local') {
            storage.store.removeItem(key);
        }
    }

    /**
    * Clear an entire store. (Should rarely be used!)
    *
    * @param store The store to clear.
    */
    clear(store: string): void {
        let storage = this.stores[store];
        if (storage.type === 'local') {
            storage.store.clear();
        }
    }
}
