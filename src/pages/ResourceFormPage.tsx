import { LanguageSelector } from "../components/languageSelector/LanguageSelector";
/**
 * ResourceFormPage
 * ---------------------------------
 * Temporary form page to test LanguageSelector component.
 * Later it could be part of the resource creation form.
 */
export function ResourceFormPage() {
  return (
    <div style={{ padding: "2rem" }}>
      <h2>Resource Form Page 🧪</h2>
      <p>This page allows testing the LanguageSelector component.</p>

      <form>
        <label htmlFor="language">Language:</label>
        <LanguageSelector />
      </form>
    </div>
  );
}

export default ResourceFormPage;
