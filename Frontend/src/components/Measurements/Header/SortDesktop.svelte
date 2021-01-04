<script lang="ts">
  import type { Columns } from "../../../types";
  export let measurementsColumns: Array<Columns>;
  export let sort: (key: string) => void;
</script>

<style>
  .headerField {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .headerBox {
    position: sticky;
    top: 0;
    z-index: 2;
  }

  .box{
    background-color: #e8eef3;
  }
</style>

<div data-testid="sortDesktop" class="box headerBox">
  <div class="container">
    <div class="columns">
      {#each measurementsColumns as header,i}
        <div class="column is-2 is-flex is-flex-direction-column">
          {#each header.keys as key,ii}
            <div data-testid="header{i}{ii}" class="headerField" on:click={() => sort(key.internalName)}>
              <span>{key.name}</span>
              <span class="icon is-small has-text-link sortIcon">
                <i class="fas fa-sort" />
              </span>
            </div>
          {/each}
        </div>
      {/each}
    </div>
  </div>
</div>
