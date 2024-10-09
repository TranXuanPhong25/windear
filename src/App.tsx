import {
   Routes,
   Route,
} from 'react-router-dom';

import Layout from './layouts/common/Layout';
import { AuthProvider } from './providers/AuthProvider';
import { LoginPage } from './pages/auth/LoginPage';
import { RequireAuth } from './components/auth/RequireAuth';
import AdminDashboard from './pages/admin/AdminDashboard';
import HomePage from './pages/home/HomePage';
export default function App() {
   return (
      <AuthProvider>
         <Routes>


            <Route>
               <Route element={<Layout />} >
                  <Route path="/" element={<HomePage />} />
               </Route>
               <Route path="/login" element={<LoginPage />} />
               {/* <Route
                  path="/*"
                  element={
                     <RequireAuth needAdmin={false}>
                        <h3>Protected</h3>
                     </RequireAuth>
                  }
               /> */}
               <Route
                  path="/dashboard"
                  element={
                     <RequireAuth needAdmin>
                        <AdminDashboard />
                     </RequireAuth>
                  } />
            </Route>

         </Routes>


      </AuthProvider >
   );
}