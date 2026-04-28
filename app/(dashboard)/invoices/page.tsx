"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { PAGE_TITLES } from "@/constants/constants";

import { InvoiceTable } from "./_components/invoice-table";

const InvoicesPage = () => {
  const pathname = usePathname();

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
            <BreadcrumbLink href="#">Invoices</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page Title */}
      <div className="my-8 flex w-full items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">{PAGE_TITLES[pathname]}</h1>
        <Button asChild>
          <Link href={"/invoices/create"}>Add Invoice</Link>
        </Button>
      </div>

      {/* Invoice Table */}
      <div>
        <InvoiceTable />
      </div>
    </div>
  );
};

export default InvoicesPage;
