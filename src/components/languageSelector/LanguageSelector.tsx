import { useEffect, useState } from "react";
import { getLanguages, Language } from "../../services/languageService";

export function LanguageSelector() {
  const [languages, setLanguages] = useState<Language[]>([]);

  useEffect(() => {
    getLanguages().then(setLanguages);
  }, []);

  return (
    <select>
      {languages.map((lang) => (
        <option key={lang.id} value={lang.code}>
          {lang.name}
        </option>
      ))}
    </select>
  );
}
