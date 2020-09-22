import GlobalStore from './GlobalStore'

import { ENTITY_NAME } from './constants'

enum STORE_TYPE {
  ENTITY,
  GLOBAL,
}

interface IStores {
  [STORE_TYPE.GLOBAL]: GlobalStore
}
class StoreManager {
  private _stores: IStores

  constructor() {
    this._init()
  }

  private _init() {
    this._stores = {
      [STORE_TYPE.GLOBAL]: new GlobalStore(),
    }
  }

  injectStores(stores: any[]) {
    stores.forEach((store: any) => {
      this.injectStore(store)
    })
  }

  injectStore(store: any) {
    const { name } = store
    this._stores[STORE_TYPE.ENTITY][name] = store
  }

  removeStore(store: any) {
    const { name } = store
    delete this._stores[STORE_TYPE.ENTITY][name]
    store.dispose()
  }

  removeStores(stores: any[]) {
    stores.forEach((store: any) => {
      this.removeStore(store)
    })
  }

  getStore(type: STORE_TYPE, storeName?: ENTITY_NAME) {
    if (type !== STORE_TYPE.GLOBAL && storeName) {
      return this._stores[type][storeName]
    }
    return this._stores[type]
  }

  getGlobalStore(): GlobalStore {
    return this.getStore(STORE_TYPE.GLOBAL) as GlobalStore
  }

  getAllStore() {
    return this._stores
  }

  resetStores() {
    this._init()
  }
}

export { StoreManager }

export default new StoreManager()
