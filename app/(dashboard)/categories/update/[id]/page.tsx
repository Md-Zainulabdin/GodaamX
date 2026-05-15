"use client";

import { useParams } from "next/navigation";
import { CategoryForm } from "../../_components/category-form";
import { PageHeader } from "@/components/layout/page-header";

export default function UpdateCategoryPage() {
  const { id } = useParams();

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Update Category Info" 
        breadcrumbs={[
          { label: "Categories", href: "/categories" },
          { label: "Update" }
        ]}
      />

      <div className="max-w-2xl">
        <CategoryForm mode="edit" id={id as string} />
      </div>
    </div>
  );
}
