import { useQuery } from "@tanstack/react-query";
import { getProducts, likeProduct, productCategories, subProductCategories } from ".";

export const useProductCategories = ()=>{
  return useQuery({
    queryKey: ["get-category"],
    queryFn: productCategories,
  });
}


export const useSubProductCategories = (categoryId:any) => {
  
  return useQuery({
    queryKey: ["get-sub-category"],
    queryFn: () => subProductCategories(categoryId),
     enabled: !!categoryId, // Only run this query if categoryId is provided
  });
};

export const useGetProducts = () => {
  return useQuery({
    queryKey: ["get-products"],
    queryFn: getProducts,
  });
};

export const useLikeProducts = () => {
  return useQuery({
    queryKey: ["get-like-products"],
    queryFn: likeProduct,
  });
};