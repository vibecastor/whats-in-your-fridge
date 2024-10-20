"use client";
import ImageUpload from "./components/ImageUpload";
import useIngredients from "./hooks/useIngredients";

function App() {
  const { ingredients, setIngredients } = useIngredients();

  console.log("[DEBUG]: ingredients", ingredients);

  return (
    <main className="flex flex-col justify-center p-8 gap-4">
      <ImageUpload setIngredients={setIngredients} />
    </main>
  );
}

export default App;
