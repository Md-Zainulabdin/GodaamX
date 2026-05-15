import { ProductForm } from "../_components/product-form";
import { PageHeader } from "@/components/layout/page-header";

export default function CreateProductPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Add New Product" 
        breadcrumbs={[
          { label: "Products", href: "/products" },
          { label: "Create" }
        ]}
      />

      <div className="max-w-2xl">
        <ProductForm mode="create" />
      </div>
    </div>
  );
}
