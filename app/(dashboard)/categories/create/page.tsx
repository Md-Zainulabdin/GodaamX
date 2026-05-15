import { CategoryForm } from "../_components/category-form";
import { PageHeader } from "@/components/layout/page-header";

export default function CreateCategoryPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Create New Category" 
        breadcrumbs={[
          { label: "Categories", href: "/categories" },
          { label: "Create" }
        ]}
      />

      <div className="max-w-2xl">
        <CategoryForm mode="create" />
      </div>
    </div>
  );
}
