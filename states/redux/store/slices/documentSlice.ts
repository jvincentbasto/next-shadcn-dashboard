import {
  axiosCreateDynamicDocument,
  axiosDeleteDynamicDocument,
  axiosFetchDynamicDocuments,
  axiosUpdateDynamicDocument
} from '@/http/axios/api/documents'
import {
  createSlice,
  createAsyncThunk,
  ActionReducerMapBuilder,
  PayloadAction
} from '@reduxjs/toolkit'

//
export interface TDocumentDataValues {
  [key: string]: any
}
export interface TDocumentData extends TDocumentDataValues {
  id: string
}

//
interface TDocumentState {
  data: TDocumentData[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  loading: boolean
  dialog: boolean
  form?: TDocumentData | null
  error: string | null
}

//
const initialState: TDocumentState = {
  data: [],
  status: 'idle',
  loading: false,
  dialog: false,
  form: null,
  error: null
}

//
export const createDocumentReducer = () => {
  const reducers = {
    setData: (
      state: TDocumentState,
      action: PayloadAction<TDocumentData[]>
    ) => {
      state.data = action.payload
    },
    //
    setDialog: (state: TDocumentState, action: PayloadAction<boolean>) => {
      state.dialog = action.payload
    },
    setForm: (
      state: TDocumentState,
      action: PayloadAction<TDocumentData | null>
    ) => {
      state.form = action.payload
    }
  }

  return reducers
}

//
export const fetchDynamicDocument = (formName: string, schemaName: string) =>
  createAsyncThunk(`${formName}/fetchDocument`, async () => {
    const response = await axiosFetchDynamicDocuments(schemaName)
    return response.data ?? []
  })

//
export const createDynamicDocument = (formName: string, schemaName: string) =>
  createAsyncThunk(
    `${formName}/createDocument`,
    async (data: TDocumentDataValues) => {
      const response = await axiosCreateDynamicDocument(schemaName, data)
      return response.data
    }
  )

//
export const updateDynamicDocument = (formName: string, schemaName: string) =>
  createAsyncThunk(
    `${formName}/updateDocument`,
    async (payload: TDocumentData) => {
      const id = payload.data.id

      //
      const response = await axiosUpdateDynamicDocument(schemaName, id, payload)
      return response.data
    }
  )

//
export const deleteDynamicDocument = (formName: string, schemaName: string) =>
  createAsyncThunk(`${formName}/deleteDocument`, async (id: string) => {
    const response = await axiosDeleteDynamicDocument(schemaName, id)
    return response.data
  })

//
export const createDocumentExtraReducers = (
  formName: string,
  schemaName: string,
  builder: ActionReducerMapBuilder<TDocumentState>
) => {
  //
  const fetchDocument = fetchDynamicDocument(formName, schemaName)
  const createDocument = createDynamicDocument(formName, schemaName)
  const updateDocument = updateDynamicDocument(formName, schemaName)
  const deleteDocument = deleteDynamicDocument(formName, schemaName)

  //
  const documentFetchActions = (
    builder: ActionReducerMapBuilder<TDocumentState>
  ) => {
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
  const documentCreateActions = (
    builder: ActionReducerMapBuilder<TDocumentState>
  ) => {
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
  const documentUpdateActions = (
    builder: ActionReducerMapBuilder<TDocumentState>
  ) => {
    return builder
      .addCase(updateDocument.pending, state => {
        state.status = 'loading'
        state.loading = true
      })
      .addCase(updateDocument.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.loading = false
        state.data = state.data.map(d =>
          d.id === action.payload.id ? action.payload : d
        )
      })
      .addCase(updateDocument.rejected, (state, action) => {
        state.status = 'failed'
        state.loading = false
        state.error = action.error.message ?? 'Something went wrong'
      })
  }

  //
  const documentDeleteActions = (
    builder: ActionReducerMapBuilder<TDocumentState>
  ) => {
    return builder
      .addCase(deleteDocument.pending, state => {
        state.status = 'loading'
        state.loading = true
      })
      .addCase(deleteDocument.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.loading = false
        state.data = state.data.filter(d => d.id !== action.payload.id)
      })
      .addCase(deleteDocument.rejected, (state, action) => {
        state.status = 'failed'
        state.loading = false
        state.error = action.error.message ?? 'Something went wrong'
      })
  }

  //
  const documentActions = (
    builder: ActionReducerMapBuilder<TDocumentState>
  ) => {
    documentFetchActions(builder)
    documentCreateActions(builder)
    documentUpdateActions(builder)
    documentDeleteActions(builder)
  }

  //
  return documentActions(builder)
}

//
export const createDocumentSlice = (formName: string, schemaName: string) => {
  //
  const documentSlice = createSlice({
    name: formName,
    initialState,
    reducers: {
      ...createDocumentReducer()
    },
    extraReducers: builder => {
      createDocumentExtraReducers(formName, schemaName, builder)
    }
  })

  //
  return documentSlice
}
