import { useEffect, useState } from "react";

export default function useLocalStorage(kunci, nilaiAwal) {
  const [nilai, setNilai] = useState(() => {
    try {
      const tersimpan = localStorage.getItem(kunci);
      return tersimpan ? JSON.parse(tersimpan) : nilaiAwal;
    } catch {
      return nilaiAwal;
    }
  });

  useEffect(() => {
    localStorage.setItem(kunci, JSON.stringify(nilai));
  }, [kunci, nilai]);

  return [nilai, setNilai];
}
