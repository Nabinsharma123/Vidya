<script>
    import { Heading } from "flowbite-svelte";

    var examDate = "07/08/2023";
    var days_difference = Math.floor(
        Math.abs(new Date(examDate) - new Date()) / 1000 / (60 * 60 * 24)
    );
</script>

<div class="flex h-full -mx-5 lg:-mx-14">
    <div class="flex-1  bg-gray-900 ">
        <h1
            class="text-2xl text-center border-b py-4  font-extrabold leading-none tracking-tight text-red-400 md:text-5xl  dark:text-white"
        >
            JECA
        </h1>
        <div class="flex  flex-col ">
            <a href="/Examprep/JECA" class="p-4 hover:bg-gray-800">
                <Heading customSize="text-2xl font-bold" class="text-white">
                    Dashboard</Heading
                >
            </a>
            <a href="/Examprep/JECA" class="p-4 hover:bg-gray-800">
                <Heading customSize="text-2xl font-bold" class="text-white"
                    >Insructions</Heading
                >
            </a>
            <a href="/Examprep/JECA" class="p-4 hover:bg-gray-800">
                <Heading customSize="text-2xl font-bold" class="text-white"
                    >Mock Test</Heading
                >
            </a>
            <a href="/Examprep/JECA" class="p-4 hover:bg-gray-800">
                <Heading customSize="text-2xl font-bold" class="text-white"
                    >Quiz</Heading
                >
            </a>
        </div>
    </div>

    <div class="flex-[4] p-8  bg-gray-800">
        <Heading customSize="text-4xl font-bold" class="text-white"
            >Dashboard</Heading
        >
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
    </div>
</div>
