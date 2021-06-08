<script lang="typescript">
  import { fly } from "svelte/transition";
  import { exportCSVFile, extractImageName } from "./util";

  export let originalImage;
  export let index;
  export let rejected;

  let isShowRejectReason = false;
  let reason = "";

  /**
   * Function to handle reject image
   */
  function handleReject() {
    // Get file name
    const fileName = extractImageName(originalImage[index]);

    // check if fileName already exists, if it does, replace the reason with new one
    let fileIndex = rejected.map((rej) => rej.fileName).indexOf(fileName);
    if (fileIndex !== -1) {
      rejected[fileIndex].reason = reason;
    } else {
      // if not add it to the rejected list
      rejected = [{ fileName, reason }, ...rejected];
    }

    // Reset form values
    reason = "";
    isShowRejectReason = false;
  }

  /**
   * Function to show/hide reject form on clicking reject button
   */
  function handleRejectClick() {
    // toggle reject form
    isShowRejectReason = !isShowRejectReason;
  }

  function handleExport() {
    exportCSVFile(
      { fileName: "fileName", reason: "reason" },
      [...rejected],
      "Rejected_" + new Date()
    );
  }
</script>

{#if isShowRejectReason}
  <div
    class="col-12 reason-text"
    in:fly={{ x: 50, duration: 1000 }}
    out:fly={{ x: 50, duration: 1000 }}
  >
    <input
      autocomplete="off"
      class="form-control form-control-sm mb-2 mr-sm-2"
      bind:value={reason}
      placeholder="Enter reason"
      type="text"
    />
  </div>

  <div
    class="col-12 reject-confirm"
    in:fly={{ x: 50, duration: 1000 }}
    out:fly={{ x: 50, duration: 1000 }}
  >
    <button
      class="btn btn-primary btn-sm mb-2 mr-2"
      type="button"
      disabled={!reason}
      on:click={handleReject}>Reject</button
    >
  </div>
{/if}

<div class="col-12">
  <span
    role="button"
    title="Reject Image"
    class="material-icons-outlined"
    on:click={handleRejectClick}
  >
    {isShowRejectReason ? "cancel" : "thumb_down_off_alt"}
  </span>
</div>

<div class="col-12">
  <button
    type="button"
    role="button"
    class="btn btn-link export-btn"
    disabled={rejected.length === 0}
    title="Export rejected"
    on:click={handleExport}
  >
    <span class="material-icons-outlined ">file_download</span>
  </button>
</div>

<style>
  .export-btn {
    text-decoration: none;
    margin: 0;
    color: inherit;
  }
</style>
