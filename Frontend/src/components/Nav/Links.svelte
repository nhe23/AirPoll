<script>
  import { Link } from "svelte-routing";
  import { slide } from "svelte/transition";

  export let showMobile = false;
</script>

<style>
  .linkContainer :global(a) {
    text-decoration: none;
    color: var(--theme-primary);
    margin-left: 25px;
    margin-right: 25px;
  }
  .linkContainer :global(a:hover) {
    text-decoration: none;
    color: var(--theme-primary);
    margin-left: 25px;
    margin-right: 25px;
  }
  .linkContainer :global(a:visited) {
    text-decoration: none;
    color: var(--theme-primary);
    margin-left: 25px;
    margin-right: 25px;
  }

  .mobile :global(a) {
    margin: 10px;
  }

  .links {
    height: fit-content;
    margin-right: 20px;
  }

  .mobile {
    font-size: large;
    border-top: 1px solid var(--theme-primary);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>

<div
  data-testid="navLinks"
  transition:slide={{ duration: showMobile ? 750 : 0 }}
  class:links={!showMobile}
  class:mobile={showMobile}
  class="linkContainer">
  <Link to="/dashboard">Dashboard</Link>
</div>
