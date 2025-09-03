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
type RecordOfStringArray = { [key: string]: string[] };
type LooseRecord = Record<string, unknown>;

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
      errors?: string[] | RecordOfStringArray;
    }
  | unknown;

// Helper function to extract meaningful error message from various error formats
function isObject(value: unknown): value is LooseRecord {
  return typeof value === "object" && value !== null;
}

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
  if (isObject(error)) {
    const errObj: LooseRecord = error;

    // Format 1: { code, details: { errors: [], message } }
    const details = isObject(errObj["details"]) ? (errObj["details"] as LooseRecord) : undefined;
    const detailErrors = Array.isArray(details?.["errors"]) ? (details?.["errors"] as string[]) : undefined;
    if (detailErrors && detailErrors.length > 0) {
      const mainMessage =
        (typeof details?.["message"] === "string" && (details["message"] as string)) ||
        (typeof errObj["message"] === "string" && (errObj["message"] as string)) ||
        "Validation error";

      if (detailErrors.length === 1) {
        return { message: detailErrors[0] };
      }
      return { message: mainMessage, description: detailErrors.join(", ") };
    }

    // Format 2: { errors: [] } or { errors: { field: [] } }
    const errorsField = errObj["errors"];
    if (Array.isArray(errorsField)) {
      const list = errorsField as string[];
      if (list.length === 1) return { message: list[0] };
      if (list.length > 1)
        return {
          message: (errObj["message"] as string) || "Validation errors",
          description: list.join(", "),
        };
    } else if (isObject(errorsField)) {
      const entries = Object.entries(errorsField as RecordOfStringArray);
      const allErrors: string[] = [];
      entries.forEach(([field, fieldErrors]) => {
        if (Array.isArray(fieldErrors)) {
          allErrors.push(...fieldErrors.map((e) => `${field}: ${e}`));
        }
      });
      if (allErrors.length === 1) return { message: allErrors[0] };
      if (allErrors.length > 1)
        return {
          message: (errObj["message"] as string) || "Validation errors",
          description: allErrors.join(", "),
        };
    }

    // Format 3: Simple message field
    if (typeof errObj["message"] === "string") {
      return { message: errObj["message"] as string };
    }

    // Format 4: Error field
    if (typeof errObj["error"] === "string") {
      return { message: errObj["error"] as string };
    }

    // Format 5: Response data (common in API responses)
    const response = errObj["response"];
    if (isObject(response) && "data" in response) {
      return parseErrorMessage((response as LooseRecord)["data"] as unknown);
    }

    // Format 6: Data field
    if ("data" in errObj) {
      return parseErrorMessage(errObj["data"] as unknown);
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
  const r = response as { data?: unknown; response?: { data?: unknown } } | undefined;
  const errorData = r?.data || r?.response?.data || response;
  showErrorToast(errorData || fallbackMessage || "API request failed", opts);
}