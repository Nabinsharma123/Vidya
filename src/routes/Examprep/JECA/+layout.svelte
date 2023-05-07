<script>
    import { Heading } from "flowbite-svelte";
    // import JECALeftPannel from "../../../lib/JECALeftPannel.svelte";
    import { page } from "$app/stores";
    import { onMount } from "svelte";

    // var Leftpannel = false;
    var topic = $page.route.id.slice(15);
    $: topic = $page.route.id.slice(15);
    var Leftpannel, icon;
    onMount(() => {
        if (window.innerWidth <= 500) {
            console.log(1);
            Leftpannel.style.display = "none";
            icon.style.rotate = "90deg";
        }
    });
</script>

<div
    class=" flex min-h-[inherit] overflow-auto bg-gray-900 -mx-3 md:-mx-5 lg:-mx-14"
>
    <div
        bind:this={Leftpannel}
        id="Leftpannel"
        class=" flex-1 md:sticky bg-gray-900 top-[51px]"
    >
        <h1
            class="text-4xl text-center border-b py-4 font-extrabold leading-none tracking-tight text-red-400 md:text-5xl dark:text-white"
        >
            JECA
        </h1>
        <div class="flex flex-col">
            <a
                href="/Examprep/JECA/Dashboard"
                class="p-4 hover:bg-gray-800 flex justify-center items-center"
                class:bg-gray-800={$page.route.id == "/Examprep/JECA/Dashboard"}
            >
                <Heading customSize="text-2xl font-bold" class="text-white">
                    Dashboard</Heading
                >
            </a>
            <a
                href="/Examprep/JECA/Instructions"
                class="p-4 hover:bg-gray-800"
                class:bg-gray-800={$page.route.id ==
                    "/Examprep/JECA/Instructions"}
            >
                <Heading customSize="text-2xl font-bold" class="text-white"
                    >Instructions</Heading
                >
            </a>
            <a
                href="/Examprep/JECA/Mocktest"
                class="p-4 hover:bg-gray-800"
                class:bg-gray-800={$page.route.id == "/Examprep/JECA/Mocktest"}
            >
                <Heading customSize="text-2xl font-bold" class="text-white"
                    >Mock Test</Heading
                >
            </a>
            <a
                href="/Examprep/JECA/Quiz"
                class="p-4 hover:bg-gray-800"
                class:bg-gray-800={$page.route.id == "/Examprep/JECA/Quiz"}
            >
                <Heading customSize="text-2xl font-bold" class="text-white"
                    >Quiz</Heading
                >
            </a>
        </div>
    </div>
    <div class=" flex-[4] min-w-[350px] min-h-[inherit] p-5 md:p-8 bg-gray-800">
        <div class="mb-6 flex items-center gap-5 border-b pb-2">
            <button
                class="top-16 h-fit left-4 border-2 border-gray-900 bg-white px-2.5 py-1.5 rounded-lg ml-1"
                on:click={() => {
                    if (Leftpannel.style.display == "none") {
                        Leftpannel.style.display = "block";
                        icon.style.rotate = "-90deg";
                    } else {
                        Leftpannel.style.display = "none";
                        icon.style.rotate = "90deg";
                    }
                }}
            >
                <i
                    bind:this={icon}
                    class="fa-solid fa-chevron-up fa-lg"
                    style="rotate: -90deg;"
                />
            </button>
            <Heading
                customSize=" text-3xl md:text-4xl  font-bold "
                class="text-white text-right ">{topic}</Heading
            >
        </div>
        <slot />
    </div>
</div>

<!-- {#if Leftpannel}
    <JECALeftPannel
        on:close={() => {
            Leftpannel = false;
        }}
    />
{/if} -->
