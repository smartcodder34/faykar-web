"use client";

import { useMutation } from "@tanstack/react-query";
import { uploadImages, UploadImagesParams, UploadImagesResponse } from "@/lib/api/upload";
import { ApiError, toApiError } from "@/lib/http";
import { showErrorToast, showSuccessToast } from "@/lib/toast";

export function useUploadImages(options?: {
  onSuccess?: (data: UploadImagesResponse) => void;
  onError?: (err: ApiError) => void;
}) {
  return useMutation<UploadImagesResponse, ApiError, UploadImagesParams>({
    mutationKey: ["uploadImages"],
    mutationFn: async (params) => uploadImages(params),
    onSuccess: (data) => {
      showSuccessToast("Upload successful");
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      const apiErr = toApiError(error) as ApiError;
      showErrorToast(apiErr || "Upload failed");
      options?.onError?.(apiErr);
    },
  });
}

