"use client";

import { useParams } from "next/navigation";
import { UserForm } from "../../_components/user-form";
import { PageHeader } from "@/components/layout/page-header";

export default function UpdateUserPage() {
  const { id } = useParams();

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Update User Details" 
        breadcrumbs={[
          { label: "Users", href: "/users" },
          { label: "Update" }
        ]}
      />

      <div className="max-w-2xl">
        <UserForm mode="edit" id={id as string} />
      </div>
    </div>
  );
}
