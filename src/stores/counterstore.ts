import {defineStore} from 'pinia';

interface Counter {
  name: string,
  count: number,
  cite: string
}
export const useCounterStore = defineStore('counter', {
  state: () => ({
    counter_list: [] as Counter[]
  }),
  getters: {
    names: state => {
      const result = [] as string[]
      for (const e of state.counter_list) {
        result.push(e.name)
      }
      return result
    },
    get_single_name: state => {
      return function(name: string) : Counter | null {
        for (const e of state.counter_list) {
        if (e.name === name) {
          return e
        }
      }
        return null
      }
    },
    is_empty: state => {
      return state.counter_list.length === 0
    }
  },
  actions: {
    increment(name: string) {
      for (const e of this.counter_list) {
        if (e.name === name) {
          e.count++
        }
      }
    },
    decrement(name: string) {
      for (const e of this.counter_list) {
        if (e.name === name) {
          e.count--
        }
      }
    },
    push(entry : Counter) {
      this.counter_list.push(entry)
    },
    clear() {
      this.counter_list = []
    },
  }
})
