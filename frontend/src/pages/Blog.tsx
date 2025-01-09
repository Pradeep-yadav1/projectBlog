import { useBlogspecific } from "../hooks";

import { SpecificBlog } from "../components/SpecificBlog";
import { useParams } from "react-router-dom";

export const Blog = () => {
  const { id } = useParams<{id:string}>();
  const { loading, blog } = useBlogspecific({
    id: id || ""
  });
  if (loading) {
    return <div>loading...</div>;
  }
  return (
    <div>
      {/* <SpecificBlog blog={blog}/> */}
    </div>
  );
};
