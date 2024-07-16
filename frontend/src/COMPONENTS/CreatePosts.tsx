import { TextareaForm } from "@/components/TextareaForm";
import axios from "axios";
export const CreatePosts = () => {
  return (
    <>
      <div className=" text-3xl  text-center font-bold text-blue-700">
        Cretae Post{" "}
      </div>

      <div className="container m-4 p-4 ">
        <div className=" ">
          <TextareaForm axios={axios} />
        </div>
      </div>
    </>
  );
};

export default CreatePosts;
