<script>
  import axios from "axios";
  import { user } from "../stores";
  import { push } from "svelte-spa-router";
  let username;
  let password;
  let errorMessage;

  $: if (username) {
    errorMessage = null;
  }

  async function signup() {
    try {
      const { data } = await axios.post("/api/auth/sign-up", {
        username,
        password
      });
      $user = data.user;
      push("/dashboard");
    } catch (error) {
      if (error.response.data.message === "UserExistsError") {
        username = "";
        password = "";
        errorMessage = "Username is already taken";
      }
    }
  }
</script>

<div class="container">
  <div class="section">
    <h1 class="title">Sign up</h1>
    <hr />
    <form on:submit|preventDefault={signup}>
      <div class="field">
        <label class="label">Username</label>
        <div class="control">
          <input
            type="text"
            bind:value={username}
            class="input"
            required
            class:is-danger={errorMessage} />
          {#if errorMessage}
            <p class="help is-danger">{errorMessage}</p>
          {/if}
        </div>
      </div>
      <div class="field">
        <label class="label">Password</label>
        <div class="control">
          <input type="password" bind:value={password} class="input" required />
        </div>
      </div>
      <div class="control">
        <input type="submit" class="button is-info is-light" value="Submit" />
      </div>
    </form>
    <hr />
    <p>
      Do you have an account ?
      <a href="#/login">Log in here</a>
    </p>
    <hr />
  </div>

</div>
