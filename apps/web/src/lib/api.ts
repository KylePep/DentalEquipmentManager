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
  createdAt: string;
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

  return response.json() as Promise<T>;
}

export const api = {
  listEquipment: () => request<Equipment[]>("/api/equipment"),
  health: () => request<{ status: string }>("/health"),
};
