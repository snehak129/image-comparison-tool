<script lang="ts">
  import MaskedImage from "./MaskedImage.svelte";
  import OriginalImage from "./OriginalImage.svelte";
  import Search from "./Search.svelte";
  import Reason from "./Reason.svelte";

  export let errorMessage = false;
  export let originalImage;
  export let maskImage;

  let rejected = [];
  let index = 0;

  /**
   * Function to handle navigation using left/right arrow keys
   * @param event
   */
  function handleKeyUp(event: KeyboardEvent) {
    var key = event.code;
    if (key === "ArrowRight") {
      // right arrow
      handleNext();
      return false;
    } else if (key === "ArrowLeft") {
      // left arrow
      handlePrevious();
      return false;
    }
  }

  /**
   * Function to increment current index when next is clicked
   */
  function handleNext() {
    if (index !== originalImage.length - 1) {
      index = index + 1;
    }
  }

  /**
   * Function to decrement current index when previous is clicked
   */
  function handlePrevious() {
    if (index > 0) {
      index = index - 1;
    }
  }
</script>

<!-- Can use arrow keys to navigate through images -->
<svelte:window on:keyup={handleKeyUp} />

<div class="container image-container">
  <!-- Show error message if api call to fetch images fails -->
  {#if errorMessage}
    <div class="message text-danger">
      Error occured while fetching data. Please try again.
    </div>
  {/if}

  <!-- Tool to search, reject the annotated image with reason, can export the rejected file names to csv file -->
  <div class="row row-cols-lg-auto g-3 align-items-center px-4">
    <Search {index} {originalImage} />
    <Reason {originalImage} {index} {rejected} />
  </div>

  <div
    class="d-flex flex-row flex-wrap align-items-center justify-content-center image-parent"
  >
    <!-- First container -->
    {#if originalImage && originalImage.length > 0}
      <OriginalImage {originalImage} {index} />
    {/if}
    <!-- Second container -->
    {#if maskImage && maskImage.length > 0}
      <MaskedImage {maskImage} {index} />
    {/if}

    <span class="text-center">
      ({index + 1} / {originalImage.length})
    </span>

    <!--  Go to previous image -->
    <button
      type="button"
      class="btn btn-link arrow position-absolute top-50 start-0"
      title="Previous"
      disabled={index === 0}
      on:click={handlePrevious}
    >
      <span class="material-icons-outlined md-36"> arrow_back_ios </span>
    </button>

    <!-- Go to next image -->
    <button
      type="button"
      class="btn btn-link arrow position-absolute top-50 end-0"
      title="Next"
      disabled={index === originalImage.length - 1}
      on:click={handleNext}
    >
      <span class="material-icons-outlined md-36"> arrow_forward_ios </span>
    </button>
  </div>
</div>

<style>
  .material-icons-outlined.md-36 {
    font-size: 36px;
  }

  .arrow {
    cursor: pointer;
    color: rgba(46, 44, 44, 0.87);
  }

  .arrow:hover {
    color: rgb(136, 135, 135);
  }

  .image-container {
    padding-top: 71.6px;
  }

  .image-parent {
    gap: 0px 10px;
  }

  .message {
    text-align: center;
    padding-bottom: 1rem;
  }

  .arrow:focus {
    border-color: white;
    box-shadow: none;
  }
</style>
