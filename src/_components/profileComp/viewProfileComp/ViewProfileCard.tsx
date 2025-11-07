import Image from "next/image";
import React from "react";
import img2 from "@/assets/images/image-2.png";

import {
  BookmarkIcon,
  ChatBubbleIcon,
  HeartIcon,
  MapPinIcon,
  SendIcon,
} from "./../../dashboardComp/Icons";
import { useRouter } from "next/navigation";

const ViewDetailsCard = ({ viewUserProduct }: any) => {
  const router =useRouter()
  const getUserProduct = viewUserProduct?.data?.data;

  return (
    <article className="rounded-2xl bg-white border border-gray-200/70 shadow-sm overflow-hidden">
      <div>
        <div className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full overflow-hidden">
              <Image
                src={getUserProduct?.images[0][0]}
                alt="author"
                width={40}
                height={40}
                className="object-cover rounded-full"
              />
            </div>
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
            <ChatBubbleIcon />
          </button>
          <button className="flex items-center gap-1 hover:text-green-500 transition-colors">
            <SendIcon />
          </button>
          <button className="flex items-center gap-1 hover:text-yellow-500 transition-colors">
            <BookmarkIcon />
          </button>
          <div className="ml-auto text-[11px] text-gray-500 flex items-center gap-3">
            <span>13.5KM</span>
            <span>·</span>
            <span>54mins Away</span>
          </div>
        </div>
        <div className="px-4 pb-4 flex items-center gap-3">
          {/* <div className="text-[11px] text-gray-500">Category:</div>
              <div className="text-[11px] text-gray-700">
                {getUserProduct.category.name}
              </div> */}
          <div className="ml-auto">
            <button className="inline-flex items-center gap-2 rounded-full bg-green-600 text-white text-xs px-3 py-2 hover:bg-green-700 transition-colors">
              <SendIcon />
              Direct Message
            </button>
          </div>
        </div>
        <div className="px-4 pb-4 flex items-center justify-between">
          <div className="text-blue-600 text-sm cursor-pointer hover:underline" onClick={()=>{
            router.push(`/dashboard/comments/${getUserProduct.id}`);
          }}>
            {getUserProduct?.comments_count === 0
              ? null
              : `View all 
            ${getUserProduct?.comments_count} comments`}
          </div>
          <div className="text-[#1B5E20] text-xl font-semibold">$60</div>
        </div>
      </div>
    </article>
  );
};

export default ViewDetailsCard;
