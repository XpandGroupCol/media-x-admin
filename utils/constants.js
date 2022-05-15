
export const COUNTRIES = ['co', 've', 'ar', 'br', 'uy', 'cl', 'py', 'bo', 'ec', 'pe', 'mx']

export const COUNTRIES_LIST = COUNTRIES.map((id) => ({ id, label: id }))

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
