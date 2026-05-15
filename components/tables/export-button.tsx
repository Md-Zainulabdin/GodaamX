"use client";

import { Download, Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { apiClient } from "@/lib/axios";

interface ExportButtonProps {
  endpoint: string;
  filename?: string;
}

export function ExportButton({ endpoint, filename = "report.csv" }: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const response = await apiClient.get(endpoint, {
        responseType: "blob",
      });

      // Create a URL for the blob data
      const url = window.URL.createObjectURL(new Blob([response.data]));
      
      // Create a temporary link element and trigger download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      link.remove();
      window.URL.revokeObjectURL(url);
      
      toast.success("Data exported successfully.");
    } catch (error: unknown) {
      console.error("Export error:", error);
      toast.error("Failed to export data. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className="h-9 w-9 rounded-lg border-zinc-200"
      onClick={handleExport}
      disabled={isExporting}
      title="Export to CSV"
    >
      {isExporting ? (
        <Loader2 className="size-4 animate-spin text-zinc-400" />
      ) : (
        <Download className="size-4 text-zinc-600" />
      )}
    </Button>
  );
}
