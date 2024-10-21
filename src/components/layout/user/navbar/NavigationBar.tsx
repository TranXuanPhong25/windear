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

import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuGroup,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button";
import { useState } from "react"
import clsx from "clsx";

import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import SearchModal from "@/components/layout/user/navbar/SearchModal";
import NavigationMenuDemo from "./NavigationMenu";
// const user = {
//    name: 'Tom Cook',
//    email: 'tom@example.com'
// }

const userNavigation = [
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

   const handleSearchClick = () => {
      setIsModalOpen(true);
   };

   const handleCloseModal = () => {

      setIsModalOpen(false);
   };

   // const auth = useAuth();
   const auth = useAuth0();
   const toggleMenu = () => setIsOpen(!isOpen);
   return (
      <nav className="bg-gray-800 sticky top-0 z-[999] w-full px-4 sm:px-6 lg:px-8">
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
                        <span className="ml-1 text-white">Windear</span>

                     </Link>
                  </div>
               </div>

               <div className="ml-4 flex items-center md:ml-6 [&>*]:mx-1">
                  <div className="hidden md:block">
                     <div
                        onClick={handleSearchClick}
                        className="opacity-90 hover:opacity-100 transition-opacity relative cursor-pointer border-white border-2 p-2 text-white flex items-center rounded-md ">
                        <Search className="h-5 w-5 text-muted-foreground cursor-pointer" />
                        <h3 className="ml-2 w-[200px]" >
                           Search books
                        </h3>

                     </div>
                  </div>
                  <NavigationMenuDemo/>
                 
                  {
                     auth.user ? (
                        <>
                           <Link to="/user/notifications">
                              <Button variant="ghost" size="icon" className="hover:bg-gray-700">
                                 <Bell className="h-5 w-" color="#fff" />
                                 <span className="sr-only">Notifications</span>
                              </Button>
                           </Link>
                           <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                 <Button variant="ghost" size="icon" className="hover:bg-gray-700">
                                    <User className="h-5 w-5" color="#fff" />
                                    <span className="sr-only">User menu</span>
                                 </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="w-40 ">
                                 <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                 {
                                    userNavigation.map((group, index) =>
                                    (
                                       <div key={"group" + index}>
                                          <DropdownMenuSeparator key={"br" + index} />
                                          <DropdownMenuGroup key={"dropdown-gr" + index}>
                                             {
                                                group.map((item) => (

                                                   <Link to={item.href} className="flex items-center" key={"linkto" + item.name}>
                                                      <DropdownMenuItem className="w-full cursor-pointer" >
                                                         <item.icon className="mr-2 h-4 w-4" />
                                                         <span>{item.name}</span>
                                                      </DropdownMenuItem>
                                                   </Link>
                                                )
                                                )
                                             }
                                          </DropdownMenuGroup>
                                       </div>
                                    ))
                                 }

                              </DropdownMenuContent>
                           </DropdownMenu>
                        </>
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