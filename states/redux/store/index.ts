import {
  configureStore,
  ReducersMapObject,
  combineReducers
} from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { Reducer } from 'redux'
import usersReducer from './slices/usersSlice'

interface AsyncReducers {
  [key: string]: Reducer
}

const staticReducers: ReducersMapObject = {
  // Your static reducers here
  users: usersReducer
}

const createReducer = (asyncReducers: AsyncReducers) =>
  combineReducers({
    ...staticReducers,
    ...asyncReducers
  })

export const store = configureStore({
  reducer: createReducer({}),
  middleware: getDefaultMiddleware => getDefaultMiddleware()
})

// TypeScript type casting to extend the store object
type StoreWithAsyncReducers = typeof store & {
  asyncReducers: AsyncReducers
  injectReducer: (key: string, asyncReducer: Reducer) => void
}
;(store as StoreWithAsyncReducers).asyncReducers = {}
;(store as StoreWithAsyncReducers).injectReducer = (
  key: string,
  asyncReducer: Reducer
) => {
  ;(store as StoreWithAsyncReducers).asyncReducers[key] = asyncReducer
  store.replaceReducer(
    createReducer((store as StoreWithAsyncReducers).asyncReducers)
  )
}

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export const useAppSelector = <K extends keyof RootState>(name: K) =>
  useSelector((state: RootState) => state[name])
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store
