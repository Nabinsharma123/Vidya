<script>
    import { db } from "../firebaseConfig";
    import { doc, getDoc } from "firebase/firestore";
    import { fade, fly, scale } from "svelte/transition";
    import { page } from "$app/stores";
    import { authStatus } from "../store";
    import { Spinner, Heading } from "flowbite-svelte";

    var TopicList = [];

    var About;
    var subject = $page.params.Subject.replace(/-/g, " ");

    $: if ($authStatus) {
        fetchInitialData();
    }

    // const collectionRef = collection(db, subject);
    const subjectDocRef = doc(db, "Subjects", subject);

    var contentColref;

    async function fetchInitialData() {
        var subjectDocData = await getDoc(subjectDocRef);

        About = subjectDocData.data().about;
        if (subjectDocData.data().topics.length != 0) {
            TopicList = subjectDocData.data().topics;
        } else {
            TopicList = "Comming Soon";
        }
    }
</script>

<svelte:head>
    <title>{subject}</title>
    <link
        rel="stylesheet"
        href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/atom-one-dark.min.css"
    />
    <script
        src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js"
    ></script>
</svelte:head>

<div class="relative my-10">
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
                    <img in:fade class="w-40" src={`/${subject}.svg`} alt="" />
                </div>
            </div>
            <div class=" flex-[4] flex flex-col mt-5 md:mt-0 md:ml-6 ">
                <h1
                    class="text-4xl text-center md:text-left font-bold text-[#1a2c47]"
                >
                    Learn {subject}
                </h1>
                <!-- about -->

                <div class="mt-4">
                    {#if About}
                        <h1 in:fly={{ y: -20, duration: 500 }} class="text-lg ">
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
    {#if TopicList.length != 0}
        <div class="option-container gap-3 ">
            {#each TopicList as Topic}
                <a href={`/${subject}/${Topic.replace(/ /g, "-")}`}>
                    <button
                        class="relative h-full w-full inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-2xl font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
                    >
                        <span
                            class="relative h-full w-full flex items-center justify-center px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
                        >
                            {Topic}
                        </span>
                    </button>
                </a>
            {/each}
        </div>
    {/if}
</div>

<!-- main course -->
<style>
    .option-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
    }
</style>
