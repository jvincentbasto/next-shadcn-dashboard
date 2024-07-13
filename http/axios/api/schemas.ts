import api from '..'

//
export const customPath = 'schemas'
export const axiosFetchSchemas = async () => {
  //
  let response
  try {
    response = await api.get(`/${customPath}`)
    return response.data
  } catch (error) {
    return { success: false, error: { message: 'Failed to get schemas' } }
  }
}

//
export const axiosCreateSchema = async (payload: any) => {
  //
  let response
  try {
    response = await api.post(`/${customPath}`, payload)
    return response.data
  } catch (error) {
    return { success: false, error: { message: 'Failed to create schema' } }
  }
}

//
export const axiosFetchByIdSchema = async (id: string) => {
  //
  let response
  try {
    response = await api.get(`/${customPath}/${id}`)
    return response.data
  } catch (error) {
    return { success: false, error: { message: 'Failed to get schema' } }
  }
}

//
export const axiosUpdateSchema = async (id: string, payload: any) => {
  //
  let response
  try {
    response = await api.put(`/${customPath}/${id}`, payload)
    return response.data
  } catch (error) {
    return { success: false, error: { message: 'Failed to update schema' } }
  }
}

//
export const axiosDeleteSchema = async (id: string) => {
  //
  let response
  try {
    response = await api.delete(`/${customPath}/${id}`)
    return response.data
  } catch (error) {
    return { success: false, error: { message: 'Failed to delete schema' } }
  }
}
