<script>
    import { page } from "$app/stores";
    import { db } from "../firebaseConfig";
    // import Questions from "./qus";
    import { Heading, Button, Spinner } from "flowbite-svelte";
    import { userAuthData } from "../store";
    import { fade } from "svelte/transition";

    import {
        collection,
        doc,
        getDoc,
        setDoc,
        getDocs,
        addDoc,
        query,
        where,
        updateDoc,
    } from "firebase/firestore";
    import { onMount } from "svelte";

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

    var Questions = [];

    fetchInitialData();
    async function fetchInitialData() {
        var testId = $page.url.searchParams.get("id");

        var res = await getDocs(
            collection(doc(db, "JECA", "MockTest"), `MockTest${testId}`)
        );
        res.forEach((doc) => {
            console.log(doc.data());
            Questions = [...Questions, doc.data()];
        });
        // setTimeout(() => {
        //     hljs.highlightAll();
        // }, 500);
    }

    // onMount(async () => {
    //     hljs.highlightAll();
    // });

    var Loading = false;

    var UserAnswers = [];
    for (let i = 0; i < 120; i++) {
        UserAnswers.push({
            Qno: i + 1,
            Answer: null,
        });
    }
    var UserPannel;

    var totalTime = 120 * 60;
    var totalTimer;
    var min = Math.floor(totalTime / 60),
        sec = Math.floor(totalTime % 60);
    TotalTimer();
    function TotalTimer() {
        totalTimer = setInterval(() => {
            totalTime--;
            min = Math.floor(totalTime / 60);
            sec = Math.floor(totalTime % 60);
            if (totalTime == 0) clearInterval(totalTimer);
        }, 1000);
    }
</script>

<svelte:head>
    <title>MockTest</title>
    <link
        rel="stylesheet"
        href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/atom-one-dark.min.css"
    />
    <script
        src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js"
    ></script>
</svelte:head>

<div
    class=" absolute flex gap-3 md:p-4 select-none top-0 left-0 bg-gray-100 h-screen w-screen"
    style="transition: width 0.2s;"
>
    <div
        bind:this={UserPannel}
        class=" p-4 w-[320px] bg-white rounded-md shadow-md overflow-y-auto"
    >
        <Heading class="text-center" tag="h3">Mock Test 1</Heading>
        <div class="flex flex-col justify-center mt-5 items-center">
            <img class="rounded-xl h-16" src={$userAuthData.photoURL} alt="" />
            <h5 class="text-lg font-bold">{$userAuthData.displayName}</h5>
            <div
                class="border mt-5 text-black rounded-md font-bold border-blue-700 p-2 bg-blue-300"
            >
                Time Left :
                {min != 0 ? `${min} min` : ``}
                {sec} sec
            </div>
            <div class="mt-4 max-h-[50vh] overflow-y-auto">
                {#each Questions as Question, Qindex}
                    <a href={`#Q${Qindex + 1}`}>
                        <button
                            class="inline-block text-center text-white m-[2px] min-w-[40px] h-[30px] bg-blue-400 border border-blue-700 rounded-md"
                            class:green={UserAnswers[Qindex].Answer}
                        >
                            {Qindex + 1}
                        </button>
                    </a>
                {/each}
            </div>
            <div class="mt-7 w-full flex justify-evenly">
                <Button size="xl" color="red">Quit</Button>
                <Button size="xl" color="green">Submit</Button>
            </div>
        </div>
    </div>
    <div class="flex-[5] p-4 bg-white rounded-md shadow-md overflow-y-auto">
        <div>
            {#each Questions as { Question, Options, Answer }, Qindex}
                <div id={`Q${Qindex + 1}`} class="my-4">
                    <div class="flex">
                        <div>
                            {Qindex + 1}.
                        </div>

                        {@html jsontohtml(Question.data).outerHTML}
                    </div>

                    <div class="grid grid-cols-2">
                        {#each Options as Option, Oindex}
                            <div class="m-2">
                                <input
                                    bind:group={UserAnswers[Qindex].Answer}
                                    name={Qindex}
                                    type="radio"
                                    id={`${Qindex}-${Oindex}`}
                                    value={Oindex + 1}
                                />
                                <label for={`${Qindex}-${Oindex}`}
                                    >{Option}</label
                                >
                            </div>
                        {/each}
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>

{#if Loading}
    <div
        class="absolute flex justify-center items-center h-screen w-screen top-0 left-0 bg-white"
    >
        <div
            class=" select-none flex flex-col gap-3 items-center justify-center text-xl font-bold m-3 py-5 px-7 bg-white border border-gray-200 rounded-lg shadow-2xl dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
            <div class="flex flex-col justify-center">
                <img class="h-[50px]" src="/logo.jpeg" alt="" />
            </div>
            <div class="text-gray-900">
                <Spinner class="mr-3" color="pink" size="7" />Loading ...
            </div>
        </div>
    </div>
{/if}

<style>
    .green {
        @apply bg-green-500;
        @apply border-green-700;
    }
</style>
