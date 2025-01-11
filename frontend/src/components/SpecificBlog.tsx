import { BlogInputs } from "../hooks";
import { Appbar } from "./Appbar";
import { Avatar } from "./BlogCard";

export const SpecificBlog = ({ blog }: { blog: BlogInputs | undefined }) => {
  if (!blog) {
    return <div>Sorry! No Blog data available</div>;
  }
  return (
    <div>
      <Appbar />
      <div className="grid grid-cols-12 px-20 mt-20">
        <div className=" col-span-8 pr-4 m-2">
          <div className="text-5xl font-extrabold">{blog.title}</div>
          <div className="text-slate-500 pt-3">Posted on 10 Jan 2025</div>
          <div className="pt-4 text-lg">{blog.content}</div>
        </div>
        <div className=" col-span-4">
            <div className="text-slate-700 text-lg">
                Author
            </div>

          <div className="flex pt-3">
            <div className="pr-4 flex flex-col justify-center">
              <Avatar name={blog.author.name || "Ananymous"} size={"small"} />
            </div>
            <div>
              <div className="text-xl font-bold ">
                {blog.author.name || "Anymonous"}
              </div>
              <div className="text-slate-500 pt-2 text-md">
                Random phrase about user in order to get the all other's
                attention grab
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
