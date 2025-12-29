<script>
    import { createEventDispatcher } from "svelte";
    import { experiments } from "$lib/stores/experiments";
    const dispatch = createEventDispatcher()
    
    export let properties = {
        name: "Extension",
        id: "extensionID",
        color: "#0fbd8c",
        color3: "#11cf99",
        imageUri: null,
        showBlockIcon: false,
        useExternalUrl: false
    }
    
    let fileInput;
    let urlInput = "";
    let displayFileName = "";
    
    // Initialize urlInput from properties when component loads or properties change
    $: if (properties.useExternalUrl && properties.imageUri && urlInput !== properties.imageUri) {
        urlInput = properties.imageUri;
    }
    
    function update() {
        dispatch("update")
    }
    
    function validateName() {
        if (properties.name == "") properties.name = "Extension"
        if (properties.name.length > 20) properties.name = properties.name.substring(0, 20)
        properties.name = properties.name.replace("\n", " ")
        update()
    }
    
    function handleImageUpload(event) {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            // Update display name
            const fileName = file.name;
            displayFileName = fileName.length > 15 ? fileName.substring(0, 12) + "..." : fileName;
            
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = 200;
                    canvas.height = 200;
                    const ctx = canvas.getContext('2d');
                    
                    // Clear canvas to transparent
                    ctx.clearRect(0, 0, 200, 200);
                    ctx.drawImage(img, 0, 0, 200, 200);

                    // Try PNG first to preserve transparency
                    let dataUri = canvas.toDataURL('image/png');
                    
                    // If too large, try reducing size
                    if (dataUri.length > 8000) {
                        canvas.width = 150;
                        canvas.height = 150;
                        ctx.clearRect(0, 0, 150, 150);
                        ctx.drawImage(img, 0, 0, 150, 150);
                        dataUri = canvas.toDataURL('image/png');
                    }
                    
                    // If still too large, try even smaller
                    if (dataUri.length > 8000) {
                        canvas.width = 100;
                        canvas.height = 100;
                        ctx.clearRect(0, 0, 100, 100);
                        ctx.drawImage(img, 0, 0, 100, 100);
                        dataUri = canvas.toDataURL('image/png');
                    }
                    
                    properties.imageUri = dataUri;
                    update();
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    }
    
    function handleUrlInput(event) {
        if (event.key === 'Enter' || event.type === 'blur') {
            properties.imageUri = urlInput;
            update();
        }
    }
    
    function clearImage() {
        properties.imageUri = null;
        urlInput = "";
        displayFileName = "";
        if (fileInput) {
            fileInput.value = '';
        }
        update();
    }
</script>

<div class="root vert">
    <div class="inner horiz">
        <div class="vert equal">
            {#if properties.imageUri}
                <div class="bubble image-bubble">
                    <img src={properties.imageUri} alt="Extension logo" />
                </div>
            {:else}
                <div class="bubble" style:background={properties.color} style:box-shadow="0 0 20px {properties.color}, 0 0 40px {properties.color}80, 0 0 60px {properties.color}40" />
            {/if}
            <span class="name" contenteditable="plaintext-only" bind:innerText={properties.name} on:blur={validateName}></span>
        </div>
        <div class="vert equal">
            <span>ID: <input type="text" placeholder="extensionID" maxlength="20" bind:value={properties.id} on:blur={update}></span>
            <span>Color: <input type="color" bind:value={properties.color} on:blur={update}></span>
            <span>Block Outline: <input type="color" bind:value={properties.color3} on:blur={update}></span>
            {#if $experiments.extensionLogo}
                <span class="image-upload">
                    Logo: 
                    {#if properties.useExternalUrl}
                        <input type="text" placeholder="https://example.com/image.png" bind:value={urlInput} on:keydown={handleUrlInput} on:blur={handleUrlInput} class="url-input">
                    {:else}
                        <div class="file-input-wrapper">
                            <input type="file" accept="image/*" on:change={handleImageUpload} bind:this={fileInput} id="file-upload">
                            <label for="file-upload" class="file-label">
                                {displayFileName || "Choose file..."}
                            </label>
                        </div>
                    {/if}
                    {#if properties.imageUri}
                        <button type="button" on:click={clearImage} class="clear-btn">Clear</button>
                    {/if}
                </span>
                <label class="checkbox-label">
                    <input type="checkbox" bind:checked={properties.useExternalUrl} on:change={update}>
                    Use external URL instead
                </label>
                {#if properties.imageUri}
                    <label class="checkbox-label">
                        <input type="checkbox" bind:checked={properties.showBlockIcon} on:change={update}>
                        Show icon next to blocks
                    </label>
                {/if}
            {/if}
        </div>
    </div>
    <slot {properties} />
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
    .equal {
        flex: 1;
        overflow: visible;
    }
    .root {
        width: 100%;
        height: 100%;
        justify-content: center;
    }
    .inner {
        width: 30em;
    }
    .bubble {
        width: 8em;
        aspect-ratio: 1;
        box-sizing: border-box;
        border: .5em solid #0004;
        border-radius: 100%;
        transition: box-shadow 0.3s ease;
        margin: 3em 0 1em 0;
        isolation: isolate;
    }
    .image-bubble {
        background: #0002;
        padding: 0;
        overflow: hidden;
        box-shadow: 0 0 20px #0004;
    }
    :global(.dark) .image-bubble {
        background: #fff2;
    }
    .image-bubble img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .name {
        font-size: 1.2em;
        font-weight: 500;
        background-color: #0002;
        padding: 0.1em 0.3em;
        border-radius: 0.2em;
        margin-top: 0.5em;
        max-width: 100%;
        box-sizing: border-box;
        outline: none;
    }
    :global(.dark) .name {
        background-color: #fff2;
    }
    .image-upload {
        display: flex;
        align-items: center;
        gap: 0.5em;
    }
    .file-input-wrapper {
        flex: 1;
        position: relative;
    }
    .file-input-wrapper input[type="file"] {
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;
    }
    .file-label {
        display: block;
        padding: 0.3em 0.5em;
        border: 1px solid #0004;
        border-radius: 0.2em;
        background-color: #0002;
        font-size: 0.9em;
        cursor: pointer;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    :global(.dark) .file-label {
        background-color: #fff2;
        border-color: #fff4;
    }
    .file-label:hover {
        background-color: #0003;
    }
    :global(.dark) .file-label:hover {
        background-color: #fff3;
    }
    .clear-btn {
        padding: 0.3em 0.6em;
        font-size: 0.9em;
        background: #ff4444;
        color: white;
        border: none;
        border-radius: 0.2em;
        cursor: pointer;
    }
    .clear-btn:hover {
        background: #cc0000;
    }
    .checkbox-label {
        display: flex;
        align-items: center;
        gap: 0.4em;
        font-size: 0.9em;
        cursor: pointer;
        user-select: none;
    }
    .checkbox-label input[type="checkbox"] {
        cursor: pointer;
    }
    .url-input {
        flex: 1;
        padding: 0.3em 0.5em;
        border: 1px solid #0004;
        border-radius: 0.2em;
        background-color: #0002;
        font-size: 0.9em;
    }
    :global(.dark) .url-input {
        background-color: #fff2;
        border-color: #fff4;
        color: white;
    }
</style>