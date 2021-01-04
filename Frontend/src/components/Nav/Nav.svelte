<script>
  import Burger from "./Burger.svelte";
  import Links from "./Links.svelte";
  import { Link } from "svelte-routing";
  let w;
  let burgerOpen;
</script>

<style>
  nav {
    height: 10vh;
    max-height: 80px;
    min-height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--theme-background);
    border-bottom: 1px solid #e8eef3;
  }

  .logo {
    margin-left: 20px;
    height: 80%;
    /* display: flex;
    align-items: center; */
  }
  .navigation{
    display: flex;
    flex-direction: column;
  }

  img {
    height: 100%;
  }
</style>

<div class="navigation" data-testid="navbar">
  <nav bind:clientWidth={w}>
    <div class="logo"><Link to="/"><img src="/AirPoll.svg" alt="logo" /></Link></div>
    {#if w < 600}
      <Burger bind:openened={burgerOpen} />
    {:else}
      <Links />
    {/if}
  </nav>
  {#if w < 600 && burgerOpen}
    <Links showMobile={true} />
  {/if}
</div>
