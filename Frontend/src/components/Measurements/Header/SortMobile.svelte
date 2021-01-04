<script lang="ts">
  import type { Columns } from "../../../types";
  export let measurementsColumns: Array<Columns>;
  export let sort: (key: string) => void;

  let showTags = false;

  function toogleTags() {
    showTags = !showTags;
  }
</script>

<style>
  .tag {
    margin: 5px;
    cursor: pointer;
  }

  .headerField {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor:pointer;
  }

  .headerText {
    margin-right: 5px;
  }

  .box{
    background-color: #e8eef3;
  }

  .tags {
    border-top:1px solid #dddddd;
    margin-top:15px;
    padding-top:15px;
  }
</style>

<div data-testid="rootContainer" class="box">
  <div data-testid="toggleTags" on:click={toogleTags} class="headerField">
    <div class="headerText">Sort by</div>
    {#if showTags}
      <span class="icon is-small has-text-link sortIcon">
        <i class="fas fa-chevron-up" />
      </span>
    {:else}
      <span class="icon is-small has-text-link sortIcon"><i
          class="fas fa-chevron-down" /></span>
    {/if}
  </div>
  {#if showTags}
    <div data-testid="tags" class="is-flex is-flex-wrap-wrap tags">
      {#each measurementsColumns as header,i}
        {#each header.keys as key,ii}
          <div data-testid="header{i}{ii}" class="headerField tag" on:click={() => sort(key.internalName)}>
            <span>{key.name}</span>
            <span class="icon is-small has-text-link sortIcon">
              <i class="fas fa-sort" />
            </span>
          </div>
        {/each}
      {/each}
    </div>
  {/if}
</div>
