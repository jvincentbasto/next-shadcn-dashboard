// app/injectSlice.ts
import store from './index'
import { Reducer } from 'redux'

const injectSlice = (key: string, reducer: Reducer) => {
  const storeWithAsyncReducers = store as typeof store & {
    asyncReducers: { [key: string]: Reducer }
    injectReducer: (key: string, asyncReducer: Reducer) => void
  }

  if (!storeWithAsyncReducers.asyncReducers[key]) {
    storeWithAsyncReducers.injectReducer(key, reducer)
  }
}

export default injectSlice
