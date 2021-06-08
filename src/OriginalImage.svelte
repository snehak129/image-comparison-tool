<script lang="typescript">
  import { extractImageName } from "./util";

  export let originalImage;
  export let index;
</script>

<div>
  <div class="card mb-2 shadow-sm original-parent">
    <div>
      <img src={originalImage[index]} alt="original" />
    </div>
    <div class="card-body p-2">
      <p class="card-text" id="text-original">
        {extractImageName(originalImage[index])}
      </p>
    </div>
  </div>
</div>

<style></style>
