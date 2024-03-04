import React, { useState, useEffect } from "react";
interface Comment {
  _id: string;
  content: string;
  user: {
    _id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
  replies: Comment[];
}
interface BlogCardProps {
  blog: {
    _id: string;
    title: string;
    content: string;
    category: {
      _id: string;
      name: string;
    };
    user: {
      _id: string;
      name: string;
    };
    createdAt: string;
    updatedAt: string;
  };
}
const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentInput, setCommentInput] = useState("");
  const [replyInput, setReplyInput] = useState("");
  const [selectedComment, setSelectedComment] = useState<string | null>(null);
  useEffect(() => {
    // Fetch comments for the current blog
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/comments/blog/${blog._id}`
        );
        if (response.ok) {
          const data = await response.json();
          setComments(data);
        } else {
          console.error("Failed to fetch comments:", response.statusText);
        }
      } catch (error) {
        console.error("Error during comments fetch:", error);
      }
    };
    fetchComments();
  }, [blog._id]);
  const handleCommentSubmit = async () => {
    try {
      // Perform any client-side validation if needed
      // Simulate adding a comment to the state
      const newComment: Comment = {
        _id: Math.random().toString(),
        content: commentInput,
        user: {
          _id: "user_id", // Replace with actual user ID
          name: "John Doe", // Replace with actual user name
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        replies: [],
      };
      setCommentInput("");
      // Simulate adding a comment to the state
      setComments((prevComments) => [...prevComments, newComment]);
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };
  const handleReplySubmit = async (parentId: string) => {
    try {
      // Perform any client-side validation if needed
      // Simulate adding a reply to the state
      const newReply: Comment = {
        _id: Math.random().toString(),
        content: replyInput,
        user: {
          _id: "user_id", // Replace with actual user ID
          name: "John Doe", // Replace with actual user name
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        replies: [],
      };
      setReplyInput("");
      // Simulate adding a reply to the state
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment._id === parentId
            ? { ...comment, replies: [...comment.replies, newReply] }
            : comment
        )
      );
      setSelectedComment(null);
    } catch (error) {
      console.error("Error submitting reply:", error);
    }
  };
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
      <p className="text-gray-600">{blog.content}</p>
      <div className="flex items-center mt-2">
        <span className="bg-blue-200 text-blue-800 py-1 px-2 rounded-full text-xs mr-2">
          {blog.category.name}
        </span>
        {blog.user && blog.user.name && (
          <span className="text-gray-500">By {blog.user.name}</span>
        )}
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Comments</h3>
        {comments.map((comment) => (
          <div key={comment._id} className="comment mb-2">
            {comment.user && (
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-500 mr-1"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
                <span className="text-gray-500 mr-4">{comment.user.name}</span>
                <p className="text-gray-600 border-gray border-2 px-2 py-1">
                  {comment.content}
                </p>
              </div>
            )}
            {selectedComment === comment._id && (
              <div className="mt-2 ml-4">
                <input
                  type="text"
                  value={replyInput}
                  onChange={(e) => setReplyInput(e.target.value)}
                  className="border px-2 py-1"
                />
                <button
                  onClick={() => handleReplySubmit(comment._id)}
                  className="ml-2 bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Send
                </button>
              </div>
            )}
            <button
              onClick={() => setSelectedComment(comment._id)}
              className="mt-2 ml-4 bg-gray-200 px-2 py-1 rounded text-sm"
            >
              Reply
            </button>
          </div>
        ))}
        <div className="comment-input mt-4">
          <input
            type="text"
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            className="border px-2 py-1"
          />
          <button
            onClick={handleCommentSubmit}
            className="ml-2 bg-blue-500 text-white px-2 py-1 rounded"
          >
            Comment
          </button>
        </div>
      </div>
    </div>
  );
};
export default BlogCard;