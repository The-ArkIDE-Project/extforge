<script>
import beautify from "js-beautify";
import CodePreview from "$lib/CodePreview/CodePreview.svelte";
import { experiments } from "$lib/stores/experiments";

export let code;

function copyCode() {
    navigator.clipboard.writeText(beautify.js(code, {
        indent_size: 4,
        space_in_empty_paren: true,
    }))
}

function testCode() {
    // Don't beautify, just send raw code
    const dataUrl = `data:text/javascript;charset=utf-8,${encodeURIComponent(code)}`;
    
    window.open(
        `https://studio.arkide.site/editor?extension=${encodeURIComponent(dataUrl)}&unsandboxed`,
        '_blank'
    ).focus();
}
</script>

<div class="root horiz">
    <div class="inner vert">
        <div class="code">
            <CodePreview {code} />
        </div>
        <div class="horiz">
            <button class="button2" on:click={copyCode}>Copy</button>
            {#if $experiments.viewButton}
                <button class="button2" on:click={testCode}>Test</button>
            {/if}
        </div>
        <b style:color="red">Make sure to run the extension unsandboxed.</b>
    </div>
</div>

<style>
.vert {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.horiz {
    display: flex;
    flex-direction: row;
    align-items: center;
}
.root {
    width: 100%;
    height: 100%;
    justify-content: center;
}
.inner {
    width: 50%;
    gap: 1em;
}
.code {
    width: 100%;
    height: 480px;
}
:global(.dark) .button2 {
    margin: 0.5em;
    padding: 0.5em 1em;
    font-size: 1rem;
    cursor: pointer;
    border: none;
    border-radius: 0.6em;
    color: #000000;
    background-color: #eee;
}
.button2 {
    margin: 0.5em;
    padding: 0.5em 1em;
    font-size: 1rem;
    cursor: pointer;
    border: none;
    border-radius: 0.6em;
    color: #ffffff;
    background-color: #2e2e2e;
}
.button2:hover {
    filter:brightness(0.8);
}
.button2:active {
    filter:brightness(0.4);
}
</style>