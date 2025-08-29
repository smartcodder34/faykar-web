// "use client";

// import { toast } from "sonner";

// type ToastOptions = {
//   description?: string;
//   durationMs?: number;
// };

// export function showSuccessToast(message: string, opts?: ToastOptions): void {
//   toast.success(message, {
//     description: opts?.description,
//     duration: opts?.durationMs ?? 3500,
//   });
// }

// export function showErrorToast(message: string, opts?: ToastOptions): void {
//   toast.error(message || "Something went wrong", {
//     description: opts?.description,
//     duration: opts?.durationMs ?? 4500,
//   });
// }

// export function showInfoToast(message: string, opts?: ToastOptions): void {
//   toast.message(message, {
//     description: opts?.description,
//     duration: opts?.durationMs ?? 3500,
//   });
// }



"use client";

import { toast } from "sonner";

type ToastOptions = {
  description?: string;
  durationMs?: number;
};

// Enhanced error type to handle various error formats
type ErrorInput =
  | string
  | Error
  | {
      message?: string;
      details?: {
        errors?: string[];
        message?: string;
      };
      code?: number;
    }
  | {
      error?: string;
      errors?: string[] | { [key: string]: string[] };
    }
  | any;

// Helper function to extract meaningful error message from various error formats
function parseErrorMessage(error: ErrorInput): {
  message: string;
  description?: string;
} {
  // Handle string errors
  if (typeof error === "string") {
    return { message: error };
  }

  // Handle Error objects
  if (error instanceof Error) {
    return { message: error.message };
  }

  // Handle null/undefined
  if (!error) {
    return { message: "Something went wrong" };
  }

  // Handle structured error objects
  if (typeof error === "object") {
    // Format 1: { code, details: { errors: [], message } }
    if (error.details?.errors && Array.isArray(error.details.errors)) {
      const mainMessage =
        error.details.message || error.message || "Validation error";
      const errorList = error.details.errors;

      if (errorList.length === 1) {
        return { message: errorList[0] };
      } else if (errorList.length > 1) {
        return {
          message: mainMessage,
          description: errorList.join(", "),
        };
      }
    }

    // Format 2: { errors: [] } or { errors: { field: [] } }
    if (error.errors) {
      if (Array.isArray(error.errors)) {
        if (error.errors.length === 1) {
          return { message: error.errors[0] };
        } else if (error.errors.length > 1) {
          return {
            message: error.message || "Validation errors",
            description: error.errors.join(", "),
          };
        }
      } else if (typeof error.errors === "object") {
        // Handle field-specific errors: { field1: ["error1"], field2: ["error2"] }
        const allErrors: string[] = [];
        Object.entries(error.errors).forEach(([field, fieldErrors]) => {
          if (Array.isArray(fieldErrors)) {
            allErrors.push(...fieldErrors.map((err) => `${field}: ${err}`));
          }
        });

        if (allErrors.length === 1) {
          return { message: allErrors[0] };
        } else if (allErrors.length > 1) {
          return {
            message: error.message || "Validation errors",
            description: allErrors.join(", "),
          };
        }
      }
    }

    // Format 3: Simple message field
    if (error.message) {
      return { message: error.message };
    }

    // Format 4: Error field
    if (error.error) {
      return { message: error.error };
    }

    // Format 5: Response data (common in API responses)
    if (error.response?.data) {
      return parseErrorMessage(error.response.data);
    }

    // Format 6: Data field
    if (error.data) {
      return parseErrorMessage(error.data);
    }
  }

  // Fallback
  return { message: "Something went wrong" };
}

export function showSuccessToast(message: string, opts?: ToastOptions): void {
  toast.success(message, {
    description: opts?.description,
    duration: opts?.durationMs ?? 3500,
  });
}

export function showErrorToast(error: ErrorInput, opts?: ToastOptions): void {
  const parsed = parseErrorMessage(error);

  toast.error(parsed.message, {
    description: opts?.description || parsed.description,
    duration: opts?.durationMs ?? 4500,
  });
}

export function showInfoToast(message: string, opts?: ToastOptions): void {
  toast.message(message, {
    description: opts?.description,
    duration: opts?.durationMs ?? 3500,
  });
}

// Additional utility functions for specific use cases
export function showValidationErrorToast(
  errors: string[] | { [key: string]: string[] },
  opts?: ToastOptions
): void {
  if (Array.isArray(errors)) {
    if (errors.length === 1) {
      showErrorToast(errors[0], opts);
    } else {
      showErrorToast(
        {
          message: "Validation errors",
          description: errors.join(", "),
        },
        opts
      );
    }
  } else {
    showErrorToast({ errors }, opts);
  }
}

export function showApiErrorToast(
  response: any,
  fallbackMessage?: string,
  opts?: ToastOptions
): void {
  const errorData = response?.data || response?.response?.data || response;
  showErrorToast(errorData || fallbackMessage || "API request failed", opts);
}