<script>
    import { Heading, Button } from "flowbite-svelte";
    import { db } from "../../../firebaseConfig";

    import {
        collection,
        updateDoc,
        arrayUnion,
        doc,
        getDoc,
        addDoc,
    } from "firebase/firestore";
    var subjects = [];
    const QuizdocRef = doc(db, "JECA", "Quiz");
    getSubjectList();
    function getSubjectList() {
        getDoc(QuizdocRef).then((e) => {
            subjects = e.data().subjects;
        });
    }
</script>

<Heading customSize="text-4xl font-bold" class="text-white">Quiz</Heading>

<div class="option-container mt-10">
    {#each subjects as subject}
        <a
            href="/Examprep/JECA"
            class="button block group hover:-translate-y-3 hover:shadow-xl hover:shadow-yellow-400/70  hover:bg-yellow-400 hover:border-yellow-400 max-w-sm p-6 bg-gray-800 border border-yellow-400 rounded-lg shadow  dark:bg-gray-800  dark:border-yellow-400 dark:hover:bg-yellow-400"
            style="transition: 0.3s;"
        >
            <h1
                class="text-xl font-extrabold leading-none tracking-tight text-yellow-400 md:text-4xl  dark:text-white"
            >
                {subject}
            </h1>
        </a>
    {/each}
</div>

<style>
    .option-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
        gap: 20px;
    }
    .button:hover h1 {
        color: #fff;
    }
</style>
