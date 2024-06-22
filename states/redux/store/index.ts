import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './slices/usersSlice'
import { useDispatch, useSelector } from 'react-redux'

export const store = configureStore({
  reducer: {
    users: usersReducer
  }
})

//
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

//
export const useAppSelector = <K extends keyof RootState>(name: K) =>
  useSelector((state: RootState) => state[name])
export const useAppDispatch = () => useDispatch<AppDispatch>()
