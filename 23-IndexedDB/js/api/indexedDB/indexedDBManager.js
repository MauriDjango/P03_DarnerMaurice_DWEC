export class IndexedDBManager {
  #dbName;

  constructor(dbName) {
    this.#dbName = dbName;
  }

  openDB(storeName) {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.#dbName);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName, { keyPath: 'email' });
        }
      };

      request.onsuccess = (event) => {
        resolve(event.target.result);
      };

      request.onerror = (event) => {
        console.log('Error opening DB', event.target.error);
        reject(event.target.error);
      };
    });
  }

  closeDB(db) {
    db.close();
  }
}

export class ObjectStore {
  #objStoreName;
  #type = 'readwrite';
  #idbManager;

  constructor(idbManager, objStoreName) {
    this.#idbManager = idbManager;
    this.#objStoreName = objStoreName;
  }

  async #store() {
    const db = await this.#idbManager.openDB(this.#objStoreName);
    return db.transaction([this.#objStoreName], this.#type).objectStore(this.#objStoreName);
  }

  async add(item) {
    const store = await this.#store();
    return new Promise((resolve, reject) => {
      const request = store.add(item);
      request.onsuccess = () => {
        console.log('Item added');
        resolve();
      };
      request.onerror = (e) => {
        console.log('Error adding item', e.target.error);
        reject(e.target.error);
      };
    });
  }

  async getById(id) {
    const store = await this.#store();
    return new Promise((resolve, reject) => {
      const request = store.get(id);
      request.onsuccess = () => {
        console.log('Item successfully fetched:', request.result);
        resolve(request.result); // Return the fetched item
      };
      request.onerror = (e) => {
        console.log('Error getting item', e.target.error);
        reject(e.target.error);
      };
    });
  }

  async update(item) {
    const store = await this.#store();
    return new Promise((resolve, reject) => {
      const request = store.put(item);
      request.onsuccess = () => {
        console.log('Item updated');
        resolve();
      };
      request.onerror = (e) => {
        console.log('Error updating item', e.target.error);
        reject(e.target.error);
      };
    });
  }

  async delete(id) {
    const store = await this.#store();
    return new Promise((resolve, reject) => {
      const request = store.delete(id);
      request.onsuccess = () => {
        console.log('Item deleted');
        resolve();
      };
      request.onerror = (e) => {
        console.log('Error deleting item', e.target.error);
        reject(e.target.error);
      };
    });
  }

  async getAll() {
    const store = await this.#store();
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => {
        console.log('All items retrieved:', request.result);
        resolve(request.result); // Resolve with the retrieved items
      };
      request.onerror = (e) => {
        console.log('Error retrieving items', e.target.error);
        reject(e.target.error);
      };
    });
  }
}

// Initialize the IndexedDBManager and ObjectStore
const idbName = 'IndexedDB';
const storeName = 'Clients';
const idbManager = new IndexedDBManager(idbName);
const objectStore = new ObjectStore(idbManager, storeName);
export const clientStore = objectStore