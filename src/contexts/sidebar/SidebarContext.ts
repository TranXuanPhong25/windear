import { useContext, createContext } from 'react';
type SidebarContext = {
   state: "expanded" | "collapsed"
   open: boolean
   setOpen: (open: boolean) => void
   openMobile: boolean
   setOpenMobile: (open: boolean) => void
   isMobile: boolean
   toggleSidebar: () => void
}

const SidebarContext = createContext<SidebarContext | null>(null)

function useSidebar() {
   const context = useContext(SidebarContext)
   if (!context) {
      throw new Error("useSidebar must be used within a SidebarProvider.")
   }

   return context
}

export {
   useSidebar,
   SidebarContext
};
