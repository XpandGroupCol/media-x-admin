import axios from 'axios'

export const signInWithCredentials = async (data) => {
  try {
    const { data: user } = await axios(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/admin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      data
    })
    return user.data
  } catch (e) {
    return null
  }
}
