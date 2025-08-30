import { http, toApiError, ApiError } from "@/lib/http";

export type UploadImagesParams = {
  files: File[];
  /** Optional additional form fields to send along with the upload */
  fields?: Record<string, string | number | boolean | null | undefined>;
  /** Optional endpoint override. Defaults to "/media/upload" */
  endpoint?: string;
};

export type UploadedFile = {
  id?: string | number;
  url: string;
  name?: string;
  size?: number;
  type?: string;
};

export type UploadImagesResponse = {
  data?: UploadedFile[];
  message?: string;
  urls?: string[];
  [key: string]: unknown;
};

export async function uploadImages({
  files,
  fields,
  endpoint = "/media/upload",
}: UploadImagesParams): Promise<UploadImagesResponse> {
  try {
    const form = new FormData();
    files.forEach((file) => form.append("files[]", file));
    if (fields) {
      Object.entries(fields).forEach(([key, value]) => {
        if (value !== undefined && value !== null) form.append(key, String(value));
      });
    }

    const { data } = await http.post(endpoint, form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data as UploadImagesResponse;
  } catch (err) {
    throw toApiError(err) as ApiError;
  }
}

