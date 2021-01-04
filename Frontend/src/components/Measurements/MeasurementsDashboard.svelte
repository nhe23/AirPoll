<!-- Dashboard page -->
<script lang="ts">
  import MeasurementsList from "./MeasurementsList.svelte";
  import FilterDesktop from "./Filter/FilterDesktop.svelte";
  import Description from "./Description.svelte";
</script>

<style>
  .row {
    display: flex;
  }

  .side-column {
    max-width: 300px;
    padding: 0 15px;
  }
</style>

<section class="section" data-testid="measurementsDashboard">
  <div class="container">
    <div class="row">
      <div class="is-flex is-flex-direction-column side-column is-hidden-mobile">
        <FilterDesktop />
        <Description />
      </div>
      <MeasurementsList />
    </div>
  </div>
</section>
