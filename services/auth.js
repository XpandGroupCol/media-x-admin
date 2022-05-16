import axios from 'axios'
import { BASE_URL } from 'utils/constants'

const OPTIONS = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
}

export const signInWithCredentials = async (payload) => {
  try {
    const { data } = await axios(`${BASE_URL}/auth/admin-login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      data: payload
    })
    return data
  } catch (e) {
    return Promise.reject(e)
  }
}

export const authChangePassword = async (password) => {
  try {
    const { data } = await axios(`${BASE_URL}/auth/change-password`, {
      ...OPTIONS,
      data: password
    })
    return data
  } catch (e) {
    return Promise.reject(e)
  }
}
