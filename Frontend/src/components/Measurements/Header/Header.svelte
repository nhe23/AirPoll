<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Columns } from "../../../types";
  import Description from "../Description.svelte";
  import FilterMobile from "../Filter/FilterMobile.svelte";
  import SortDesktop from "./SortDesktop.svelte";
  import SortMobile from "./SortMobile.svelte";
  export let measurementsColumns: Array<Columns>;
  
  const dispatch = createEventDispatcher();

  function sort(key: string) {
    dispatch("sort", {
      key,
    });
  }
</script>

<style>
  .header {
    position: sticky;
    top: 0;
    z-index: 2;
    background-color: #ffffff;
    margin-bottom: 15px;
  }

  .description {
    margin-bottom:15px;
  }
</style>

<div class="header" data-testid="header">
  <div class="hidden-mobile">
    <SortDesktop {measurementsColumns} {sort} />
  </div>
  <div class="hidden-desktop">
    <div class="is-hidden-tablet">
      <FilterMobile />
    </div>
    <SortMobile {measurementsColumns} {sort} />
  </div>
</div>
<div class="is-hidden-tablet description">
  <Description />
</div>
