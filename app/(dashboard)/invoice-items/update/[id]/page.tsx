"use client";

import { useParams, useSearchParams } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { InvoiceItemForm } from "../../_components/invoice-item-form";

export default function UpdateInvoiceItemPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const invoiceId = searchParams.get("invoice_id") || "";

  return (
    <div className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">GodaamX</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/invoice-items?invoice_id=${invoiceId}`}>Invoice Items</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Update</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="my-8 w-full">
        <h1 className="text-2xl font-semibold tracking-tight">Update Invoice Item</h1>
      </div>

      <div >
        <InvoiceItemForm mode="edit" id={id as string} invoiceId={invoiceId} />
      </div>
    </div>
  );
}
