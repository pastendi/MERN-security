import styled from 'styled-components'
import { global } from './globalStyle'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard'
import Layout from './pages/Layout'
import { ToastContainer } from 'react-toastify'
import ForgotPassword from './pages/Auth/ForgotPassword'
import ResetPassword from './pages/Auth/ResetPassword'
import TwoFactor from './pages/Auth/TwoFactor'
import ChangePassword from './pages/Auth/ChangePassword'
import Users from './pages/Users/Users'
import Verify from './pages/Auth/Verify'
function App() {
  return (
    <Wrapper>
      <BrowserRouter>
        <ToastContainer
          position='top-right'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'
        />
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path='forgot-password' element={<ForgotPassword />} />
            <Route
              path='reset-password/:resetToken'
              element={<ResetPassword />}
            />
            <Route path='change-password' element={<ChangePassword />} />
            <Route path='access-verification/:email' element={<TwoFactor />} />
            <Route path='verify/:verificationToken' element={<Verify />} />
            <Route path='users' element={<Users />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  max-width: ${global.maxWidth};
  margin: 0 auto;
`
export default App
