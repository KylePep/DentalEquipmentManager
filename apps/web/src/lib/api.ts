/**
 * Thin typed wrapper around the .NET API. Point it at the API with
 * NEXT_PUBLIC_API_URL (see .env.local.example).
 */
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5080";

export interface Equipment {
  id: number;
  name: string;
  manufacturer: string | null;
  serialNumber: string | null;
  purchaseDate: string | null;
  manufacturerDate: string | null;
  description: string | null;
  createdAt: string;
}

export interface EquipmentDetail extends Equipment {
  maintenanceEvents: MaintenanceEvent[];
}

export interface MaintenanceEvent {
  id: number;
  equipmentId: number;
  title: string;
  description: string | null;
  start: string;
  end: string;
  reoccur: boolean;
  occurrence: string;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`API ${response.status} for ${path}`);
  }

  if(response.status === 204){
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export const api = {
  listEquipment: () => request<Equipment[]>("/api/equipment"),
  getEquipment: (id: number) => request<EquipmentDetail>(`/api/equipment/${id}`),
  createEquipment: (equipment: Omit<Equipment, "id" | "createdAt">) =>
    request<Equipment>("/api/equipment", {
      method: "POST",
      body: JSON.stringify(equipment),
    }),
  updateEquipment: (id: number, equipment: Omit<Equipment, "id" | "createdAt">) =>
    request<Equipment>(`/api/equipment/${id}`, {
      method: "PUT",
      body: JSON.stringify(equipment),
    }),
  deleteEquipment: (id: number) =>
    request<Equipment>(`/api/equipment/${id}`, {
      method: "DELETE",
    }),

  // Maintenance Event
  createMaintenanceEvent: (maintenanceEvent: Omit<MaintenanceEvent, "id" | "createdAt">) =>
    request<MaintenanceEvent>("/api/maintenance-events", {
      method: "POST",
      body: JSON.stringify(maintenanceEvent),
    }),
  health: () => request<{ status: string }>("/health"),
};
