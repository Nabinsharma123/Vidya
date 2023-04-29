<script>
    import { clickOutside } from "./click_outside.js";
    import { fade, fly } from "svelte/transition";
    import { createEventDispatcher } from "svelte";
    import { authStatus, userAuthData } from "../routes/store.js";
    const dispatch = createEventDispatcher();
</script>

<div
    transition:fade
    class="md:hidden z-50 top-0 left-0 fixed h-screen w-full"
    style="background-color: rgba(0, 0, 0, 0.5);"
>
    <div
        transition:fly={{ x: 300 }}
        use:clickOutside
        on:outclick={() => dispatch("close")}
        class="p-4 absolute right-0 top-0 h-screen max-w-[350px] w-full rounded-tl-lg rounded-bl-lg bg-white"
    >
        <button
            on:click={() => {
                dispatch("close");
            }}
            class="absolute right-1 top-1"
        >
            <img class="w-12 h-12 mr-2 rounded-full" src="/close.svg" alt="" />
        </button>
        {#if $authStatus}
            <div class="w-full pb-2 border-b border-black">
                <div
                    class="flex flex-col text-center justify-between items-center"
                >
                    <img
                        class="w-10 h-10 rounded-full"
                        src={$userAuthData.photoURL}
                        alt=""
                    />
                    <div>
                        <h1 class="font-bold text-lg">
                            {$userAuthData.displayName}
                        </h1>
                        <h1 class="font-bold text-gray-400 text-sm">
                            {$userAuthData.email}
                        </h1>
                    </div>
                </div>
            </div>
        {/if}

        <div class="mt-5 flex flex-col text-center mb-10 gap-5">
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
                class="w-full text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-md px-5 py-2.5 text-center"
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
                class="w-full font-bold text-blue-500 hover:text-white border border-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-md px-5 py-2 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                >Log In</button
            >
            <button
                on:click={() => {
                    dispatch("register");
                    dispatch("close");
                }}
                type="button"
                class=" w-full translate-y-1 text-md text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg px-5 py-2.5 text-center mr-2 mb-2"
                >Join for free</button
            >
        {/if}
    </div>
</div>
