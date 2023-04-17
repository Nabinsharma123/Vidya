<script>
    import { page } from "$app/stores";
    import { db } from "../firebaseConfig";
    // import Questions from "./qus";
    import { Heading, Button, Spinner, Hr } from "flowbite-svelte";
    import { userAuthData } from "../store";
    import { fade } from "svelte/transition";
    import { notification } from "../store";
    import Leaderboard from "../../lib/Leaderboard.svelte";

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
        increment,
    } from "firebase/firestore";
    import { onDestroy } from "svelte";

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
    var UserAnswers = [];
    var testId = $page.url.searchParams.get("id");

    var TestStatus = "Menu";

    // fetchInitialData();
    async function fetchInitialData() {
        TestStatus = "Loading";

        var res = await getDocs(
            collection(doc(db, "JECA", "MockTest"), `MockTest${testId}`)
        );
        Questions = [];
        res.forEach((doc) => {
            Questions = [...Questions, doc.data()];
        });

        UserAnswers = [];
        for (let i = 0; i < Questions.length; i++) {
            UserAnswers.push({
                Qno: i + 1,
                Answer: null,
            });
        }

        TestStatus = "Ready";
    }

    var UserPannel;

    var examTime = 120 * 60;

    var totalTime;
    var totalTimer;
    var min;
    var sec;
    function TotalTimer() {
        clearInterval(totalTimer);
        totalTime = examTime;

        min = Math.floor(totalTime / 60);
        sec = Math.floor(totalTime % 60);
        totalTimer = setInterval(() => {
            totalTime--;
            min = Math.floor(totalTime / 60);
            sec = Math.floor(totalTime % 60);
            if (totalTime == 0) {
                clearInterval(totalTimer);
                SubmitTest();
            }
        }, 1000);
    }
    function StartTest() {
        TestStatus = "Start";
        TotalTimer();
        setTimeout(() => {
            hljs.highlightAll();
        }, 100);
    }
    var score = 0;
    var TotalScore = 0;
    async function SubmitTest() {
        TestStatus = "Loading";

        score = 0;
        TotalScore = 0;
        for (var i = 0; i < Questions.length; i++) {
            TotalScore = TotalScore + Questions[i].Value;
            if (UserAnswers[i].Answer == Questions[i].Answer)
                score = score + Questions[i].Value;
        }

        $notification = {
            color: "yellow",
            text: " We are saving your Progress please wait...",
        };
        try {
            clearInterval(totalTimer);

            var LeaderboardDocRef = doc(db, "JECA", "MockTestLeaderboard");

            var userTestData = await getDoc(
                doc(LeaderboardDocRef, `MockTest${testId}`, $userAuthData.uid)
            );
            if (userTestData.exists()) {
                await updateDoc(
                    doc(
                        LeaderboardDocRef,
                        `MockTest${testId}`,
                        $userAuthData.uid
                    ),
                    {
                        score: score,
                        time: examTime - totalTime,
                        Attempt: increment(1),
                    }
                );
            } else {
                await setDoc(
                    doc(
                        LeaderboardDocRef,
                        `MockTest${testId}`,
                        $userAuthData.uid
                    ),
                    {
                        name: $userAuthData.displayName,
                        score: score,
                        time: examTime - totalTime,
                        Attempt: 1,
                    }
                );
            }
        } catch (e) {
            console.log(e);
        }

        TestStatus = "Completed";
    }
    onDestroy(() => {
        clearInterval(totalTimer);
    });
</script>

<div
    class=" absolute flex justify-center gap-3 md:p-4 select-none top-0 left-0 bg-gray-100 h-screen w-screen"
    style="transition: width 0.2s;"
