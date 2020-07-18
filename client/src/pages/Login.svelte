<script>
  import axios from "axios";
  import { user } from "../stores";
  import { push } from "svelte-spa-router";
  let username;
  let password;
  let errorMessage;

  $: if (username || password) {
    errorMessage = null;
  }

  async function login() {
    try {
      const { data } = await axios.post("/api/auth/login", {
        username,
        password
      });
      $user = data.user;
      push("/dashboard");
    } catch (error) {
      if (error.response.status === 401) {
        username = "";
        password = "";
        errorMessage = "Invalid Credentials";
      }
    }
  }
</script>

<div class="container">
  <div class="section">
    <h1 class="title">Login</h1>
    <hr />
    {#if errorMessage}
      <p class="help is-danger">{errorMessage}</p>
    {/if}
    <form on:submit|preventDefault={login}>
      <div class="field">
        <label class="label">Username</label>
        <div class="control">
          <input
            type="text"
            bind:value={username}
            class="input"
            required
            class:is-danger={errorMessage} />

        </div>
      </div>
      <div class="field">
        <label class="label">Password</label>
        <div class="control">
          <input
            type="password"
            bind:value={password}
            class="input"
            required
            class:is-danger={errorMessage} />
        </div>
      </div>
      <div class="control">
        <input type="submit" class="button is-info is-light" value="Submit" />
      </div>
    </form>
    <hr />
    <p>
      Do not have an account ?
      <a href="#/signup">Sign Up</a>
    </p>
    <hr />
  </div>

</div>
