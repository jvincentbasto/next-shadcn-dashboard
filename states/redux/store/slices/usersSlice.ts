import {
  axiosCreateUser,
  axiosDeleteUser,
  axiosFetchUsers,
  axiosUpdateUser
} from '@/http/axios/api/users'
import {
  createSlice,
  createAsyncThunk,
  ActionReducerMapBuilder,
  PayloadAction,
  CaseReducer
} from '@reduxjs/toolkit'

//
export interface User {
  _id: string
  name: string
  email: string
}

//
interface UsersState {
  data: User[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  loading: boolean
  dialog: boolean
  form?: User | null
  error: string | null
}

//
const initialState: UsersState = {
  data: [],
  status: 'idle',
  loading: false,
  dialog: false,
  form: null,
  error: null
}

//
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axiosFetchUsers()
  return response.data ?? []
})

//
export const createUser = createAsyncThunk(
  'users/createUser',
  async (data: any) => {
    const response = await axiosCreateUser(data)
    return response.data
  }
)

//
export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (payload: User) => {
    const id = payload._id
    const data = { ...payload, _id: undefined }

    //
    const response = await axiosUpdateUser(id, data)
    return response.data
  }
)

//
export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (id: string) => {
    const response = await axiosDeleteUser(id)
    return { _id: response.data ?? '' }
  }
)

//
const userFetchActions = (builder: ActionReducerMapBuilder<UsersState>) => {
  return builder
    .addCase(fetchUsers.pending, state => {
      state.status = 'loading'
      state.loading = true
    })
    .addCase(fetchUsers.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.loading = false
      state.data = action.payload
    })
    .addCase(fetchUsers.rejected, (state, action) => {
      state.status = 'failed'
      state.loading = false
      state.error = action.error.message ?? 'Something went wrong'
    })
}

//
const userCreateActions = (builder: ActionReducerMapBuilder<UsersState>) => {
  return builder
    .addCase(createUser.pending, state => {
      state.status = 'loading'
      state.loading = true
    })
    .addCase(createUser.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.loading = false
      state.data = action.payload ? [...state.data, action.payload] : state.data
    })
    .addCase(createUser.rejected, (state, action) => {
      state.status = 'failed'
      state.loading = false
      state.error = action.error.message ?? 'Something went wrong'
    })
}

//
const userUpdateActions = (builder: ActionReducerMapBuilder<UsersState>) => {
  return builder
    .addCase(updateUser.pending, state => {
      state.status = 'loading'
      state.loading = true
    })
    .addCase(updateUser.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.loading = false
      state.data = state.data.map(d =>
        d._id === action.payload._id ? action.payload : d
      )
    })
    .addCase(updateUser.rejected, (state, action) => {
      state.status = 'failed'
      state.loading = false
      state.error = action.error.message ?? 'Something went wrong'
    })
}

//
const userDeleteActions = (builder: ActionReducerMapBuilder<UsersState>) => {
  return builder
    .addCase(deleteUser.pending, state => {
      state.status = 'loading'
      state.loading = true
    })
    .addCase(deleteUser.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.loading = false
      state.data = state.data.filter(d => d._id !== action.payload._id)
    })
    .addCase(deleteUser.rejected, (state, action) => {
      state.status = 'failed'
      state.loading = false
      state.error = action.error.message ?? 'Something went wrong'
    })
}

//
const userActions = (builder: ActionReducerMapBuilder<UsersState>) => {
  userFetchActions(builder)
  userCreateActions(builder)
  userUpdateActions(builder)
  userDeleteActions(builder)
}

// const caseReducer:CaseReducer<UsersState> = (state,action) => {}

//
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<User[]>) => {
      state.data = action.payload
    },
    //
    setDialog: (state, action: PayloadAction<boolean>) => {
      state.dialog = action.payload
    },
    setForm: (state, action: PayloadAction<User | null>) => {
      state.form = action.payload
    }
  },
  extraReducers: builder => {
    userActions(builder)
  }
})

//
export const { setData, setDialog, setForm } = usersSlice.actions
export const usersReducer = usersSlice.reducer

//
export default usersReducer
