import { useQuery } from "@tanstack/react-query";

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
  const { isLoading, error, data } = useQuery({
    queryKey: ["blogData"],
    queryFn: () =>
      fetch("https://server.chauhanadityac01.workers.dev/api/v1/blog?", {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mn0.GEX2SiimusxLz0Hrpfw3poaAgmLIvF-8n122PjL4s28",
        },
      }).then((res) => res.json()),
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
