<script>
  export let meal = [];
</script>

<div class="meal-plan-container">
  {#each meal as meal}
    <div class="meal-box">
      <img src={meal.image} alt={meal.name} class="meal-image"/>
      <div class="meal-info">
        <h1 class="meal-title">{meal.name}</h1>
        <p class="diets">Diets: {meal.diets}</p>
      </div>
    </div>
  {/each}
</div>

<style>
  .meal-plan-container {
    background-color: #394455;
    padding: 1.5rem;
    margin: 0.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    /* max-width: 400px; */
    display: flex;
    min-height: 500px;
    transition: transform 0.2s ease-in-out;
  }

  .meal-box{
    background-color: #485568;
    padding: 1rem;
    margin: 1rem;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    /* width: 200px; */
  }

  .meal-box:hover {
    transform: scale(1.05);
  }

  /* .meal-image {
    width: 100%;
    height: 200px;
    border-radius: 8px;
    object-fit: cover;
    margin-bottom: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  } */

  .meal-info {
    text-align: center;
  }

  .meal-title {
    font-family: "Montserrat", sans-serif;
    font-size: 1.5rem;
    margin: 0.5rem 0;
  }
</style>
