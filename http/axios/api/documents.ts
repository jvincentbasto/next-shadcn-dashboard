import api from '..'

//
export const customPath = 'documents'
export const axiosFetchDynamicDocuments = async (name: string) => {
  //
  let response
  try {
    response = await api.get(`/${customPath}/${name}`)
    return response.data
  } catch (error) {
    return {
      success: false,
      data: [],
      error: { message: 'Failed to get documents' }
    }
  }
}

//
export const axiosCreateDynamicDocument = async (
  name: string,
  payload: any
) => {
  //
  let response
  try {
    response = await api.post(`/${customPath}/${name}`, payload)
    return response.data
  } catch (error) {
    return {
      success: false,
      data: null,
      error: { message: 'Failed to create document' }
    }
  }
}

//
export const axiosFetchByIdDynamicDocument = async (
  name: string,
  id: string
) => {
  //
  let response
  try {
    response = await api.get(`/${customPath}/${name}/${id}`)
    return response.data
  } catch (error) {
    return {
      success: false,
      data: null,
      error: { message: 'Failed to get document' }
    }
  }
}

//
export const axiosUpdateDynamicDocument = async (
  name: string,
  id: string,
  payload: any
) => {
  //
  let response
  try {
    response = await api.put(`/${customPath}/${name}/${id}`, payload)
    return response.data
  } catch (error) {
    return {
      success: false,
      data: null,
      error: { message: 'Failed to update document' }
    }
  }
}

//
export const axiosDeleteDynamicDocument = async (name: string, id: string) => {
  //
  let response
  try {
    response = await api.delete(`/${customPath}/${name}/${id}`)
    return response.data
  } catch (error) {
    return {
      success: false,
      data: null,
      error: { message: 'Failed to delete document' }
    }
  }
}
