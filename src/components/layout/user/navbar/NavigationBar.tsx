import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from "@/components/ui/accordion"
import {

   LogOut,
   User,
   Menu, Search, Bell,
   Settings
} from "lucide-react"


import { Button } from "@/components/ui/button";
import { useState } from "react"
import clsx from "clsx";

import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import SearchModal from "@/components/layout/user/navbar/SearchModal";
import MyNavigationMenu from "./NavigationMenu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

// const user = {
//    name: 'Tom Cook',
//    email: 'tom@example.com'
// }
const useTheme = ()=>{
   
   const [theme, setCurrentTheme] = useState<string>(localStorage.getItem("theme") || "light");
   const setTheme = (targetTheme: string) => {
      setCurrentTheme(targetTheme);
      localStorage.setItem("theme", targetTheme);
   }
   return {
      theme,
      setTheme
   }
}
const userNavigation = [
   [{ name: "Notifications", href: "user/", icon: Bell }],
   [

      { name: 'Your Profile', href: '/user/profile', icon: User },
      { name: 'Settings', href: '/user/settings', icon: Settings },
   ],
   [
      { name: 'Sign out', href: '/logout', icon: LogOut },
   ]
]
const navigation = [
   { name: 'Home', href: '/', current: true, children: null },
   { name: 'My Shelf', href: '/shelves', current: false, children: null },
   {
      name: 'Browse', href: '/browse', current: false, children: [
         { name: 'Books', href: '/browse/books' },
         { name: 'Authors', href: '/browse/authors' },
         { name: 'Genres', href: '/browse/genres' }
      ]
   },
];

export default function NavigationBar() {
   const [isOpen, setIsOpen] = useState<boolean>(false);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const { theme, setTheme } = useTheme();
   const handleSearchClick = () => {
      setIsModalOpen(true);
   };

   const handleCloseModal = () => {

      setIsModalOpen(false);
   };

   // const auth = useAuth();
   const auth = useAuth0();
   const toggleMenu = () => setIsOpen(!isOpen);
   const toggleTheme = () => {
      setTheme(theme == "light" ? "dark" : "light");
      document.querySelector("#root")?.classList.toggle("dark");
      document.querySelector("#root")?.classList.toggle("light");
      
   };
   return (
      <nav className="dark:bg-gray-800 bg-white sticky top-0 z-[999] w-full px-4 sm:px-6 lg:px-8 py-1">
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
                        <span className="ml-1 dark:text-white">Windear</span>

                     </Link>
                  </div>
               </div>

               <div className="ml-4 flex items-center md:ml-6 [&>*]:mx-1">
                  <div className="hidden md:block">
                     <div
                        onClick={handleSearchClick}
                        className="opacity-90 hover:opacity-100 transition-opacity relative cursor-pointer dark:border-white border-2 p-2 dark:text-white flex items-center rounded-md ">
                        <Search className="h-5 w-5 text-muted-foreground cursor-pointer" />
                        <h3 className="ml-2 w-[200px]" >
                           Search books
                        </h3>

                     </div>
                  </div>
                  <MyNavigationMenu />
                  <Button onClick={toggleTheme} className="dark:bg-gray-800  dark:text-white dark:hover:bg-gray-900 bg-white text-black hover:text-white hover:bg-gray-400" >
                     O
                  </Button>
                  {
                     auth.user ? (

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
                                                <Link to={item.href} className="flex hover:bg-purple-500 p-2 rounded-md items-center">
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
                           <>
                              {/* <Link to="/" className="ml-3 relative"> */}
                              <Button onClick={() => auth.loginWithPopup()} className=" bg-white text-black hover:text-white ">Sign in</Button>
                              {/* </Link> */}

                           </>
                        )
                  }

                  <Button variant="outline" size="icon" className="-mr-2 flex md:hidden" onClick={toggleMenu}>
                     <Menu className="h-6 w-6 " />
                     <span className="sr-only">Toggle menu</span>
                  </Button>

               </div>


            </div>
         </div>
         {/* Mobile menu, show/hide based on menu state. */}



         {isOpen && (
            <Accordion type="single" collapsible className="md:hidden">
               {
                  navigation.map((item) => (
                     item.children ? (
                        <AccordionItem key={item.name} value={item.name}>
                           <AccordionTrigger className={clsx(
                              item.current
                                 ? 'bg-gray-900 text-white'
                                 : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'px-4'
                           )}>
                              {item.name}
                           </AccordionTrigger>
                           <AccordionContent>
                              <ul className="py-2">
                                 {item.children.map((child) => (
                                    <li key={child.name}>
                                       <Link to={child.href}
                                          className={clsx(
                                             item.current
                                                ? 'bg-gray-900 text-white'
                                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                             'block px-6 py-2 hover:bg-accent'
                                          )}>{child.name}</Link>
                                    </li>
                                 ))}
                              </ul>
                           </AccordionContent>
                        </AccordionItem>
                     ) : (

                        <AccordionItem key={item.name} value={item.name}>
                           <Link
                              key={item.name}
                              to={item.href}
                              className={clsx(
                                 item.current
                                    ? 'bg-gray-900 text-white'
                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                 'flex flex-1 items-center justify-between py-4 px-4 font-medium transition-all hover:underline  [&[data-state=open]>svg]:rotate-180 '
                              )}
                              aria-current={item.current ? 'page' : undefined}
                           >
                              {item.name}
                           </Link>

                        </AccordionItem>
                     )

                  ))
               }

            </Accordion>
         )}
         <SearchModal isOpen={isModalOpen} onClose={handleCloseModal} />
      </nav>
   )
}