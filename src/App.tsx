import {
   Routes,
   Route,
} from 'react-router-dom';

import Layout from './layouts/common/Layout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AuthenticationGuard from './components/auth/AuthenticationGuard';
import HomePage from './pages/home/HomePage';
// import LogoutPage from './pages/auth/LogoutPage';
import BookShow from './pages/books/BookShow';
import NotFound from './pages/notfound/NotFound';
import LogoutPage from './pages/auth/LogoutPage';
export default function App() {
   return (

      <Routes>
         <Route>
            <Route path="*" element={<NotFound />} />
            <Route element={<Layout />} >
               <Route path="/" element={<HomePage />} />
               <Route path="/shelves" element={<div>shelves</div>} />
               <Route path="/browse/*" element={<div>browse</div>} />
               <Route path="/books/" element={<div>book</div>} />
               <Route path="/books/:bookId" element={<BookShow />} />
               <Route path="/user/notifications" element={<div>noti</div>} />
               <Route path="/user/" element={<div>user</div>} />
               <Route path="/user/:id" element={<div>user with id</div>} />


            </Route>
            <Route path="/logout" element={<LogoutPage/>} />
            {/* <Route
                  path="/*"
                  element={
                     <RequireAuth needAdmin={false}>
                        <h3>Protected</h3>
                     </RequireAuth>
                  }
               /> */}
            <Route
               path="/admin/*"
               element={
                  <AuthenticationGuard component={AdminDashboard} />
               } />
         </Route>

      </Routes>
   );
}