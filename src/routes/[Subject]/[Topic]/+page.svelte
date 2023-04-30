<script>
    import { db } from "../../firebaseConfig";
    import {
        collection,
        doc,
        getDoc,
        getDocs,
        limit,
        query,
        where,
    } from "firebase/firestore";
    import { fade, fly, scale } from "svelte/transition";
    import { page } from "$app/stores";
    import { authStatus } from "../../store";
    import { Spinner } from "flowbite-svelte";
    import ContentLeftPannel from "../../../lib/ContentLeftPannel.svelte";

    import { jsontohtml } from "../../../lib/jsontohtml";

    var TopicList;
    var TopicData;
    var TopicDataHead;
    var About;
    var subject = $page.params.Subject.replace(/-/g, " ");
    var topic = $page.params.Topic.replace(/-/g, " ");
    var Leftpannel = false;

    console.log(topic);
    var loading = false;

    $: if ($authStatus) {
        fetchInitialData();
    }
    // $: subject = $page.params.Subject.replace(/-/g, " ");
    $: topic = $page.params.Topic.replace(/-/g, " ");

    $: topicClicked(topic);

    // const collectionRef = collection(db, subject);
    const subjectDocRef = doc(db, "Subjects", subject);

    async function fetchInitialData() {
        var subjectDocData = await getDoc(subjectDocRef);

        About = subjectDocData.data().about;
        if (subjectDocData.data().topics.length != 0) {
            TopicList = subjectDocData.data().topics;
            topicClicked(topic);
        } else {
            loading = false;
            TopicData.innerHTML = "Commimg Soon";

            TopicList = "Comming Soon";
        }
    }

    async function topicClicked(Topic) {
        loading = true;
        TopicDataHead = Topic;
        selectedTopic = Topic;

        TopicData.innerHTML = "";
        var contentDocRef = doc(subjectDocRef, "content", Topic);
        var contentDocData = await getDoc(contentDocRef);

        if (contentDocData.exists()) {
            console.log(contentDocData.data().data);
            TopicData.appendChild(jsontohtml(contentDocData.data().data));

            hljs.highlightAll();

            loading = false;
        } else {
            loading = false;

            TopicData.innerHTML = "Commimg Soon";
        }
    }

    var selectedTopic;
    var TopicDataContainer;
</script>

<!-- <svelte:head>
    <title>{subject}</title>
    <link
        rel="stylesheet"
        href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/atom-one-dark.min.css"
    />
    <script
        src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js"
    ></script>
</svelte:head> -->

<div class="relative">
    <button
        class="fixed z-10 border border-gray-800 top-16 left-5 bg-white px-3 py-2 rounded-lg md:hidden"
        on:click={() => {
            Leftpannel = true;
        }}
    >
        <i class="fa-solid fa-bars fa-lg" />
    </button>

    <div bind:this={TopicDataContainer} class="my-1">
        <!-- main course -->
        <div class="flex gap-8 w-full justify-between mb-10">
            <!-- Topics -->
            <div
                class="hidden md:block flex-1 sticky top-16 w-72 h-fit border border-gray-300 rounded-md shadow-md"
            >
                <div
                    class="pl-5 border-gray-300 rounded-t-md py-4 w-full border-b"
                >
                    <h1 class=" text-2xl font-semibold">Page Index</h1>
                </div>
                {#if TopicList}
                    {#if TopicList === "Comming Soon"}
                        <h1>{TopicList}</h1>
                    {:else}
                        <div class="min-h-fit max-h-[450px] overflow-y-auto">
                            {#each TopicList as Topic}
                                <a
                                    href={`/${subject}/${Topic.replace(
                                        / /g,
                                        "-"
                                    )}`}
                                >
                                    <button
                                        class=" w-full text-left topic hover:bg-slate-300 cursor-pointer pl-5 py-4"
                                        class:Selected={selectedTopic === Topic}
                                        on:click={() => {
                                            TopicDataContainer.scrollIntoView();

                                            // topicClicked(Topic);
                                        }}
                                        in:fly={{
                                            y: 100,
                                            duration: 1000,
                                        }}
                                    >
                                        <h1
                                            class="font-semibold text-lg text-gray-600 w-full"
                                        >
                                            {Topic}
                                        </h1>
                                    </button>
                                </a>
                            {/each}
                        </div>
                    {/if}
                {:else if $authStatus}
                    <div class="h-40 w-full flex justify-center items-center">
                        <Spinner />
                    </div>
                {/if}
            </div>
            <!-- Topics -->

            <!-- Topic Data -->
            <div
                class="flex-[4] h-fit w-full border border-gray-300 rounded-md shadow-md"
            >
                <div
                    class="px-5 py-4 w-full border-b border-gray-300 rounded-t-md"
                >
                    {#if TopicDataHead}
                        {#key TopicDataHead}
                            <h1
                                in:fly={{ y: -30, duration: 500 }}
                                class="text-2xl font-semibold text-center md:text-left"
                            >
                                {TopicDataHead}
                            </h1>
                        {/key}
                    {:else}
                        <h1>loading...</h1>
                    {/if}
                </div>
                <div
                    class=" px-5 py-2 md:px-10 md:py-5 min-h-[100px] h-fit relative"
                >
                    <div bind:this={TopicData} class="TopicData">
                        {#if loading}
                            <div
                                transition:fade={{ duration: 100 }}
                                class=" absolute top-[25px] left-0 w-full flex justify-center items-center"
                            >
                                <Spinner />
                            </div>
                        {/if}
                    </div>
                </div>
            </div>
            <!-- Topic Data -->
        </div>
    </div>
</div>
{#if Leftpannel}
    <ContentLeftPannel
        {TopicList}
        {subject}
        {selectedTopic}
        on:close={() => {
            Leftpannel = false;
        }}
        on:TopicClicked={(e) => {
            TopicDataContainer.scrollIntoView();

            Leftpannel = false;
        }}
    />
{/if}

<!-- main course -->
<style>
    .Selected {
        background-color: #39414d;
        color: #fff;
    }
    .Selected h1 {
        color: #fff;
    }
    /* .Selected:last-child {
        border-bottom-right-radius: 6px;
        border-bottom-left-radius: 6px;
    } */
    .TopicData :global(code) {
        margin: 20px 0;
        border-radius: 7px;
    }
    /* .TopicData :global(h1) {
        color: #1a2c47;
        font-size: 1.7rem;
        font-weight: 700;
        margin-bottom: 20px;
    }
    .TopicData :global(h2),
    :global(b) {
        font-size: 1.2rem;
        font-weight: 700;
        margin-bottom: 10px;
    }
    .TopicData :global(p),
    :global(li) {
        font-size: 1rem;
        margin-bottom: 10px;
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
    } */
</style>
