<script>
    import { options } from "./store";
    import { fly } from "svelte/transition";
    import { db } from "./firebaseConfig";
    import { collection, doc, getDoc } from "firebase/firestore";
    import { onMount } from "svelte";
    import { authStatus } from "./store";
    var selectedTopic;
    var videoId;
    var loading = true;

    $: if ($authStatus) {
        topicClicked($options[0].name);
    }
    function topicClicked(name) {
        selectedTopic = name;
        name = name.replace(/\s+/g, "-");

        loading = true;
        const collectionRef = collection(db, name);
        getDoc(doc(collectionRef, "Tutorials")).then((res) => {
            if (res.exists()) {
                videoId = res.data().VideoId;
                loading = false;
            } else videoId = false;
        });
    }
</script>

<div>
    <!-- <h1 class="text-3xl font-bold my-6">Video Tutorials</h1> -->
    <div
        class="relative mt-5 flex  rounded-md  border-2 border-gray-400"
        transition:fly={{ y: 200, duration: 500 }}
    >
        {#if !$authStatus}
            <div
                class="absolute border-2 bg-red-200/50 border-red-500 rounded-md z-10 flex justify-center items-center backdrop-blur-sm w-full h-full top-0 left-0"
            >
                <h1 class="text-xl text-red-500 font-bold">
                    You need to Log in in first
                </h1>
            </div>
        {/if}
        <div class="flex-1">
            {#each $options as { name, endpoint }}
                <div
                    class="border-2 border-gray-400 border-b-0 border-l-0 p-3 hover:bg-gray-300 first:border-t-0 cursor-pointer"
                    class:selectedTopic={selectedTopic === name}
                    on:click={topicClicked(name)}
                >
                    <h1>{name}</h1>
                </div>
            {/each}
        </div>
        <div class="flex-[5] p-5">
            {#if loading}
                {#if $authStatus}
                    <div class="h-full w-full flex justify-center items-center">
                        <img class="h-20 " src="/loading.svg" alt="" />
                    </div>
                {/if}
            {:else}
                <div
                    class="overflow-hidden border h-full w-full border-black  relative rounded-lg"
                >
                    <iframe
                        class="h-full absolute w-full top-0 left-0"
                        title="SQL"
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                    />
                </div>
            {/if}
        </div>
    </div>
</div>

<style>
    .selectedTopic {
        background-color: rgb(156 163 175);
        color: #fff;
    }
</style>
