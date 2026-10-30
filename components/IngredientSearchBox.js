// A search box for finding an ingredient by name, like "palak" or "paneer".
export default function IngredientSearchBox({ searchText, onChange }) {
  return (
    <div className="field-group">
      <label htmlFor="ingredient-search" className="field-label">
        Looking for something?
      </label>
      <input
        id="ingredient-search"
        className="text-input"
        type="search"
        value={searchText}
        placeholder="Type an ingredient"
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
