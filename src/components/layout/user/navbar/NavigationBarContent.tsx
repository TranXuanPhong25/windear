import {

    LogOut,
    Search, Bell,
    Settings,
    LibraryBig, User, Send
} from "lucide-react"


import {Button} from "@/components/ui/button";
import {useEffect, useState} from "react"

import {Link} from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";
import SearchModal from "@/components/layout/user/navbar/SearchModal";
import MyNavigationMenu from "./NavigationMenu";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Separator} from "@/components/ui/separator";
import ThemeSwitcher from "@/components/theme/ThemeSwitcher";
import {useGetUnreadNotifications} from "@/hooks/user/useGetUnreadNotifications.ts";
import AttentionDotWrapper from "@/components/layout/user/navbar/AttentionDotWrapper.tsx";

const userNavigationInitial = [
    [
        {name: "Notifications", href: "/notifications", icon: Bell, hasAttentionDot: false},
    ],
    [
        {name: 'My requests', href: '/requests', icon: Send, hasAttentionDot: false},
        {name: 'My shelves', href: '/shelves', icon: LibraryBig, hasAttentionDot: false},
        {name: 'Settings', href: '/settings', icon: Settings, hasAttentionDot: false},
    ],
    [
        {name: 'Sign out', href: '/logout', icon: LogOut, hasAttentionDot: false},
    ]
]
export default function NavigationBarContent() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {data: unreadNotifications} = useGetUnreadNotifications();
    const [userNavigations, setUserNavigations] = useState(userNavigationInitial);
    useEffect(() => {
        const userNavigationsTemp = [...userNavigationInitial];
        userNavigationsTemp[0][0].hasAttentionDot = !!unreadNotifications;
        setUserNavigations(userNavigationsTemp)
    }, [unreadNotifications]);
    const handleSearchClick = () => {
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    const auth = useAuth0();

    return (
        <nav className="dark:bg-gray-800 bg-transparent sticky top-0 z-[30] w-full px-2 sm:px-5 lg:px-8 py-1 ">
            <div className="mx-auto max-w-7xl ">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <Link to="/" className="flex items-center">
                                <img
                                    className="h-8 w-8"
                                    src="/thesis_7293014.png"
                                    alt="Windear Logo"
                                />
                                <span className="ml-1 !text-purple-400 hidden md:block ">Windear</span>

                            </Link>
                        </div>
                    </div>

                    <div className="ml-4 flex items-center md:ml-6 [&>*]:mx-1">
                        <div
                            className="dark:bg-gray-700/60 backdrop-blur-[4px] bg-slate-300/60 rounded-md md:block hidden">
                            <div
                                onClick={handleSearchClick}
                                className="opacity-90 hover:opacity-100 transition-opacity relative cursor-pointer dark:border-white border-2 p-2 dark:text-white flex items-center rounded-md ">
                                <Search className="h-5 w-5 text-muted-foreground cursor-pointer"/>
                                <h3 className="ml-2 w-[200px]">
                                    Search books
                                </h3>

                            </div>
                        </div>
                        <div className="block md:hidden" onClick={handleSearchClick}>
                            <Search className="h-5 w-5 text-muted-foreground cursor-pointer"/>
                        </div>
                        <MyNavigationMenu/>
                        <div className="hidden md:block">
                            <ThemeSwitcher/>
                        </div>

                        {
                            auth.user ? (
                                    <div className="group relative px-2">

                                        <div
                                            className="border-4 border-gray-200 rounded-full hover:border-4 hover:border-white hover:[&>*]:contrast-75 relative">
                                            <Avatar className="cursor-pointer relative">
                                                <AvatarImage src={auth.user.picture}/>
                                                <AvatarFallback></AvatarFallback>
                                            </Avatar>
                                                <AttentionDotWrapper visible={!!unreadNotifications}/>
                                        </div>

                                        {/*indicator*/}
                                        <div
                                            className="w-4 h-3 bg-gray-800 rounded-t-full z-10  border-2  border-gray-600 border-b-gray-800 absolute top-[38px] right-6 hidden group-hover:block"/>

                                        <div
                                            className=" absolute right-0 w-[180px] bg-gray-800 hidden group-hover:block top-12 rounded-lg border-2 border-gray-600 text-white">
                                            {
                                                userNavigations.map((group, index) => (
                                                        <div key={"user-menu" + index}>
                                                            {index != 0 && <Separator className="bg-gray-600"/>}
                                                            <div className="p-2">
                                                                {
                                                                    group.map(item => (

                                                                        <Link to={item.href} key={"usernav" + item.href}
                                                                              className="flex hover:bg-purple-500 p-2 rounded-md items-center relative">
                                                                            <item.icon className="size-5 mr-2   "/>
                                                                            <h1> {item.name}</h1>
                                                                            <AttentionDotWrapper animate={true}
                                                                                visible={item.hasAttentionDot}/>
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
                                    <Button onClick={() => auth.loginWithPopup()}
                                            className=" bg-white text-black hover:text-white  px-2"><User/></Button>
                                )
                        }


                    </div>


                </div>
            </div>
            <SearchModal isOpen={isModalOpen} onClose={handleCloseModal}/>
        </nav>
    )
}