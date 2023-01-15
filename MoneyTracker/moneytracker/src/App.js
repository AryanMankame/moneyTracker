import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import TransactionHistory from "./TransactionHistory";
import Home from './Home';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<SignInForm />} />
        <Route path = "/sign-in" element = {<SignUpForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/history" element={<TransactionHistory />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
