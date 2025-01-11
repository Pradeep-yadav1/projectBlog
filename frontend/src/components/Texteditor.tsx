import { ChangeEvent } from "react";

export const Texteditor = ({onChange}:{onChange:(e:ChangeEvent<HTMLTextAreaElement>) => void}) => {
  return (
    <div>
      <div className=" mb-4 border bg-gray-50 rounded-lg mt-4">
        <div className="rounded-t-lg ">
          <textarea
          onChange={onChange}
            rows={8}
            className="w-full bg-gray-100 px-0 text-sm text-gray-900 focus:ring-0 dark:placeholder-gray-400"
            placeholder="Write your description..."
            required
          ></textarea>
        </div>
      </div>
    </div>
  );
};
