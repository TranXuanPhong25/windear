import { Book, ChevronDown, Gauge, LogOut, Users, Circle, UserRound } from "lucide-react"
import clsx from 'clsx';

import {
   Sidebar,
   SidebarContent,
   SidebarFooter,
   SidebarGroup,
   SidebarGroupContent,
   SidebarGroupLabel,
   SidebarHeader,
   SidebarMenu,
   SidebarMenuButton,
   SidebarMenuItem,
   SidebarRail,
   SidebarSeparator
} from "@/components/ui/sidebar"
import { useSidebar } from "@/contexts/sidebar/SidebarContext";
import { Link, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import ThemeSwitcher from "@/components/theme/ThemeSwitcher";
import { useState } from "react";
// Menu items.
const sidebarGroups = [
   {
      name: "Dashboard",
      groupUrl: "dashboard",
      items: [
         {
            title: "Analytics",
            url: "analystics",
            icon: Gauge
         }
      ]
   },
   {
      name: "Management",
      groupUrl: "management",
      items: [
         {
            title: "Users",
            url: "users",
            icon: Users
         },
         {
            title: "Books",
            url: "books",
            icon: Book
         }
      ]
   }
];

const userItems = [
   {
      title: "Profile",
      url: "profile",
      icon: UserRound
   }
]
export default function AdminSidebar() {
   const location = useLocation();
   const [activeButton, setActiveButton] = useState<string>(location.pathname.split("/").slice(-1)[0]);
   const { open } = useSidebar();
   return (
      <Sidebar collapsible="icon" >
         <TooltipProvider>

            <SidebarHeader className="mt-2 flex flex-row items-center">
               <Link to="/" className="ml-1 ">
                  <div className="size-9 ">
                     <img src="/react.svg" alt="icon" className=" w-full h-full" />
                  </div>
               </Link>
               <h1 className="truncate text-xl font-extrabold ">
                  Windear
               </h1>
            </SidebarHeader>
            <SidebarContent>
               {
                  sidebarGroups.map((group) => (
                     <div key={group.name}>
                        <SidebarSeparator />
                        <SidebarGroup >
                           <SidebarGroupLabel >
                              {group.name}
                           </SidebarGroupLabel>
                           <SidebarGroupContent >
                              <SidebarMenu>
                                 {
                                    group.items.map((item) => (
                                       <Tooltip key={item.title}>
                                          <TooltipTrigger>
                                             <SidebarMenuItem >
                                                <SidebarMenuButton asChild 
                                                   isActive={activeButton===item.url} 
                                                   onClick={()=>setActiveButton(item.url)}>
                                                   <Link to={`${group.groupUrl}/${item.url}`}>
                                                      <item.icon />
                                                      <span>{item.title}</span>
                                                   </Link>
                                                </SidebarMenuButton>
                                             </SidebarMenuItem>
                                          </TooltipTrigger>
                                          <TooltipContent className={clsx(open ? "hidden" : "block")}>
                                             {item.title}
                                          </TooltipContent>
                                       </Tooltip>
                                    ))
                                 }
                              </SidebarMenu>
                           </SidebarGroupContent>
                        </SidebarGroup>
                     </div>
                  ))
               }
            </SidebarContent>
            <SidebarSeparator />
            <SidebarFooter>
               <SidebarMenu>
                  <SidebarMenu>

                     <SidebarMenuItem >
                        <SidebarMenuButton asChild  >
                           <div>
                              <ThemeSwitcher text="Change Theme" />

                           </div>
                        </SidebarMenuButton>
                     </SidebarMenuItem>
                  </SidebarMenu>
                  <Collapsible className="group/collapsible pb-0">

                     <CollapsibleContent className="mb-1">
                        <SidebarMenu>
                           {userItems.map((item) => (
                              <SidebarMenuItem key={item.title}>
                                 <SidebarMenuButton asChild  >
                                    <a href={item.url}>
                                       <item.icon />
                                       <span >{item.title}</span>
                                    </a>
                                 </SidebarMenuButton>
                              </SidebarMenuItem>
                           ))}
                        </SidebarMenu>
                     </CollapsibleContent>
                     <CollapsibleTrigger className="w-full">
                        <SidebarMenuItem >
                           <SidebarMenuButton asChild className="px-2"  >
                              <div >
                                 <Avatar className={clsx("cursor-pointer", open ? "size-7" : "size-6 mr-2")}>
                                    <AvatarImage src="/react.svg" />
                                    <AvatarFallback><Circle /></AvatarFallback>
                                 </Avatar>
                                 <div className="flex flex-col ">
                                    <span className="text-sm font-semibold">Admin</span>
                                    <span className="text-xs">Windear</span>
                                 </div>
                                 <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                              </div>
                           </SidebarMenuButton>
                        </SidebarMenuItem>
                     </CollapsibleTrigger>
                     <SidebarMenu>
                        <Tooltip>
                           <TooltipTrigger>
                              <SidebarMenuItem >
                                 <SidebarMenuButton asChild  >
                                    <Link to="/logout">
                                       <LogOut />
                                       <span>Log out</span>
                                    </Link>
                                 </SidebarMenuButton>
                              </SidebarMenuItem>
                           </TooltipTrigger>
                           <TooltipContent className={clsx(open ? "hidden" : "block")}>
                              Log out
                           </TooltipContent>
                        </Tooltip>
                     </SidebarMenu>
                  </Collapsible>
               </SidebarMenu>
            </SidebarFooter>
         </TooltipProvider>

         <SidebarRail />

      </Sidebar>
   )
}
