"use client";
import React from "react";
import {
  BookmarkIcon,
  ChatBubbleIcon,
  HeartIcon,
  MapPinIcon,
  SendIcon,
} from "./../../../dashboardComp/Icons";
import Image from "next/image";
import { useGetProductComments } from "@/lib/api/productsApi/productQuery";
import { getInitials } from "@/utils/getInitials";
import CommentSection from "../CommentSection";

export default function ProductCommentList({ viewUserProduct }: any) {
  const getUserProduct = viewUserProduct?.data?.data;
  const getProductCommentLists = useGetProductComments(getUserProduct?.id);

  return (
    <article className="rounded-2xl bg-white border border-gray-200/70 shadow-sm overflow-hidden">
      <div>
        <div className="p-4">
          <div className="flex items-center gap-3">
            {/* <div className="h-10 w-10 rounded-full overflow-hidden">
              <Image
                src={getUserProduct?.images[0][0]}
                alt="author"
                width={40}
                height={40}
                className="object-cover rounded-full"
              />
            </div> */}
            {getUserProduct?.images?.[0]?.[0] ? (
              <Image
                src={getUserProduct.images[0][0]}
                alt="author"
                width={40}
                height={40}
                className="object-cover"
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center font-bold">
                {getInitials(getUserProduct?.seller?.full_name || "")}
              </div>
            )}
            <div className="flex-1">
              <div className="text-sm font-semibold">
                {getUserProduct?.name}
              </div>
              {/* <div className="text-[11px] text-gray-500">
                 {getUserProduct?.name}
               </div> */}
            </div>
          </div>
          <p className="mt-3 text-sm text-gray-600">
            {getUserProduct?.description}
          </p>
        </div>
        <div className="px-4">
          <div className="rounded-xl overflow-hidden border border-gray-200/70">
            <img
              src={getUserProduct?.images[0][0]}
              alt="post"
              className="w-full h-auto object-cover"
              // width={500}
              // height={500}
            />
          </div>
        </div>
        <div className="px-4 py-3 flex items-center gap-4 text-gray-600">
          <button
            className="flex items-center gap-1 hover:text-red-500 transition-colors"
            // onClick={() => handleLikeProduct(item.id)}
          >
            {getUserProduct?.product_like === 0 ? (
              <HeartIcon />
            ) : (
              <HeartIcon className="text-red-500 fill-red-500" />
            )}
          </button>
          <button className="flex items-center gap-1 hover:text-blue-500 transition-colors">
            <ChatBubbleIcon />{" "}
            {getProductCommentLists?.data?.data?.comments.length}
          </button>
        </div>

        <div className="px-4 pb-4 flex items-center justify-between">
          {/* <div className="text-blue-600 text-sm cursor-pointer hover:underline">
            View all 57 comments
          </div> */}
          <div className="text-[#1B5E20] text-xl font-semibold">
            ${getUserProduct?.amount}
          </div>
        </div>
      </div>

      <div>
        <CommentSection
          getProductCommentLists={getProductCommentLists}
          getUserProduct={getUserProduct}
        />
      </div>
    </article>
  );
}
