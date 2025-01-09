import { BlogInputs } from "../hooks"


export const SpecificBlog = ({blog}:{blog:BlogInputs}) => {
    return <div  className="grid grid-cols-12 px-20 mt-20">
        <div className=" col-span-8">
            <div>
                {blog.title}
            </div>
            <div>
                {blog.content}
            </div>
        </div>
        <div className=" col-span-4">
            hii
        </div>
    </div>
}