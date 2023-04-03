<script>
    import { Heading } from "flowbite-svelte";
    import { clickOutside } from "./click_outside";
    import { fly, fade } from "svelte/transition";
    import { createEventDispatcher } from "svelte";

    import { page } from "$app/stores";
    const dispatch = createEventDispatcher();
</script>

<div transition:fade class="h-screen w-screen top-0 left-0 fixed bg-black/50">
    <div
        transition:fly={{ x: -300 }}
        use:clickOutside
        on:outclick={() => dispatch("close")}
        class=" bg-gray-900 w-fit   absolute h-full top-[50px]    "
    >
        <h1
            class="text-2xl text-center border-b py-4  font-extrabold leading-none tracking-tight text-red-400 md:text-5xl  dark:text-white"
        >
            JECA
        </h1>
        <div class="flex  flex-col ">
            <a
                on:click={() => {
                    dispatch("close");
                }}
                href="/Examprep/JECA"
                class="p-4 hover:bg-gray-800"
                class:bg-gray-800={$page.route.id == "/Examprep/JECA"}
            >
                <Heading customSize="text-2xl font-bold" class="text-white">
                    Dashboard</Heading
                >
            </a>
            <a
                on:click={() => {
                    dispatch("close");
                }}
                href="/Examprep/JECA/instructions"
                class="p-4 hover:bg-gray-800"
                class:bg-gray-800={$page.route.id ==
                    "/Examprep/JECA/instructions"}
            >
                <Heading customSize="text-2xl font-bold" class="text-white"
                    >Instructions</Heading
                >
            </a>
            <a
                on:click={() => {
                    dispatch("close");
                }}
                href="/Examprep/JECA/mockTest"
                class="p-4 hover:bg-gray-800"
                class:bg-gray-800={$page.route.id == "/Examprep/JECA/mockTest"}
            >
                <Heading customSize="text-2xl font-bold" class="text-white"
                    >Mock Test</Heading
                >
            </a>
            <a
                on:click={() => {
                    dispatch("close");
                }}
                href="/Examprep/JECA/quiz"
                class="p-4 hover:bg-gray-800"
                class:bg-gray-800={$page.route.id == "/Examprep/JECA/quiz"}
            >
                <Heading customSize="text-2xl font-bold" class="text-white"
                    >Quiz</Heading
                >
            </a>
        </div>
    </div>
</div>
