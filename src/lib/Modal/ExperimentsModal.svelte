<script>
    import Modal from "./Modal.svelte";

    let id = "experiments"
</script>

<Modal id={id} title="Experiments" let:data>
    <p>Welcome! Here you can try out new and experimental features that are still in development. Please note that these features may be unstable and could change or be removed in future updates.</p>
    <ul>
        <li>No experiments yet/are being tested</li>
    </ul>
</Modal>