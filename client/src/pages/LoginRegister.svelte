<script>
  import axios from "axios";
  let username = $state("");
  let password = $state("");

  const handleSubmit = async () => {
    const endpoint = `http://localhost:8080/users/login`;
    try {
      const response = await axios.post(endpoint, {
        username,
        password,
      });
      console.log(response.data);
    } catch (error) {
        console.error(error);
    }
  };
</script>

<div class="form-container">
  <h1>Login</h1>

  <input type="text" bind:value={username} placeholder="Username" />
  <input type="password" bind:value={password} placeholder="Password" />

  <button class="submit-btn" onclick={handleSubmit}>Submit</button>
</div>

<style>
  form-container {
    background-color: #1d2531;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    width: 100%;
    max-width: 32rem;
    margin: 2.5rem auto;
    text-align: center;
  }
  .form-container h1 {
    text-transform: uppercase;
  }
  .form-container input {
    width: 100%;
    padding: 1rem;
    margin: 1rem 0;
    border: none;
    border-radius: 0.5rem;
    background: #0f1621;
    color: #a0a0a0;
  }
  .form-container input:focus {
    outline: none;
    box-shadow: 0 0 0.3125rem #394961;
  }
  .form-container .submit-btn {
    width: 100%;
    padding: 1rem;
    border: none;
    border-radius: 0.5rem;
    background: #f2c069;
    cursor: pointer;
    margin-bottom: 1rem;
  }
  .form-container .submit-btn:hover {
    background: #d9ac5e;
  }
  .toggle-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }
  .toggle-label {
    font-size: 1rem;
  }
  .toggle-btn {
    width: 3rem;
    height: 1.5rem;
    background-color: #555;
    border-radius: 1.875rem;
    position: relative;
    cursor: pointer;
    transition: background-color 0.3s;
    display: flex;
    align-items: center;
    padding: 0;
    outline: none;
    border: none;
  }
  .toggle-btn:before {
    content: "";
    position: absolute;
    top: 0.125rem;
    left: 0.125rem;
    width: 1.25rem;
    height: 1.25rem;
    background-color: #d6dbe4;
    border-radius: 50%;
    transition: all 0.3s ease;
  }
  .toggle-btn.active {
    background-color: #d9ac5e;
  }
  .toggle-btn.active:before {
    transform: translateX(1.5rem);
  }
  .toggle-btn:focus {
    outline: none;
    box-shadow: none;
  }
</style>
