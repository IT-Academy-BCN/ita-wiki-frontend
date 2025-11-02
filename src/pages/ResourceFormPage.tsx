import { LanguageSelector } from "../components/languageSelector/LanguageSelector";

export function ResourceFormPage() {
  return (
    <form>
      <label htmlFor="language">Language:</label>
      <LanguageSelector />
    </form>
  );
}
