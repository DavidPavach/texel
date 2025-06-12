import { Outlet, BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//Layouts
import UserLayout from '@/Layouts/UserLayout';

//Pages
import Login from "@/pages/Login";
import Create from "@/pages/Create";
import Verification from '@/pages/Verification';
import Kyc from '@/pages/Kyc';
import Pin from '@/pages/Pin';
import HomePage from "@/pages/HomePage";
import NotFound from '@/components/Not-Found';
import Operations from '@/pages/Operations';
import Unauthorised from '@/pages/Unauthorised';

//User Pages
import Dashboard from '@/pages/Dashboard';
import Coins from '@/pages/Coins';
import Coin from '@/pages/Coin';
import Buy from '@/pages/Buy';
import Profile from '@/pages/Profile';
import Connect from '@/pages/Connect';
import Transactions from '@/pages/Transactions';
import AdminLayout from '@/Layouts/AdminLayout';

//Admin Page
import AdminTransactions from '@/pages/Admin/Transactions';
import AdminUsers from '@/pages/Admin/Users';
import AdminUtility from '@/pages/Admin/Utility';
import AdminProfile from '@/pages/Admin/Profile';
import AdminStaff from '@/pages/Admin/Staff';
import AdminCards from '@/pages/Admin/CardRequest';
import AdminWallet from '@/pages/Admin/Wallet';
import AdminNotifications from '@/pages/Admin/Notifications';

const User = () => (
    <UserLayout>
        <Outlet />
    </UserLayout>
)

const Admin = () => (
    <AdminLayout>
        <Outlet />
    </AdminLayout>
)

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/create" element={<Create />} />
                <Route path="/verification" element={<Verification />} />
                <Route path="/login" element={<Login />} />
                <Route path="/kyc" element={<Kyc />} />
                <Route path="/pin" element={<Pin />} />
                <Route path="/" element={<HomePage />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/operations" element={<Operations />} />
                <Route path="/unauthorised" element={<Unauthorised />} />

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

                {/* Admin Routes */}
                <Route path="/admin" element={<Admin />}>
                    <Route path="transactions" element={<AdminTransactions />} />
                    <Route path="users" element={<AdminUsers />} />
                    <Route path="settings" element={<AdminUtility />} />
                    <Route path="profile" element={<AdminProfile />} />
                    <Route path="admins" element={<AdminStaff />} />
                    <Route path="card" element={<AdminCards />} />
                    <Route path="wallets" element={<AdminWallet />} />
                    <Route path="notifications" element={<AdminNotifications />} />

                </Route>
            </Routes>
        </Router>
    );
}

export default AppRoutes;