<script>
    import { Button, Spinner } from "flowbite-svelte";
    import { fade, fly } from "svelte/transition";
    import { onMount, onDestroy } from "svelte";
    import { notification } from "../../store";
    import {
        addDoc,
        doc,
        collection,
        onSnapshot,
        updateDoc,
        arrayUnion,
    } from "firebase/firestore";
    import { db } from "../../firebaseConfig";
    import { htmltojson } from "../../../lib/htmltojson";

    var mainData = {
        id: 0,
        Question: {},
        Options: ["", "", "", ""],
        Answer: 1,
        Value: 1,
    };
    var loading = false;
    var EditorToolbar, Editor;
    var SelectedTest = 0;
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

    var MockTestList = [];
    var newTest;
    var MockTestdocRef = doc(db, "JECA", "MockTest");
    const unsubscribe = onSnapshot(
        MockTestdocRef,
        (res) => {
            MockTestList = [];

            res.data().test.forEach((e) => {
                MockTestList = [
                    ...MockTestList,
                    {
                        name: e,

                        lastId: res.data().lastId[e].lastId,
                        active: res.data().lastId[e].active,
                    },
                ];
            });

            // subjects.map((a, index) => {
            //     if (a.name == prevsub) {
            //         SelectedSubject = index;
            //     }
            // });
            loading = false;
        },
        (err) => {
            console.log(err);
        }
    );

    onDestroy(() => {
        unsubscribe();
    });

    async function UploadData() {
        loading = true;
        var dom = document.createElement("div");
        dom.innerHTML = Editor.ckeditorInstance.getData();
        var data = htmltojson(dom);
        console.log(data);
        mainData.Question = { data };
        mainData.id = MockTestList[SelectedTest].lastId + 1;
        await Promise.all([
            await addDoc(
                collection(MockTestdocRef, MockTestList[SelectedTest].name),
                mainData
            ),
            await updateDoc(MockTestdocRef, {
                [`lastId.${MockTestList[SelectedTest].name}.lastId`]:
                    mainData.id,
                // [`lastId.${subjects[SelectedSubject].name}`]: increment(1),
            }),
        ]);
        mainData = {
            id: 0,
            Question: {},
            Options: ["", "", "", ""],
            Answer: 1,
            Value: 1,
        };
        Editor.ckeditorInstance.setData("");
        loading = false;
    }
</script>

<div class="mt-7">
    <form action="" on:submit={UploadData}>
        <div class="flex gap-2 mb-3">
            <select required bind:value={SelectedTest} name="" id="">
                {#each MockTestList as Test, index}
                    <option value={index}>{Test.name}</option>
                {/each}
            </select>

            <div
                class="rounded-md bg-blue-600 flex justify-center items-center text-white px-2 font-bold"
            >
                Total Question : {MockTestList[SelectedTest]
                    ? MockTestList[SelectedTest].lastId
                    : ""}
            </div>
            <div>
                Active
                <select
                    value={MockTestList[SelectedTest]
                        ? MockTestList[SelectedTest].active
                        : ""}
                    on:change={(e) => {
                        updateDoc(MockTestdocRef, {
                            [`lastId.${MockTestList[SelectedTest].name}.active`]:
                                e.target.value == "true" ? true : false,
                        });
                    }}
                    name=""
                    id=""
                >
                    <option value={true}>True</option>
                    <option value={false}>False</option>
                </select>
            </div>
        </div>
        <div class="mt-3">
            <input
                bind:value={newTest}
                type="text"
                placeholder="Add new Test"
            />
            <Button
                on:click={async () => {
                    try {
                        if (newTest != "" || newTest != " ") {
                            loading = true;
                            await updateDoc(MockTestdocRef, {
                                [`lastId.${newTest}.lastId`]: 0,
                                [`lastId.${newTest}.active`]: false,

                                test: arrayUnion(newTest),
                            });
                            $notification = {
                                color: "green",
                                text: "Added",
                            };
                            newTest = "";
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
        <div class="grid grid-cols-2 gap-2 mb-4">
            {#each mainData.Options as option, index}
                <div class="flex items-center">
                    <span>{index + 1}</span>
                    <input
                        required
                        class="ml-3 w-full"
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
            <div class="mb-2">
                <label for="Answer">Value</label>
                <select
                    required
                    bind:value={mainData.Value}
                    name=""
                    id="Answer"
                >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                </select>
            </div>
            <Button type="submit">Add the question to DB</Button>
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
