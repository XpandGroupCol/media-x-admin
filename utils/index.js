export const areEqual = (prevData, nextData) => {
  return JSON.stringify(prevData.row) === JSON.stringify(nextData.row)
}

export const getFormatedNumber = (number, locales = 'en') =>
  Intl?.NumberFormat ? new Intl.NumberFormat(locales).format(number) : number

export const getFormatedLists = (list = []) => list?.map(({ label }) => label).join(' - ')

export const getEllipse = (text) => {
  return text.length > 40 ? `${text.slice(0, 40)}...` : text
}
