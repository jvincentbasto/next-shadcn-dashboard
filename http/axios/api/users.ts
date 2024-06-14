import api from '..'

//
export const axiosFetchUsers = async () => {
  try {
    const response = await api.get('/users')
    return response.data
  } catch (error) {
    return { success: false, error: 'Failed to get users' }
  }
}

//
export const axiosCreateUser = async (data: any) => {
  try {
    const response = await api.post('/users', data)
    return response.data
  } catch (error) {
    return { success: false, error: 'Failed to create user' }
  }
}

//
export const axiosFetchUser = async (id: string) => {
  try {
    const response = await api.get(`/users/${id}`)
    return response.data
  } catch (error) {
    return { success: false, error: 'Failed to get user' }
  }
}

//
export const axiosUpdateUser = async (id: string, data: any) => {
  try {
    const response = await api.put(`/users/${id}`, data)
    return response.data
  } catch (error) {
    return { success: false, error: 'Failed to update user' }
  }
}

//
export const axiosDeleteUser = async (id: string) => {
  try {
    const response = await api.delete(`/users/${id}`)
    return response.data
  } catch (error) {
    return { success: false, error: 'Failed to delete user' }
  }
}
