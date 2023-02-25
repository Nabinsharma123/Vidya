<script>
    import "../app.css";
    import Navbar from "../lib/Navbar.svelte";
    import { fade, fly } from "svelte/transition";
    import { onMount } from "svelte";
    import Notification from "../lib/Notification.svelte";
    import { notification, authStatus, userAuthData } from "./store";
    import { getAuth, onAuthStateChanged } from "firebase/auth";
    import Footer from "../lib/Footer.svelte";

    var loading = true;

    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log(user);
            $authStatus = true;
            $userAuthData = user;
        } else {
            $authStatus = false;
        }
        loading = false;
    });
</script>

<svelte:head>
    <link rel="prefetch" href="/loading.svg" as="document" />
    <link rel="prefetch" href="/correct.svg" as="document" />
    <link rel="prefetch" href="/wrong.svg" as="document" />
</svelte:head>

<div class="relative ">
    {#if loading}
        <div
            transition:fade
            class="absolute top-0 left-0 w-screen h-screen flex justify-center items-center bg-white"
        >
            <img class="h-[50px]" src="/logo.jpeg" alt="" />
        </div>
    {:else}
        <!-- whole container -->
        <!-- nav bar -->
        <div
            class="sticky top-0 z-20"
            transition:fly={{ y: -100, duration: 500 }}
        >
            <Navbar />
        </div>
        <!-- nav bar -->
        <!-- middle content -->
        <div transition:fly={{ y: 100, duration: 500 }} class="mx-5  lg:mx-14 ">
            <slot />
        </div>
        <div class="mx-5  lg:mx-14 ">
            <Footer />
        </div>
    {/if}
</div>

{#if $notification}
    <Notification
        color={$notification.color}
        symbol={$notification.symbol}
        text={$notification.text}
        on:close={() => {
            $notification = false;
        }}
    />
{/if}

<style>
    :global(*) {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
</style>
