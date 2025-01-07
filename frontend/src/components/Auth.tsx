import { ChangeEvent, useState } from "react";
import { SignupInput } from "@pradeep0123yadav/common";
import { Link } from "react-router-dom";

export const Auth = ({type} :{type:"signup" | "signin"}) => {
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
  });
  return (
    <div className="h-screen flex flex-col justify-center ">
      <div className="flex justify-center">
        <div >
          <div className="px-12">
            <div className="text-3xl font-extrabold text-center  ">
              {type==="signup"?"Create an account":"Login Up"}
            </div>
            <div className="text-base font-semibold text-center text-slate-500">
              {type === "signup" ?"Already have an account":"Don't have an account"}?
              <Link to={type==="signup"?"/signin":"/signup"} className="pl-2 underline">
                {type==="signup"?"Login":"signup"}
              </Link>
            </div>
          </div>
          <div >
            <LabelledInput
              label="Userame"
              placeholder="pradeep yadav"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  name: e.target.value,
                });
              }}
            />
            <LabelledInput
              label="Email"
              placeholder="john@gmail.com"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  email: e.target.value,
                });
              }}
            />
            <LabelledInput
              label="Password"
              placeholder="abc123a"
              type="password"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  password: e.target.value,
                });
              }}
            />
          </div>
          <button type="button" className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-base px-2 mt-8 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup" ? "Signup":"Signin"}</button>
        </div>
      </div>
    </div>
  );
};

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelledInput({
  label,
  placeholder,
  onChange,
  type,
}: LabelledInputType) {
  return (
    <div className="mt-4">
      <label
        className="block mb-2 text-base font-semibold text-black pt-1"
      >
        {label}
      </label>
      <input
        onChange={onChange}
        type={type || "text"}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 w-full dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
