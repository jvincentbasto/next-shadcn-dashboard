import {
  axiosCreateDynamic,
  axiosDeleteDynamic,
  axiosFetchDynamic,
  axiosUpdateDynamic
} from '@/http/axios/api/dynamic'
import {
  createSlice,
  createAsyncThunk,
  ActionReducerMapBuilder,
  PayloadAction,
  CaseReducer
} from '@reduxjs/toolkit'

//
export type TDynamicData = {
  [key: string]: any
}

//
interface TState {
  data: TDynamicData[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  loading: boolean
  dialog: boolean
  form?: TDynamicData | null
  error: string | null
}

//
const initialState: TState = {
  data: [],
  status: 'idle',
  loading: false,
  dialog: false,
  form: null,
  error: null
}

// const caseReducer:CaseReducer<TState> = (state,action) => {}

//
export const createDocumentReducer = () => {
  const reducers = {
    setData: (state: TState, action: PayloadAction<TDynamicData[]>) => {
      state.data = action.payload
    },
    //
    setDialog: (state: TState, action: PayloadAction<boolean>) => {
      state.dialog = action.payload
    },
    setForm: (state: TState, action: PayloadAction<TDynamicData | null>) => {
      state.form = action.payload
    }
  }

  return reducers
}

//
export const fetchDynamicDocument = (name: string) =>
  createAsyncThunk(`${name}/fetchDocument`, async () => {
    const response = await axiosFetchDynamic()
    return response.data ?? []
  })

//
export const createDynamicDocument = (name: string) =>
  createAsyncThunk(`${name}/createDocument`, async (data: any) => {
    const response = await axiosCreateDynamic(data)
    return response.data
  })

//
export const updateDynamicDocument = (name: string) =>
  createAsyncThunk(`${name}/updateDocument`, async (payload: TDynamicData) => {
    const id = payload._id
    const data = { ...payload, _id: undefined }

    //
    const response = await axiosUpdateDynamic(id, data)
    return response.data
  })

//
export const deleteDynamicDocument = (name: string) =>
  createAsyncThunk(`${name}/deleteDocument`, async (id: string) => {
    const response = await axiosDeleteDynamic(id)
    return { _id: response.data ?? '' }
  })

//
export const createDocumentExtraReducers = (
  name: string,
  builder: ActionReducerMapBuilder<TState>
) => {
  //
  const fetchDocument = fetchDynamicDocument(name)
  const createDocument = createDynamicDocument(name)
  const updateDocument = updateDynamicDocument(name)
  const deleteDocument = deleteDynamicDocument(name)

  //
  const documentFetchActions = (builder: ActionReducerMapBuilder<TState>) => {
    return builder
      .addCase(fetchDocument.pending, state => {
        state.status = 'loading'
        state.loading = true
      })
      .addCase(fetchDocument.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchDocument.rejected, (state, action) => {
        state.status = 'failed'
        state.loading = false
        state.error = action.error.message ?? 'Something went wrong'
      })
  }

  //
  const documentCreateActions = (builder: ActionReducerMapBuilder<TState>) => {
    return builder
      .addCase(createDocument.pending, state => {
        state.status = 'loading'
        state.loading = true
      })
      .addCase(createDocument.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.loading = false
        state.data = action.payload
          ? [...state.data, action.payload]
          : state.data
      })
      .addCase(createDocument.rejected, (state, action) => {
        state.status = 'failed'
        state.loading = false
        state.error = action.error.message ?? 'Something went wrong'
      })
  }

  //
  const documentUpdateActions = (builder: ActionReducerMapBuilder<TState>) => {
    return builder
      .addCase(updateDocument.pending, state => {
        state.status = 'loading'
        state.loading = true
      })
      .addCase(updateDocument.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.loading = false
        state.data = state.data.map(d =>
          d._id === action.payload._id ? action.payload : d
        )
      })
      .addCase(updateDocument.rejected, (state, action) => {
        state.status = 'failed'
        state.loading = false
        state.error = action.error.message ?? 'Something went wrong'
      })
  }

  //
  const documentDeleteActions = (builder: ActionReducerMapBuilder<TState>) => {
    return builder
      .addCase(deleteDocument.pending, state => {
        state.status = 'loading'
        state.loading = true
      })
      .addCase(deleteDocument.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.loading = false
        state.data = state.data.filter(d => d._id !== action.payload._id)
      })
      .addCase(deleteDocument.rejected, (state, action) => {
        state.status = 'failed'
        state.loading = false
        state.error = action.error.message ?? 'Something went wrong'
      })
  }

  //
  const documentActions = (builder: ActionReducerMapBuilder<TState>) => {
    documentFetchActions(builder)
    documentCreateActions(builder)
    documentUpdateActions(builder)
    documentDeleteActions(builder)
  }

  //
  return documentActions(builder)
}

//
export const createDocumentSlice = (name: string) => {
  //
  const documentSlice = createSlice({
    name,
    initialState,
    reducers: {
      ...createDocumentReducer()
    },
    extraReducers: builder => {
      createDocumentExtraReducers(name, builder)
    }
  })

  //
  return documentSlice
}
