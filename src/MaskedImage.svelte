<script lang="typescript">
  import { extractImageName } from "./util";
  export let maskImage;
  export let index;
</script>

<div>
  <div class="card mb-2 shadow-sm mask-parent">
    <div><img src={maskImage[index]} alt="masked" /></div>
    <div class="card-body p-2">
      <p class="card-text" id="text-mask">
        {extractImageName(maskImage[index])}
      </p>
    </div>
  </div>
</div>

<style>
</style>
