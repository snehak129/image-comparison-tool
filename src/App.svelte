<script lang="ts">
  import Images from "./Images.svelte";
  import { onMount } from "svelte";
  import type { ResponseData } from "./types";

  // Image urls
  let originalImage = [];
  let maskImage = [];
  let errorMessage = false;

  onMount(() => {
    fetch("./json/sample_data.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to fetch data: " + response.status);
        }
        return response.json();
      })
      .then((data: ResponseData) => {
        console.log(data);
        originalImage = [...data.originalImage, ...originalImage];
        maskImage = [...data.maskImage, ...maskImage];
      })
      .catch((error) => {
        console.log(error);
        errorMessage = true;
      });
  });
</script>

<header class="p-3 bg-dark text-white">
  <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
    <h2 class="text-center me-auto px-2">Image Comparison</h2>
  </nav>
</header>

<Images {errorMessage} {maskImage} {originalImage} />
