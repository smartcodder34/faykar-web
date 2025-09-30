// import React from "react";
// import { useGetUserProducts } from "@/lib/api/productsApi/productQuery";
// import { useRouter } from "next/navigation";
// import Image from "next/image";

// const ProfileCard = () => {
//   const router = useRouter();
//   const getUserProducts = useGetUserProducts();
//   const userProducts = getUserProducts?.data?.data?.products || [];

//   const handleViewProduct = (itemId: string) => {
//     router.push(`/profile/view-profile/${itemId}`);
//   };

//   return (
//     <article className="rounded-2xl bg-white  shadow-sm overflow-hidden flex flex-row flex-wrap gap-4 p-4">
//       {userProducts?.length < 0 ? (
//         <div className="flex flex-col items-center justify-center h-48 text-gray-400">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-12 w-12 mb-4 text-gray-300"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             strokeWidth={2}
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M9 17v-2a4 4 0 018 0v2m-4 4v-4m0-4a4 4 0 10-8 0v4m0 4v-4m0 0a4 4 0 018 0v4"
//             />
//           </svg>
//           <p className="text-lg font-semibold">No Data Found</p>
//           <p className="text-sm text-gray-400 mt-1">
//             Please check back later or try refreshing.
//           </p>
//         </div>
//       ) : (
//         userProducts.map((item) => {
//           return (
//             <div
//               key={item.id}
//               className="p-4  rounded-lg shadow-sm flex flex-col items-center w-48"
//               onClick={() => handleViewProduct(item.id)}
//             >
//               <div className="h-28 w-32 overflow-hidden rounded-lg">
//                 <Image
//                   src={item.images[0][0]}
//                   alt="author"
//                   width={120}
//                   height={120}
//                   className="object-cover"
//                 />
//               </div>
//               <p className="mt-3 text-sm text-gray-600">{item.name}</p>
//             </div>
//           );
//         })
//       )}
//     </article>
//   );
// };

// export default ProfileCard;


import React from "react";
import { useGetUserProducts } from "@/lib/api/productsApi/productQuery";
import { useRouter } from "next/navigation";
import Image from "next/image";

const ProfileCard = () => {
  const router = useRouter();
  const getUserProducts = useGetUserProducts();
  const userProducts = getUserProducts?.data?.data?.products || [];

  const handleViewProduct = (itemId: string) => {
    router.push(`/profile/view-profile/${itemId}`);
  };

  return (
    <article className="rounded-2xl bg-white shadow-sm overflow-hidden flex flex-row flex-wrap gap-4 p-4">
      {userProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-48 text-gray-400 w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mb-4 text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 17v-2a4 4 0 018 0v2m-4 4v-4m0-4a4 4 0 10-8 0v4m0 4v-4m0 0a4 4 0 018 0v4"
            />
          </svg>
          <p className="text-lg font-semibold">No Data Found</p>
          <p className="text-sm text-gray-400 mt-1">
            Please check back later or try refreshing.
          </p>
        </div>
      ) : (
        userProducts.map((item) => (
          <div
            key={item.id}
            role="button"
            tabIndex={0}
            onClick={() => handleViewProduct(item.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ")
                handleViewProduct(item.id);
            }}
            className="p-4 rounded-lg shadow-sm flex flex-col items-center w-48 cursor-pointer hover:shadow-lg transition-shadow"
          >
            <div className="h-28 w-32 overflow-hidden rounded-lg">
              <Image
                src={item.images?.[0]?.[0] ?? "/placeholder.png"}
                alt={item.name || "Product image"}
                width={128}
                height={112}
                className="object-cover"
              />
            </div>
            <p className="mt-3 text-sm text-gray-600 text-center">
              {item.name}
            </p>
          </div>
        ))
      )}
    </article>
  );
};

export default ProfileCard;
