import api from '..'

//
export const axiosFetchDynamic = async (name: string) => {
  try {
    const response = await api.get(`/dynamic/${name}`)
    return response.data
  } catch (error) {
    return { success: false, error: 'Failed to get dynamic document' }
  }
}

//
export const axiosCreateDynamic = async (name: string, payload: any) => {
  try {
    const response = await api.post(`/dynamic/${name}`, payload)
    return response.data
  } catch (error) {
    return { success: false, error: 'Failed to create dynamic document' }
  }
}

//
export const axiosFetchByIdDynamic = async (name: string, id: string) => {
  try {
    const response = await api.get(`/dynamic/${name}/${id}`)
    return response.data
  } catch (error) {
    return { success: false, error: 'Failed to get dynamic document' }
  }
}

//
export const axiosUpdateDynamic = async (
  name: string,
  id: string,
  payload: any
) => {
  try {
    const response = await api.put(`/dynamic/${name}/${id}`, payload)
    return response.data
  } catch (error) {
    return { success: false, error: 'Failed to update dynamic document' }
  }
}

//
export const axiosDeleteDynamic = async (name: string, id: string) => {
  try {
    const response = await api.delete(`/dynamic/${name}/${id}`)
    return response.data
  } catch (error) {
    return { success: false, error: 'Failed to delete dynamic document' }
  }
}
