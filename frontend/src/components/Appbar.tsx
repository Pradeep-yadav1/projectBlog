import { Avatar } from "./BlogCard"


export const Appbar = () => {
    return <div className="border-b flex justify-between px-12 py-4">
        <div className="flex flex-col justify-center"> Medium</div>
        <div className="flex flex-col justify-center"><Avatar size={"big"} name={"Pradeep"}/></div>
    </div>
}