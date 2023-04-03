<script>
    import "../app.css";
    import Navbar from "../lib/Navbar.svelte";
    import { fade, fly } from "svelte/transition";

    import Notification from "../lib/Notification.svelte";
    import Emailvarification from "../lib/Emailvarification.svelte";
    import { notification, authStatus, userAuthData } from "./store";
    import { getAuth, onAuthStateChanged } from "firebase/auth";

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
    <link rel="prefetch" href="/close.svg" as="document" />
</svelte:head>

<div class="relative ">
    {#if loading}
        <div
            transition:fade
            class=" absolute top-0 left-0 w-screen h-screen flex justify-center items-center bg-white"
        >
            <div class="flex flex-col justify-center">
                <img class="h-[50px]" src="/logo.jpeg" alt="" />
                <div class="loader-line" />
            </div>
        </div>
    {:else}
        <div class="   ">
            {#if $page.route.id != "/Quiz/[id]"}
                <Navbar />
            {/if}

            <div
                transition:fly={{ y: 100, duration: 500 }}
                class=" h-full  min-h-[calc(100vh-50px)] md:min-h-[calc(100vh-61px)] px-3 md:px-5 lg:px-14 dark:bg-gray-900"
            >
                <slot />
            </div>
            {#if $page.route.id != "/Quiz/[id]"}
                <div class="">
                    <Footer />
                </div>
            {/if}
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

    .loader-line {
        width: 100%;
        height: 3px;
        position: relative;
        overflow: hidden;
        background-color: #ddd;
        margin-top: 20px;
        -webkit-border-radius: 20px;
        -moz-border-radius: 20px;
        border-radius: 20px;
    }

    .loader-line:before {
        content: "";
        position: absolute;
        left: -50%;
        height: 3px;
        width: 40%;
        background-color: #29686e;
        -webkit-animation: lineAnim 1s linear infinite;
        -moz-animation: lineAnim 1s linear infinite;
        animation: lineAnim 1s linear infinite;
        -webkit-border-radius: 20px;
        -moz-border-radius: 20px;
        border-radius: 20px;
    }

    @keyframes lineAnim {
        0% {
            left: -40%;
        }
        50% {
            left: 20%;
            width: 80%;
        }
        100% {
            left: 100%;
            width: 100%;
        }
    }
</style>
