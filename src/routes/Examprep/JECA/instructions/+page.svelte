<script>
    import { Heading } from "flowbite-svelte";
</script>

<Heading
    customSize="text-3xl md:text-4xl font-bold"
    class="text-white text-right md:text-left pb-2 border-b"
    >Insructions</Heading
>

<div class="flex my-7 justify-center">
    <div class="max-w-[700px]">
        <h1
            class="text-green-400 font-extrabold text-2xl md:text-4xl text-center mb-6"
        >
            Category - I (1 to 80) :
        </h1>
        <p class="text-white font-bold text-xl mb-5">
            Carry 1 mark each and only one option is correct.In case of
            incorrect answer or any combination of more than one answer,1/4 mark
            will be deducted.
        </p>
        <h1
            class="text-green-400 font-extrabold text-2xl md:text-4xl text-center mb-6"
        >
            Category - II (81 to 100) :
        </h1>
        <p class="text-white font-bold text-xl">
            Carry 2 marks each and one or more option(s) is/are correct.If all
            correct answer are not marked and no incorrect answer is marked,
            then score =[ 2 * number of correct answers marked / actual number
            of correct answers ].If any wrong option is marked of if any
            combination including a wrong option is marked, the answer will be
            considered wrong,but there is no negative marking for the same and
            zero mark will be awarded .
        </p>
    </div>
</div>
