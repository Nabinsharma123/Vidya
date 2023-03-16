<script>
    import "../app.css";
    import Navbar from "../lib/Navbar.svelte";
    import { fade, fly } from "svelte/transition";
    import { onMount } from "svelte";
    import Notification from "../lib/Notification.svelte";
    import Emailvarification from "../lib/Emailvarification.svelte";
    import { notification, authStatus, userAuthData } from "./store";
    import {
        getAuth,
        onAuthStateChanged,
        sendEmailVerification,
    } from "firebase/auth";
    import Footer from "../lib/Footer.svelte";
    import { page } from "$app/stores";

    var loading = true;
    var emailvarification = false;

    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
        loading = false;

        if (user) {
            console.log(user);
            $userAuthData = user;
            if (user.emailVerified) {
                $authStatus = true;
            } else {
                $authStatus = false;
                emailvarification = true;
            }
        }
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
        <div class="  relative h-screen flex flex-col justify-between ">
            {#if $page.route.id != "/Quiz/[id]"}
                <Navbar />
            {/if}

            <div
                transition:fly={{ y: 100, duration: 500 }}
                class="mt-[61px] h-full px-5 lg:px-14 dark:bg-gray-900"
            >
                <slot />
            </div>

            <!-- <Footer /> -->
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
{#if emailvarification}
    <Emailvarification
        on:close={() => {
            emailvarification = false;
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
