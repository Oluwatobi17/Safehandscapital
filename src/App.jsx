import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "../src/styles/App.scss";
import Bonuses from "./pages/Bonuses";
import CreateAccount from "./pages/CreateAccount";
import Dashboard from "./pages/Dashboard";
import DashBoardContent from "./pages/DashBoardContent";
import DashboardSuspended from "./pages/DashBoardSuspended";
import DashBoardWarning from "./pages/DashBoardWarning";
import Harvest from "./pages/Harvest";
import HarvestContent from "./pages/HarvestContent";
import History from "./pages/History";
import HistoryContent from "./pages/HistoryContent";
import Invoices from "./pages/Invoices";
import InvoicesContent from "./pages/InvoicesContent";
import InvoicesView from "./pages/InvoicesView";
import Login from "./pages/Login";
import Referrals from "./pages/Referral";
import ReferralContent from "./pages/ReferralContent";
import Signup from "./pages/Signup";
import Trade from "./pages/Trade";
import TradeContent from "./pages/TradeContent";
import TradeContentErr from "./pages/TradeContentErr";
import TradeSubscribed from "./pages/TradeSubscribed";
import Verify from "./pages/Verify";
import HomePage from "./pages/HomePage";
import DashboardHome from "./pages/DashboardHome";
import AboutPage from "./pages/AboutPage";
import Terms from "./pages/Terms";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import ContactPage from "./pages/Contact";
import Privacy from "./pages/Privacy";
import TrackPayment from "./pages/TrackPayment";
import Leaderboard from "./pages/Leaderboard";
import NotFoundPage from './pages/NotFoundPage';
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  const Authed = useSelector((state) => state.token);
  const RequireAuth = ({ children }) => {
    return Authed != null ? children : <Navigate to="/login" />;
  };
  return (
    <div className="App">
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact-us" element={<ContactPage />} />
          <Route path="t-and-c" element={<Terms />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="create" element={<CreateAccount />} />
          <Route path="signup" element={<Signup />} />
          <Route path="verify" element={<Verify />} />
          <Route path="login" element={<Login />} />
          <Route path="forgotpassword" element={<ForgotPassword />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        >
          <Route path="home" element={<DashboardHome />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="track" element={<TrackPayment />} />
          <Route path="trade">
            <Route index element={<Trade />} />
            <Route path="subscribed" element={<TradeSubscribed />} />
            <Route path="content" element={<TradeContent />} />
            <Route path="error" element={<TradeContentErr />} />
          </Route>
          <Route path="history">
            <Route index element={<History />} />
            <Route path="content" element={<HistoryContent />} />
          </Route>
          <Route path="referrals">
            <Route index element={<Referrals />} />
            <Route path="content" element={<ReferralContent />} />
          </Route>
          <Route path="bonuses" element={<Bonuses />} />
          <Route path="invoices">
            <Route index element={<Invoices />} />
            <Route path="content" element={<InvoicesContent />} />
            <Route path=":id" element={<InvoicesView />} />
          </Route>
          <Route path="harvest">
            <Route index element={<Harvest />} />
            <Route path="content" element={<HarvestContent />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
