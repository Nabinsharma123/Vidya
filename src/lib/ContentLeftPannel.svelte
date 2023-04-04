<script>
    import { clickOutside } from "./click_outside";
    import { fly, fade } from "svelte/transition";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    export var TopicList;
    export var subject;
    export var selectedTopic;
</script>

<div
    transition:fade
    class="h-screen z-10 w-screen top-0 left-0 fixed bg-black/50"
>
    <div
        transition:fly={{ x: -300 }}
        use:clickOutside
        on:outclick={() => dispatch("close")}
        class=" bg-white w-fit   absolute h-full   "
    >
        <div class=" flex-1 sticky top-12 w-72 h-fit   rounded-md ">
            <div
                class="pl-5 border-gray-300  rounded-t-md py-4 w-full border-b"
            >
                <h1 class="font-semibold text-2xl">Page Index</h1>
            </div>
            {#if TopicList}
                {#if TopicList === "Comming Soon"}
                    <h1>{TopicList}</h1>
                {:else}
                    <div class="min-h-fit">
                        {#each TopicList as Topic}
                            <a href={`/${subject}/${Topic.replace(/ /g, "-")}`}>
                                <button
                                    class=" w-full text-left topic  hover:bg-slate-300 cursor-pointer pl-5 py-4"
                                    class:Selected={selectedTopic === Topic}
                                    on:click={() => {
                                        dispatch("TopicClicked", { Topic });
                                    }}
                                    in:fly={{
                                        y: 100,
                                        duration: 1000,
                                    }}
                                >
                                    <h1
                                        class="font-semibold  text-lg text-gray-600 w-full"
                                    >
                                        {Topic}
                                    </h1>
                                </button>
                            </a>
                        {/each}
                    </div>
                {/if}
            {/if}
        </div>
    </div>
</div>

<style>
    .Selected {
        background-color: #39414d;
        color: #fff;
    }
    .Selected h1 {
        color: #fff;
    }
</style>
