import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";

const statusVariant: Record<string, { label: string; className: string }> = {
  active: { label: "Active", className: "bg-green-100 text-green-700 border-green-200" },
  nonactive: { label: "Nonactive", className: "bg-zinc-100 text-zinc-500 border-zinc-200" },
  inactive: { label: "Inactive", className: "bg-zinc-100 text-zinc-500 border-zinc-200" },
  pending: { label: "Pending", className: "bg-yellow-100 text-yellow-700 border-yellow-200" },
  received: { label: "Received", className: "bg-blue-100 text-blue-700 border-blue-200" },
  approved: { label: "Approved", className: "bg-blue-100 text-blue-700 border-blue-200" },
  cancelled: { label: "Cancelled", className: "bg-red-100 text-red-600 border-red-200" },
  business: { label: "Business", className: "bg-purple-100 text-purple-700 border-purple-200" },
  individual: { label: "Individual", className: "bg-sky-100 text-sky-700 border-sky-200" },
  in_transit: { label: "In Transit", className: "bg-orange-100 text-orange-700 border-orange-200" },
  delivered: { label: "Delivered", className: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  paid: { label: "Paid", className: "bg-teal-100 text-teal-700 border-teal-200" },
};

const fallbackConfig = { label: "Unknown", className: "bg-zinc-100 text-zinc-500 border-zinc-200" };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const statusBadge: ColumnDef<any>["cell"] = ({ getValue }) => {
  const raw = getValue<string | boolean | null | undefined>();

  if (raw == null) return "—";

  const key = typeof raw === "boolean" ? (raw ? "active" : "nonactive") : String(raw).toLowerCase().replace(/\s+/g, "_");
  const config = statusVariant[key] ?? { ...fallbackConfig, label: String(raw) };

  return (
    <Badge className={`${config.className} border`} variant={"outline"}>
      {config.label}
    </Badge>
  );
};
