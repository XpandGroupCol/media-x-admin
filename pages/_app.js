import { SessionProvider } from 'next-auth/react'
import { SWRConfig } from 'swr'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { LocalizationProvider } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'

import NotificationProvider from 'providers/notificationProvider'
import Private from 'layouts/private'
import Public from 'layouts/public'

import { lightTheme } from '../theme'
import './globalStyles.css'

function MyApp ({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <NotificationProvider>

      <SessionProvider session={session}>
        <SWRConfig value={{
          fetcher: (resource, init) => window.fetch(resource, init).then(res => res.json()),
          revalidateOnFocus: false
        }}
        >
          <ThemeProvider theme={lightTheme}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <CssBaseline />
              {
              Component.publicPage
                ? (
                  <Public>
                    <Component {...pageProps} />
                  </Public>
                  )
                : (
                  <Private>
                    <Component {...pageProps} />
                  </Private>
                  )
            }
            </LocalizationProvider>
          </ThemeProvider>
        </SWRConfig>
      </SessionProvider>
    </NotificationProvider>
  )
}

export default MyApp
