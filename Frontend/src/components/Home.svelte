<!-- Landing page -->
<script lang="ts">
  import { fade } from "svelte/transition";
  import { navigate } from "svelte-routing";
  import Nature from "./IllustrationComponents/Nature.svelte";
  let h = 0;
  let w = 0;
  $: triangleWidth = w / 2;
  $: triangleHeight = h;
</script>

<style>
  .sectionContainer {
    background-color: var(--theme-primary);
    flex: 1;
  }
  section {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    position: relative;
    height: 100%;
  }

  .description {
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: var(--theme-background);
    z-index: 2;
    margin: 15px;
  }
  @media only screen and (min-width: 720px) {
    .description {
      margin-left: 10vw;
      margin-bottom: 10vw;
    }
  }

  svg {
    margin: 20px;
  }

  .primaryButton {
    background-color: var(--theme-secondary);
    color: var(--theme-textColorPrimary);
    width: fit-content;
    margin-top: 20px;
    font-size: 20px;
  }
  .primaryButton:hover {
    color: var(--theme-textColorPrimary);
  }

  .button {
    border-color: var(--theme-secondary);
  }

  .button:active {
    background-color: #f63c61;
  }

  #triangle {
    position: absolute;
    margin: 0;
    z-index: 1;
  }

  .illustrationContainer {
    position: absolute;
    z-index: 3;
    bottom: 40px;
    left: 50px;
  }

  @media only screen and (max-width: 720px) {
    .illustration {
      display: none;
    }
    .illustrationContainer {
      bottom: 20px;
      right: 20px;
      display: flex;
      justify-content: flex-end;
    }
  }
</style>

<div class="sectionContainer" bind:clientWidth={w} bind:clientHeight={h}>
  <div class="illustration">
    <svg
      id="triangle"
      width={triangleWidth}
      height={triangleHeight}
      viewBox="0 0 {triangleWidth} {triangleHeight}"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path d="M0 0L{triangleWidth} {triangleHeight}H0V0Z" fill="#1A64D4" />
    </svg>
  </div>
  <div class="illustrationContainer">
    {#if triangleWidth < 360}
      <Nature sizeFactor={0.4} />
    {:else}
      <Nature sizeFactor={0.75} />
    {/if}
  </div>
  <section>
    <div in:fade class="description">
      <span class="is-size-2">Air pollution will influence </span>
      <span class="is-size-2">the quality of our future.</span>
      <span class="is-size-4">This is why AirPoll strives to</span>
      <span class="is-size-4">bring transparency to this issue</span>
      <button
        class="primaryButton button is-rounded"
        on:click={() => navigate('/dashboard')}>Let's see the data</button>
    </div>
  </section>
</div>
