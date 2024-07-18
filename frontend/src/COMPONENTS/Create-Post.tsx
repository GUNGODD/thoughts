import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { BACKEND_URL } from "@/config";

interface IFormInput {
  title: string;
  contnt: string;
}

const BASE_URL =  `${BACKEND_URL}/api/v1/blog`;
export const CreatePost = () => {
    const token=localStorage.getItem("token");
    if(!token){
        return <p>Please login</p>
    }
  const { register, handleSubmit, reset } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const response = await axios.post(
        BASE_URL,
        {
          title: data.title,
          content: data.contnt,
        },
        {
          headers: {
            Authorization:token
              
          },
        },
      );
      reset();
      console.log(response.data);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <>
      <div className="gap-4 flex flex-row justify-center m-5 p-5">
        <h1 className="text-3xl text-center text-blue-400">Create Post</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-row justify-center mb-5 gap-5">
          <label>Title</label>
          <input
            className="border-2 border-black rounded-lg"
            {...register("title", { required: true })}
          />
          <label>Content</label>
          <input
            className="border-2 border-black rounded-lg w-96  "
            {...register("contnt", { required: true })}
          />
        </div>
        <div className="flex flex-row justify-center">
          <button
            className="bg-blue-400 gap-x-5 text-white rounded-lg px-4 py-2 text-center"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default CreatePost;