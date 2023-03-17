<script>
    import { fly } from "svelte/transition";
</script>

<div
    class="flex flex-col md:flex-row border-2 mt-20 p-3 border-black rounded-md"
    transition:fly={{ y: 200, duration: 500 }}
>
    <div class="flex-1 flex flex-col justify-center items-center">
        <h1 class="font-semibold text-xl mb-5">-:Our Aim:-</h1>
        <h1 class="text-lg">
            Past few years' was the era of online learning. There are a lot of
            websites that promise specialization courses in exchange for huge
            fees and non-flexible time limits. The objective of 'Vidya' is to
            provide free specialization courses related to computer science
            topics. The Vidya team continuously collects emerging industry-grade
            topics and structures them in the course in a way that helped
            learners get a clear understanding of a given topic.
        </h1>
    </div>
    <div class="flex-1">
        <img src="/aboutImg.svg" alt="" />
    </div>
</div>
