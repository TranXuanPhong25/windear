// import {supabase} from '@/lib/supabaseClient';
// import {Input} from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { Check, Edit2, Trash2 } from "lucide-react";

function ProfilePictureChange() {

	const { user } = useAuth0();
	const [profilePicture, setProfilePicture] = useState<string | null | undefined>(null);

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setProfilePicture(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleRemoveImage = () => {
		setProfilePicture(null); // or set to a default image URL
	};
	const handleSaveImage = async () => {

	}
	return (
		<div className="w-48 mr-24 text-center relative h-[280px]">
			<h1>Profile picture</h1>
			<Label htmlFor="file-input">
				<div
					className={`overflow-hidden rounded-full size-48 mt-2 ${(user && user?.sub?.includes("auth0")) && "cursor-pointer"}`}>
					<img src={profilePicture || user?.picture} alt="profile" className="size-48 object-fit" />
				</div>
			</Label>
			{
				user && user?.sub?.includes("auth0") && (
					<>
						<input
							type="file"
							accept="image/*"
							onChange={handleImageChange}
							className="hidden"
							id="file-input"
						/>
						<Label htmlFor="file-input"
							className="absolute bottom-16 left-2 dark:bg-gray-800 bg-white text-black  dark:text-gray-200  px-2 py-1 rounded-md flex items-center cursor-pointer border text-xs border-gray-400/80 dark:border-gray-500 shadow-md font-bold">
							<Edit2 className="size-3 mr-1" />
							Edit
						</Label>
					</>
				)
			}
			{
				profilePicture && (
					<div className="flex flex-col ">
						<div className="flex w-full justify-center gap-2 mt-2 ">
							<Button onClick={handleSaveImage}
								className="!bg-green-500 !text-white px-3 rounded-full">
								<Check className="size-4" />
							</Button>
							<Button onClick={handleRemoveImage}
								className="!bg-red-500 !text-white px-3 rounded-full">
								<Trash2 className="size-4" />
							</Button>
						</div>
					</div>
				)
			}
		</div>
	)

}

export default ProfilePictureChange;
