<script>
    import { Button, Heading } from "flowbite-svelte";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    export var Question;
    export var totalQuestion;
    export var lastQuestion;
    export var timeout;

    var selectedAnswer = 0;

    $: if (timeout) {
        dispatch("wrongAnswer");
    }

    $: if (selectedAnswer != 0) {
        if (selectedAnswer == Question.Answer) {
            dispatch("rightAnswer");
        } else {
            dispatch("wrongAnswer");
        }
    }
    var disable = true;
    $: {
        if (selectedAnswer != 0) {
            disable = false;
        } else if (selectedAnswer == 0 && timeout == false) {
            disable = true;
        } else if (selectedAnswer == 0 && timeout == true) {
            disable = false;
        }
    }
</script>

<div
    class="block select-none m-3 w-full max-w-[600px]  py-5 px-7 bg-white border border-gray-200 rounded-lg shadow-2xl  dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
>
    <h5
        class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white"
    >
        {Question.num}.
        {Question.Question}
    </h5>
    <div class="flex flex-col mt-5">
        {#each Question.Options as option, index}
            <button
                disabled={selectedAnswer != 0}
                on:click={() => {
                    selectedAnswer = index + 1;
                }}
                type="button"
                class:Wrong={selectedAnswer != 0 &&
                    index + 1 == selectedAnswer &&
                    selectedAnswer != Question.Answer}
                class:Right={(timeout || selectedAnswer != 0) &&
                    index + 1 == Question.Answer}
                class=" text-left  border  border-blue-400    hover:bg-blue-200  focus:outline-none  font-medium rounded-lg text-md px-5 py-2.5  mr-2 mb-2   dark:hover:text-white  "
                >{index + 1}. {option}</button
            >
        {/each}
    </div>

    <div class="flex items-center justify-between mt-7">
        <h1
            class="font-semibold text-xl border-2 px-5 py-2 rounded-lg border-blue-600"
        >
            {Question.num}/{totalQuestion}
        </h1>
        <!-- true || false -->
        <!-- false || false -->
        <!-- true || false -->
        <!-- 
           
            
         -->
        {#if lastQuestion}
            <button
                on:click={() => {
                    dispatch("finish");
                }}
                disabled={disable}
                type="button"
                class="text-white disabled:opacity-60 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-xl px-5 py-2 text-center "
                >Finish</button
            >
        {:else}
            <button
                on:click={() => {
                    selectedAnswer = 0;
                    dispatch("nextQuestion");
                }}
                disabled={disable}
                type="button"
                class="text-white disabled:opacity-60 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-xl px-5 py-2 text-center "
                >Next</button
            >
        {/if}
    </div>
</div>

<style>
    .Right {
        @apply border border-green-400;
        @apply bg-green-200;
    }
    .Wrong {
        @apply border border-red-400;
        @apply bg-red-200;
    }
    button:disabled:hover {
        background-color: white;
    }
    .Wrong:disabled:hover {
        @apply bg-red-200;
    }
    .Right:disabled:hover {
        @apply bg-green-200;
    }
</style>
