<script>
    import {
        Table,
        TableBody,
        TableBodyCell,
        TableBodyRow,
        TableHead,
        TableHeadCell,
        Checkbox,
        TableSearch,
        Heading,
        Spinner,
    } from "flowbite-svelte";
    import { db } from "../routes/firebaseConfig";
    import {
        query,
        orderBy,
        limit,
        doc,
        getDocs,
        collection,
        onSnapshot,
    } from "firebase/firestore";
    import { onDestroy } from "svelte";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export var subject;
    var LeaderboardDocRef = doc(db, "JECA", "QuizLeaderboard");
    var LeaderboardcolRef = collection(LeaderboardDocRef, subject);

    // query(LeaderboardcolRef, orderBy("score","desc"), orderBy("time", "asc"))
    var userList = [];
    var loading = true;
    // getDocs(
    //     query(
    //         LeaderboardcolRef,
    //         orderBy("score", "desc"),
    //         orderBy("time", "asc")
    //     )
    // ).then((e) => {
    //     e.forEach((doc) => {
    //         userList = [...userList, doc.data()];
    //         console.log(doc.data());
    //     });
    // });

    const unsubscribe = onSnapshot(
        query(LeaderboardcolRef, orderBy("score", "desc"), limit(10)),
        (res) => {
            loading = false;
            userList = [];

            res.forEach((doc) => {
                userList = [...userList, doc.data()];

                console.log(doc.data());
            });
        },
        (err) => {
            console.log(err);
        }
    );

    onDestroy(() => {
        unsubscribe();
    });
</script>

<div
    class="relative bg-white m-3 max-h-[500px] h-fit  overflow-auto  flex-col rounded-lg py-5 px-10 flex items-center "
>
    <Heading customSize="text-4xl text-center mb-5 font-bold"
        >Leaderboard</Heading
    >
    {#if loading}
        <div
            class="absolute flex justify-center items-center bg-white/50 w-full h-full top-0 left-0"
        >
            <Spinner />
        </div>
    {:else}
        <Table striped={true}>
            <TableHead>
                <TableHeadCell>NO.</TableHeadCell>

                <TableHeadCell>Name</TableHeadCell>
                <TableHeadCell>Score</TableHeadCell>
                <TableHeadCell>Time</TableHeadCell>
            </TableHead>
            <TableBody class="divide-y">
                {#each userList as { name, score, time }, index}
                    <TableBodyRow>
                        <TableBodyCell>{index + 1}</TableBodyCell>
                        <TableBodyCell>{name}</TableBodyCell>
                        <TableBodyCell>{score}</TableBodyCell>
                        <TableBodyCell>{time} sec</TableBodyCell>
                    </TableBodyRow>
                {/each}
            </TableBody>
        </Table>
    {/if}

    <button
        on:click={() => {
            dispatch("back");
        }}
        class=" mt-4 text-white disabled:opacity-60 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-2xl px-5 py-2 text-center"
        >Back</button
    >
</div>
