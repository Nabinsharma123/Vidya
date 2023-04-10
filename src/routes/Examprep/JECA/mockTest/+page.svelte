<script>
    import { Heading, Button } from "flowbite-svelte";
    // var ismockTestClick=false
</script>

<svelte:head>
    <title>JECA - Mock Test</title>
</svelte:head>
<div>
    <div class="mb-6">
        <Heading
            customSize="text-3xl md:text-4xl font-bold"
            class="text-white text-right md:text-left pb-2 border-b"
            >Mock Test</Heading
        >
    </div>

    <div>
        <a href="/MockTest?id=1">
            <Button shadow="green" gradient color="green" size="xl"
                >Mock Test 1</Button
            >
        </a>
    </div>
</div>
