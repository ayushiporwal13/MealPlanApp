<script>
    import axios from 'axios';
    import { onMount } from 'svelte';
    import MealCard  from '../components/MealCard.svelte';

        // props: id passed from route parameter
        let { id } = $props();

        // state to hold the fetched profile data
        let profile = $state(null);

    onMount(async () => {
        try{
            const user = JSON.parse(localStorage.getItem('user'));
            const response  = await axios.get(`http://localhost:8080/users/${id}`, {
                headers: {
                    Authorization: user.header_token
                }
            });

            // assign profile to the response
            profile = response.data.userWithMealPlan;
        } catch (error) {
            console.log(error);
        }
    })

</script>

<div class="profile-container">
    {#if !profile}
        <div>Loading User Profile...</div>
    {:else}
        <h1>Welcome, {profile.username}!</h1>
        <hr />
        <h2>User Preferences</h2>
        <div class="preference-data">
            {#if profile.preferences.length === 0}
                <div>No preferences found</div>
            {:else}
                {#each profile.preferences as preference}
                    <div class="preference">
                        {preference}
                    </div>
                {/each}
            {/if}
        </div>    
        <h2>User MealPlans</h2>
        <div class="meal-plans">
            {#if profile.user_mealplans.length === 0}
                <div>No meal plans found</div>
            {:else}
                {#each profile.user_mealplans as mealPlan}
                <div class="week-meals">
                    <h3>Week: {mealPlan.week}</h3>
                    {#each mealPlan.meals as meal}
                        <MealCard meal={meal}/>
                    {/each}    
                </div>
                {/each}
            {/if}
        </div>
    {/if}
</div>

<style>
    .profile-container {
        background-color: #1d2531;
        padding: 2rem;
        border-radius: 1rem;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        width: 100%;
        /* max-width: 32rem; */
        margin: 2.5rem auto;
        text-align: center;
    }
    .profile-container h1 {
        text-transform: uppercase;
    }
    
    .preference-data {
        /* border: 1px solid #d6dbe4; */
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .preference {
        padding: 1rem;
        margin: 1rem;
        background-color: #485568;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    }
    
    .meal-plans{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .week-meals {
        display:flex;
        margin: 1rem 0;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
    }
    .week-meals h3 {
        width: 100%;
    }
</style>