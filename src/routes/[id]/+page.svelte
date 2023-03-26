<script>
    import { db } from "../firebaseConfig";
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
    import { authStatus } from "../store";
    import { Spinner } from "flowbite-svelte";

    var Topics;
    var TopicData;
    var TopicDataHead;
    var About;
    var endpoint = $page.params.id.replace("-", " ");
    var loading = false;

    $: if ($authStatus) {
        fetchInitialData();
    }

    // const collectionRef = collection(db, endpoint);
    const subjectDocRef = doc(db, "Subjects", endpoint);

    var contentColref;

    async function fetchInitialData() {
        var subjectDocData = await getDoc(subjectDocRef);

        About = subjectDocData.data().about;
        if (subjectDocData.data().topics.length != 0) {
            Topics = subjectDocData.data().topics;
            topicClicked(Topics[0]);
        } else {
            loading = false;
            TopicData.innerHTML = "Commimg Soon";

            Topics = "Comming Soon";
        }

        // const aboutDoc = await getDoc(doc(collectionRef, "About"));
        // if (aboutDoc.exists()) {
        //     About = aboutDoc.data().Data;
        // } else About = "Comming Soon";

        // const topicsDoc = await getDoc(doc(collectionRef, "Topics"));
        // if (topicsDoc.exists()) {
        //     Topics = topicsDoc.data().Topic;
        //     TopicDataHead = Topics[0];
        //     selectedTopic = Topics[0];
        //     const topicDataDoc = await getDoc(doc(collectionRef, Topics[0]));
        //     if (topicDataDoc.exists()) {
        //         TopicData = topicDataDoc.data().Data;
        //     } else TopicData = "Comming Soon";
        // } else {
        //     TopicData = "Comming Soon";
        //     Topics = "Comming Soon";
        // }
    }
    function jsontohtml(Json) {
        var elementLocal = document.createElement(Json.type);
        Json.attributes.forEach((e) => {
            elementLocal.setAttribute(e.name, e.value);
        });
        Json.content.forEach((e) => {
            if (e.type == "text")
                elementLocal.innerHTML = elementLocal.innerHTML + e.textContent;
            else elementLocal.appendChild(jsontohtml(e, elementLocal));
        });
        return elementLocal;
    }

    var selectedTopic;
    var TopicDataContainer;

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

        // if ($authStatus) {
        //     TopicDataHead = Topic;
        //     selectedTopic = Topic;
        //     TopicData = null;
        //     const docSnap = await getDoc(doc(collectionRef, selectedTopic));
        //     if (docSnap.exists()) {
        //         TopicData = docSnap.data().Data;
        //         TopicDataContainer.scrollIntoView();
        //     } else TopicData = "Comming Soon";
        // }
    }
</script>

<svelte:head>
    <link
        rel="stylesheet"
        href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/atom-one-dark.min.css"
    />
    <script
        src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js"
    ></script>
</svelte:head>

<div class="relative mt-24">
    {#if !$authStatus}
        <div
            class="absolute border-2 bg-red-200/50 border-red-500 rounded-md z-10 flex justify-center items-center backdrop-blur-sm w-full h-full top-0 left-0"
        >
            <h1 class="text-xl text-red-500 font-bold">
                You need to Log with a verified email
            </h1>
        </div>
    {/if}
    <div class="my-12 ">
        <div class="flex flex-col md:flex-row">
            <div class="flex-1 flex justify-center md:block">
                <div
                    class=" w-fit h-fit border-2 rounded-md border-gray-500 p-4 "
                >
                    <img
                        transition:fade
                        class="w-40"
                        src={`/${endpoint}.svg`}
                        alt=""
                    />
                </div>
            </div>
            <div class=" flex-[4] flex flex-col mt-5 md:mt-0 md:ml-6 ">
                <h1
                    class="text-4xl text-center md:text-left font-bold text-[#1a2c47]"
                >
                    Learn {endpoint}
                </h1>
                <!-- about -->

                <div bind:this={TopicDataContainer} class="mt-4">
                    {#if About}
                        <h1
                            transition:fly={{ y: -20, duration: 500 }}
                            class="text-lg "
                        >
                            {@html About}
                        </h1>
                    {:else if $authStatus}
                        <div
                            class="h-40 w-full flex justify-center items-center"
                        >
                            <Spinner />
                        </div>
                    {/if}
                </div>
                <!-- about -->
            </div>
        </div>
    </div>

    <div>
        <!-- main course -->
        <div class="flex gap-8 w-full justify-between my-5 ">
            <!-- Topics -->
            <div
                class="hidden  md:block flex-1 sticky top-16 w-72 h-fit  border border-gray-300 rounded-md shadow-md"
            >
                <div
                    class="pl-5 border-gray-300  rounded-t-md py-4 w-full border-b"
                >
                    <h1 class=" text-2xl">Topics</h1>
                </div>
                {#if Topics}
                    {#if Topics === "Comming Soon"}
                        <h1>{Topics}</h1>
                    {:else}
                        <div class="min-h-fit max-h-[450px] overflow-y-auto">
                            {#each Topics as Topic}
                                <button
                                    class=" w-full text-left topic  hover:bg-slate-300 cursor-pointer pl-5 py-4"
                                    class:Selected={selectedTopic === Topic}
                                    on:click={() => {
                                        TopicDataContainer.scrollIntoView();

                                        topicClicked(Topic);
                                    }}
                                    transition:fly={{
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
                    class="pl-5 py-4 w-full border-b border-gray-300 rounded-t-md  "
                >
                    {#if TopicDataHead}
                        {#key TopicDataHead}
                            <h1
                                in:fly={{ y: -30, duration: 500 }}
                                class="text-2xl"
                            >
                                {TopicDataHead}
                            </h1>
                        {/key}
                    {:else}
                        <h1>loading...</h1>
                    {/if}
                </div>
                <div
                    class=" px-5 py-2 md:px-10 md:py-5 min-h-[100px]  h-fit relative "
                >
                    <div bind:this={TopicData} class="TopicData ">
                        {#if loading}
                            <div
                                transition:fade={{ duration: 100 }}
                                class=" absolute top-[25px] left-0 w-full  flex justify-center items-center"
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

<!-- main course -->
<style>
    .Selected {
        background-color: #39414d;
        color: #fff;
    }
    .Selected h1 {
        color: #fff;
    }
    .Selected:last-child {
        border-bottom-right-radius: 6px;
        border-bottom-left-radius: 6px;
    }
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
