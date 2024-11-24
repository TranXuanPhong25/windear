import ProfileInput from "./settings/ProfileInput";
import {Separator} from "../ui/separator";
import ProfilePictureChange from "@/components/user/ProfilePictureChange";

function ProfileSettings() {
    return (
        <section id="user-profile" className="pt-20 -mt-20">
            <h1 className="text-3xl">Profile Settings</h1>
            <Separator className="w-full dark:bg-gray-500 mb-6 mt-2"/>
            <div className="flex">
                <div className="w-full mr-12">
                    <ProfileInput/>
                </div>
                <ProfilePictureChange/>
            </div>
        </section>
    );
}

export default ProfileSettings;