import ProfileCard from "@/components/home/ProfileCard.tsx";

export default function MemberDistribution(){
    return (
        <div className="h-screen mt-[200px]">
            <h1 className="text-4xl font-bold tracking-tight text-center sm:text-6xl     mx-auto">
                Windear Library is made by Windear team, a group of passionate developers studying at UET-VNU
            </h1>
            <div className="flex gap-6 justify-center my-40 flex-wrap ">
                <ProfileCard name={"Trần Xuân Phong TranXuanPhong25"} title={"Front end"} avatarUrl="https://avatars.githubusercontent.com/u/89262558?v=4" githubUrl={"https://github.com/TranXuanPhong25"}/>
                <ProfileCard name={"Bùi Minh Quang mquang279"} title={"Back end"} avatarUrl="https://avatars.githubusercontent.com/u/101109835?v=4" githubUrl={"https://github.com/mquang279"}/>
                <ProfileCard name={"Phạm Minh Quân quanpm2008"} title={"Back end"} avatarUrl="https://avatars.githubusercontent.com/u/160835434?v=4"  githubUrl={"https://github.com/quanpm2008"}/>
            </div>
        </div>
    )
}