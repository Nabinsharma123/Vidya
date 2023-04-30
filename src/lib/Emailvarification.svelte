<script>
    import { fade, fly } from "svelte/transition";
    import { clickOutside } from "./click_outside.js";
    import { createEventDispatcher } from "svelte";
    import { sendEmailVerification, getAuth, signOut } from "firebase/auth";
    import { userAuthData, authStatus, notification } from "../routes/store.js";
    import { Heading, Button, P } from "flowbite-svelte";

    const dispatch = createEventDispatcher();

    var ismailSend = false;
    function sendmail() {
        sendEmailVerification($userAuthData, {
            url: "https://vidyaa.netlify.app/",
        })
            .then(() => {
                ismailSend = true;
            })
            .catch((error) => {
                $notification = {
                    text: error.code,
                    color: "red",
                };
            });
    }
    function SignOut() {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                $authStatus = false;
                $userAuthData = false;
            })
            .catch((error) => {
                $notification = {
                    text: error.code,
                    color: "red",
                };
            });
    }
</script>

<div
    transition:fade
    class="fixed top-0 z-50 left-0 flex justify-center items-center w-screen h-screen bg-black/50"
>
    <div
        transition:fly={{ y: 500, duration: 500 }}
        class=" relative p-10 justify-center bg-white rounded-md shadow-md"
    >
        {#if ismailSend}
            <div class="text-center flex flex-col items-center">
                <Heading customSize="text-2xl font-bold"
                    >We send a verification mail at</Heading
                >
                <div class="bg-gray-200 my-2 p-2 rounded-md w-fit">
                    <h1 class="font-semibold">{$userAuthData.email}</h1>
                </div>
                <Heading customSize="text-xl font-bold"
                    >Please Check your inbox
                </Heading>
            </div>
        {:else}
            <div class="flex flex-col items-center gap-6">
                <Heading customSize="text-2xl font-bold"
                    >We need to varify your email</Heading
                >

                <Button on:click={sendmail} size="lg" gradient color="purple"
                    >Send varification mail</Button
                >
            </div>
        {/if}
        <button on:click={SignOut} class="w-full underline mt-1"
            >Use another email</button
        >
    </div>
</div>
