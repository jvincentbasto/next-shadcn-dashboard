import api from '..'

//
export const axiosFetchUDynamic = async () => {
  try {
    const response = await api.get('/dynamic')
    return response.data
  } catch (error) {
    return { success: false, error: 'Failed to get dynamic document' }
  }
}

//
export const axiosCreateDynamic = async (data: any) => {
  try {
    const response = await api.post('/dynamic', data)
    return response.data
  } catch (error) {
    return { success: false, error: 'Failed to create dynamic document' }
  }
}

//
export const axiosFetchDynamic = async (id: string) => {
  try {
    const response = await api.get(`/dynamic/${id}`)
    return response.data
  } catch (error) {
    return { success: false, error: 'Failed to get dynamic document' }
  }
}

//
export const axiosUpdateDynamic = async (id: string, data: any) => {
  try {
    const response = await api.put(`/dynamic/${id}`, data)
    return response.data
  } catch (error) {
    return { success: false, error: 'Failed to update dynamic document' }
  }
}

//
export const axiosDeleteDynamic = async (id: string) => {
  try {
    const response = await api.delete(`/dynamic/${id}`)
    return response.data
  } catch (error) {
    return { success: false, error: 'Failed to delete dynamic document' }
  }
}
