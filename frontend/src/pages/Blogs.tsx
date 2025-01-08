import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";

export const Blogs = () => {
  return (
  <div>
    <Appbar/>
    <div className="flex justify-center">
      <div className=" max-w-2xl m-4">
        <BlogCard
          author={"Pradeep Yadav "}
          publishedDate="20 Dec 2024"
          title={
            "The Transformative Power of Mobile Phones in Modern Life: Bridging Connectivity, Enhancing Productivity, and Shaping the Future"
          }
          content={
            "In just a few decades, mobile phones have evolved from basic communication tools into essential devices that influence nearly every aspect of modern life. They have changed how we connect, learn, work, and entertain ourselves, becoming an inseparable part of our daily routines."
          }
        />
        <BlogCard
          author={"Pradeep Yadav "}
          publishedDate="20 Dec 2024"
          title={
            "The Transformative Power of Mobile Phones in Modern Life: Bridging Connectivity, Enhancing Productivity, and Shaping the Future"
          }
          content={
            "In just a few decades, mobile phones have evolved from basic communication tools into essential devices that influence nearly every aspect of modern life. They have changed how we connect, learn, work, and entertain ourselves, becoming an inseparable part of our daily routines."
          }
        />
        <BlogCard
          author={"Pradeep Yadav "}
          publishedDate="20 Dec 2024"
          title={
            "The Transformative Power of Mobile Phones in Modern Life: Bridging Connectivity, Enhancing Productivity, and Shaping the Future"
          }
          content={
            "In just a few decades, mobile phones have evolved from basic communication tools into essential devices that influence nearly every aspect of modern life. They have changed how we connect, learn, work, and entertain ourselves, becoming an inseparable part of our daily routines."
          }
        />
      </div>
    </div>
    </div>
  );
};
