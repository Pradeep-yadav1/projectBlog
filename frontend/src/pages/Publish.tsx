import { Appbar } from "../components/Appbar";
import { Texteditor } from "../components/Texteditor";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handlePublish = async () => {
    if (!title.trim() || !description.trim()) {
      alert("Title and Description are required to publish the content.");
      return;
    }

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/blog/create`,
        {
          title,
          content: description,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
        }
      );
      navigate(`/blog/${response.data}`);
    } catch (error) {
      console.error("Error publishing content:", error);
      alert("Failed to publish content. Please try again.");
    }
  };

  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="w-2/3">
          <div className="mt-4 w-full">
            <input
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              placeholder="Write your title"
              required
            />
          </div>
          <Texteditor
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <div className="flex items-center justify-between">
            <button
              onClick={handlePublish}
              type="submit"
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
            >
              Post content
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
