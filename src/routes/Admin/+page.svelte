<script>
    import { Button, Spinner } from "flowbite-svelte";
    import { fade, fly } from "svelte/transition";
    import { notification } from "../store";
    import { db } from "../firebaseConfig";
    import {
        collection,
        updateDoc,
        arrayUnion,
        doc,
        getDoc,
        addDoc,
    } from "firebase/firestore";

    var loading = false;
    var subjects = [];
    var newSubject = "";
    var SelectedSubject = "";
    var mainData = {
        Question: "",
        Options: ["", "", "", ""],
        Answer: 1,
    };
    // $: console.log(mainData);

    const QuizdocRef = doc(db, "JECA", "Quiz");
    getSubjectList();
    function getSubjectList() {
        getDoc(QuizdocRef).then((e) => {
            subjects = e.data().subjects;
            SelectedSubject = subjects[0];
        });
    }

    async function addQuestion() {
        loading = true;
        const QuizcolRef = collection(QuizdocRef, SelectedSubject);
        addDoc(QuizcolRef, mainData).then((e) => {
            loading = false;
            $notification = {
                color: "green",

                text: "Added",
            };
            mainData = {
                Question: "",
                Options: ["", "", "", ""],
                Answer: 1,
            };
        });
    }
</script>

<div class="mt-3">
    <h1 class="mb-3 text-xl">Choose subject</h1>
    <div>
        <select bind:value={SelectedSubject} name="" id="">
            {#each subjects as subject}
                <option value={subject}>{subject}</option>
            {/each}
        </select>
        <div class="mt-3">
            <input
                bind:value={newSubject}
                type="text"
                placeholder="Add new Subject"
            />
            <Button
                on:click={() => {
                    if (newSubject != "" || newSubject != " ") {
                        loading = true;
                        updateDoc(QuizdocRef, {
                            subjects: arrayUnion(newSubject),
                        }).then((e) => {
                            getSubjectList();
                            console.log(e);

                            loading = false;

                            $notification = {
                                color: "green",

                                text: "Added",
                            };
                        });
                        newSubject = "";
                    }
                }}>Add</Button
            >
        </div>
    </div>

    <div class="mt-7">
        <div>
            <h1>Question</h1>
            <input
                bind:value={mainData.Question}
                id="question"
                class="w-[300px]"
                type="text"
            />
        </div>
        <h1>Options</h1>
        <div class="grid grid-cols-2 w-[300px] gap-2 mb-4">
            {#each mainData.Options as option, index}
                <div class="flex items-center">
                    <span>{index + 1}</span>
                    <input class="w-full" bind:value={option} type="text" />
                </div>
            {/each}
        </div>
        <div>
            <div class="mb-2">
                <label for="Answer">Answer</label>
                <select bind:value={mainData.Answer} name="" id="Answer">
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={2}>3</option>
                    <option value={4}>4</option>
                </select>
            </div>
            <Button on:click={addQuestion}>Add the question</Button>
        </div>
    </div>
</div>
{#if loading}
    <div
        transition:fade
        class="fixed top-0 left-0 flex justify-center items-end md:items-center w-screen h-screen bg-black/50"
    >
        <div
            transition:fly={{ y: 500, duration: 500 }}
            class=" relative   p-10 justify-center  bg-white   rounded-md shadow-md "
        >
            <Spinner />
        </div>
    </div>
{/if}
