<script lang="ts">
  import FilterCities from "./FilterCities.svelte";
  import FilterCountries from "./FilterCountries.svelte";

  let showFilter = false;

  function toggleShowFilter() {
    showFilter = !showFilter;
  }
</script>

<style>
  .box {
    height: fit-content;
    background-color: #e8eef3;
    margin-bottom: 10px;
  }

  .header {
    margin-bottom: 15px;
  }

  .headerText {
    margin-right: 5px;
  }

  .headerField {
    display: flex;
    align-items: center;
    justify-content: center; 
    cursor:pointer;   
  }

  .filters{
    border-top:1px solid #dddddd;
    margin-top:15px;
    padding-top:15px;
  }

  .filterColumn{
    flex: 1 1 0px;
    padding: 10px;
  }
</style>

<div data-testid="filterMobile" class="box is-flex is-flex-direction-column">
  <div on:click={toggleShowFilter} class="headerField" data-testid="filterMobileToggle">
    <div class="headerText">Filter by</div>
    {#if showFilter}
      <span class="icon is-small has-text-link sortIcon">
        <i class="fas fa-chevron-up" />
      </span>
    {:else}
      <span class="icon is-small has-text-link sortIcon"><i
          class="fas fa-chevron-down" /></span>
    {/if}
  </div>
  {#if showFilter}
    <div class="filters is-flex is-flex-wrap-wrap is-justify-content-space-around">
      <div class="header is-flex is-flex-direction-column filterColumn">
        <span class="is-size-6 header">Country</span>
        <FilterCountries />
      </div>
      <div class="header is-flex is-flex-direction-column filterColumn">
        <span class="is-size-6 header">City</span>
        <FilterCities />
      </div>
    </div>
  {/if}
</div>
