import { formName } from '@/db/mongodb/definitions/schema'
import {
  axiosCreateSchema,
  axiosDeleteSchema,
  axiosFetchSchemas,
  axiosUpdateSchema
} from '@/http/axios/api/schemas'
import {
  createSlice,
  createAsyncThunk,
  ActionReducerMapBuilder,
  PayloadAction
} from '@reduxjs/toolkit'

//
export interface SchemaFields {
  name: string
  email: string
}
interface SchemaData extends SchemaFields {
  id: string
}

//
interface SchemaState {
  data: SchemaData[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  loading: boolean
  dialog: boolean
  form?: SchemaData | null
  error: string | null
}

//
const sliceName = formName
const initialState: SchemaState = {
  data: [],
  status: 'idle',
  loading: false,
  dialog: false,
  form: null,
  error: null
}

//
export const fetchSchemas = createAsyncThunk(
  `${sliceName}/fetchSchemas`,
  async () => {
    const response = await axiosFetchSchemas()
    return response.data ?? []
  }
)

//
export const createSchema = createAsyncThunk(
  `${sliceName}/createSchema`,
  async (payload: SchemaFields) => {
    const response = await axiosCreateSchema({ data: payload })
    return response.data
  }
)

//
export const updateSchema = createAsyncThunk(
  `${sliceName}/updateSchema`,
  async (payload: SchemaData) => {
    const id = payload.id

    //
    const response = await axiosUpdateSchema(id, { data: payload })
    return response.data
  }
)

//
export const deleteSchema = createAsyncThunk(
  `${sliceName}/deleteSchema`,
  async (id: string) => {
    const response = await axiosDeleteSchema(id)
    return response.data
  }
)

//
const schemaFetchActions = (builder: ActionReducerMapBuilder<SchemaState>) => {
  return builder
    .addCase(fetchSchemas.pending, state => {
      state.status = 'loading'
      state.loading = true
    })
    .addCase(fetchSchemas.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.loading = false
      state.data = action.payload
    })
    .addCase(fetchSchemas.rejected, (state, action) => {
      state.status = 'failed'
      state.loading = false
      state.error = action.error.message ?? 'Something went wrong'
    })
}

//
const schemaCreateActions = (builder: ActionReducerMapBuilder<SchemaState>) => {
  return builder
    .addCase(createSchema.pending, state => {
      state.status = 'loading'
      state.loading = true
    })
    .addCase(createSchema.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.loading = false
      state.data = action.payload ? [...state.data, action.payload] : state.data
    })
    .addCase(createSchema.rejected, (state, action) => {
      state.status = 'failed'
      state.loading = false
      state.error = action.error.message ?? 'Something went wrong'
    })
}

//
const schemaUpdateActions = (builder: ActionReducerMapBuilder<SchemaState>) => {
  return builder
    .addCase(updateSchema.pending, state => {
      state.status = 'loading'
      state.loading = true
    })
    .addCase(updateSchema.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.loading = false
      state.data = state.data.map(d =>
        d.id === action.payload.id ? action.payload : d
      )
    })
    .addCase(updateSchema.rejected, (state, action) => {
      state.status = 'failed'
      state.loading = false
      state.error = action.error.message ?? 'Something went wrong'
    })
}

//
const schemaDeleteActions = (builder: ActionReducerMapBuilder<SchemaState>) => {
  return builder
    .addCase(deleteSchema.pending, state => {
      state.status = 'loading'
      state.loading = true
    })
    .addCase(deleteSchema.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.loading = false
      state.data = state.data.filter(d => d.id !== action.payload.id)
    })
    .addCase(deleteSchema.rejected, (state, action) => {
      state.status = 'failed'
      state.loading = false
      state.error = action.error.message ?? 'Something went wrong'
    })
}

//
const schemasActions = (builder: ActionReducerMapBuilder<SchemaState>) => {
  schemaFetchActions(builder)
  schemaCreateActions(builder)
  schemaUpdateActions(builder)
  schemaDeleteActions(builder)
}

//
const schemaSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<SchemaData[]>) => {
      state.data = action.payload
    },
    //
    setDialog: (state, action: PayloadAction<boolean>) => {
      state.dialog = action.payload
    },
    setForm: (state, action: PayloadAction<SchemaData | null>) => {
      state.form = action.payload
    }
  },
  extraReducers: builder => {
    schemasActions(builder)
  }
})

//
export const { setData, setDialog, setForm } = schemaSlice.actions
export const schemaReducer = schemaSlice.reducer

//
export default schemaReducer
