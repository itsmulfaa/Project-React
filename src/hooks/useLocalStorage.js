import { useEffect, useState } from "react";
import { DEFAULT_PENGATURAN } from "../data/default";

export default function useLocalStorage(kunci, nilaiAwal) {
  const [nilai, setNilai] = useState(() => {
    try {
      const tersimpan = localStorage.getItem(kunci);

      if (!tersimpan) return nilaiAwal;

      const data = JSON.parse(tersimpan);

      // Migrasi pengaturan lama tanpa menghapus pengaturan pengguna.
      if (kunci === "gradie-pengaturan") {
        return {
          ...DEFAULT_PENGATURAN,
          ...data,
          bobot: {
            ...DEFAULT_PENGATURAN.bobot,
            ...(data.bobot || {}),
          },
        };
      }

      return data;
    } catch {
      return nilaiAwal;
    }
  });

  useEffect(() => {
    localStorage.setItem(kunci, JSON.stringify(nilai));
  }, [kunci, nilai]);

  return [nilai, setNilai];
}