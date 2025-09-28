
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from ".";


export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProduct,
    onSuccess(data: any) {
      // showSuccessToast({
      //   message: data.message,
      // });

      // router.back();
    //   queryClient.invalidateQueries({ queryKey: ["get-profile"] });
    },
    onError(error: any) {
    },
  });
};
