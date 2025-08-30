"use client";

import React from "react";
import CustomButton from "@/customComp/CustomButton";
import { useUploadImages } from "@/lib/hooks/useUpload";

type DashboardUploaderProps = {
  title?: string;
  endpoint?: string;
  onUploaded?: (urls: string[]) => void;
};

export default function DashboardUploader({
  title = "Share your Product",
  endpoint,
  onUploaded,
}: DashboardUploaderProps) {
  const [files, setFiles] = React.useState<File[]>([]);
  const [previews, setPreviews] = React.useState<string[]>([]);

  const uploadMutation = useUploadImages({
    onSuccess: (res) => {
      const urls: string[] = Array.isArray(res?.data)
        ? res.data.map((f) => f.url)
        : Array.isArray(res?.urls)
        ? res.urls!
        : [];
      onUploaded?.(urls);
      setFiles([]);
      setPreviews([]);
    },
  });

  React.useEffect(() => {
    const nextPreviews = files.map((f) => URL.createObjectURL(f));
    setPreviews(nextPreviews);
    return () => nextPreviews.forEach((url) => URL.revokeObjectURL(url));
  }, [files]);

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const dropped = Array.from(e.dataTransfer.files || []).filter((f) =>
      f.type.startsWith("image/")
    );
    if (dropped.length) setFiles((prev) => [...prev, ...dropped]);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(e.target.files || []).filter((f) =>
      f.type.startsWith("image/")
    );
    if (selected.length) setFiles((prev) => [...prev, ...selected]);
    e.currentTarget.value = "";
  }

  function removeAt(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  function submit() {
    if (files.length === 0 || uploadMutation.isPending) return;
    uploadMutation.mutate({ files, endpoint });
  }

  return (
    <div className="w-full">
      <div className="rounded-2xl border border-gray-200 p-4 bg-white">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-[#2E6939] text-white flex items-center justify-center">📷</div>
          <div className="flex-1">
            <div className="text-sm text-gray-700 font-medium">{title}</div>
            <div className="text-xs text-gray-500">Drag images here or click to browse</div>
          </div>
        </div>

        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="mt-4 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-4 cursor-pointer hover:bg-gray-100"
          onClick={() => document.getElementById("dashboard-upload-input")?.click()}
        >
          <input
            id="dashboard-upload-input"
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleInputChange}
          />

          {previews.length === 0 ? (
            <div className="flex items-center justify-center text-gray-500 text-sm h-24">
              Drop images here or click to select
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {previews.map((src, idx) => (
                <div key={src} className="relative group">
                  <img
                    src={src}
                    alt={`preview-${idx}`}
                    className="h-28 w-full object-cover rounded-lg border border-gray-200"
                  />
                  <button
                    type="button"
                    className="absolute top-1 right-1 hidden group-hover:block bg-black/60 text-white rounded-full px-2 py-0.5 text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeAt(idx);
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <CustomButton
            title="Clear"
            borderBn
            onPress={() => {
              setFiles([]);
              setPreviews([]);
            }}
          />
          <CustomButton
            title={uploadMutation.isPending ? "Uploading..." : "Upload"}
            primary
            disabled={files.length === 0 || uploadMutation.isPending}
            onPress={submit}
          />
        </div>
      </div>
    </div>
  );
}

