<script>
import Modal from "./Modal.svelte";
import { onMount } from "svelte";

let id = "settings";

onMount(() => {
  console.log("Settings modal mounted");
});
</script>

<Modal {id} title="More" let:data>
<h1>A simple page with more stuff</h1>
<div>
  <p style="display: inline-block">You can join our discord to give us feedback:</p>
  <a href="https://discord.gg/eZGVNUHuXa" target="_blank" rel="noopener noreferrer" style="display: inline-block;">
    <button>Discord</button>
  </a>
</div>

<div>
  <p style="display: inline-block">Check out ArkIDE Here:</p>
  <a href="https://arkide.site" target="_blank" rel="noopener noreferrer" style="display: inline-block;">
    <button>ArkIDE</button>
  </a>
</div>
<small>more soon</small>
</Modal>

<style>
  button {
    border: 0px;
    border-radius: 12px;
    margin: 12px;
    padding: 12px;
    background-color: rgb(0, 0, 0);
    color: rgb(255, 255, 255);
    font-size: 1.2rem;
  }

  button:hover {
    filter: brightness(0.8);
    cursor: pointer;
  }

:global(.dark) button {
    border: 0px;
    border-radius: 12px;
    margin: 12px;
    padding: 12px;
    background-color: rgb(255, 255, 255);
    color: rgb(0, 0, 0);
  }

  small {
    color: gray;
    font-size: 0.8rem;
    font-style: italic;
  }

  p {
    font-size: 1.2rem;
    font-weight: 500;
  }
</style>