import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export default NextAuth({
  session: {
    strategy: 'jwt'
  },
  secret: process.env.SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'email', type: 'text' },
        password: { label: 'Password', type: 'password' },
        verifyEmail: { label: 'verifyEmail', type: 'text' }
      },
      async authorize ({ email, password }) {

      }
    })
  ],
  pages: {
    signIn: '/auth/login',
    error: '/auth/login'
  },
  callbacks: {
    async jwt ({ token, user }) {
      if (user?.data) { token = { ...user.data } }
      return token
    },
    async session ({ session, token }) {
      session.user = token
      return session
    }
  }
})
