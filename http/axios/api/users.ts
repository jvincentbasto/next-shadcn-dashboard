import api from '..'

//
export const customPath = 'users'
export const axiosFetchUsers = async () => {
  //
  let response
  try {
    response = await api.get(`/${customPath}`)
    return response.data
  } catch (error) {
    return { success: false, error: { message: 'Failed to get users' } }
  }
}

//
export const axiosCreateUser = async (data: any) => {
  //
  let response
  try {
    response = await api.post(`/${customPath}`, data)
    return response.data
  } catch (error) {
    return { success: false, error: { message: 'Failed to create user' } }
  }
}

//
export const axiosFetchUser = async (id: string) => {
  //
  let response
  try {
    response = await api.get(`/${customPath}/${id}`)
    return response.data
  } catch (error) {
    return { success: false, error: { message: 'Failed to get user' } }
  }
}

//
export const axiosUpdateUser = async (id: string, data: any) => {
  //
  let response
  try {
    response = await api.put(`/${customPath}/${id}`, data)
    return response.data
  } catch (error) {
    return { success: false, error: { message: 'Failed to update user' } }
  }
}

//
export const axiosDeleteUser = async (id: string) => {
  //
  let response
  try {
    response = await api.delete(`/${customPath}/${id}`)
    return response.data
  } catch (error) {
    return { success: false, error: { message: 'Failed to delete user' } }
  }
}
