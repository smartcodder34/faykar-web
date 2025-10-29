"use client";
import React, { useState } from "react";
import { Heart, MessageCircle, Send } from "lucide-react";
import { getInitials } from "@/utils/getInitials";
import { useCommentOnProduct } from "@/lib/api/productsApi/productMutation";

// Sample data structure matching your API

const CommentSection = ({ getProductCommentLists, getUserProduct }: any) => {
  const [newComment, setNewComment] = useState("");

  const getAvatarColor = (name: string) => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-orange-500",
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  const handleSubmitComment = (event: React.FormEvent) => {
    event.preventDefault();
    const requestData = {
      product_id: getUserProduct.id,
      comment: newComment,
    };
    commentOnProduct.mutate(requestData);
    setNewComment("");
    console.log("Submitting comment:", newComment);
  };

  const commentOnProduct = useCommentOnProduct();

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm">
      <div className="divide-y divide-gray-100">
        {getProductCommentLists?.data?.data?.comments?.map((comment) => (
          <div
            key={comment.id}
            className="px-5 py-4 hover:bg-gray-50 transition-colors duration-150"
          >
            <div className="flex items-start gap-3">
              {/* Avatar */}
              <div
                className={`h-12 w-12 rounded-full ${getAvatarColor(
                  comment.commenter.full_name
                )} flex items-center justify-center flex-shrink-0 shadow-sm`}
              >
                <span className="text-white font-semibold text-sm">
                  {getInitials(comment.commenter.full_name)}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                {/* Header */}
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold text-gray-900 text-sm">
                    {comment.commenter.full_name}
                  </h4>
                  <span className="text-xs text-gray-400 font-medium">
                    {/* {getTimeAgo(comment.created_at)} */}
                    {comment.created_at}
                  </span>
                </div>

                {/* Comment Text */}
                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                  {comment.comment}
                </p>

               
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Comment Input - Bottom */}
      <div className="px-5 py-4 border-t border-gray-100 bg-gray-50">
        <form onSubmit={handleSubmitComment} className="flex items-start gap-3">
          <div
            className={`h-10 w-10 rounded-full ${getAvatarColor(
              "hello wolrd"
            )} flex items-center justify-center flex-shrink-0 shadow-sm`}
          >
            <span className="text-white font-semibold text-xs">
              {getInitials("hello world")}
            </span>
          </div>

          <div className="flex-1 flex gap-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 px-4 py-2.5 bg-white border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <button
              type="submit"
              //   disabled={!newComment.trim()}
              className="px-4 py-2.5 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              <Send className="h-4 w-4" />
              <span className="text-sm font-medium">Send</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommentSection;

