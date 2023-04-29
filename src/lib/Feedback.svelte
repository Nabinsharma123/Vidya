<script>
    import { fly, fade } from "svelte/transition";
    import { Heading, Rating, P, Button, Spinner } from "flowbite-svelte";
    import { createEventDispatcher } from "svelte";
    import { userAuthData, notification } from "../routes/store";
    import { addDoc, collection } from "firebase/firestore";
    import { db } from "../routes/firebaseConfig";
    import Sighup from "./Sighup.svelte";
    var dispatch = createEventDispatcher();

    export var from;
    var feedback = {
        name: $userAuthData.displayName,
        email: $userAuthData.email,
        rating: 0,
        suggestion: "",
        from: from,
    };

    var stars = 0;
    var loading = false;
</script>

<div
    transition:fade
    class="fixed z-20 top-0 left-0 flex justify-center items-end md:items-center w-screen h-screen bg-black/50"
>
    <div
        transition:fly={{ y: 500, duration: 500 }}
        class=" relative p-8 pb-32 md:pb-8 bg-white w-full md:w-[500px] rounded-md shadow-md"
    >
        <button
            on:click={() => {
                dispatch("close");
            }}
            class="absolute top-4 right-4"
        >
            <i class="fa-solid fa-xmark fa-2xl" />
        </button>
        <Heading tag="h2" customSize="text-3xl md:text-4xl font-bold"
            >Give Us Feedback 😊</Heading
        >
        <P class="mt-5 mb-4">How much you like it?</P>
        <div
            on:mouseleave={() => {
                stars = 0;
            }}
        >
            <!-- svelte-ignore a11y-mouse-events-have-key-events -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <i
                class="fa-solid fa-star fa-2xl"
                style={`color: ${
                    feedback.rating >= 1 || stars >= 1 ? "#f7c948" : "gray"
                };transition: 0.1s;`}
                on:mouseover={() => {
                    stars = 1;
                }}
                on:click={() => {
                    feedback.rating = 1;
                }}
            />
            <!-- svelte-ignore a11y-mouse-events-have-key-events -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <i
                class="fa-solid fa-star fa-2xl"
                style={`color: ${
                    feedback.rating >= 2 || stars >= 2 ? "#f7c948" : "gray"
                };transition: 0.1s;`}
                on:mouseover={() => {
                    stars = 2;
                }}
                on:click={() => {
                    feedback.rating = 2;
                }}
            />
            <!-- svelte-ignore a11y-mouse-events-have-key-events -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <i
                class="fa-solid fa-star fa-2xl"
                style={`color: ${
                    feedback.rating >= 3 || stars >= 3 ? "#f7c948" : "gray"
                };transition: 0.1s;`}
                on:mouseover={() => {
                    stars = 3;
                }}
                on:click={() => {
                    feedback.rating = 3;
                }}
            />
            <!-- svelte-ignore a11y-mouse-events-have-key-events -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <i
                class="fa-solid fa-star fa-2xl"
                style={`color: ${
                    feedback.rating >= 4 || stars >= 4 ? "#f7c948" : "gray"
                };transition: 0.1s;`}
                on:mouseover={() => {
                    stars = 4;
                }}
                on:click={() => {
                    feedback.rating = 4;
                }}
            />
            <!-- svelte-ignore a11y-mouse-events-have-key-events -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <i
                class="fa-solid fa-star fa-2xl"
                style={`color: ${
                    feedback.rating >= 5 || stars >= 5 ? "#f7c948" : "gray"
                };transition: 0.1s;`}
                on:mouseover={() => {
                    stars = 5;
                }}
                on:click={() => {
                    feedback.rating = 5;
                }}
            />
        </div>

        <P class="mt-10 mb-4">Any suggestion for us?</P>
        <textarea
            bind:value={feedback.suggestion}
            name=""
            id=""
            class="w-full h-40 rounded-md shadow-md focus:outline-none resize-none"
        />

        <Button
            on:click={async () => {
                loading = true;
                await addDoc(collection(db, "Feedback"), feedback);
                $notification = {
                    text: "Thank You!!!",
                    color: "green",
                };
                loading = false;
                setTimeout(() => {
                    dispatch("close");
                }, 1000);
            }}
            color="green"
            class="w-full mt-4 text-xl"
            >{loading ? "Loading..." : "Submit"}</Button
        >
    </div>
</div>
