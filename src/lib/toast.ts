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
  | unknown;

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
    const errObj = error as {
      message?: string;
      error?: string;
      errors?: string[] | Record<string, string[]>;
      details?: { errors?: string[]; message?: string };
      response?: { data?: unknown };
      data?: unknown;
    };

    // Format 1: { code, details: { errors: [], message } }
    if (errObj.details?.errors && Array.isArray(errObj.details.errors)) {
      const mainMessage = errObj.details.message || errObj.message || "Validation error";
      const errorList = errObj.details.errors;

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
    if (errObj.errors) {
      if (Array.isArray(errObj.errors)) {
        if (errObj.errors.length === 1) {
          return { message: errObj.errors[0] };
        } else if (errObj.errors.length > 1) {
          return {
            message: errObj.message || "Validation errors",
            description: errObj.errors.join(", "),
          };
        }
      } else if (typeof errObj.errors === "object") {
        // Handle field-specific errors: { field1: ["error1"], field2: ["error2"] }
        const allErrors: string[] = [];
        Object.entries(errObj.errors).forEach(([field, fieldErrors]) => {
          if (Array.isArray(fieldErrors)) {
            allErrors.push(...fieldErrors.map((err) => `${field}: ${err}`));
          }
        });

        if (allErrors.length === 1) {
          return { message: allErrors[0] };
        } else if (allErrors.length > 1) {
          return {
            message: errObj.message || "Validation errors",
            description: allErrors.join(", "),
          };
        }
      }
    }

    // Format 3: Simple message field
    if (errObj.message) {
      return { message: errObj.message };
    }

    // Format 4: Error field
    if (errObj.error) {
      return { message: errObj.error };
    }

    // Format 5: Response data (common in API responses)
    if (errObj.response?.data) {
      return parseErrorMessage(errObj.response.data);
    }

    // Format 6: Data field
    if (errObj.data) {
      return parseErrorMessage(errObj.data);
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
  response: unknown,
  fallbackMessage?: string,
  opts?: ToastOptions
): void {
  let errorData: unknown = response;
  if (typeof response === "object" && response !== null) {
    const maybe = response as { data?: unknown; response?: { data?: unknown } };
    errorData = maybe.data ?? maybe.response?.data ?? response;
  }
  showErrorToast(errorData || fallbackMessage || "API request failed", opts);
}