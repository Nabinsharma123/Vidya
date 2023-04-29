<script>
    import { Heading } from "flowbite-svelte";
    import { fly } from "svelte/transition";
    import { authStatus } from "../store";
</script>

<svelte:head>
    <title>Exampreb</title>
</svelte:head>

<div
    in:fly={{ y: 200, duration: 500 }}
    class=" mt-7 flex flex-1 justify-center"
>
    <div
        class="block p-6 shadow-xl bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
        <Heading customSize=" text-3xl md:text-5xl font-extrabold"
            >Choose an Exam to Crack 🔥</Heading
        >

        <div
            class="mt-10 md:mt-16 flex gap-4 flex-col md:flex-row md:items-center md:justify-center"
        >
            <a
                href="/Examprep/JECA"
                class="button block group hover:-translate-y-3 hover:shadow-xl hover:shadow-red-400/70 hover:bg-red-400 hover:border-red-400 max-w-sm p-6 bg-white border border-red-400 rounded-lg shadow dark:bg-gray-800 dark:border-red-400 dark:hover:bg-red-400"
                style="transition: 0.3s;"
            >
                <h1
                    class="text-2xl text-center font-extrabold leading-none tracking-tight text-red-400 md:text-5xl dark:text-white"
                >
                    JECA
                </h1>
            </a>
            <a
                href="/Examprep"
                class="button relative block group hover:-translate-y-3 hover:shadow-xl hover:shadow-green-400/70 hover:bg-green-400 hover:border-green-400 max-w-sm p-6 bg-white border border-green-400 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                style="transition: 0.3s;"
            >
                <h1
                    class="text-2xl text-center font-extrabold leading-none tracking-tight text-green-400 md:text-5xl dark:text-white"
                >
                    NIMCET
                </h1>
                <span
                    class="absolute -top-3 -right-3 bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-yellow-300 border border-yellow-300"
                    >Coming Soon</span
                >
            </a>

            <a
                href="/Examprep"
                class="button relative block group hover:-translate-y-3 hover:shadow-xl hover:shadow-blue-400/70 hover:bg-blue-400 hover:border-blue-400 max-w-sm p-6 bg-white border border-blue-400 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                style="transition: 0.3s;"
            >
                <h1
                    class="text-2xl text-center font-extrabold leading-none tracking-tight text-blue-400 md:text-5xl dark:text-white"
                >
                    GATE
                </h1>
                <span
                    class="absolute -top-3 -right-3 bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-yellow-300 border border-yellow-300"
                    >Coming Soon</span
                >
            </a>
        </div>
    </div>
</div>

<style>
    .button:hover h1 {
        color: #fff;
        transition: 0.5s;
    }
</style>
