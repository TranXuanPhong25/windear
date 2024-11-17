import { lazy, Suspense } from 'react';
const NavigationBarContent = lazy(() => import('./NavigationBarContent'));
const FloatingNav = lazy(() => import('@/components/ui/floating-nav'));
export default function NavigationBar() {
   return (
      <Suspense fallback={<NavigationBarContent />}>
         <FloatingNav>
            <NavigationBarContent />
         </FloatingNav>
      </Suspense>
   )
}