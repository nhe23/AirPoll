<script lang="ts">
  import FilterCities from "./FilterCities.svelte";
  import FilterCountries from "./FilterCountries.svelte";
</script>

<style>
  .box {
    /* margin: 0px 10px; */
    height: fit-content;
    background-color: #e8eef3;
    /* margin: 0 10px; */
    position: sticky;
    top: 0;
    z-index: 2;
  }

  .header {
    margin-bottom: 15px;
  }
</style>

<div class="box is-flex is-flex-direction-column is-hidden-mobile" data-testid="filterDesktop">
  <div class="header is-flex is-flex-direction-column">
    <span class="is-size-5 header">Filter By</span>
    <span class="is-size-6 header">Country</span>
    <FilterCountries />
  </div>
  <div class="header is-flex is-flex-direction-column">
    <span class="is-size-6 header">City</span>
    <FilterCities />
  </div>
</div>
