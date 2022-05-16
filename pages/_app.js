
import { SWRConfig } from 'swr'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { LocalizationProvider } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'

import NotificationProvider from 'providers/notificationProvider'

import { lightTheme } from '../theme'
import './globalStyles.css'
import ListProvider from 'providers/listProvider'
import { SessionContext } from 'providers/sessionProvider'
import { Admin, Auth } from 'layouts'
import { fetcher } from 'utils/fetcher'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { getSession } from 'utils/cookie'
import LoadingPage from 'components/loadingPage'
import jsCookie from 'js-cookie'

function MyApp ({ Component, pageProps }) {
  const [user, setUser] = useState(undefined)
  const router = useRouter()

  useEffect(() => {
    setUser(getSession())
  }, [])

  const setSession = useCallback((user) => {
    setUser(user)
    jsCookie.set('user', JSON.stringify(user))
  }, [])

  const logout = useCallback(() => {
    jsCookie.remove('user')
    setUser(null)
    router.replace('/auth/login')
  }, [])

  const session = useMemo(() => user, [user])

  if (!pageProps.protected && user === undefined) return <LoadingPage />

  return (
    <ThemeProvider theme={lightTheme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <NotificationProvider>
          <SessionContext.Provider value={{ session, setSession, logout }}>
            <SWRConfig value={{
              fetcher: (resource) => fetcher(resource).then(({ data }) => data),
              revalidateOnFocus: false
            }}
            >
              {pageProps.protected
                ? (
                  <Auth>
                    <Component {...pageProps} />
                  </Auth>
                  )
                : (

                  <Admin>
                    <ListProvider>
                      <Component {...pageProps} />
                    </ListProvider>
                  </Admin>
                  )}
            </SWRConfig>
          </SessionContext.Provider>
          <CssBaseline />
        </NotificationProvider>
      </LocalizationProvider>
    </ThemeProvider>
  )
}

export default MyApp
