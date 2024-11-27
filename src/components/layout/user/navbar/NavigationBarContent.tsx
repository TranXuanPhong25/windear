
import {

   LogOut,
   Search, Bell,
   Settings,
   LibraryBig, User
} from "lucide-react"


import { Button } from "@/components/ui/button";
import { useState } from "react"

import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import SearchModal from "@/components/layout/user/navbar/SearchModal";
import MyNavigationMenu from "./NavigationMenu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import ThemeSwitcher from "@/components/theme/ThemeSwitcher";

const userNavigation = [
   [
      { name: "Notifications", href: "/notifications", icon: Bell }
   ],
   [
      { name: 'My shelves', href: '/shelves', icon: LibraryBig },
      { name: 'Settings', href: '/settings', icon: Settings },
   ],
   [
      { name: 'Sign out', href: '/logout', icon: LogOut },
   ]
]
export default function NavigationBarContent() {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const handleSearchClick = () => {
      setIsModalOpen(true);
   };

   const handleCloseModal = () => {

      setIsModalOpen(false);
   };
   const auth = useAuth0();

   return (
      <nav className="dark:bg-gray-800 bg-transparent sticky top-0 z-[30] w-full px-2 sm:px-5 lg:px-8 py-1 ">
         <div className="mx-auto max-w-7xl ">
            <div className="flex h-16 items-center justify-between">
               <div className="flex items-center">
                  <div className="flex-shrink-0">
                     <Link to="/" className="flex items-center">
                        <img
                           className="h-8 w-8"
                           src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                           alt="Windear Logo"
                        />
                        <span className="ml-1 dark:text-white hidden md:block">Windear</span>

                     </Link>
                  </div>
               </div>

               <div className="ml-4 flex items-center md:ml-6 [&>*]:mx-1">
                  <div className="dark:bg-gray-700/60 backdrop-blur-[4px] bg-slate-300/60 rounded-md md:block hidden">
                     <div
                        onClick={handleSearchClick}
                        className="opacity-90 hover:opacity-100 transition-opacity relative cursor-pointer dark:border-white border-2 p-2 dark:text-white flex items-center rounded-md ">
                        <Search className="h-5 w-5 text-muted-foreground cursor-pointer" />
                        <h3 className="ml-2 w-[200px]" >
                           Search books
                        </h3>

                     </div>
                  </div>
                  <div className="block md:hidden"  onClick={handleSearchClick}>
                     <Search className="h-5 w-5 text-muted-foreground cursor-pointer" />
                  </div>
                  <MyNavigationMenu />
                  <div className="hidden md:block">
                     <ThemeSwitcher />
                  </div>

                  {
                     auth.user  ? (

                        <div className="group relative px-2">

                           <div className="border-4 border-gray-200 rounded-full hover:border-4 hover:border-white hover:[&>*]:contrast-75">
                              <Avatar className="cursor-pointer">
                                 <AvatarImage src={auth.user.picture} />
                                 <AvatarFallback></AvatarFallback>
                              </Avatar>
                           </div>

                           {/*indicator*/}
                           <div className="w-4 h-3 bg-gray-800 rounded-t-full z-10  border-2  border-gray-600 border-b-gray-800 absolute top-[38px] right-6 hidden group-hover:block" />

                           <div className=" absolute right-0 w-[180px] bg-gray-800 hidden group-hover:block top-12 rounded-lg border-2 border-gray-600 text-white">
                              {
                                 userNavigation.map((group, index) => (
                                    <div key={"user-menu" + index}>
                                       {index != 0 && <Separator className="bg-gray-600" />}
                                       <div className="p-2">
                                          {
                                             group.map(item => (
                                                <Link to={item.href} key={"usernav" + item.href} className="flex hover:bg-purple-500 p-2 rounded-md items-center" >
                                                   <item.icon className="size-5 mr-2   " />
                                                   <h1> {item.name}</h1>
                                                </Link>
                                             ))
                                          }
                                       </div>
                                    </div>
                                 )
                                 )
                              }
                           </div>
                        </div>

                     ) :
                        (
                           <Button onClick={() => auth.loginWithPopup()} className=" bg-white text-black hover:text-white  px-2"><User/></Button>
                        )
                  }


               </div>


            </div>
         </div>
         <SearchModal isOpen={isModalOpen} onClose={handleCloseModal} />
      </nav>
   )
}