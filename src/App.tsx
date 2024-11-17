import {
   Routes,
   Route,
} from 'react-router-dom';
import { lazy, Suspense } from 'react';
import CommonLayout from './layouts/common/CommonLayout';
import AuthenticationGuard from './components/auth/AuthenticationGuard';
import HomePageLayout from './layouts/homepage/HomePageLayout';
import HomePage from './pages/home/HomePage';
import LogoutPage from './pages/auth/LogoutPage';
import NotFound from './pages/notfound/NotFound';
import LoadingBlock from './components/layout/LoadingBlock';
import AdminGuard from './components/auth/AdminGuard';

// Lazy load components
const BookShow = lazy(() => import('./pages/books/BookShow'));
const BookBrowse = lazy(() => import('./pages/browse/BookBrowse'));
const AccountSettings = lazy(() => import('./pages/user/AccountSettings'));
const Shelves = lazy(() => import('./pages/shelves/Shelves'));
const AdminLayout = lazy(() => import('./layouts/admin/AdminLayout'));
const UsersManagement = lazy(() => import('./pages/admin/manage/UsersManagement'));
const BooksManagement = lazy(() => import('./pages/admin/manage/BooksManagement'));
const AdminHome = lazy(() => import('./pages/admin/AdminHome'));
const AnalysticDashboard = lazy(() => import('./pages/admin/dashboard/AnalysticDashboard'));
const LogsDashboard = lazy(() => import('./pages/admin/dashboard/LogsDashboard'));

export default function App() {
   return (
      <Routes>
         <Route path="*" element={<NotFound />} />
         <Route path="/" element={<HomePageLayout />} >
            <Route index element={<HomePage />} />
         </Route>
         <Route element={<CommonLayout />} >
            <Route path="/browse/*" element={
               <Suspense fallback={<LoadingBlock className='h-[60vh] w-full' />}>
                  <BookBrowse />
               </Suspense>
            } />
            <Route path="/books/:bookId" element={
               <Suspense fallback={<LoadingBlock className='h-[60vh] w-full' />}>
                  <BookShow />
               </Suspense>
            } />
            <Route path="/author" element={<div>user</div>} />
         </Route>
         <Route element={<AuthenticationGuard component={CommonLayout} />}>
            <Route path="/shelves" element={
               <Suspense fallback={<LoadingBlock className='h-[60vh] w-full' />}>
                  <Shelves />
               </Suspense>
            } />
            <Route path="/settings" element={
               <Suspense fallback={<LoadingBlock className='h-[60vh] w-full' />}>
                  <AccountSettings />
               </Suspense>
            } />
         </Route>
         <Route path="/logout" element={<LogoutPage />} />
         <Route path="/admin" element={
            <Suspense fallback={<LoadingBlock className='h-[60vh] w-full' />}>
               <AdminGuard component={AdminLayout} />
            </Suspense>
         }>
            <Route index element={<AdminHome />} />
            <Route path="management/users" element={<UsersManagement />} />
            <Route path="management/books" element={<BooksManagement />} />
            <Route path="dashboard/analystics" element={<AnalysticDashboard />} />
            <Route path="dashboard/logs" element={<LogsDashboard />} />
         </Route>
      </Routes>
   );
}