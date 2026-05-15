import { UserForm } from "../_components/user-form";
import { PageHeader } from "@/components/layout/page-header";

export default function CreateUserPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Create New User" 
        breadcrumbs={[
          { label: "Users", href: "/users" },
          { label: "Create" }
        ]}
      />

      <div className="max-w-2xl">
        <UserForm mode="create" />
      </div>
    </div>
  );
}
