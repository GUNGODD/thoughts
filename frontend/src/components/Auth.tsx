// import { SignupInput } from "@100xdevs/medium-common"
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState({
    email: "",
    password: "",
    name: "",
  });

  async function SendRequest() {
    localStorage.clear();
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        postInputs,
      );
      const jwt = response.data;
      localStorage.setItem("token", jwt.token);
      navigate("/blogs");
    } catch (e) {
      alert("Something bad happened");
    }
  }

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="px-10">
        <div className="text-green-700 px-10 text-3xl font-extrabold mt-4">
          {type === "signin"
            ? "Sign in to exisiting account"
            : "Create an account"}
        </div>
        <div className="ml-10 tex-slate-400 text-sm font-light">
          {type === "signin" ? "Dont have account?" : "Already have account?"}
          <Link
            to={type === "signin" ? "/signup" : "/signin"}
            className="pl-2 font-semibold underline underline-offset-2"
          >
            {type === "signin" ? "Sign up" : "Sign in"}
          </Link>
        </div>
        <div className="mt-6 space-y-5">
          <LabelledInput
            label="Email"
            type="text"
            placeholder="example@gmail.com"
            onChange={(e) => {
              setPostInputs({
                ...postInputs,
                email: e.target.value,
              });
            }}
          />
          <LabelledInput
            label="Password"
            type="text"
            placeholder="Password"
            onChange={(e) => {
              setPostInputs({
                ...postInputs,
                password: e.target.value,
              });
            }}
          />
          {type === "signup" ? (
            <LabelledInput
              label="Name"
              type="text"
              placeholder="anurag negi"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  name: e.target.value,
                });
              }}
            />
          ) : null}
          <button
            onClick={SendRequest}
            type="button"
            className="w-full  text-gray-900 hover:text-white border border-gray-800 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
          >
            {type === "signup" ? "Sign up" : "Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
};

interface LablledInputType {
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
}: LablledInputType) {
  return (
    <div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          {label}
        </label>
        <input
          onChange={onChange}
          type={type || "text"}
          id="first_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={placeholder}
          required
        />
      </div>
    </div>
  );
}
