<script>
  import Router, { wrap, push } from "svelte-spa-router";
  import Home from "./pages/Home.svelte";
  import Dashboard from "./pages/Dashboard.svelte";
  import Signup from "./pages/Signup.svelte";
  import Login from "./pages/Login.svelte";
  import Prolife from "./pages/Profile.svelte";
  import Navbar from "./components/Navbar.svelte";
  import Loading from "./components/Loading.svelte";
  import { onMount } from "svelte";
  import axios from "axios";
  import { user } from "./stores";

  let loading = true;

  onMount(async () => {
    const { data } = await axios.get("api/auth/user");
    $user = data.user;
    loading = false;
  });

  const routes = {
    "/": wrap(Home, { reason: "authenticated" }, () => !$user),
    "/dashboard": wrap(Dashboard, { reason: "unauthenticated" }, () => $user),
    "/signup": wrap(Signup, { reason: "authenticated" }, () => !$user),
    "/login": wrap(Login, { reason: "authenticated" }, () => !$user),
    "/profile": wrap(Prolife, { reason: "unauthenticated" }, () => $user)
  };

  function conditionsFailed(event) {
    const { reason } = event.detail.userData;
    switch (reason) {
      case "unauthenticated":
        return push("/login");
      case "authenticated":
        return push("/dashboard");
    }
  }
</script>

<style>
  .loading-container {
    max-width: 500px;
    display: flex;
    min-height: 100vh;
    align-content: center;
    margin: auto;
  }
</style>

{#if loading}
  <div class="loading-container">
    <Loading />
  </div>
{:else}
  <Navbar />
  <Router {routes} on:conditionsFailed={conditionsFailed} />
{/if}
