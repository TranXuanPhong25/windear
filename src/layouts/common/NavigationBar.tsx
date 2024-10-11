import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from "@/components/ui/accordion"
import {
   Sheet,
   SheetContent,
   SheetDescription,
   SheetHeader,
   SheetTitle,
   SheetTrigger
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"

import { useState } from "react"
import clsx from "clsx";
import { Menu, Search, Bell, User } from "lucide-react"

import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/auth/useAuth";

// const user = {
//    name: 'Tom Cook',
//    email: 'tom@example.com'
// }

// const userNavigation = [
//    { name: 'Your Profile', href: '/user/profile' },
//    { name: 'Settings', href: '/user/settings' },
//    { name: 'Sign out', href: '/login?logout' },
// ]
const navigation = [
   { name: 'Home', href: '/', current: true, children: null },
   { name: 'My Shelf', href: '/shelves', current: false, children: null },
   {
      name: 'Browse', href: '/', current: false, children: [
         { name: 'Books', href: '/browse/books' },
         { name: 'Authors', href: '/browse/authors' },
         { name: 'Genres', href: '/browse/genres' }

      ]
   },
];

export default function NavigationBar() {
   const [isOpen, setIsOpen] = useState<boolean>(false);
   const auth = useAuth();
   console.log(auth.user)
   const toggleMenu = () => setIsOpen(!isOpen);
   return (
      <nav className="bg-gray-800">
         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
                  <div className="hidden md:block">
                     <div className="ml-5 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                           <Link
                              key={item.name}
                              to={item.href}
                              className={clsx(
                                 item.current
                                    ? 'bg-gray-900 text-white'
                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                 'px-3 py-2 rounded-md text-sm font-medium '
                              )}
                              aria-current={item.current ? 'page' : undefined}
                           >
                              {item.name}
                           </Link>
                        ))}
                     </div>
                  </div>
               </div>

               <div className="ml-4 flex items-center md:ml-6 [&>*]:mx-1">
                  <div className="hidden md:block">
                     <div className="relative">
                        <Label htmlFor="search-in-nav">
                           <Search className="absolute left-2 top-2.5 h-5 w-5 text-muted-foreground cursor-pointer" />
                        </Label>
                        <Input id='search-in-nav' type="search" placeholder="Search books" className="pl-8 w-[250px] lg:w-[350px]" />

                     </div>
                  </div>
                  <Link to="/notifications">
                     <Button variant="ghost" size="icon" className="hover:bg-gray-700">
                        <Bell className="h-5 w-" color="#fff" />
                        <span className="sr-only">Notifications</span>
                     </Button>
                  </Link>
                  {
                     auth.user?  (
                        <Sheet>

                           <SheetTrigger className="flex items-center" asChild>
                              <Button variant="ghost" size="icon" className="hover:bg-gray-700">
                                 <User className="h-5 w-5" color="#fff" />
                                 <span className="sr-only">User menu</span>
                              </Button>

                           </SheetTrigger>
                           <SheetContent className="w-[400px] sm:w-[540px]">
                              <SheetHeader>
                                 <SheetTitle>Are you absolutely sure?</SheetTitle>
                                 <SheetDescription>
                                    This action cannot be undone. This will permanently delete your account
                                    and remove your data from our servers.
                                 </SheetDescription>
                              </SheetHeader>
                           </SheetContent>
                        </Sheet>
                     ):
                  (
                     <>
                        <Link to="/login" className="ml-3 relative">
                           <Button >Sign in</Button>
                        </Link>
                        <div className="ml-3 relative">
                           <Button variant="ghost">Sign out</Button>
                        </div></>
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
      </nav>
   )
}