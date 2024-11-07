import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AdminSidebar from "@/components/layout/admin/sidebar/AdminSidebar"
import { Link, Outlet, useLocation } from "react-router-dom"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"

export default function AdminLayout() {
  const location = useLocation();
  const path = location.pathname.split("/").slice(2, -1);
  return (
    <SidebarProvider>
      <AdminSidebar />

      <main className="p-4">
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
                        <Link to={path.slice(0, index + 1).join("/")}>
                          {item}
                        </Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  </>
                )
                )
              }
              {/* <BreadcrumbSeparator />
              <BreadcrumbItem>
                  <Link to="admin">
                
                    Admin
                  </Link>
              </BreadcrumbItem> */}
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
        <Outlet />
      </main>
    </SidebarProvider>
  )
}
