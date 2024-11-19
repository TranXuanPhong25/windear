import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AdminSidebar from "@/components/layout/admin/sidebar/AdminSidebar"
import { Link, Outlet, useLocation } from "react-router-dom"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import React from "react";

export default function AdminLayout() {
  const location = useLocation();
  const path = location.pathname.split("/").slice(1, -1);
  return (
    <SidebarProvider>
      <AdminSidebar />

      <main className=" pt-6 w-full bg-sidebar">
        <div className=" pl-4 md:pl-0 flex items-center mb-6">
          <SidebarTrigger />
          <Breadcrumb className="ml-2">
            <BreadcrumbList>
              <BreadcrumbItem>
                {path.length !== 0 ?
                  <BreadcrumbLink asChild>
                    <Link to="">
                      Home
                    </Link>
                  </BreadcrumbLink> :
                  <BreadcrumbPage>
                    Home
                  </BreadcrumbPage>
                }
              </BreadcrumbItem>
              {
                location.pathname.split("/").slice(2, -1).map((item, index) => (
                  <React.Fragment key={index}>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem key={"item" + index}>
                      <BreadcrumbLink asChild>
                        <Link to={path.slice(1, index + 2).join("/")}>
                          {item}
                        </Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  </React.Fragment>
                )
                )
              }
              {
                path.length !== 0 && (
                  <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>{location.pathname.split("/").slice(-1)}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                )
              }
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="rounded-t-[1.5rem] md:rounded-tr-none bg-gray-100 dark:bg-gray-800/60 w-full min-h-screen p-6">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  )
}
