<script>
    import { Heading, Button, Spinner } from "flowbite-svelte";
    import { db } from "../../../firebaseConfig";

    import { doc, getDoc } from "firebase/firestore";
    var subjects = [];
    var loading = false;
    const QuizdocRef = doc(db, "JECA", "Quiz");
    getSubjectList();
    function getSubjectList() {
        loading = true;
        getDoc(QuizdocRef).then((e) => {
            subjects = e.data().subjects;
            loading = false;
        });
    }
</script>

<Heading customSize="text-4xl font-bold" class="text-white pb-2 border-b"
    >Quiz</Heading
>
{#if !loading}
    <div class=" mt-7">
        {#each subjects as subject}
            <a
                href={`/Quiz/${subject.name}`}
                class="button inline-block mr-4 mt-4 group hover:-translate-y-2 hover:shadow-xl hover:shadow-yellow-400/70  hover:bg-yellow-400 hover:border-yellow-400 max-w-sm p-4 bg-gray-800 border border-yellow-400 rounded-lg shadow  dark:bg-gray-800  dark:border-yellow-400 dark:hover:bg-yellow-400"
                style="transition: 0.3s;"
            >
                <h1
                    class="text-xl md:text-2xl font-extrabold leading-none tracking-tight text-yellow-400  dark:text-white"
                >
                    {subject.name}
                </h1>
            </a>
        {/each}
    </div>
{:else}
    <div class="flex justify-center items-center h-[300px]">
        <Spinner size={12} color="yellow" />
    </div>
{/if}

<style>
    /* .option-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
        gap: 20px;
    } */
    .button:hover h1 {
        color: #fff;
    }
</style>
