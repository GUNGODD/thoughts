import { useEffect, useState } from "react";

const PostaExample = () => {
  const BASE_URL = "https://jsonplaceholder.typicode.com/posts";
  const [data, SetData] = useState([]);

  // interface
  interface Post {
    id: number;
    title: string;
    body: string;
    author: string;
    published: boolean;
  }

  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => SetData(data))
      .catch((err) => console.log(err));
  });

  return (
    <>
      <div className="text-center text-3xl text-blue-600">
        <h1> Post Data</h1>
        {data.map((post: Post) => {
          return (
            <div
              key={post.id}
              className="bg-white shadow-md rounded-lg p-4 m-4"
            >
              <h2 className="text-xl font-bold">{post.title}</h2>
              <p className="text-gray-600">{post.body}</p>
              <p className="text-gray-600">Author: {post.author}</p>
              <p className="text-gray-600">Published: {post.published}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

const DisplayPost = () => {
  return (
    <div>
      <h1> Posts </h1>
    </div>
  );
};
export default DisplayPost;
