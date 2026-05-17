"use client";

import { Download, Loader2 } from "lucide-react";
import { useState, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { apiClient } from "@/lib/axios";

interface ExportButtonProps {
  endpoint: string;
  filename?: string;
  mimeType?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  children?: ReactNode;
}

export function ExportButton({
  endpoint,
  filename = "report.csv",
  mimeType = "text/csv",
  variant = "outline",
  size = "icon",
  className = "",
  children,
}: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const response = await apiClient.get(endpoint, {
        responseType: "blob",
      });

      let finalFilename = filename;
      const contentDisposition = response.headers["content-disposition"];
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="?([^"]+)"?/);
        if (match && match[1]) {
          finalFilename = match[1];
        }
      }

      const blob = new Blob([response.data], { type: mimeType });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", finalFilename);
      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success("Downloaded");
    } catch (error: any) {
      let errorMessage = "Failed to download.";

      if (error.response?.data instanceof Blob) {
        try {
          const text = await error.response.data.text();
          const json = JSON.parse(text);
          if (json.detail) {
            errorMessage = typeof json.detail === "string" ? json.detail : JSON.stringify(json.detail);
          }
        } catch (parseError) {
          console.error("Failed to parse error blob:", parseError);
        }
      }

      toast.error(errorMessage);
    } finally {
      setIsExporting(false);
    }
  };

  if (children || size !== "icon") {
    return (
      <Button
        variant={variant}
        size={size}
        className={className}
        onClick={handleExport}
        disabled={isExporting}
      >
        {isExporting ? (
          <Loader2 className="mr-2 size-4 animate-spin" />
        ) : (
          <Download className="mr-2 size-4" />
        )}
        {children || "Download"}
      </Button>
    );
  }

  return (
    <Button
      variant={variant}
      size="icon"
      className={`h-9 w-9 rounded-lg border-zinc-200 ${className}`}
      onClick={handleExport}
      disabled={isExporting}
      title="Download report"
    >
      {isExporting ? (
        <Loader2 className="size-4 animate-spin text-zinc-400" />
      ) : (
        <Download className="size-4 text-zinc-600" />
      )}
    </Button>
  );
}
