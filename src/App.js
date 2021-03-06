import Header from "./components/Header";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserProfile from "./pages/UserProfile";
import Transactions from "./pages/Transactions";
import EditUser from "./pages/EditUser";
import QrCode from "./pages/QrCode";
import PaymentPage from "./pages/PaymentPage";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <div className="App">
      <Router>
        <Header title="PocketBooks Poker" />
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/qr" element={<QrCode />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/user/:id" element={<UserProfile />} />
          <Route exact path="/transactions" element={<Transactions />} />
          <Route exact path="/edit/:id" element={<EditUser />} />
          <Route exact path="/payments" element={<PaymentPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
