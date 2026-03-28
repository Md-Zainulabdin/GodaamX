"use client";

import { DynamicForm } from "@/components/forms/dynamic-form";
import { PRODUCT_FORM_FIELDS } from "@/constants/form.constants";
import { productSchema, ProductFormValues } from "@/schemas/schemas";
import { useCreateProduct, useUpdateProduct, useProduct } from "@/app/(dashboard)/products/_hook/use-products";
import { useCategories } from "@/app/(dashboard)/categories/_hook/use-categories";
import { useSuppliers } from "@/app/(dashboard)/suppliers/_hook/use-suppliers";

type Props = { mode: "create" } | { mode: "edit"; id: string };

export function ProductForm(props: Props) {
  const isEdit = props.mode === "edit";
  const id = isEdit ? props.id : "";

  const { data: categories } = useCategories();
  const { data: suppliers } = useSuppliers();
  const { data: product, isLoading } = useProduct(id);
  const { mutate: createProduct, isPending: isCreating } = useCreateProduct();
  const { mutate: updateProduct, isPending: isUpdating } = useUpdateProduct(id);

  const categoryOptions =
    categories?.map((c) => ({
      label: c.category_name,
      value: String(c.category_id),
    })) ?? [];

  const supplierOptions =
    suppliers?.map((s) => ({
      label: s.supplier_name,
      value: String(s.supplier_id),
    })) ?? [];

  function handleSubmit(data: ProductFormValues) {
    isEdit ? updateProduct(data) : createProduct(data);
  }

  if (isEdit && isLoading) return <p className="text-muted-foreground">Loading...</p>;
  if (isEdit && !product) return <p className="text-muted-foreground">Product not found.</p>;

  return (
    <DynamicForm<ProductFormValues>
      schema={productSchema}
      fields={PRODUCT_FORM_FIELDS}
      onSubmit={handleSubmit}
      submitLabel={isEdit ? "Update Product" : "Create Product"}
      isLoading={isCreating || isUpdating}
      dynamicOptions={{ category_id: categoryOptions, supplier_id: supplierOptions }}
      defaultValues={
        isEdit && product
          ? {
              product_name: product.product_name,
              sku: product.sku ?? undefined,
              description: product.description ?? undefined,
              category_id: product.category_id ? String(product.category_id) : undefined,
              supplier_id: product.supplier_id ? String(product.supplier_id) : undefined,
              price: product.price ?? undefined,
              cost_price: product.cost_price ?? undefined,
              weight: product.weight ?? undefined,
              status: product.status as "Active" | "Inactive",
            }
          : undefined
      }
    />
  );
}
