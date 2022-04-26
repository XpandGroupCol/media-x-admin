import axios from 'axios'

export const signInWithCredentials = async (payload) => {
  try {
    const { data } = await axios(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/admin-login`, {
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
