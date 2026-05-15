"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CategoryTable } from "./_components/category-table";
import { ExportButton } from "@/components/tables/export-button";
import { REPORT_API } from "@/constants/api.constants";
import { PageHeader } from "@/components/layout/page-header";

const CategoriesPage = () => {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Product Categories" 
        breadcrumbs={[{ label: "Categories" }]}
      >
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href={"/categories/create"}>Add Category</Link>
          </Button>
          <ExportButton endpoint={REPORT_API.categories} filename="categories.csv" />
        </div>
      </PageHeader>

      {/* Categories Table */}
      <div>
        <CategoryTable />
      </div>
    </div>
  );
};

export default CategoriesPage;
