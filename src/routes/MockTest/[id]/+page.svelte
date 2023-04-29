<script>
    import { page } from "$app/stores";
    import { db } from "../../firebaseConfig";
    // import Questions from "./qus";
    import { Heading, Button, Spinner, Hr, P } from "flowbite-svelte";

    import { fade, slide } from "svelte/transition";
    import { notification, userAuthData } from "../../store";
    import Leaderboard from "../../../lib/Leaderboard.svelte";

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
        onSnapshot,
    } from "firebase/firestore";
    import { onDestroy } from "svelte";
    import { jsontohtml } from "../../../lib/jsontohtml";
    import Feedback from "../../../lib/Feedback.svelte";

    var feedback = false;
    var Questions = [];
    var UserAnswers = [];
    var testId = $page.params.id;
    var warningPopUp;
    var lockStartButton = false;

    var TestStatus = "Loading";
    var userTestData;
    var unsubscribe;

    fetchUserData();
    async function fetchUserData() {
        userTestData = await getDoc(
            doc(doc(db, "JECA", "MockTestUserInfo"), testId, $userAuthData.uid)
        );
        if (userTestData.exists()) {
            if (userTestData.data().availableAttempt == 0)
                lockStartButton = true;
            else {
                lockStartButton = false;
            }
        } else {
            await setDoc(
                doc(
                    doc(db, "JECA", "MockTestUserInfo"),
                    testId,
                    $userAuthData.uid
                ),
                {
                    name: $userAuthData.displayName,
                    email: $userAuthData.email,
                    availableAttempt: 1,
                }
            );
        }

        unsubscribe = onSnapshot(
            doc(doc(db, "JECA", "MockTestUserInfo"), testId, $userAuthData.uid),
            (res) => {
                console.log(res.data());
                userTestData = res;
                if (userTestData.data().availableAttempt == 0)
                    lockStartButton = true;
                else {
                    lockStartButton = false;
                }
            }
        );
        TestStatus = "Menu";
    }

    async function fetchTestData() {
        TestStatus = "Loading";
        await updateDoc(
            doc(doc(db, "JECA", "MockTestUserInfo"), testId, $userAuthData.uid),
            {
                availableAttempt: increment(-1),
            }
        );
        var res = await getDocs(
            collection(doc(db, "JECA", "MockTest"), testId)
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
                doc(LeaderboardDocRef, testId, $userAuthData.uid)
            );
            if (userTestData.exists()) {
                await updateDoc(
                    doc(LeaderboardDocRef, testId, $userAuthData.uid),
                    {
                        score: score,
                        time: examTime - totalTime,
                        Attempt: increment(1),
                    }
                );
            } else {
                await setDoc(
                    doc(LeaderboardDocRef, testId, $userAuthData.uid),
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
        unsubscribe();
    });
</script>

<div
    class=" wrapper h-screen flex justify-center items-center gap-3 -mx-3 md:-mx-5 lg:-mx-14 select-none"
>
    {#if TestStatus == "Menu"}
        <div class=" flex justify-center items-center">
            <div
                class=" select-none flex flex-col gap-3 items-center justify-center text-xl font-bold m-3 py-5 px-7 bg-white border border-gray-200 rounded-lg shadow-2xl dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
                <Heading customSize="text-4xl text-extrabold text-center"
                    >{testId}</Heading
                >
                <Hr />
                <div class="flex relative gap-8 flex-col p-8">
                    {#if lockStartButton}
                        <div
                            class="absolute top-5 z-10 border right-5 bg-white rounded-full p-0.5"
                        >
                            <img src="/lock.svg" alt="" />
                        </div>
                    {/if}
                    <button
                        style={lockStartButton ? "opacity:80%" : ""}
                        on:click={() => {
                            if (lockStartButton) {
                                warningPopUp = {
                                    startExam: false,
                                    content: `You have already used all of your test attemts`,
                                };
                            } else {
                                warningPopUp = {
                                    startExam: true,
                                    content: `You can only take the exam ${
                                        userTestData.data().availableAttempt
                                    } times. So, Start the exam when your actually prepared`,
                                };
                            }
                        }}
                        class=" text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-2xl px-5 py-2 text-center"
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
        <div class="flex w-full h-full gap-2 p-4 bg-gray-200">
            <div
                class=" p-4 flex-[2] bg-white rounded-md shadow-md overflow-y-auto"
            >
                <Heading class="text-center" tag="h3">Mock Test 1</Heading>
                <div class="flex flex-col justify-center mt-5 items-center">
                    <img
                        class="rounded-xl h-16"
                        src={$userAuthData.photoURL}
                        alt=""
                    />
                    <h5 class="text-lg font-bold">
                        {$userAuthData.displayName}
                    </h5>
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
            <div
                class="flex-[6] p-4 bg-white rounded-md shadow-md overflow-y-auto"
            >
                <div>
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
                                            bind:group={UserAnswers[Qindex]
                                                .Answer}
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
    {:else if TestStatus == "Loading"}
        <div class="flex justify-center items-center">
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
        <div class="flex justify-center items-center">
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
        <div class="flex justify-center items-center">
            <div
                class=" select-none flex flex-col gap-3 items-center justify-center text-xl font-bold m-3 py-5 px-7 bg-white border border-gray-200 rounded-lg shadow-2xl dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
                <div class="flex flex-col gap-3 justify-center">
                    <h1 class="text-bold text-4xl">Test Completed</h1>
                    <h1>Your Score :- {score}/{TotalScore}</h1>
                    <Button
                        on:click={() => {
                            TestStatus = "Menu";
                            feedback = true;
                        }}
                        size="xl">Back</Button
                    >
                </div>
            </div>
        </div>
    {:else if TestStatus == "Leaderboard"}
        <div class="flex justify-center items-center">
            <div
                class=" select-none flex flex-col gap-3 items-center justify-center text-xl font-bold m-3 py-5 px-7 bg-white border border-gray-200 rounded-lg shadow-2xl dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
                <Leaderboard
                    prop={{ type: "MockTest", subject: testId }}
                    on:back={() => {
                        TestStatus = "Menu";
                    }}
                />
            </div>
        </div>
    {/if}

    {#if warningPopUp}
        <div
            transition:fade
            class="absolute z-20 flex justify-center items-center w-full h-full bg-black/40 top-0 left-0"
        >
            <div
                transition:slide
                class="w-4/5 md:w-2/4 rounded-xl p-4 border-4 border-yellow-400 bg-white"
            >
                <Heading tag="h2" color="text-yellow-400">Warning!</Heading>
                <Hr />
                <P class="mb-3" weight="bold" color="text-gray-500 "
                    >{warningPopUp.content}
                </P>
                <div class="w-full flex gap-2 mt-5">
                    {#if warningPopUp.startExam}
                        <Button
                            on:click={() => {
                                warningPopUp = false;
                                fetchTestData();
                            }}>Start Test</Button
                        >
                    {/if}
                    <Button
                        color="light"
                        on:click={() => {
                            warningPopUp = false;
                        }}>Close</Button
                    >
                </div>
            </div>
        </div>
    {/if}
    {#if feedback}
        <Feedback
            from={`${testId}-MockTest`}
            on:close={() => {
                feedback = false;
            }}
        />
    {/if}
</div>

<style>
    .wrapper {
        background: linear-gradient(124deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
        background-size: 1800% 1800%;
        -webkit-animation: rainbow 15s ease infinite;
        -z-animation: rainbow 15s ease infinite;
        -o-animation: rainbow 15s ease infinite;
        animation: rainbow 15s ease infinite;
    }

    @-webkit-keyframes rainbow {
        0% {
            background-position: 0% 82%;
        }
        50% {
            background-position: 100% 19%;
        }
        100% {
            background-position: 0% 82%;
        }
    }
    @-moz-keyframes rainbow {
        0% {
            background-position: 0% 82%;
        }
        50% {
            background-position: 100% 19%;
        }
        100% {
            background-position: 0% 82%;
        }
    }
    @-o-keyframes rainbow {
        0% {
            background-position: 0% 82%;
        }
        50% {
            background-position: 100% 19%;
        }
        100% {
            background-position: 0% 82%;
        }
    }
    @keyframes rainbow {
        0% {
            background-position: 0% 82%;
        }
        50% {
            background-position: 100% 19%;
        }
        100% {
            background-position: 0% 82%;
        }
    }

    .green {
        @apply bg-green-500;
        @apply border-green-700;
    }

    .questions :global(code) {
        margin: 20px 0;
        border-radius: 7px;
    }
</style>
