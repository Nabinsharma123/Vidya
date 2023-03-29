<script>
    import { fly } from "svelte/transition";
    import { Heading, P } from "flowbite-svelte";
</script>

<div
    class="flex flex-col  lg:gap-10 lg:flex-row  mt-20 p-3 rounded-md"
    in:fly={{ y: 200, duration: 300 }}
>
    <div class="flex-1 flex flex-col  items-center">
        <h1
            class="mb-6 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white"
        >
            Our Aim
        </h1>

        <P class="text-lg">
            Past few years' was the era of online learning. There are a lot of
            websites that promise specialization courses in exchange for huge
            fees and non-flexible time limits. The objective of 'Vidya' is to
            provide free specialization courses related to computer science
            topics. The Vidya team continuously collects emerging industry-grade
            topics and structures them in the course in a way that helped
            learners get a clear understanding of a given topic.
        </P>
    </div>
    <div class="flex-1 flex justify-center">
        <img
            class="h-[400px] object-cover rounded-md"
            src="/aboutImg.png"
            alt=""
        />
    </div>
</div>
