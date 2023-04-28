<script>
    import { Button, Spinner } from "flowbite-svelte";
    import { fade, fly } from "svelte/transition";
    import { notification, authStatus } from "../../store";
    import { db } from "../../firebaseConfig";
    import { htmltojson } from "../../../lib/htmltojson";
    import {
        collection,
        updateDoc,
        arrayUnion,
        doc,
        getDoc,
        addDoc,
        increment,
        onSnapshot,
    } from "firebase/firestore";
    import { onMount, onDestroy } from "svelte";
    var loading = false;
    var subjects = [];
    var newSubject = "";
    var prevsub;
    var SelectedSubject = 0;
    // $: console.log(subjects[SelectedSubject]);

    var EditorToolbar, Editor;
    onMount(async () => {
        loading = true;
        // await fetchInitialData();
        let script = document.createElement("script");
        script.src = "/editor/ckeditor.js";
        document.head.append(script);
        script.onload = function () {
            DecoupledDocumentEditor.create(Editor, {
                codeBlock: {
                    languages: [
                        { language: "plaintext", label: "Plain text" },
                        { language: "c", label: "C" },

                        { language: "cpp", label: "C++" },
                        { language: "css", label: "CSS" },
                        { language: "sql", label: "SQL" },

                        { language: "html", label: "HTML" },
                        { language: "java", label: "Java" },
                        { language: "javascript", label: "JavaScript" },

                        { language: "python", label: "Python" },
                    ],
                },
            })
                .then((editor) => {
                    const toolbarContainer = EditorToolbar;

                    toolbarContainer.appendChild(
                        editor.ui.view.toolbar.element
                    );
                    loading = false;
                })
                .catch((error) => {
                    console.error(error);
                    $notification = {
                        color: "red",

                        text: error,
                    };
                });
        };
    });

    var mainData = {
        id: 0,
        Question: {},
        Options: ["", "", "", ""],
        Answer: 1,
    };

    const QuizdocRef = doc(db, "JECA", "Quiz");

    const unsubscribe = onSnapshot(
        QuizdocRef,
        (res) => {
            subjects = [];

            res.data().subjectList.forEach((e) => {
                subjects = [
                    ...subjects,
                    {
                        name: e,

                        lastId: res.data().lastId[e],
                    },
                ];
            });

            subjects.map((a, index) => {
                if (a.name == prevsub) {
                    SelectedSubject = index;
                }
            });
            loading = false;
        },
        (err) => {
            console.log(err);
        }
    );

    onDestroy(() => {
        unsubscribe();
    });

    async function addQuestion() {
        try {
            console.log(subjects[SelectedSubject]);

            loading = true;
            mainData.id = subjects[SelectedSubject].lastId + 1;
            prevsub = subjects[SelectedSubject].name;
            const QuizcolRef = collection(
                QuizdocRef,
                subjects[SelectedSubject].name
            );

            var dom = document.createElement("div");
            dom.innerHTML = Editor.ckeditorInstance.getData();
            var data = htmltojson(dom);
            console.log(data);
            mainData.Question = data;

            await Promise.all([
                await addDoc(QuizcolRef, mainData),
                await updateDoc(QuizdocRef, {
                    [`lastId.${subjects[SelectedSubject].name}`]: mainData.id,
                    // [`lastId.${subjects[SelectedSubject].name}`]: increment(1),
                }),
            ]);

            // getSubjectList();

            $notification = {
                color: "green",
                text: "Added",
            };
            mainData = {
                id: 0,
                Question: {},
                Options: ["", "", "", ""],
                Answer: 1,
            };
            Editor.ckeditorInstance.setData("");

            loading = false;
        } catch (e) {
            loading = false;

            $notification = {
                color: "red",
                text: e,
            };
        }
    }
</script>

<div class="mt-3">
    <form action="" on:submit={addQuestion}>
        <h1 class="mb-3 text-xl">Choose subject</h1>
        <div>
            <div class="flex gap-2">
                <select required bind:value={SelectedSubject} name="" id="">
                    {#each subjects as subject, index}
                        <option value={index}>{subject.name}</option>
                    {/each}
                </select>

                <div
                    class="rounded-md bg-blue-600 flex justify-center items-center text-white px-2 font-bold"
                >
                    Total Question : {subjects[SelectedSubject]
                        ? subjects[SelectedSubject].lastId
                        : ""}
                </div>
            </div>
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

                                await updateDoc(QuizdocRef, {
                                    [`lastId.${newSubject}`]: 0,
                                    subjectList: arrayUnion(newSubject),
                                });

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
                <div class="my-4">
                    <div bind:this={EditorToolbar} />
                    <div
                        style="border: 1px solid gray; min-height: 50px; overflow: auto;"
                        bind:this={Editor}
                    >
                        write here
                    </div>
                </div>
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
{#if loading}
    <div
        transition:fade
        class="fixed top-0 left-0 flex justify-center items-center w-screen h-screen bg-black/50"
    >
        <div
            transition:fly={{ y: 500, duration: 500 }}
            class=" relative p-10 justify-center bg-white rounded-md shadow-md"
        >
            <Spinner />
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
