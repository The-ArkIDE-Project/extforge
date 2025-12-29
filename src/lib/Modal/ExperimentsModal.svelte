<script>
import Modal from "./Modal.svelte";
import { experiments } from "$lib/stores/experiments";

let id = "experiments";

// Define your experiments here
const experimentsList = [
  {
    id: "viewButton",
    name: "Test Button",
    description: "Enable the test button on the export page to test your extension.",
    onEnable: () => console.log("View button enabled"),
    onDisable: () => console.log("View button disabled")
  },
  {
    id: "extensionLogo",
    name: "Extension Logo",
    description: "Add a custom logo/icon to your extension that appears in the menu and optionally next to blocks.",
    onEnable: () => console.log("Extension logo enabled"),
    onDisable: () => console.log("Extension logo disabled")
  }
];

function toggleExperiment(exp) {
  experiments.toggle(exp.id);
  
  // Call the appropriate callback
  if ($experiments[exp.id]) {
    exp.onEnable?.();
  } else {
    exp.onDisable?.();
  }
}
</script>

<Modal {id} title="Experiments" let:data>
  <p>Welcome! Here you can try out new and experimental features that are still in development. Please note that these features may be unstable and could change or be removed in future updates.</p>
  
  {#if experimentsList.length === 0}
    <ul>
      <li>No experiments yet/are being tested</li>
    </ul>
  {:else}
    <div class="experiments-list">
      {#each experimentsList as exp}
        <div class="experiment-item">
          <div class="experiment-header">
            <div class="experiment-info">
              <h3>{exp.name}</h3>
              <p>{exp.description}</p>
            </div>
            <label class="toggle">
              <input 
                type="checkbox" 
                checked={$experiments[exp.id] || false}
                on:change={() => toggleExperiment(exp)}
              />
              <span class="slider"></span>
            </label>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</Modal>

<style>
  .experiments-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
  }

  .experiment-item {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1rem;
    background: #f9f9f9;
  }

  :global(.dark) .experiment-item {
    border: 1px solid #646464;
    border-radius: 8px;
    padding: 1rem;
    background: #3b3b3b;
  }

  .experiment-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }

  .experiment-info {
    flex: 1;
  }

  .experiment-info h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.1rem;
    color: #333;
  }
  :global(.dark) .experiment-info h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.1rem;
    color: #cecece;
  }

  .experiment-info p {
    margin: 0;
    font-size: 0.9rem;
    color: #666;
  }

  :global(.dark) .experiment-info p {
    margin: 0;
    font-size: 0.9rem;
    color: #dadada;
  }

  /* Toggle Switch Styles */
  .toggle {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 24px;
    flex-shrink: 0;
  }

  .toggle input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: 0.3s;
    border-radius: 24px;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.3s;
    border-radius: 50%;
  }

  input:checked + .slider {
    background-color: #4CAF50;
  }

  input:checked + .slider:before {
    transform: translateX(26px);
  }
</style>