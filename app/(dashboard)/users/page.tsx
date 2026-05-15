"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { PAGE_TITLES } from "@/constants/constants";
import { PageHeader } from "@/components/layout/page-header";

import { UserTable } from "./_components/user-table";
import { ExportButton } from "@/components/tables/export-button";
import { REPORT_API } from "@/constants/api.constants";

const UsersPage = () => {
  const pathname = usePathname();

  return (
    <div>
      <PageHeader
        title={PAGE_TITLES[pathname] || "Users"}
        breadcrumbs={[{ label: "Users" }]}
      >
        <Button asChild>
          <Link href={"/users/create"}>Add User</Link>
        </Button>
        <ExportButton endpoint={REPORT_API.users} filename="users.csv" />
      </PageHeader>

      {/* Users Table */}
      <div>
        <UserTable />
      </div>
    </div>
  );
};

export default UsersPage;
