<script lang="typescript">
  import { extractImageName } from "./util";

  export let originalImage;
  export let index;

  let search = "";

  function handleSearchImage() {
    if (search) {
      const searchResults = originalImage
        .map((originalImage: string, index: number) => {
          return { fileName: extractImageName(originalImage), index };
        })
        .filter(({ fileName }) => {
          return fileName.toLowerCase() === search.toLowerCase();
        })
        .map(({ index }) => index);

      if (searchResults && searchResults.length > 0) {
        const imageIndex = searchResults[0];
        index = imageIndex;
      }
    }
  }
</script>

<div class="col-12 me-auto">
  <div class="d-flex">
    <input
      class="form-control me-2"
      type="search"
      bind:value={search}
      placeholder="Search"
      aria-label="Search"
    />
    <button
      class="btn btn-outline-secondary"
      type="button"
      on:click={handleSearchImage}>Search</button
    >
  </div>
</div>
