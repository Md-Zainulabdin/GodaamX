import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  const session = await getSession();
  if (session) redirect("/dashboard");

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        {/* <Link href="/" className="flex cursor-pointer items-center justify-center"></Link> */}
        {children}
      </div>
    </div>
  );
}
