import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BACKEND_URL } from "@/config";

export const BlogPosts = () => {
  return (
    <>
      <div>
        <h1 className="text-4xl text-center "> Posts </h1>
        <Example />
      </div>
    </>
  );
};

function Example() {
  const token = localStorage.getItem("token");
  if (!token) {
    return <p>Login to see posts</p>;
  }
  const { isLoading, error, data } = useQuery({
    queryKey: ["blogData"],
    queryFn: () =>
      axios
        .get(`${BACKEND_URL}/api/v1/blog`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => res.data),
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      {data.Post.map((post: any) => (
        <div key={post.id} className="mb-4">
          <h2 className="text-2xl  ">
            {" "}
            <strong>Title:</strong> {post.title}
          </h2>
          <p className="text-2xl ">
            <strong>Content:</strong> {post.content}
          </p>
          <p>
            <strong>Author ID:</strong> {post.authorId}
          </p>
          <p>
            <strong>Published:</strong> {post.published ? "Yes" : "No"}
          </p>
        </div>
      ))}
    </div>
  );
}

export default BlogPosts;
