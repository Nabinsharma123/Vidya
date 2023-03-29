<script>
    import { clickOutside } from "./click_outside.js";
    import { fade, fly } from "svelte/transition";
    import { createEventDispatcher } from "svelte";
    import { authStatus } from "../routes/store.js";
    const dispatch = createEventDispatcher();
</script>

<div
    transition:fade
    class="md:hidden z-30 top-0 left-0 fixed h-screen w-full"
    style="background-color: rgba(0, 0, 0, 0.5);"
>
    <div
        transition:fly={{ x: 300 }}
        use:clickOutside
        on:outclick={() => dispatch("close")}
        class="p-4 absolute right-0 top-0 h-screen w-[250px] rounded-tl-lg rounded-bl-lg bg-white"
    >
        <div class="w-full py-2 border-b border-black">
            <a
                on:click={() => {
                    dispatch("close");
                }}
                href="/"
            >
                <img class="w-32" src="/logo.jpeg" alt="" />
            </a>
        </div>

        <div class="mt-5 flex flex-col gap-3">
            <a
                on:click={() => {
                    dispatch("close");
                }}
                class="navBarOptions"
                href="/"
            >
                <h1 class="font-medium text-xl hover:text-blue-500">Home</h1>
            </a>
            <a
                on:click={() => {
                    dispatch("close");
                }}
                class="navBarOptions"
                href="/#start"
            >
                <h1 class="font-medium text-xl hover:text-blue-500">Course</h1>
            </a>
            <!-- <a
                on:click={() => {
                    dispatch("close");
                }}
                class="navBarOptions"
                href="/tutorials"
            >
                <h1 class="font-medium text-xl hover:text-blue-500">
                    Tutorials
                </h1>
            </a> -->
            <a
                on:click={() => {
                    dispatch("close");
                }}
                class="navBarOptions"
                href="/Examprep"
            >
                <h1 class="font-medium text-xl hover:text-blue-500">
                    Examprep
                </h1>
            </a>
            <a
                on:click={() => {
                    dispatch("close");
                }}
                class="navBarOptions"
                href="/About"
            >
                <h1 class="font-medium text-xl hover:text-blue-500">
                    About Us
                </h1>
            </a>
        </div>

        {#if $authStatus}
            <button
                on:click={() => {
                    dispatch("signout");
                }}
                type="button"
                class="w-full mt-4 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >Sign Out</button
            >
        {:else}
            <button
                on:click={() => {
                    dispatch("login");
                    dispatch("close");
                    // SighupClicked = true;
                }}
                type="button"
                class="w-full font-bold mt-4 text-blue-500 hover:text-white border border-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg text-md px-5 py-2 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                >Log In</button
            >
            <button
                on:click={() => {
                    dispatch("register");
                    dispatch("close");
                }}
                type="button"
                class=" w-full translate-y-1 text-md text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg  px-5 py-2.5 text-center mr-2 mb-2 "
                >Register</button
            >
        {/if}
    </div>
</div>
