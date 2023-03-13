<script>
    import { Heading } from "flowbite-svelte";
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
            <a href="/Examprep/JECA/quiz" class="p-4 hover:bg-gray-800">
                <Heading customSize="text-2xl font-bold" class="text-white"
                    >Quiz</Heading
                >
            </a>
        </div>
    </div>
    <div class="flex-[4] p-8  bg-gray-800">
        <slot />
    </div>
</div>
