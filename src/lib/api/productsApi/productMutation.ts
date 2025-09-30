import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct, likeProduct } from ".";
import { useRouter } from "next/navigation";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: createProduct,
    onSuccess(data: any) {
      // showSuccessToast({
      //   message: data.message,
      // });

      router.back();
      queryClient.invalidateQueries({ queryKey: ["get-products"] });
      queryClient.invalidateQueries({ queryKey: ["get-user-products"] });
    },
    onError(error: any) {},
  });
};

export const useLikeProductMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (productId: string) => likeProduct(productId),
    onSuccess: () => {
      // Invalidate and refetch products after successful like
      queryClient.invalidateQueries({ queryKey: ["get-products"] });
    },
    onError: (error) => {
      console.error("Failed to like product:", error);
      // Optionally show error message to user
    },
  });
};
