<script>
    import { doc, getDoc } from "firebase/firestore";

    import PdfViewer from "../../../../lib/PdfViewer.svelte";
    import { db } from "../../../firebaseConfig";
    import { Spinner } from "flowbite-svelte";
    import { JECAPreviousYearsList } from "../../../store";

    var yearList = [];
    var selectedYear = false;

    fetchdata();
    async function fetchdata() {
        if ($JECAPreviousYearsList.length != 0) {
            yearList = $JECAPreviousYearsList;
        } else {
            var res = await getDoc(doc(db, "JECA", "PreviousYears"));
            yearList = res.data().data;
            $JECAPreviousYearsList = yearList;
        }
    }
</script>

<div class="relative">
    {#if yearList.length != 0}
        {#each yearList as year}
            <div class="relative w-fit inline-block">
                <button
                    on:click={() => {
                        selectedYear = year;
                    }}
                    type="button"
                    class="disabled:opacity-80 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-bold rounded-lg text-xl px-5 py-2.5 text-center mr-2 mb-2"
                >
                    {year}</button
                >
            </div>
        {/each}
    {:else}
        <div class="flex justify-center items-center h-[300px]">
            <Spinner size={12} color="green" />
        </div>
    {/if}
    {#if selectedYear}
        <PdfViewer
            year={selectedYear}
            on:close={() => {
                selectedYear = false;
            }}
        />
    {/if}
</div>
