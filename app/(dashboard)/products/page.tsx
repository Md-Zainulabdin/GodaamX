"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductTable } from "./_components/product-table";
import { ExportButton } from "@/components/tables/export-button";
import { REPORT_API } from "@/constants/api.constants";
import { PageHeader } from "@/components/layout/page-header";

const ProductsPage = () => {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Products Inventory" 
        breadcrumbs={[{ label: "Products" }]}
      >
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href={"/products/create"}>Add Product</Link>
          </Button>
          <ExportButton endpoint={REPORT_API.products} filename="products.csv" />
        </div>
      </PageHeader>

      {/* Products Table */}
      <div>
        <ProductTable />
      </div>
    </div>
  );
};

export default ProductsPage;
