<script>
    import { page } from "$app/stores";
    import MCQ from "../../../lib/MCQ.svelte";
    import { Button, Spinner } from "flowbite-svelte";
    import { Heading } from "flowbite-svelte";
    import { db } from "../../firebaseConfig";
    import {
        collection,
        doc,
        getDoc,
        getDocs,
        query,
        where,
    } from "firebase/firestore";

    var subject = $page.params.id;

    var QuestionNum = 1;
    var QuizFinished;

    var Quizready = false;

    var userGivenAnswer = {
        right: 0,
        wrong: 0,
    };
    var Question = [];
    startQuiz();
    async function startQuiz() {
        const QuizdocRef = doc(db, "JECA", "Quiz");
        const subjectlist = await getDoc(QuizdocRef);
        var totalQuestion = subjectlist
            .data()
            .subjects.find((e) => (e.name = subject));
        totalQuestion = totalQuestion.lastId;
        var QuestionIds = [];
        while (QuestionIds.length < 10) {
            var id = Math.floor(Math.random() * totalQuestion + 1);
            if (!QuestionIds.includes(id)) QuestionIds.push(id);
        }

        console.log(QuestionIds);

        const QuizcolRef = collection(QuizdocRef, subject);
        var res = await getDocs(
            query(QuizcolRef, where("id", "in", QuestionIds))
        );
        res.forEach((doc) => {
            Question = [...Question, doc.data()];
        });
        console.log(Question);
        Quizready = true;
        startTimer();
    }

    var timer;
    var second = 15;
    function startTimer() {
        timer = setInterval(() => {
            second--;
            if (second == 0) {
                clearInterval(timer);
            }
        }, 1000);
    }
</script>

<div
    class="flex wrapper h-screen  -mx-5 lg:-mx-14 -mt-[61px] items-center justify-center"
>
    {#if Quizready}
        <div
            class=" flex flex-col h-[54px] items-center md:flex-row md:justify-between py-1 px-3 md:px-7 shadow-md  bg-white absolute top-0 left-0 mb-5 w-full  font-bold"
        >
            <Heading customSize="text-3xl">◼ {subject} - Quiz</Heading>

            {#if !QuizFinished}
                <div
                    class=" text-center mt-4 md:mt-0 bg-blue-300 w-[170px] rounded-md py-2 px-1 border border-blue-400"
                    class:blink_me={second == 0}
                >
                    <h1 class=" text-xl">
                        Time {second == 0 ? `Out!` : `Left : ${second}`}
                    </h1>
                </div>
            {/if}
        </div>
        {#if QuizFinished}
            <div
                class="bg-white m-3 w-[500px] h-[350px] flex-col rounded-lg p-4 flex justify-center items-center "
            >
                <h1 class="mb-5 text-4xl font-bold">Quiz completed!!</h1>

                <h1 class="mb-5 text-2xl font-bold">
                    Out of {Question.length}
                </h1>
                <div class="flex h-16 w-full ">
                    {#if userGivenAnswer.right != 0}
                        <div
                            class="text-center "
                            style={`flex:${userGivenAnswer.right} ;`}
                        >
                            <div
                                class="h-8 bg-green-400 rounded-md p-2 justify-center flex items-center"
                            >
                                <h1 class="text-white text-2xl font-bold">
                                    {userGivenAnswer.right}
                                </h1>
                            </div>
                            <h1 class="text-green-700 text-xl font-bold">
                                Right
                            </h1>
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
                            <h1 class="text-red-500 text-xl font-bold">
                                Wrong
                            </h1>
                        </div>
                    {/if}
                </div>
                <a href="/Examprep/JECA/quiz">
                    <button
                        class="mt-8 text-white disabled:opacity-60 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-xl px-5 py-2 text-center"
                        >Quit the Quiz</button
                    >
                </a>
            </div>
        {:else}
            <MCQ
                Question={{ ...Question[QuestionNum - 1], num: QuestionNum }}
                totalQuestion={Question.length}
                timeout={second == 0}
                lastQuestion={QuestionNum == Question.length}
                on:nextQuestion={() => {
                    QuestionNum++;
                    // if (QuestionNum == Question.length) lastQuestion = true;
                    second = 15;
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
                on:finish={() => {
                    QuizFinished = true;
                }}
            />
        {/if}
    {:else}
        <div
            class="block select-none text-xl font-bold m-3 w-[200px]  py-5 px-7 bg-white border border-gray-200 rounded-lg shadow-2xl  dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
            <Spinner class="mr-3" color="pink" size="7" />Loading ...
        </div>
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
