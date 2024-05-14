
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NotFound from './404';
import SignIn from './components/sign-in/SignIn';
import SignUp from './components/sign-up/SignUp';
import Verify from './components/verify/verify';
import ForgotPassword from './components/forgot-password/ForgotPassword';
import ResetPassword from './components/reset-password/ResetPassword';
import Home from './components/home/Home';

function App() {

  return (
    <Router>
      <Routes>
        {/* Use element prop to render components */}
        <Route path="*" element={<NotFound />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/verify/:id" element={<Verify />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:id" element={<ResetPassword />} />
        {/* Other routes */}
      </Routes>
    </Router>

  )
}

export default App
