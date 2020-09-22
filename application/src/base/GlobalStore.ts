import { action, get, set, remove, observable } from 'mobx'

import { ENTITY_NAME, GLOBAL_VALUES } from './constants'

export default class GlobalStore {
  private _data = observable.object<typeof GLOBAL_VALUES>(
    GLOBAL_VALUES,
    {},
    { deep: false }
  )

  @action
  set<K extends keyof typeof GLOBAL_VALUES>(
    key: K,
    value: typeof GLOBAL_VALUES[K]
  ) {
    set(this._data, key, value)
  }

  @action
  remove(key: keyof typeof GLOBAL_VALUES) {
    remove(this._data, key)
  }

  get(key: keyof typeof GLOBAL_VALUES) {
    return get(this._data, key)
  }
}
