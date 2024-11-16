import {
   Routes,
   Route,
} from 'react-router-dom';

import CommonLayout from './layouts/common/CommonLayout';
import AuthenticationGuard from './components/auth/AuthenticationGuard';

import HomePageLayout from './layouts/homepage/HomePageLayout';
import HomePage from './pages/home/HomePage';

import LogoutPage from './pages/auth/LogoutPage';

import NotFound from './pages/notfound/NotFound';

import BookShow from './pages/books/BookShow';
import BookBrowse from './pages/browse/BookBrowse';
// import Shelves from './pages/shelves/Shelves';
import { lazy, Suspense } from 'react';
const AccountSettings = lazy(() => import('./pages/user/AccountSettings'));
const Shelves = lazy(() => import('./pages/shelves/Shelves'));

import AdminLayout from './layouts/admin/AdminLayout';
import UsersManagement from './pages/admin/manage/UsersManagement';
import BooksManagement from './pages/admin/manage/BooksManagement';
import AdminHome from './pages/admin/AdminHome';
import AnalysticDashboard from './pages/admin/dashboard/AnalysticDashboard';
import LogsDashboard from './pages/admin/dashboard/LogsDashboard';
import AdminGuard from './components/auth/AdminGuard';
import LoadingBlock from './components/layout/LoadingBlock';
export default function App() {
   return (
      <Routes>
         <Route>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<HomePageLayout />} >
               <Route index element={<HomePage />} />
            </Route>
            <Route element={<CommonLayout />} >
               <Route path="/browse/*" element={<BookBrowse />} />
               {/* <Route path="/books/" element={<div>book</div>} /> */}
               <Route path="/books/:bookId" element={<BookShow />} />
               <Route path="/author" element={<div>user</div>} />
            </Route>
            <Route element={<AuthenticationGuard component={CommonLayout} />}>
               <Route path="/shelves" element={
                 <Suspense fallback={<LoadingBlock/>}>
                   <Shelves />
                 </Suspense>
               } />
               <Route path="/settings" element={
                 <Suspense fallback={<LoadingBlock/>}>
                   <AccountSettings />
                 </Suspense>
               } />
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