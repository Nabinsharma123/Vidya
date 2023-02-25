<script>
    import { clickOutside } from "./click_outside.js";
    import { fade, fly } from "svelte/transition";
    import { createEventDispatcher } from "svelte";
    import { authStatus } from "../routes/store.js";
    const dispatch = createEventDispatcher();
</script>

<div
    transition:fade
    class="md:hidden top-0 left-0 fixed h-screen w-full"
    style="background-color: rgba(0, 0, 0, 0.5);"
>
    <div
        transition:fly={{ x: -300 }}
        use:clickOutside
        on:outclick={() => dispatch("close")}
        class="p-4 absolute left-0 top-0 h-screen w-[250px] rounded-tr-2xl rounded-br-2xl bg-white"
    >
        <div class="w-full py-2 border-b border-black">
            <a
                on:click={() => {
                    dispatch("close");
                }}
                href="/"
            >
                <img class="w-32" src="logo.jpeg" alt="" />
            </a>
        </div>

        <div class="mt-5 flex flex-col gap-3">
            <a
                on:click={() => {
                    dispatch("close");
                }}
                class="navBarOptions"
                href="/#start"
            >
                <h1>Course</h1>
            </a>
            <a
                on:click={() => {
                    dispatch("close");
                }}
                class="navBarOptions"
                href="/tutorials"
            >
                <h1>Tutorials</h1>
            </a>
            <a
                on:click={() => {
                    dispatch("close");
                }}
                class="navBarOptions"
                href="/about"
            >
                <h1>About Us</h1>
            </a>
        </div>
        {#if $authStatus}
            <button
                class="border-2 mt-5 border-black rounded-lg py-0.5 px-2 text-lg font-semibold hover:bg-black hover:text-white "
                on:click={() => {
                    dispatch("signout");
                }}>Sign Out</button
            >
        {/if}
    </div>
</div>
