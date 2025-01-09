import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks";

export const Blogs = () => {
  const { loading, blogs} = useBlogs();
  if (loading) {
    return <div>
      <Skeleton />;
      </div>
  }
  return (
    <div>
        <Appbar />
      <div className="flex justify-center">
        <div className=" w-2/3 m-4">
          {blogs.map(blog => 
            <BlogCard
              id={blog.id}
              author={blog.author.name || "Ananomous"}
              publishedDate={"20 Dec 2024"}
              title={blog.title}
              content={blog.content}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export function Skeleton() {
  return (
    <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-slate-700 h-6 w-6"></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 bg-slate-700 rounded"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-slate-700 rounded col-span-2"></div>
              <div className="h-2 bg-slate-700 rounded col-span-1"></div>
            </div>
            <div className="h-2 bg-slate-700 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
