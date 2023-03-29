<script>
    import { Heading } from "flowbite-svelte";
    import { page } from "$app/stores";
</script>

<div
    class="flex bg-gray-900  -mx-5 lg:-mx-14"
    style="min-height: calc(100vh - 61px);"
>
    <div class="flex-1 hidden md:block sticky top-[61px]  h-fit   ">
        <h1
            class="text-2xl text-center border-b py-4  font-extrabold leading-none tracking-tight text-red-400 md:text-5xl  dark:text-white"
        >
            JECA
        </h1>
        <div class="flex  flex-col ">
            <a
                href="/Examprep/JECA"
                class="p-4 hover:bg-gray-800"
                class:bg-gray-800={$page.route.id == "/Examprep/JECA"}
            >
                <Heading customSize="text-2xl font-bold" class="text-white">
                    Dashboard</Heading
                >
            </a>
            <a
                href="/Examprep/JECA/instructions"
                class="p-4 hover:bg-gray-800"
                class:bg-gray-800={$page.route.id ==
                    "/Examprep/JECA/instructions"}
            >
                <Heading customSize="text-2xl font-bold" class="text-white"
                    >Instructions</Heading
                >
            </a>
            <a
                href="/Examprep/JECA/mockTest"
                class="p-4 hover:bg-gray-800"
                class:bg-gray-800={$page.route.id == "/Examprep/JECA/mockTest"}
            >
                <Heading customSize="text-2xl font-bold" class="text-white"
                    >Mock Test</Heading
                >
            </a>
            <a
                href="/Examprep/JECA/quiz"
                class="p-4 hover:bg-gray-800"
                class:bg-gray-800={$page.route.id == "/Examprep/JECA/quiz"}
            >
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
