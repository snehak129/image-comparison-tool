<script>
  /**
   * Sample of rejected form in modal
   */
  import { createEventDispatcher } from "svelte";
  import { extractImageName } from "./util";

  export let showModal = false;
  export let rejected;
  export let originalImage;
  export let index;

  let dispatch = createEventDispatcher();
  let reject = false;
  let reason = "";

  function handleRejectFormSubmit() {
    // Reassign
    rejected = [
      { fileName: extractImageName(originalImage[index]), reason },
      ...rejected,
    ];
    console.log(reject, reason, rejected);
    resetForm();
    dispatch("closeModal");
  }

  function resetForm() {
    reject = false;
    reason = "";
  }

  function handleResetForm() {
    resetForm();
    dispatch("closeModal");
  }
</script>

{#if showModal}
  <div class="modal" tabindex="-1" on:click|self>
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Reject Image</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            on:click|self
          />
        </div>
        <div class="modal-body">
          <form
            class="form-inline"
            on:submit|preventDefault={handleRejectFormSubmit}
            on:reset|preventDefault={handleResetForm}
          >
            <div class="form-check mb-2 mr-sm-2">
              <input
                class="form-check-input"
                id="reject"
                type="checkbox"
                bind:checked={reject}
              />
              <label class="form-check-label" for="reject">Reject?</label>
            </div>
            <div class="form-group">
              <label class="sr-only" for="reason">Reason</label>
              <input
                autocomplete="off"
                class="form-control form-control-sm mb-2 mr-sm-2"
                id="reason"
                bind:value={reason}
                disabled={!reject}
                placeholder="Enter reason"
                type="text"
              />
            </div>

            <div class="modal-footer">
              <button
                type="reset"
                class="btn btn-secondary btn-sm"
                data-bs-dismiss="modal">Close</button
              >
              <button
                class="btn btn-primary btn-sm"
                id="reject-add"
                disabled={!reject}
                type="submit">Add</button
              >
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .modal {
    display: block;
  }

  .modal-footer {
    border-top: none;
  }
</style>
