import { useEffect, useState } from "react";
import Error from "./Error";
import Meal from "./Meal";

export default function Meals() {
  const [meals, setMeals] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function getMeals() {
      try {
        setIsFetching(true);
        const response = await fetch("http://localhost:3000/meals");
        if (!response.ok) {
          throw new Error("Error with fetching data, please try again later!");
        }
        const data = await response.json();
        setMeals(data);
      } catch (error) {
        setError({ message: error.message });
      } finally {
        setIsFetching(false);
      }
    }

    getMeals();
  }, []);

  if (error) {
    return <Error title="Error occured" description={error.message} />;
  }

  return (
    <>
      <section id="meals">
        {isFetching && <h2>Fetching data please wait...</h2>}
        {!isFetching &&
          meals.map((meal) => {
            return <Meal key={meal.id} meal={meal} />;
          })}
      </section>
    </>
  );
}
