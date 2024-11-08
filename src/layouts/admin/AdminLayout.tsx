import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AdminSidebar from "@/components/layout/admin/sidebar/AdminSidebar"
import { Link, Outlet, useLocation } from "react-router-dom"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"

export default function AdminLayout() {
  const location = useLocation();
  const path = location.pathname.split("/").slice(1, -1);
  return (
    <SidebarProvider>
      <AdminSidebar />

      <main className=" pt-4 w-full bg-sidebar">
        <div className="flex items-center mb-4">
          <SidebarTrigger />
          <Breadcrumb className="ml-2">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>

                  <Link to="">
                    Home
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {
                location.pathname.split("/").slice(2, -1).map((item, index) => (
                  <>
                    <BreadcrumbSeparator key={index} />
                    <BreadcrumbItem key={"item" + index}>
                      <BreadcrumbLink asChild>
                        <Link to={path.slice(1, index + 2).join("/")}>
                          {item}
                        </Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  </>
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
        <div className="rounded-tl-[1.5rem] bg-gray-100 dark:bg-gray-800/60 w-full min-h-screen p-5">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  )
}
