<script>
  export let meal = { image: "", name: "", diets: [] };
</script>

<div class="meal-plan-container">
  <img src={meal.image} alt={meal.name} />
  <div class="meal-plan-info">
    <h1>{meal.name}</h1>
    <p class="diets">Diets: {meal.diets}</p>
  </div>
</div>

<style>
  .meal-plan-container {
    background-color: #394455;
    padding: 1.5rem;
    margin:0.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    max-width: 400px;
    min-height: 500px;
    transition: transform 0.2s ease-in-out;
  }

  .meal-plan-container:hover {
    transform: scale(1.05);
  }

  .movie-image {
    width: 100%;
    height: 200px;
    border-radius: 8px;
    object-fit: cover;
    margin-bottom: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .movie-info {
    text-align: center;
  }

  .movie-title {
    font-family: "Montserrat", sans-serif;
    font-size: 1.5rem;
    margin: 0.5rem 0;
  }

  .movie-genres {
    color: #a8b9b7;
    margin: 0.3rem 0;
  }

  .movie-status {
    font-weight: bold;
    margin-top: 0.3rem;
  }
</style>
