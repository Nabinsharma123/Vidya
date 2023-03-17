<script>
    import { fade, fly } from "svelte/transition";
    import { clickOutside } from "./click_outside.js";
    import { createEventDispatcher } from "svelte";
    import { sendEmailVerification } from "firebase/auth";
    import { userAuthData } from "../routes/store.js";
    import { Heading, Button } from "flowbite-svelte";
    const dispatch = createEventDispatcher();

    var ismailSend = false;
    function sendmail() {
        sendEmailVerification($userAuthData).then(() => {
            ismailSend = true;
        });
    }
</script>

<div
    transition:fade
    class="fixed top-0 left-0 flex justify-center items-center w-screen h-screen bg-black/50"
>
    <div
        use:clickOutside
        on:outclick={() => dispatch("close")}
        transition:fly={{ y: 500, duration: 500 }}
        class=" relative   p-10 justify-center  bg-white   rounded-md shadow-md "
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
    </div>
</div>
