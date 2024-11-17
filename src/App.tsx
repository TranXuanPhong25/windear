import {
   Routes,
   Route,
} from 'react-router-dom';
import { lazy, Suspense } from 'react';
import CommonLayout from './layouts/common/CommonLayout';
import AuthenticationGuard from './components/auth/AuthenticationGuard';
const HomePageLayout = lazy(() => import('./layouts/homepage/HomePageLayout'));
import LogoutPage from './pages/auth/LogoutPage';
import NotFound from './pages/notfound/NotFound';
import LoadingBlock from './components/layout/LoadingBlock';
import AdminGuard from './components/auth/AdminGuard';

// Lazy load components
const HomePage = lazy(() => import('./pages/home/HomePage'));
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
         <Route path="/" element={
            <Suspense fallback={<LoadingBlock className='h-screen w-full' />}>
               <HomePageLayout />
            </Suspense>
         } >

            <Route index element={
               <Suspense fallback={<LoadingBlock className='h-[60vh] w-full' />}>
                  <HomePage />
               </Suspense>
            } />
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
            <Suspense fallback={<LoadingBlock className='h-screen w-full dark:bg-gray-800' />}>
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