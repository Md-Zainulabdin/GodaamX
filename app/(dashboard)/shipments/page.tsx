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

import { ShipmentTable } from "./_components/shipment-table";

const ShipmentsPage = () => {
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
            <BreadcrumbLink href="#">Shipments</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page Title */}
      <div className="my-8 flex w-full items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">{PAGE_TITLES[pathname]}</h1>
        <Button asChild>
          <Link href={"/shipments/create"}>Add Shipment</Link>
        </Button>
      </div>

      {/* Shipment Table */}
      <div>
        <ShipmentTable />
      </div>
    </div>
  );
};

export default ShipmentsPage;
