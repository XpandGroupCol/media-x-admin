export const areEqual = (prevData, nextData) => {
  return JSON.stringify(prevData.row) === JSON.stringify(nextData.row)
}

export const ROLES = [
  {
    id: 'SUPER_ADMIN',
    label: 'Super Admin'
  },
  {
    id: 'ADMIN',
    label: 'Admin'
  },
  {
    id: 'CLIENT',
    label: 'Client'
  },
  {
    id: 'CLIENT',
    label: 'Seo'
  }
]

export const DEVICE = [
  {
    id: 'all',
    label: 'Todos'
  },
  {
    id: 'mobile',
    label: 'Mobile'
  },
  {
    id: 'desktop',
    label: 'Desktop'
  }
]

export const SEX = [
  {
    id: 'all',
    label: 'Todos'
  }, {
    id: 'male',
    label: 'Hombres'
  }, {
    id: 'women',
    label: 'Mujeres'
  }
]
