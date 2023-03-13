<script>
    import { Heading } from "flowbite-svelte";

    var examDate = "07/08/2023";
    var days_difference = Math.floor(
        Math.abs(new Date(examDate) - new Date()) / 1000 / (60 * 60 * 24)
    );
</script>

<Heading customSize="text-4xl font-bold" class="text-white">Dashboard</Heading>
<div class="mt-20 flex gap-6 ">
    <div class="bg-gray-900 flex-1  p-4   rounded-lg">
        <Heading customSize="text-4xl font-extrabold" class="text-white"
            >{days_difference} Days</Heading
        >
        <h1
            class="text-lg mt-2 font-bold leading-none tracking-tight text-blue-400   dark:text-white"
        >
            Remaining Time
        </h1>
    </div>
    <div class="bg-gray-900 flex-1 p-4 rounded-lg">
        <Heading customSize="text-4xl font-extrabold" class="text-white"
            >8th July</Heading
        >
        <h1
            class="text-lg mt-2 font-bold leading-none tracking-tight text-blue-400   dark:text-white"
        >
            Exam Date
        </h1>
    </div>
    <div class="bg-gray-900 flex-1 p-4   rounded-lg">
        <Heading customSize="text-4xl font-extrabold" class="text-white"
            >120 min</Heading
        >
        <h1
            class="text-lg mt-2 font-bold leading-none tracking-tight text-blue-400   dark:text-white"
        >
            Total Time
        </h1>
    </div>

    <div class="bg-gray-900 flex-1 p-4 rounded-lg">
        <Heading customSize="text-4xl font-extrabold" class="text-white"
            >120</Heading
        >
        <h1
            class="text-lg mt-2 font-bold leading-none tracking-tight text-blue-400   dark:text-white"
        >
            Total Marks
        </h1>
    </div>
</div>
