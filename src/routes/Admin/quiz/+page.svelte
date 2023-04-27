<script>
    import { Button, Spinner } from "flowbite-svelte";
    import { fade, fly } from "svelte/transition";
    import { notification, authStatus } from "../../store";
    import { db } from "../../firebaseConfig";

    import {
        collection,
        updateDoc,
        arrayUnion,
        doc,
        getDoc,
        addDoc,
        increment,
    } from "firebase/firestore";

    var loading = false;
    var subjects = [];
    var newSubject = "";
    var prevsub;
    var SelectedSubject = 0;
    $: console.log(subjects[SelectedSubject]);

    var mainData = {
        id: 0,
        Question: "",
        Options: ["", "", "", ""],
        Answer: 1,
    };

    const QuizdocRef = doc(db, "JECA", "Quiz");

    getSubjectList();
    async function getSubjectList() {
        try {
            var res = await getDoc(QuizdocRef);

            subjects = [];
            // subjects = res.data();

            // for (const key in res.data()) {
            //     subjects = [
            //         ...subjects,
            //         {
            //             name: key,

            //             lastId: res.data()[key],
            //         },
            //     ];
            // }

            res.data().subjectList.forEach((e) => {
                subjects = [
                    ...subjects,
                    {
                        name: e,

                        lastId: res.data().lastId[e],
                    },
                ];
            });

            console.log(subjects);
            subjects.map((a, index) => {
                if (a.name == prevsub) {
                    SelectedSubject = index;
                }
            });
            loading = false;
        } catch (e) {
            loading = false;
            $notification = {
                color: "red",
                text: e,
            };
        }
    }

    async function addQuestion() {
        try {
            loading = true;
            mainData.id = subjects[SelectedSubject].lastId + 1;
            prevsub = subjects[SelectedSubject].name;
            const QuizcolRef = collection(
                QuizdocRef,
                subjects[SelectedSubject].name
            );

            await Promise.all([
                await addDoc(QuizcolRef, mainData),
                await updateDoc(QuizdocRef, {
                    [`lastId.${subjects[SelectedSubject].name}`]: mainData.id,
                    // [`lastId.${subjects[SelectedSubject].name}`]: increment(1),
                }),
            ]);

            getSubjectList();

            $notification = {
                color: "green",
                text: "Added",
            };
            mainData = {
                id: 0,
                Question: "",
                Options: ["", "", "", ""],
                Answer: 1,
            };

            loading = false;
        } catch (e) {
            loading = false;

            $notification = {
                color: "red",
                text: e,
            };
        }

        // addDoc(QuizcolRef, mainData)
        //     .then((e) => {
        //         console.log(e);

        //         updateDoc(QuizdocRef, {
        //             subjects: newSublist,
        //         }).then(() => {
        //             getSubjectList();

        //             $notification = {
        //                 color: "green",
        //                 text: "Added",
        //             };
        //             mainData = {
        //                 id: 0,
        //                 Question: "",
        //                 Options: ["", "", "", ""],
        //                 Answer: 1,
        //             };
        //         });
        //     })
        //     .catch((e) => {
        //         $notification = {
        //             color: "red",
        //             text: e,
        //         };
        //     });
    }
</script>

<div class="mt-3">
    <form action="" on:submit={addQuestion}>
        <h1 class="mb-3 text-xl">Choose subject</h1>
        <div>
            <select required bind:value={SelectedSubject} name="" id="">
                {#each subjects as subject, index}
                    <option value={index}>{subject.name}</option>
                {/each}
            </select>
            <div class="mt-3">
                <input
                    bind:value={newSubject}
                    type="text"
                    placeholder="Add new Subject"
                />
                <Button
                    on:click={async () => {
                        try {
                            if (newSubject != "" || newSubject != " ") {
                                loading = true;
                                // await updateDoc(QuizdocRef, {
                                //     subjects: arrayUnion({
                                //         name: newSubject,
                                //         lastId: 0,
                                //     }),
                                // });

                                await updateDoc(QuizdocRef, {
                                    [`lastId.${newSubject}`]: 0,
                                    subjectList: arrayUnion(newSubject),
                                });
                                await getSubjectList();

                                loading = false;

                                $notification = {
                                    color: "green",

                                    text: "Added",
                                };

                                newSubject = "";
                            }
                        } catch (e) {
                            loading = false;

                            $notification = {
                                color: "red",
                                text: e,
                            };
                        }
                    }}>Add</Button
                >
            </div>
        </div>

        <div class="mt-7">
            <div>
                <h1>Question</h1>
                <input
                    required
                    bind:value={mainData.Question}
                    id="question"
                    class="w-[600px]"
                    type="text"
                />
            </div>
            <h1>Options</h1>
            <div class="grid grid-cols-2 w-[600px] gap-2 mb-4">
                {#each mainData.Options as option, index}
                    <div class="flex items-center">
                        <span>{index + 1}</span>
                        <input
                            required
                            class="w-full"
                            bind:value={option}
                            type="text"
                        />
                    </div>
                {/each}
            </div>
            <div>
                <div class="mb-2">
                    <label for="Answer">Answer</label>
                    <select
                        required
                        bind:value={mainData.Answer}
                        name=""
                        id="Answer"
                    >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                    </select>
                </div>
                <Button type="submit">Add the question to DB</Button>
            </div>
        </div>
    </form>
</div>
{#if true}
    <div
        transition:fade
        class="fixed top-0 left-0 flex justify-center items-center w-screen h-screen bg-black/50"
    >
        <div
            transition:fly={{ y: 500, duration: 500 }}
            class=" relative p-10 justify-center bg-white rounded-md shadow-md"
        >
            <!-- <Spinner /> -->
            hold on
        </div>
    </div>
{/if}
{#if !$authStatus}
    <div
        transition:fade
        class="fixed top-0 left-0 flex justify-center items-center w-screen h-screen bg-black/50"
    >
        <div
            transition:fly={{ y: 500, duration: 500 }}
            class=" relative p-10 justify-center bg-white rounded-md shadow-md"
        >
            Please Log In
        </div>
    </div>
{/if}
