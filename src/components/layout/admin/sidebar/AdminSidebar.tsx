import { Calendar, ChevronDown, Home, Inbox, LogOut, Search, User } from "lucide-react"
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
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import ThemeSwitcher from "@/components/theme/ThemeSwitcher";
// Menu items.
const items = [
   {
      title: "Home",
      url: "#",
      icon: Home,
   },
   {
      title: "Inbox",
      url: "#",
      icon: Inbox,
   },
   {
      title: "Calendar",
      url: "#",
      icon: Calendar,
   },
   {
      title: "Search",
      url: "#",
      icon: Search,
   }
]

export default function AdminSidebar() {
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
               <h1 className="truncate text-xl font-semibold">
                  Windear Library
               </h1>
            </SidebarHeader>
            <SidebarContent>
               <SidebarSeparator />
               <SidebarGroup>
                  <SidebarGroupLabel >
                     Management
                  </SidebarGroupLabel>
                  <SidebarGroupContent >
                     <SidebarMenu>
                        {items.map((item) => (
                           <Tooltip>
                              <TooltipTrigger>
                                 <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild  >
                                       <a href={item.url}>
                                          <item.icon />
                                          <span >{item.title}</span>
                                       </a>
                                    </SidebarMenuButton>
                                 </SidebarMenuItem>
                              </TooltipTrigger>
                              <TooltipContent className={clsx(open ? "hidden" : "block")}>
                                 {item.title}
                              </TooltipContent>
                           </Tooltip>
                        ))}
                     </SidebarMenu>
                  </SidebarGroupContent>
                  <SidebarSeparator />
               </SidebarGroup>
            </SidebarContent>
            <SidebarSeparator />
            <SidebarSeparator />
            <SidebarFooter>

               <SidebarMenu>
                  <SidebarMenu>

                     <SidebarMenuItem >
                        <SidebarMenuButton asChild  >
                           <div>
                              <ThemeSwitcher text="Change Theme"/>
                              
                           </div>
                        </SidebarMenuButton>
                     </SidebarMenuItem>
                  </SidebarMenu>
                  <Collapsible className="group/collapsible pb-0">

                     <CollapsibleContent className="mb-1">
                        <SidebarMenu>
                           {items.map((item) => (
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
                           <SidebarMenuButton asChild className="px-2 "  >
                              <div >
                                 <Avatar className={clsx("cursor-pointer", open ? "size-7" : "size-6 mr-2")}>
                                    <AvatarImage src="/react.svg" />
                                    <AvatarFallback><User /></AvatarFallback>
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
                     <SidebarMenuItem >
                        <SidebarMenuButton asChild  >
                           <a href={"#"}>
                              <LogOut />
                              <span>Log out</span>
                           </a>
                        </SidebarMenuButton>
                     </SidebarMenuItem>
                  </Collapsible>
               </SidebarMenu>
            </SidebarFooter>
         </TooltipProvider>

         <SidebarRail />

      </Sidebar>
   )
}
