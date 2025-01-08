interface blogsInput {
  author: string;
  publishedDate: string;
  title: string;
  content: string;
}

export const BlogCard = ({
  author,
  publishedDate,
  title,
  content,
}: blogsInput) => {
  return (
    <div className="border-b border-slate-200 p-4 ">
      <div className="flex ">
        <Avatar name={author} size={"small"}/>
        <div className=" font-extralight pr-2 text-sm flex flex-col justify-center">
          {author}
        </div>
        <div className=" text-slate-500 text-sm font-thin  flex flex-col justify-center">
          &#8226; {publishedDate}
        </div>
      </div>
      <div className="font-bold text-2xl pt-2">{title}</div>
      <div className="text-md font-extrathin pt-1">
        {content.slice(0, 100) + "..."}
      </div>
      <div className="text-sm text-slate-500 font-thin pt-8">
        {`${Math.ceil(content.length / 100)}min read`}
      </div>
    </div>
  );
};

export function Avatar({ name ,size = "small"}: { name: string ,size:"small" | "big"}) {
  return (
    <div className={`relative inline-flex items-center justify-center ${size === "small"? "w-6 h-6": "w-10 h-10"} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
      <span className={`${size === "small"?"text-sm":"text-lg"} font-medium text-gray-700 dark:text-gray-300`}>
        {name[0].toUpperCase()}
      </span>
    </div>
  );
}
