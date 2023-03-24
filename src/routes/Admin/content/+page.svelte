<script>
    import { onMount } from "svelte";
    import { Button, Spinner } from "flowbite-svelte";
    import { fade, fly } from "svelte/transition";
    import { clickOutside } from "../../../lib/click_outside";
    import { db } from "../../firebaseConfig";
    import { notification } from "../../store";

    import {
        doc,
        getDoc,
        setDoc,
        updateDoc,
        arrayUnion,
    } from "firebase/firestore";

    var loading = true;
    var Editor;
    var EditorToolbar;
    var data;
    var SubjectList = [];
    var SelectedSubject;
    var TopicList = [];
    var selectedTopic;
    var addnew = {
        subject: {
            status: false,
            newSubjectName: "",
            about: "",
        },
        topic: {
            status: false,
            newTopicName: "",
        },
    };

    function htmltojson(element) {
        var JsonLocal = {};
        JsonLocal = {
            type: element.localName,
            attributes: [],
            content: [],
        };
        for (var i = 0; i < element.attributes.length; i++) {
            JsonLocal.attributes.push({
                name: element.attributes[i].name,
                value: element.attributes[i].value,
            });
        }
        if (element.childNodes.length != 0) {
            Array.from(element.childNodes).forEach((e) => {
                if (e.nodeType == 3) {
                    JsonLocal.content.push({
                        type: "text",
                        textContent: e.nodeValue,
                    });
                } else {
                    JsonLocal.content.push(htmltojson(e));
                }
            });
        }
        return JsonLocal;
    }

    // function jsontohtml(Json, element) {
    //     if (Json.type == "text") {
    //         element.innerHTML = element.innerHTML + Json.textContent;
    //     } else {
    //         var elementLocal = "";
    //         elementLocal = document.createElement(Json.type);
    //         Json.attributes.forEach((e) => {
    //             elementLocal.setAttribute(e.name, e.value);
    //         });

    //         Json.content.forEach((e) => {
    //             jsontohtml(e, elementLocal);
    //         });
    //         element.appendChild(elementLocal);
    //     }
    // }
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

    async function fetchInitialData() {
        const SubjectListDocRef = doc(db, "SubjectList", "List");
        var res = await getDoc(SubjectListDocRef);
        SubjectList = res.data().names;
    }

    onMount(async () => {
        loading = true;
        await fetchInitialData();
        let script = document.createElement("script");
        script.src = "/src/routes/Admin/content/editor/ckeditor.js";
        document.head.append(script);
        script.onload = function () {
            DecoupledDocumentEditor.create(Editor, {
                codeBlock: {
                    languages: [
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
                });
        };
    });

    var SubjectDocRef;

    $: if (SelectedSubject)
        SubjectDocRef = doc(db, "Subjects", SelectedSubject);

    var ContentDocRef;
    $: if (selectedTopic)
        ContentDocRef = doc(SubjectDocRef, "content", selectedTopic);

    async function UploadToDatabase() {
        loading = true;
        var dom = document.createElement("div");
        dom.innerHTML = Editor.ckeditorInstance.getData();
        data = htmltojson(dom);
        await setDoc(ContentDocRef, {
            data: data,
            name: "Introduction",
        });
        $notification = {
            color: "green",

            text: "Added",
        };
        loading = false;
    }
    async function onSubjectChange(sub) {
        var res = await getDoc(doc(db, "Subjects", sub));
        TopicList = res.data().topics;
    }
</script>

<div>
    <div class=" flex items-end gap-3 mt-[100px]">
        <div>
            <h1>Subjects</h1>
            <select
                on:change={async (e) => {
                    await onSubjectChange(e.target.value);
                    Editor.ckeditorInstance.setData("");
                }}
                name=""
                id=""
                bind:value={SelectedSubject}
            >
                <option style="display:none" />

                {#each SubjectList as Subject}
                    <option value={Subject}>{Subject}</option>
                {/each}
            </select>
        </div>
        <Button
            on:click={() => {
                addnew.subject.status = true;
            }}
            class="h-fit">Add Subject</Button
        >
        <div>
            <h1>Topics</h1>
            <select
                on:change={(e) => {
                    getDoc(doc(SubjectDocRef, "content", e.target.value)).then(
                        (res) => {
                            if (res.exists()) {
                                console.log(res.data().data);
                                Editor.ckeditorInstance.setData(
                                    jsontohtml(res.data().data).innerHTML
                                );
                            } else {
                                Editor.ckeditorInstance.setData("");
                            }
                        }
                    );
                }}
                disabled={!SelectedSubject}
                bind:value={selectedTopic}
                name=""
                id=""
            >
                <option style="display:none" />

                {#each TopicList as Topic}
                    <option value={Topic}>{Topic}</option>
                {/each}
            </select>
        </div>
        <button
            disabled={!SelectedSubject}
            class="text-white disabled:opacity-60 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            on:click={() => {
                addnew.topic.status = true;
            }}>Add Topic</button
        >
    </div>

    <div class="my-4">
        <div bind:this={EditorToolbar} />
        <div
            style="border: 1px solid gray; min-height: 200px; max-height: 450px;overflow: auto;"
            bind:this={Editor}
        >
            write here
        </div>
    </div>

    <Button
        class="mb-5"
        on:click={() => {
            UploadToDatabase();
        }}>Upload to Database</Button
    >

    {#if addnew.topic.status}
        <div
            transition:fade
            class="fixed z-30 top-0 left-0 bg-black/50 h-screen w-screen flex justify-center items-center"
        >
            <div
                transition:fly={{ y: 500, duration: 500 }}
                use:clickOutside
                on:outclick={() => {
                    addnew.topic.status = false;
                }}
                class="p-3 flex justify-center flex-col gap-3 items-center h-40 w-[400px] bg-white rounded-md"
            >
                <h1 class="font-bold text-lg">New Topic</h1>
                <input
                    bind:value={addnew.topic.newTopicName}
                    class="rounded-md"
                    type="text"
                />
                <button
                    disabled={!addnew.topic.newTopicName}
                    class="text-white disabled:opacity-60 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    on:click={() => {
                        loading = true;
                        updateDoc(SubjectDocRef, {
                            topics: arrayUnion(addnew.topic.newTopicName),
                        }).then((e) => {
                            console.log(e);
                            onSubjectChange(SelectedSubject);
                            $notification = {
                                color: "green",

                                text: "Added",
                            };
                            addnew.topic.newTopicName = "";
                            addnew.topic.status = false;
                            loading = false;
                        });
                    }}>Add</button
                >
            </div>
        </div>
    {/if}

    {#if addnew.subject.status}
        <div
            transition:fade
            class="fixed z-30 top-0 left-0 bg-black/50 h-screen w-screen flex justify-center items-center"
        >
            <div
                transition:fly={{ y: 500, duration: 500 }}
                use:clickOutside
                on:outclick={() => {
                    addnew.subject.status = false;
                }}
                class="p-3 flex justify-center flex-col gap-3 items-center w-[400px] bg-white rounded-md"
            >
                <h1 class="font-bold text-lg">New Subject</h1>

                <h1>Name</h1>
                <input
                    bind:value={addnew.subject.newSubjectName}
                    class="rounded-md"
                    type="text"
                />
                <h1>About</h1>
                <textarea
                    bind:value={addnew.subject.about}
                    class="rounded-md w-full h-36"
                    type="text"
                />
                <button
                    disabled={!(
                        addnew.subject.newSubjectName && addnew.subject.about
                    )}
                    class="text-white disabled:opacity-60 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    on:click={async () => {
                        loading = true;
                        await setDoc(
                            doc(db, "Subjects", addnew.subject.newSubjectName),
                            {
                                name: addnew.subject.newSubjectName,
                                about: addnew.subject.about,
                                topics: [],
                            }
                        );
                        await updateDoc(doc(db, "SubjectList", "List"), {
                            names: arrayUnion(addnew.subject.newSubjectName),
                        });
                        await fetchInitialData();

                        $notification = {
                            color: "green",

                            text: "Added",
                        };
                        addnew.subject.newSubjectName = "";
                        addnew.subject.about = "";
                        addnew.subject.status = false;
                        loading = false;
                    }}>Add</button
                >
            </div>
        </div>
    {/if}

    {#if loading}
        <div
            transition:fade
            class="fixed z-30 top-0 left-0 bg-black/50 h-screen w-screen flex justify-center items-center"
        >
            <div
                transition:fly={{ y: 500, duration: 500 }}
                class="p-4 bg-white gap-2 flex rounded-md"
            >
                <h1 class="font-bold text-xl">Loading...</h1>
                <Spinner />
            </div>
        </div>
    {/if}
</div>
