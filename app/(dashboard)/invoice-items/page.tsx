"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useInvoices } from "@/app/(dashboard)/invoices/_hook/use-invoices";

import { InvoiceItemTable } from "./_components/invoice-item-table";
import { ExportButton } from "@/components/tables/export-button";
import { REPORT_API } from "@/constants/api.constants";

const InvoiceItemsPage = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedInvoiceId = searchParams.get("invoice_id") || "";

  const { data: invoices, isLoading: isLoadingInvoices } = useInvoices();

  const handleInvoiceChange = (id: string) => {
    router.push(`${pathname}?invoice_id=${id}`);
  };

  return (
    <div>
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">GodaamX</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/invoice-items">Invoice Items</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header Section */}
      <div className="my-8 flex w-full items-center justify-between">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-semibold tracking-tight">Invoice Items</h1>

          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-zinc-700 whitespace-nowrap">Select Invoice:</span>
            <Select
              value={selectedInvoiceId}
              onValueChange={handleInvoiceChange}
              disabled={isLoadingInvoices}
            >
              <SelectTrigger className="w-[280px] bg-zinc-50/50">
                <SelectValue placeholder={isLoadingInvoices ? "Loading invoices..." : "Choose an Invoice"} />
              </SelectTrigger>
              <SelectContent>
                {invoices?.map((invoice) => (
                  <SelectItem key={invoice.invoice_id} value={invoice.invoice_id}>
                    {invoice.invoice_number}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            asChild
            disabled={!selectedInvoiceId}
            className="h-11 px-6 shadow-lg shadow-black/5"
          >
            <Link href={`/invoice-items/create?invoice_id=${selectedInvoiceId}`}>
              Add Item
            </Link>
          </Button>
          <ExportButton endpoint={REPORT_API.invoiceItems} filename="invoice_items.csv" />
        </div>
      </div>

      {/* Content Section */}
      <div>
        {selectedInvoiceId ? (
          <InvoiceItemTable invoiceId={selectedInvoiceId} />
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center border rounded-md">
            <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-zinc-50 text-zinc-400">
              <ShoppingCart className="size-6" />
            </div>
            <h3 className="text-lg font-semibold text-zinc-900">No Invoice Selected</h3>
            <p className="mt-1 max-w-[280px] text-sm text-zinc-500">
              Please select an invoice from the dropdown above to view and manage its items.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoiceItemsPage;
