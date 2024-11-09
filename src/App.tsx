import {
   Routes,
   Route,
} from 'react-router-dom';

import CommonLayout from './layouts/common/CommonLayout';
import AuthenticationGuard from './components/auth/AuthenticationGuard';

import HomePage from './pages/home/HomePage';
// import LogoutPage from './pages/auth/LogoutPage';
import BookShow from './pages/books/BookShow';
import NotFound from './pages/notfound/NotFound';
import LogoutPage from './pages/auth/LogoutPage';
import BookBrowse from './pages/browse/BookBrowse';
import Shelves from './pages/shelves/Shelves';
import HomePageLayout from './layouts/homepage/HomePageLayout';
import AdminLayout from './layouts/admin/AdminLayout';
import UsersManagement from './pages/admin/manage/UsersManagement';
import BooksManagement from './pages/admin/manage/BooksManagement';
import AdminHome from './pages/admin/AdminHome';
import AnalysticDashboard from './pages/admin/dashboard/AnalysticDashboard';
import LogsDashboard from './pages/admin/dashboard/LogsDashboard';
import AdminGuard from './components/auth/AdminGuard';
import AccountSettings from './pages/user/AccountSettings';
export default function App() {
   return (
      <Routes>

         <Route>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<HomePageLayout />} >
               <Route index element={<HomePage />} />
            </Route>
            <Route element={<CommonLayout />} >
               <Route path="/shelves" element={<Shelves />} />
               <Route path="/browse/*" element={<BookBrowse />} />
               {/* <Route path="/books/" element={<div>book</div>} /> */}
               <Route path="/books/:bookId" element={<BookShow />} />
               <Route path="/author" element={<div>user</div>} />
            </Route>
            <Route element={<AuthenticationGuard component={CommonLayout} />}>
               <Route path="settings" element={<AccountSettings />} />
            </Route>

            <Route path="/logout" element={<LogoutPage />} />
            <Route path="/admin" element={<AdminGuard component={AdminLayout} />} >
               <Route index element={<AdminHome />} />
               <Route path="management/users" element={<UsersManagement />} />
               <Route path="management/books" element={<BooksManagement />} />
               <Route path="dashboard/analystics" element={<AnalysticDashboard />} />
               <Route path="dashboard/logs" element={<LogsDashboard />} />
            </Route>
         </Route>
         
      </Routes>
   );
}