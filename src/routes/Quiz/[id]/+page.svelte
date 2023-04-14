<script>
    import { page } from "$app/stores";
    import Leaderboard from "../../../lib/Leaderboard.svelte";
    import MCQ from "../../../lib/MCQ.svelte";
    import { Button, Spinner } from "flowbite-svelte";
    import { Heading } from "flowbite-svelte";
    import { db } from "../../firebaseConfig";
    import { notification, userAuthData } from "../../store";
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

    var subject = $page.params.id;

    var QuestionNum = 1;

    var userGivenAnswer = {
        right: 0,
        wrong: 0,
    };

    var Quizstatus = "menu";
    var Question = [];

    async function startQuiz() {
        Quizstatus = "loading";
        userGivenAnswer = {
            right: 0,
            wrong: 0,
        };
        QuestionNum = 1;

        try {
            const QuizdocRef = doc(db, "JECA", "Quiz");
            const subjectlist = await getDoc(QuizdocRef);

            // var totalQuestion = subjectlist
            //     .data()
            //     .subjects.find((e) => e.name == subject);
            var totalQuestion = subjectlist.data().lastId[subject];

            // totalQuestion = totalQuestion.lastId;

            var QuestionIds = [];
            if (totalQuestion >= 20) {
                while (QuestionIds.length < 20) {
                    var id = Math.floor(Math.random() * totalQuestion + 1);
                    if (!QuestionIds.includes(id)) QuestionIds.push(id);
                }
            } else {
                Quizstatus = "finished";
                throw "Not enough questions available";
            }

            const QuizcolRef = collection(QuizdocRef, subject);

            var res = await Promise.all([
                await getDocs(
                    query(
                        QuizcolRef,
                        where("id", "in", QuestionIds.slice(0, 10))
                    )
                ),
                await getDocs(
                    query(
                        QuizcolRef,
                        where("id", "in", QuestionIds.slice(10, 20))
                    )
                ),
            ]);
            Question = [];

            res.forEach((e) => {
                e.forEach((doc) => {
                    Question = [...Question, doc.data()];
                });
            });
            // console.log(res);

            Quizstatus = "start";
            TotalTimer();
            startTimer();
        } catch (e) {
            console.log(e);
            $notification = {
                color: "red",

                text: e,
            };
        }
    }

    var timer;
    var perQuestionTime = 20;
    var second = perQuestionTime;
    function startTimer() {
        timer = setInterval(() => {
            second--;
            if (second == 0) {
                clearInterval(timer);
            }
        }, 1000);
    }

    var totalTime = 0;
    var totalTimer;
    function TotalTimer() {
        totalTime = 0;
        totalTimer = setInterval(() => {
            totalTime++;
        }, 1000);
    }
</script>

<div
    class="flex flex-1 wrapper h-screen -mx-5 lg:-mx-14 items-center justify-center"
