import { Outlet, BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//Layouts
import UserLayout from '@/Layouts/UserLayout';

//Pages
import Login from "@/pages/Login";
import Create from "@/pages/Create";
import Verification from '@/pages/Verification';
import Kyc from '@/pages/Kyc';
import HomePage from "@/pages/HomePage";
import NotFound from '@/components/Not-Found';
import Operations from '@/pages/Operations';

//User Pages
import Dashboard from '@/pages/Dashboard';
import Coins from '@/pages/Coins';
import Coin from '@/pages/Coin';
import Buy from '@/pages/Buy';
import Profile from '@/pages/Profile';
import Connect from '@/pages/Connect';
import Transactions from '@/pages/Transactions';

const User = () => (
    <UserLayout>
        <Outlet />
    </UserLayout>
)

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/create" element={<Create />} />
                <Route path="/verification" element={<Verification />} />
                <Route path="/login" element={<Login />} />
                <Route path="/kyc" element={<Kyc />} />
                <Route path="/" element={<HomePage />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/operations" element={<Operations />} />

                {/* User Routes */}
                <Route path="/user" element={<User />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="coins" element={<Coins />} />
                    <Route path="coin" element={<Coin />} />
                    <Route path="buy" element={<Buy />} />
                    <Route path="account" element={<Profile />} />
                    <Route path="connect" element={<Connect />} />
                    <Route path="transactions" element={<Transactions />} />
                </Route>

            </Routes>
        </Router>
    );
}

export default AppRoutes;