>
    {#if TestStatus == "Menu"}
        <div
            class="absolute flex justify-center items-center h-screen w-screen top-0 left-0 bg-gray-100"
        >
            <div
                class=" select-none flex flex-col gap-3 items-center justify-center text-xl font-bold m-3 py-5 px-7 bg-white border border-gray-200 rounded-lg shadow-2xl dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
                <Heading customSize="text-4xl text-extrabold text-center"
                    >MockTest {testId}</Heading
                >
                <Hr />
                <div class="flex gap-8 flex-col p-8">
                    <button
                        on:click={fetchInitialData}
                        class=" text-white disabled:opacity-60 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-2xl px-5 py-2 text-center"
                        >Start</button
                    >

                    <button
                        on:click={() => {
                            TestStatus = "Leaderboard";
                        }}
                        class=" text-white disabled:opacity-60 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-2xl px-5 py-2 text-center"
                        >Leaderboard</button
                    >
                    <a href="/Examprep/JECA/mockTest">
                        <button
                            class="w-full text-white disabled:opacity-60 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-2xl px-5 py-2 text-center"
                            >Back</button
                        >
                    </a>
                </div>
            </div>
        </div>
    {:else if TestStatus == "Start"}
        <div
            bind:this={UserPannel}
            class=" p-4 w-[320px] bg-white rounded-md shadow-md overflow-y-auto"
        >
            <Heading class="text-center" tag="h3">Mock Test 1</Heading>
            <div class="flex flex-col justify-center mt-5 items-center">
                <img
                    class="rounded-xl h-16"
                    src={$userAuthData.photoURL}
                    alt=""
                />
                <h5 class="text-lg font-bold">{$userAuthData.displayName}</h5>
                <div
                    class="border mt-5 text-black rounded-md font-bold border-blue-700 p-2 bg-blue-300"
                >
                    Time Left :
                    {min != 0 ? `${min} min` : ``}
                    {sec} sec
                </div>
                <div class="mt-4 max-h-[40vh] overflow-y-auto">
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
                    <Button
                        on:click={() => {
                            TestStatus = "Menu";
                        }}
                        size="xl"
                        color="red">Quit</Button
                    >
                    <Button
                        on:click={() => {
                            SubmitTest();
                        }}
                        size="xl"
                        color="green">Submit</Button
                    >
                </div>
            </div>
        </div>
        <div class="flex-[5] p-4 bg-white rounded-md shadow-md overflow-y-auto">
            <div>
                <!-- <Heading customSize="text-4xl font-bold">Category I</Heading>
            <Hr /> -->

                {#each Questions as { Question, Options, Answer, Value }, Qindex}
                    <div id={`Q${Qindex + 1}`} class="my-4">
                        <div class="flex gap-1 questions">
                            <div class="font-bold">
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
    {:else if TestStatus == "Loading"}
        <div
            class="absolute flex justify-center items-center h-screen w-screen top-0 left-0 bg-gray-100"
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
    {:else if TestStatus == "Ready"}
        <div
            class="absolute flex justify-center items-center h-screen w-screen top-0 left-0 bg-gray-100"
        >
            <div
                class=" select-none flex flex-col gap-3 items-center justify-center text-xl font-bold m-3 py-5 px-7 bg-white border border-gray-200 rounded-lg shadow-2xl dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
                <div class="flex flex-col gap-3 justify-center">
                    <Heading>Your Test is Ready!!</Heading>

                    <Button on:click={StartTest} size="xl">Start Test</Button>
                </div>
            </div>
        </div>
    {:else if TestStatus == "Completed"}
        <div
            class="absolute flex justify-center items-center h-screen w-screen top-0 left-0 bg-gray-100"
        >
            <div
                class=" select-none flex flex-col gap-3 items-center justify-center text-xl font-bold m-3 py-5 px-7 bg-white border border-gray-200 rounded-lg shadow-2xl dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
                <div class="flex flex-col gap-3 justify-center">
                    <h1 class="text-bold text-4xl">Test Completed</h1>
                    <h1>Your Score :- {score}/{TotalScore}</h1>
                    <Button
                        on:click={() => {
                            TestStatus = "Menu";
                        }}
                        size="xl">Back</Button
                    >
                </div>
            </div>
        </div>
    {:else if TestStatus == "Leaderboard"}
        <div
            class="absolute flex justify-center items-center h-screen w-screen top-0 left-0 bg-gray-100"
        >
            <div
                class=" select-none flex flex-col gap-3 items-center justify-center text-xl font-bold m-3 py-5 px-7 bg-white border border-gray-200 rounded-lg shadow-2xl dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
                <Leaderboard
                    prop={{ type: "MockTest", subject: `MockTest${testId}` }}
                    on:back={() => {
                        TestStatus = "Menu";
                    }}
                />
            </div>
        </div>
    {/if}
</div>

<style>
    .green {
        @apply bg-green-500;
        @apply border-green-700;
    }

    .questions :global(code) {
        margin: 20px 0;
        border-radius: 7px;
    }
</style>
