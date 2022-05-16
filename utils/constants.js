
export const COUNTRIES_LIST = [
  { id: 'co', label: 'Colombia' },
  { id: 've', label: 'Vanezuela' },
  { id: 'ar', label: 'Argentina' },
  { id: 'br', label: 'brasil' },
  { id: 'uy', label: 'Uruguay' },
  { id: 'cl', label: 'Chile' },
  { id: 'py', label: 'Paraguay' },
  { id: 'bo', label: 'Bolivia' },
  { id: 'ec', label: 'Ecuador' },
  { id: 'pe', label: 'Peru' },
  { id: 'mx', label: 'mexico' }
]

export const COUNTRIES = COUNTRIES_LIST.map(({ id }) => id)

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