>
    <!-- heading -->
    <div
        class=" flex flex-col justify-center items-center sm:flex-row sm:justify-between py-1 px-3 sm:px-7 shadow-md bg-white absolute top-0 left-0 mb-5 w-full font-bold"
    >
        <Heading customSize="text-2xl md:text-3xl lg:text-4xl" class="py-1"
            >◼ {subject} - Quiz</Heading
        >
        <div class="flex justify-center">
            {#if Quizstatus == "start"}
                <button
                    class=" text-center md:mt-0 bg-blue-300 w-[170px] rounded-md py-2 px-1 border border-blue-400"
                    class:blink_me={second == 0}
                >
                    <h1 class=" text-xl">
                        Time {second == 0 ? `Out!` : `Left : ${second}`}
                    </h1>
                </button>
            {/if}
        </div>
    </div>

    {#if Quizstatus == "menu"}
        <div
            class="bg-white m-3 flex-col rounded-lg p-4 flex justify-center items-center"
        >
            <div class="flex gap-8 flex-col p-8">
                <button
                    on:click={() => {
                        startQuiz();
                    }}
                    class=" text-white disabled:opacity-60 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-2xl px-5 py-2 text-center"
                    >Start</button
                >

                <button
                    on:click={() => {
                        Quizstatus = "Leaderboard";
                    }}
                    class=" text-white disabled:opacity-60 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-2xl px-5 py-2 text-center"
                    >Leaderboard</button
                >
                <a href="/Examprep/JECA/quiz">
                    <button
                        class="w-full text-white disabled:opacity-60 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-2xl px-5 py-2 text-center"
                        >Back</button
                    >
                </a>
            </div>
        </div>
    {:else if Quizstatus == "loading"}
        <!-- loading -->
        <div
            class="block select-none text-xl font-bold m-3 w-[200px] py-5 px-7 bg-white border border-gray-200 rounded-lg shadow-2xl dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
            <Spinner class="mr-3" color="pink" size="7" />Loading ...
        </div>
    {:else if Quizstatus == "start"}
        <!-- quiz start -->
        <div>
            <MCQ
                Question={{ ...Question[QuestionNum - 1], num: QuestionNum }}
                totalQuestion={Question.length}
                timeout={second == 0}
                lastQuestion={QuestionNum == Question.length}
                on:nextQuestion={() => {
                    QuestionNum++;

                    second = perQuestionTime;
                    startTimer();
                }}
                on:rightAnswer={() => {
                    clearInterval(timer);

                    userGivenAnswer.right++;
                }}
                on:wrongAnswer={() => {
                    clearInterval(timer);
                    userGivenAnswer.wrong++;
                }}
                on:finish={async () => {
                    Quizstatus = "loading";
                    $notification = {
                        color: "yellow",
                        text: " We are saving your Progress please wait...",
                    };
                    try {
                        clearInterval(totalTimer);

                        var LeaderboardDocRef = doc(
                            db,
                            "JECA",
                            "QuizLeaderboard"
                        );

                        var userQuizData = await getDoc(
                            doc(LeaderboardDocRef, subject, $userAuthData.uid)
                        );
                        if (userQuizData.exists()) {
                            await updateDoc(
                                doc(
                                    LeaderboardDocRef,
                                    subject,
                                    $userAuthData.uid
                                ),
                                {
                                    score: userGivenAnswer.right,
                                    time: totalTime,
                                }
                            );
                        } else {
                            await setDoc(
                                doc(
                                    LeaderboardDocRef,
                                    subject,
                                    $userAuthData.uid
                                ),
                                {
                                    name: $userAuthData.displayName,
                                    score: userGivenAnswer.right,
                                    time: totalTime,
                                }
                            );
                        }
                    } catch (e) {
                        console.log(e);
                    }

                    Quizstatus = "finished";
                }}
            />
        </div>
    {:else if Quizstatus == "finished"}
        <!-- finished -->
        <div
            class="bg-white m-3 w-full max-w-[400px] mx-2 flex-col rounded-lg py-5 px-5 md:px-7 lg:px-12 flex justify-center items-center"
        >
            <h1 class="mb-5 text-2xl lg:text-4xl font-bold">
                Quiz completed!!
            </h1>

            <h1 class="mb-5 text-2xl font-bold">
                Out of {Question.length}
            </h1>
            <div class="flex h-16 w-full">
                {#if userGivenAnswer.right != 0}
                    <div
                        class="text-center"
                        style={`flex:${userGivenAnswer.right} ;`}
                    >
                        <div
                            class="h-8 bg-green-400 rounded-md p-2 justify-center flex items-center"
                        >
                            <h1 class="text-white text-2xl font-bold">
                                {userGivenAnswer.right}
                            </h1>
                        </div>
                        <h1 class="text-green-700 text-xl font-bold">Right</h1>
                    </div>
                {/if}

                {#if userGivenAnswer.wrong != 0}
                    <div
                        class="text-center"
                        style={`flex:${userGivenAnswer.wrong} ;`}
                    >
                        <div
                            class="h-8 bg-red-400 rounded-md p-2 justify-center flex items-center"
                        >
                            <h1 class="text-white text-2xl font-bold">
                                {userGivenAnswer.wrong}
                            </h1>
                        </div>
                        <h1 class="text-red-500 text-xl font-bold">Wrong</h1>
                    </div>
                {/if}
            </div>
            <a href="/Examprep/JECA/quiz">
                <button
                    class="mt-8 text-white disabled:opacity-60 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-xl px-5 py-2 text-center"
                    >Quit the Quiz</button
                >
            </a>

            <button
                on:click={() => {
                    Quizstatus = "menu";
                }}
                class=" mt-4 text-white disabled:opacity-60 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-2xl px-5 py-2 text-center"
                >Back</button
            >
        </div>
    {:else if Quizstatus == "Leaderboard"}
        <Leaderboard
            prop={{ type: "Quiz", subject: subject }}
            on:back={() => {
                Quizstatus = "menu";
            }}
        />
    {/if}
</div>

<style>
    .blink_me {
        animation: blinker 2s linear infinite;
        @apply bg-red-300;
        @apply border-red-400;
    }

    @keyframes blinker {
        50% {
            opacity: 0;
        }
    }

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
</style>
