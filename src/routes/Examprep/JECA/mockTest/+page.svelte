<script>
    import { Heading, Button, Spinner, P, Hr } from "flowbite-svelte";
    import { scale, fade, slide } from "svelte/transition";
    import { JECAMockTestList, notification } from "../../../store";
    import { db } from "../../../firebaseConfig";
    import { doc, getDoc } from "firebase/firestore";

    var tests = [];

    fetchdata();
    async function fetchdata() {
        try {
            if ($JECAMockTestList.length != 0) {
                tests = $JECAMockTestList;
            } else {
                var res = await getDoc(doc(db, "JECA", "MockTest"));
                // tests = res.data().test
                tests = [];
                res.data().test.forEach((e) => {
                    tests = [
                        ...tests,
                        { name: e, active: res.data().lastId[e].active },
                    ];
                });
                console.log(tests);

                $JECAMockTestList = tests;
            }
        } catch (e) {
            console.log(e);
        }
    }
</script>

<svelte:head>
    <title>JECA - Mock Test</title>
</svelte:head>
<div class="relative">
    <div class="mb-6">
        <Heading
            customSize="text-3xl md:text-4xl font-bold"
            class="text-white text-right md:text-left pb-2 border-b"
            >Mock Test</Heading
        >
    </div>

    {#if tests.length != 0}
        {#each tests as { name, active }}
            <div class="relative w-fit inline-block">
                {#if !active}
                    <div
                        class="absolute -top-2 z-10 -right-1 bg-white rounded-full p-0.5"
                    >
                        <img src="/lock.svg" alt="" />
                    </div>
                {/if}

                <a href={active ? `/MockTest/${name}` : ""}>
                    <button
                        disabled={!active}
                        type="button"
                        class="disabled:opacity-80 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-bold rounded-lg text-lg px-5 py-2.5 text-center mr-2 mb-2"
                    >
                        {name}</button
                    >
                </a>
            </div>
        {/each}
    {:else}
        <div class="flex justify-center items-center h-[300px]">
            <Spinner size={12} color="green" />
        </div>
    {/if}
</div>
