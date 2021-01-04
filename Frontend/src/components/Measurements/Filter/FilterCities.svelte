<script lang="ts">
  import { client } from "../../../apollo";
  import { query } from "svelte-apollo";
  import { debounceInput } from "../../../actions/debounceInput";
  import { filterStore } from "../../../store";
  import type { CitiesResult, CitiesStartsWith } from "../../../types";
  import { CITIES_STARTWITH } from "../queries";

  let showCities = false;
  let placeholder = "Search for city";
  let error: Error;
  let loading = false;
  let queryCities: Array<CitiesResult> = [];
  let searchString = "";
  let inputValue = "";

  async function handleNewValue(e) {
    searchString = e.detail;
    await fetchCities(searchString);
  }

  function select(e: Event, result: CitiesResult) {
    inputValue = result.name;
    filterStore.set({ key: "city", value: inputValue });
    showCities = false;
    queryCities = queryCities.filter((c) =>
      c.name.toLowerCase().startsWith(inputValue.toLowerCase())
    );
  }

  async function fetchCities(searchString: string) {
    try {
      const citiesResult = query(client, {
        query: CITIES_STARTWITH,
        variables: { searchString },
      });
      let res = (await citiesResult.result()) as CitiesStartsWith;
      queryCities = res.data.citiesStartsWith;
    } catch (e) {
      error = e;
    }
    loading = false;
  }

  filterStore.subscribe((f) => {
    if (f.key !== "city") {
      inputValue = "";
      searchString = "";
    } else if (searchString === "" || inputValue === "") {
      inputValue = f.value;
      searchString = f.value;
    }
  });
</script>

<style>
  .selectable {
    cursor: pointer;
  }

  .citiesInput {
    width: 100%;
  }

  .dropdown-trigger {
    width: 100%;
  }
  input {
    background-color: transparent;
  }

  .dropdown-content {
    max-height: 250px;
    overflow-y: scroll;
  }

  .header {
    min-width: 200px;
  }
</style>

<div
  data-testid="filterCities"
  class="dropdown header"
  class:is-active={showCities && searchString !== ''}>
  <div class="dropdown-trigger">
    <div class="field">
      <div class="control">
        <input
          data-testid="searchCities"
          use:debounceInput
          class="input citiesInput"
          type="text"
          on:focus={() => {
            showCities = true;
          }}
          on:blur={() => {
            showCities = false;
          }}
          {placeholder}
          on:newvalue={handleNewValue}
          bind:value={inputValue} />
      </div>
    </div>
  </div>
  <div class="dropdown-menu" id="dropdown-menu3" role="menu">
    <div
      data-testid="citiesDropdownContent"
      class="dropdown-content citiesInput">
      {#if loading}
        Loading...
      {:else if error}
        Error loading countries:
        {error}
      {:else}
        {#each queryCities as result, i}
          <div
            data-testid="city{i}"
            class="dropdown-item selectable"
            on:mousedown={(e) => select(e, result)}>
            {result.name}
          </div>
        {:else}
          <div class="dropdown-item">No cities found</div>
        {/each}
      {/if}
    </div>
  </div>
</div>
