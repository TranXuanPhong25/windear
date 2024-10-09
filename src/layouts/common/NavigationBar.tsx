import { useState } from "react"
import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from "@/components/ui/accordion"
import { Input } from "@/components/ui/input";
import clsx from "clsx";
import { Menu, Search, Bell, User } from "lucide-react"

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
const user = {
   name: 'Tom Cook',
   email: 'tom@example.com'
}
const userNavigation = [
   { name: 'Your Profile', href: '/user/profile' },
   { name: 'Settings', href: '/user/settings' },
   { name: 'Sign out', href: '/login?logout' },
]
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
   const toggleMenu = () => setIsOpen(!isOpen);
   return (
      <nav className="bg-gray-800">
         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
               <div className="flex items-center">
                  <div className="flex-shrink-0">
                     <Link to="/">
                        <img
                           className="h-8 w-8"
                           src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                           alt="Windear Logo"
                        />
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

               <div className="ml-4 flex items-center md:ml-6 [&>*]:px-2">
                  <div className="hidden md:block">
                     <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input type="search" placeholder="Search..." className="pl-8 w-[200px] lg:w-[300px]" />
                     </div>
                  </div>
                  <Button variant="ghost" size="icon" className="hidden md:inline-flex  hover:bg-gray-700">
                     <Link to="/notifications">
                        <Bell className="h-5 w-5" color="#fff" />
                     </Link>
                     <span className="sr-only">Notifications</span>
                  </Button>
                  <Sheet>
                     <SheetTrigger className="flex items-center">
                        <Button variant="ghost" size="icon" className="hidden md:inline-flex hover:bg-gray-700">
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
               </div>

               <div className="-mr-2 flex md:hidden">
                  <Button variant="outline" size="icon" className="md:hidden" onClick={toggleMenu}>
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