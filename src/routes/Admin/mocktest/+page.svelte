<script>
    import { Button, Spinner } from "flowbite-svelte";
    import { fade, fly } from "svelte/transition";
    import { onMount } from "svelte";
    import { notification } from "../../store";
    import { addDoc, doc, collection } from "firebase/firestore";
    import { db } from "../../firebaseConfig";

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
                        textContent: e.nodeValue
                            .replace("<", "&lt;")
                            .replace(">", "&gt;"),
                    });
                } else {
                    JsonLocal.content.push(htmltojson(e));
                }
            });
        }
        return JsonLocal;
    }

    var mainData = {
        Question: {},
        Options: ["", "", "", ""],
        Answer: null,
        Value: null,
    };
    var loading = false;
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

    async function UploadData() {
        loading = true;
        var dom = document.createElement("div");
        dom.innerHTML = Editor.ckeditorInstance.getData();
        var data = htmltojson(dom);
        console.log(data);
        mainData.Question = { data };
        var res = await addDoc(
            collection(doc(db, "JECA", "MockTest"), "MockTest1"),
            mainData
        );
        mainData = {
            Question: {},
            Options: ["", "", "", ""],
            Answer: null,
            Value: null,
        };
        Editor.ckeditorInstance.setData("");
        loading = false;
        console.log(res);
    }
</script>

<div class="mt-7">
    <form action="" on:submit={UploadData}>
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
