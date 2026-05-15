import { apiClient } from "@/lib/axios";
import { Shipment } from "@/types/global";
import { SHIPMENT_API } from "@/constants/api.constants";
import { ShipmentFormValues } from "@/schemas/schemas";
import { useApiQuery, useApiMutation } from "@/hooks/use-api-factory";

/* =========================================================
   Shipment Keys
   ========================================================= */

export const shipmentKeys = {
  all: ["shipments"] as const,
  detail: (id: string) => ["shipments", id] as const,
};

/* =========================================================
   Shipment Hooks
   ========================================================= */

export function useShipments() {
  return useApiQuery<Shipment[]>(shipmentKeys.all, SHIPMENT_API.list);
}

export function useShipment(id: string) {
  return useApiQuery<Shipment>(shipmentKeys.detail(id), SHIPMENT_API.detail(id), { enabled: !!id });
}

export function useCreateShipment() {
  return useApiMutation(
    (body: ShipmentFormValues) => apiClient.post<Shipment>(SHIPMENT_API.create, body).then((r) => r.data),
    {
      invalidateKeys: [shipmentKeys.all],
      successMessage: "Shipment created successfully.",
      redirectPath: "/shipments",
      errorMessage: "Failed to create shipment",
    }
  );
}

export function useUpdateShipment(id: string) {
  return useApiMutation(
    (body: Partial<ShipmentFormValues>) => apiClient.put<Shipment>(SHIPMENT_API.update(id), body).then((r) => r.data),
    {
      invalidateKeys: [shipmentKeys.all, shipmentKeys.detail(id)],
      successMessage: "Shipment updated successfully.",
      redirectPath: "/shipments",
      errorMessage: "Failed to update shipment",
    }
  );
}

export function useDeleteShipment() {
  return useApiMutation(
    (id: string) => apiClient.delete(SHIPMENT_API.delete(id)).then(() => id),
    {
      invalidateKeys: [shipmentKeys.all],
      successMessage: "Shipment deleted.",
      errorMessage: "Failed to delete shipment",
    }
  );
}
