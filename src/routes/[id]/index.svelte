<script context="module">
    export async function load({ url }) {
        var endpoint = url.pathname;

        return {
            props: {
                endpoint: endpoint.slice(1),
            },
        };
    }
</script>

<script>
    export var endpoint;

    import { onMount } from "svelte";
    import { db } from "../firebaseConfig";
    import { collection, doc, getDoc } from "firebase/firestore";
    import { fade, fly } from "svelte/transition";

    var Topics;
    var TopicData;
    var TopicDataHead;
    var About;

    const collectionRef = collection(db, endpoint);

    onMount(async () => {
        const aboutDoc = await getDoc(doc(collectionRef, "About"));
        if (aboutDoc.exists()) {
            About = aboutDoc.data().Data;
        } else About = "Comming Soon";

        const topicsDoc = await getDoc(doc(collectionRef, "Topics"));
        if (topicsDoc.exists()) {
            Topics = topicsDoc.data().Topic;
            TopicDataHead = Topics[0];
            selectedTopic = Topics[0];
            const topicDataDoc = await getDoc(doc(collectionRef, Topics[0]));
            if (topicDataDoc.exists()) {
                TopicData = topicDataDoc.data().Data;
            } else TopicData = "Comming Soon";
        } else {
            TopicData = "Comming Soon";
            Topics = "Comming Soon";
        }
    });
    var selectedTopic;
    var TopicDataContainer;

    async function topicClicked(Topic) {
        TopicDataHead = Topic;
        selectedTopic = Topic;
        TopicData = null;

        const docSnap = await getDoc(doc(collectionRef, selectedTopic));
        if (docSnap.exists()) {
            TopicData = docSnap.data().Data;
            TopicDataContainer.scrollTo(0, 0);
        } else TopicData = "Comming Soon";
    }
</script>

<!-- about -->
<div class="mt-12">
    <div class="flex">
        <div class="border-2 border-gray-500 p-4 ">
            <img class="w-40" src={`/${endpoint}.svg`} alt="" />
        </div>
        <div class=" flex items-center ml-6 ">
            <h1 class="text-4xl">Learn {endpoint}</h1>
        </div>
    </div>

    <div class="mt-6">
        <h1>
            {#if About}
                <h1 transition:fly={{ y: -20, duration: 500 }} class="text-xl">
                    {@html About}
                </h1>
            {:else}
                <div class="h-40 w-full flex justify-center items-center">
                    <img src="/loading.svg" alt="" />
                </div>
            {/if}
        </h1>
    </div>
</div>
<!-- about -->
<!-- main course -->
<div class="flex my-5 ">
    <!-- Topics -->
    <div class=" w-72 h-fit mr-11 border border-gray-300 rounded-md shadow-md">
        <div class="pl-5 border-gray-300  rounded-t-md py-4 w-full border-b">
            <h1 class=" text-2xl">Topics</h1>
        </div>
        {#if Topics}
            {#if Topics === "Comming Soon"}
                <h1>{Topics}</h1>
            {:else}
                <div class="min-h-fit max-h-[450px] overflow-y-auto">
                    {#each Topics as Topic}
                        <div
                            class=" topic hover:bg-slate-300 cursor-pointer pl-5 py-4"
                            class:Selected={selectedTopic === Topic}
                            on:click={topicClicked(Topic)}
                            transition:fly={{ y: 100, duration: 1000 }}
                        >
                            <h1 class=" w-full">{Topic}</h1>
                        </div>
                    {/each}
                </div>
            {/if}
        {:else}
            <div class="h-40 w-full flex justify-center items-center">
                <img src="/loading.svg" alt="" />
            </div>
        {/if}
    </div>
    <!-- Topics -->

    <!-- Topic Data -->
    <div class="h-fit w-full border border-gray-300 rounded-md shadow-md">
        <div class="pl-5 py-4 w-full border-b border-gray-300 rounded-t-md  ">
            {#if TopicDataHead}
                {#key TopicDataHead}
                    <h1 in:fly={{ y: -30, duration: 500 }} class="text-2xl">
                        {TopicDataHead}
                    </h1>
                {/key}
            {:else}
                <h1>loading...</h1>
            {/if}
        </div>
        <div
            class="px-10 py-5 min-h-[100px] h-fit max-h-[440px] relative overflow-y-auto "
            bind:this={TopicDataContainer}
        >
            {#if TopicData}
                <div
                    transition:fly={{ y: 100, duration: 1000 }}
                    class="TopicData"
                >
                    {@html TopicData}
                </div>
            {:else}
                <div
                    transition:fade={{ duration: 500 }}
                    class=" absolute top-[25px] left-0 w-full  flex justify-center items-center"
                >
                    <img src="/loading.svg" alt="" />
                </div>
            {/if}
        </div>
    </div>
    <!-- Topic Data -->
</div>

<!-- main course -->
<style>
    .Selected {
        background-color: #39414d;
        color: #fff;
    }
    .Selected:last-child {
        border-bottom-right-radius: 6px;
        border-bottom-left-radius: 6px;
    }
    .TopicData :global(h1) {
        color: #1a2c47;
        font-size: 1.7rem;
        font-weight: 600;
        margin-bottom: 20px;
    }
    .TopicData :global(h2),
    :global(b) {
        font-size: 1.2rem;
        font-weight: 600;
    }
    .TopicData :global(p),
    :global(li) {
        font-size: 1rem;
    }
    .TopicData :global(table),
    :global(td),
    :global(th) {
        border: 1px solid black;
    }
    .TopicData :global(table) {
        margin: 10px;
    }
    .TopicData :global(ol) {
        padding-left: 20px;
        list-style-type: square;
    }
    .TopicData :global(pre) {
        margin: 5px;
        padding: 10px;
        background-color: rgb(202, 202, 202);
    }
    .TopicData :global(strong) {
        margin: 10px;
        background-color: yellow;
    }
</style>
