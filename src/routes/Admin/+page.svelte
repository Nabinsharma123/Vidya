<script>
    import { Button } from "flowbite-svelte";
    // import { notification } from "../store";
    // import { onMount } from "svelte";
    // import { htmltojson } from "../../lib/htmltojson";
    // import { jsontohtml } from "../../lib/jsontohtml";
    // import { db } from "../firebaseConfig";
    // import { getDocs, doc, collection, updateDoc } from "firebase/firestore";
    // var EditorToolbar, Editor;

    // onMount(async () => {
    //     // await fetchInitialData();
    //     let script = document.createElement("script");
    //     script.src = "/editor/ckeditor.js";
    //     document.head.append(script);
    //     script.onload = function () {
    //         DecoupledDocumentEditor.create(Editor, {
    //             codeBlock: {
    //                 languages: [
    //                     { language: "plaintext", label: "Plain text" },
    //                     { language: "c", label: "C" },

    //                     { language: "cpp", label: "C++" },
    //                     { language: "css", label: "CSS" },
    //                     { language: "sql", label: "SQL" },

    //                     { language: "html", label: "HTML" },
    //                     { language: "java", label: "Java" },
    //                     { language: "javascript", label: "JavaScript" },

    //                     { language: "python", label: "Python" },
    //                 ],
    //             },
    //         })
    //             .then((editor) => {
    //                 const toolbarContainer = EditorToolbar;

    //                 toolbarContainer.appendChild(
    //                     editor.ui.view.toolbar.element
    //                 );
    //             })
    //             .catch((error) => {
    //                 console.error(error);
    //                 $notification = {
    //                     color: "red",

    //                     text: error,
    //                 };
    //             });
    //     };
    // });
    // var num = 0;
    // var Qus = [];
</script>

<!-- <div class="my-4">
    <div bind:this={EditorToolbar} />
    <div
        style="border: 1px solid gray; min-height: 50px; overflow: auto;"
        bind:this={Editor}
    >
        write here
    </div>
</div>

<button
    on:click={async () => {
        var res = await getDocs(
            collection(doc(db, "JECA", "Quiz"), "Data Structure")
        );

        res.forEach((doc) => {
            Qus.push(doc);
        });
        console.log(Qus);

        Editor.ckeditorInstance.setData(Qus[num].data().Question);

        var dom = document.createElement("div");
        dom.innerHTML = Editor.ckeditorInstance.getData();
        var data = htmltojson(dom);
        console.log(data);
    }}
>
    click
</button>

<button
    on:click={() => {
        num++;
        Editor.ckeditorInstance.setData(Qus[num].data().Question);
        var dom = document.createElement("div");
        dom.innerHTML = Editor.ckeditorInstance.getData();
        var data = htmltojson(dom);
        console.log(data);
    }}>next</button
>

<button
    on:click={async () => {
        var dom = document.createElement("div");
        dom.innerHTML = Editor.ckeditorInstance.getData();
        var data = htmltojson(dom);
        await updateDoc(Qus[num].ref, {
            Question: data,
        });
        // $notification = {
        //     text: "updated",
        //     color: "green",
        // };
        console.log(1);
    }}>upload</button
> -->

<div class="">
    <Button href="/Admin/quiz" size="xl">Quiz</Button>
    <Button href="/Admin/mocktest" size="xl">MockTest</Button>
    <Button href="/Admin/content" size="xl">Content</Button>
</div>
