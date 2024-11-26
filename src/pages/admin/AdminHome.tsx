import {BentoCard, BentoGrid} from "@/components/ui/bento-grid";
// import Users from "@/components/icons/fontawesome/Users.tsx";
import {Activity, BookUser, LibraryBig, NotepadText, UsersIcon} from "lucide-react";

const features = [
    {
        Icon: UsersIcon,
        name: "Users Management",
        description: "View user information, send verification emails, and more.",
        href: "management/users",
        cta: "Navigate to Users",
        background: <img className="absolute -right-20 -top-20 opacity-60"/>,
        className: "lg:col-start-1 lg:col-end-4 lg:row-start-3 lg:row-end-4",
    },
    {
        Icon: Activity,
        name: "Analytics Dashboard",
        description: "Analyze your activity and make data-driven decisions.",
        href: "dashboard/analytics",
        cta: "Navigate to Analytics",
        background: <img className="absolute -right-20 -top-20 opacity-60"/>,
        className: "lg:col-start-3 lg:col-end-6 lg:row-start-1 lg:row-end-3",
    },
    {
        Icon: NotepadText,
        name: "Monitor Logs",
        description: "Keep track of your logs and troubleshoot issues about users.",
        href: "dashboard/logs",
        cta: "Navigate to Logs",
        background: <img className="absolute -right-20 -top-20 opacity-60"/>,
        className: "lg:col-start-4 lg:col-end-6 lg:row-start-3 lg:row-end-4",
    },
    {
        Icon: LibraryBig,
        name: "Books Management",
        description: "Manage your books, add new ones, and update existing ones.",
        href: "management/books",
        cta: "Navigate to Books",
        background: <img className="absolute -right-20 -top-20 opacity-60"/>,
        className: " lg:col-start-1 lg:col-end-3 lg:row-start-1 lg:row-end-2",
    },
    {
        Icon: BookUser,
        name: "Borrowing request Management",
        description:
            "Manage borrowing requests, approve or reject them, and more.",
        href: "management/borrowing",
        cta: "Navigate to Borrowing",
        background: <img className="absolute -right-20 -top-20 opacity-60"/>,
        className: " lg:row-start-2 lg:row-end-2 lg:col-start-1 lg:col-end-3",
    },
];

function AdminHome() {
    return (
        <BentoGrid className="lg:grid-rows-3 h-[calc(100vh-150px)]">
            {features.map((feature) => (
                <BentoCard key={feature.name} {...feature} />
            ))}
        </BentoGrid>
    );
}

export default AdminHome;
