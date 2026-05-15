"use client";

import { useParams } from "next/navigation";
import { ProductForm } from "../../_components/product-form";
import { PageHeader } from "@/components/layout/page-header";

export default function UpdateProductPage() {
  const { id } = useParams();

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Update Product Details" 
        breadcrumbs={[
          { label: "Products", href: "/products" },
          { label: "Update" }
        ]}
      />

      <div className="max-w-2xl">
        <ProductForm mode="edit" id={id as string} />
      </div>
    </div>
  );
}
