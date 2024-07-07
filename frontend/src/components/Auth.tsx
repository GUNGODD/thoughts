import { SignupInput } from "@100xdevs/medium-common"
import { ChangeEvent, ChangeEventHandler, useState } from "react"
import { Link } from "react-router-dom"
export const Auth=({type}: {type:"signup" | "signin"})=>{
    const [postInputs,setPostInputs] = useState<SignupInput>({
        name:"",
        username:"",
        password:""
    })
    return <div className=" h-screen flex justify-center flex-col">
        <div>
            <div className="text-3xl font-extrabold mt-4">
                Create an account
            </div>
            <div className="tex-slate-400 text-sm font-light">
                Already have an account? 
                <Link to={"/signin"} className="pl-2 font-semibold underline underline-offset-2">Login</Link>
            </div>
          <div className="mt-6">
            <LabelledInput label="Email" type="text" placeholder="email" onChange={(e)=>{
               setPostInputs({
                ...postInputs,
                name:e.target.value
               })

            }} />
            <LabelledInput label="Username" type="text" placeholder="Username" onChange={(e)=>{
               setPostInputs({
                ...postInputs,
                name:e.target.value
               })

            }} />
            <LabelledInput label="Password" type="password" placeholder="Password" onChange={(e)=>{
               setPostInputs({
                ...postInputs,
                name:e.target.value
               })

            }} />
        </div>
        </div>
    </div>
}

interface LablledInputType{
    label:string,
    placeholder:string,
    onChange:(e:ChangeEvent<HTMLInputElement>)=>void;
    type?:string
}

function LabelledInput ({ label , placeholder , onChange , type }:LablledInputType){
    return <div>
        <div>
            <label className ="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
            <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
        </div>
    </div>
}