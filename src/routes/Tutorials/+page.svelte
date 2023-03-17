<script>
    import { options } from "../store";
    import { fly } from "svelte/transition";
    import { db } from "../firebaseConfig";
    import { collection, doc, getDoc } from "firebase/firestore";
    import { Spinner } from "flowbite-svelte";
    import { onMount } from "svelte";
    import { authStatus } from "../store";
    var selectedTopic;
    var videoId;
    var loading = true;

    $: if ($authStatus) {
        topicClicked($options[0].name);
    }
    function topicClicked(name) {
        loading = true;
        if (authStatus) {
            selectedTopic = name;
            name = name.replace(/\s+/g, "-");
            const collectionRef = collection(db, name);
            getDoc(doc(collectionRef, "Tutorials")).then((res) => {
                if (res.exists()) {
                    videoId = res.data().VideoId;
                    loading = false;
                } else videoId = false;
            });
        }
    }
</script>

<div class="w-full flex justify-center">
    <!-- <h1 class="text-3xl font-bold my-6">Video Tutorials</h1> -->
    <div
        class="relative max-w-[1000px] w-full mt-5 flex  h-[470px] rounded-lg  border border-gray-400"
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
        <div class=" w-[200px] border-r border-gray-400 overflow-auto">
            {#each $options as { name, endpoint }}
                <div
                    class="tutorialOptions p-2 hover:bg-slate-300 first:rounded-tl-md  
                     cursor-pointer "
                    class:selectedTopic={selectedTopic === name}
                    on:click={topicClicked(name)}
                >
                    <h1
                        class="text-right h-full text-gray-600 text-lg font-semibold"
                    >
                        {name}
                    </h1>
                </div>
            {/each}
        </div>
        <div class="flex-[5] p-5">
            {#if loading}
                {#if $authStatus}
                    <div class="h-full w-full flex justify-center items-center">
                        <Spinner size={14} />
                    </div>
                {/if}
            {:else}
                <div
                    class="overflow-hidden border border-black h-full w-full  relative rounded-lg"
                >
                    <iframe
                        class="h-full absolute w-full top-0 left-0"
                        title={selectedTopic}
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                    />
                </div>
            {/if}
        </div>
    </div>
</div>

<style>
    .selectedTopic {
        background-color: #39414d;
    }
    .selectedTopic h1 {
        color: #fff;
    }
</style>
