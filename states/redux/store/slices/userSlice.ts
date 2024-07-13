import { formName } from '@/db/mongodb/definitions/user'
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
  PayloadAction
} from '@reduxjs/toolkit'

//
export interface UserFields {
  name: string
  email: string
}
export interface UserData extends UserFields {
  id: string
}

//
interface UserState {
  data: UserData[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  loading: boolean
  dialog: boolean
  form?: UserData | null
  error: string | null
}

//
const sliceName = formName
const initialState: UserState = {
  data: [],
  status: 'idle',
  loading: false,
  dialog: false,
  form: null,
  error: null
}

//
export const fetchUsers = createAsyncThunk(
  `${sliceName}/fetchUsers`,
  async () => {
    const response = await axiosFetchUsers()
    return response.data ?? []
  }
)

//
export const createUser = createAsyncThunk(
  `${sliceName}/createUser`,
  async (payload: UserFields) => {
    const response = await axiosCreateUser({ data: payload })
    return response.data
  }
)

//
export const updateUser = createAsyncThunk(
  `${sliceName}/updateUser`,
  async (payload: UserData) => {
    const id = payload.id

    //
    const response = await axiosUpdateUser(id, { data: payload })
    return response.data
  }
)

//
export const deleteUser = createAsyncThunk(
  `${sliceName}/deleteUser`,
  async (id: string) => {
    const response = await axiosDeleteUser(id)
    return response.data
  }
)

//
const userFetchActions = (builder: ActionReducerMapBuilder<UserState>) => {
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
const userCreateActions = (builder: ActionReducerMapBuilder<UserState>) => {
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
const userUpdateActions = (builder: ActionReducerMapBuilder<UserState>) => {
  return builder
    .addCase(updateUser.pending, state => {
      state.status = 'loading'
      state.loading = true
    })
    .addCase(updateUser.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.loading = false
      state.data = state.data.map(d =>
        d.id === action.payload.id ? action.payload : d
      )
    })
    .addCase(updateUser.rejected, (state, action) => {
      state.status = 'failed'
      state.loading = false
      state.error = action.error.message ?? 'Something went wrong'
    })
}

//
const userDeleteActions = (builder: ActionReducerMapBuilder<UserState>) => {
  return builder
    .addCase(deleteUser.pending, state => {
      state.status = 'loading'
      state.loading = true
    })
    .addCase(deleteUser.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.loading = false
      state.data = state.data.filter(d => d.id !== action.payload.id)
    })
    .addCase(deleteUser.rejected, (state, action) => {
      state.status = 'failed'
      state.loading = false
      state.error = action.error.message ?? 'Something went wrong'
    })
}

//
const userActions = (builder: ActionReducerMapBuilder<UserState>) => {
  userFetchActions(builder)
  userCreateActions(builder)
  userUpdateActions(builder)
  userDeleteActions(builder)
}

//
const userSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<UserData[]>) => {
      state.data = action.payload
    },
    //
    setDialog: (state, action: PayloadAction<boolean>) => {
      state.dialog = action.payload
    },
    setForm: (state, action: PayloadAction<UserData | null>) => {
      state.form = action.payload
    }
  },
  extraReducers: builder => {
    userActions(builder)
  }
})

//
export const { setData, setDialog, setForm } = userSlice.actions
export const userReducer = userSlice.reducer

//
export default userReducer
