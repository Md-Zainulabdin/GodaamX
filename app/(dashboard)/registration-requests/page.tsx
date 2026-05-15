"use client";

import { RegistrationRequestTable } from "./_components/registration-request-table";
import { PageHeader } from "@/components/layout/page-header";

export default function RegistrationRequestsPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Registration Requests" 
        breadcrumbs={[{ label: "Registration Requests" }]}
      />

    {/* Registration Request Table */}
      <div>
        <RegistrationRequestTable />
      </div>
    </div>
  );
}
