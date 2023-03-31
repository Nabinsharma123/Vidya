<script>
    import { Heading, Spinner } from "flowbite-svelte";
    import { doc, getDoc } from "firebase/firestore";
    import { db } from "./firebaseConfig";
    import { subjects } from "./store";

    import { onMount } from "svelte";
    var SubjectList = [];

    fetchInitialData();

    async function fetchInitialData() {
        if ($subjects.length != 0) {
            SubjectList = $subjects;
        } else {
            try {
                var res = await getDoc(doc(db, "SubjectList", "List"));
                SubjectList = res.data().names;
                $subjects = SubjectList;
                console.log(SubjectList);
            } catch (err) {
                console.log(err);
            }
        }
    }

    var sublistIndex = -1;

    var TypewriterText;
    var TypewriterElementLoaded = false;
    var wordIsWritten = false;

    $: if (!TypewriterElementLoaded && TypewriterText) {
        typewriter();
        TypewriterElementLoaded = true;
    }
    function typewriter() {
        if (wordIsWritten) {
            var inter = setInterval(() => {
                TypewriterText.innerHTML = TypewriterText.innerHTML.slice(
                    0,
                    -1
                );
                if (TypewriterText.innerHTML == "") {
                    clearInterval(inter);
                    wordIsWritten = false;

                    typewriter();
                }
            }, 100);
        } else {
            if (sublistIndex == SubjectList.length - 1) {
                sublistIndex = 0;
            } else {
                sublistIndex++;
            }
            TypewriterText.innerHTML = SubjectList[sublistIndex];
            var text = TypewriterText.innerHTML;
            TypewriterText.innerHTML = "";
            var i = 0;
            var inter = setInterval(() => {
                TypewriterText.innerHTML =
                    TypewriterText.innerHTML + text.slice(i, i + 1);
                i++;

                if (TypewriterText.innerHTML == text) {
                    clearInterval(inter);
                    setTimeout(() => {
                        wordIsWritten = true;
                        typewriter();
                    }, 1500);
                }
            }, 200);
        }
    }
</script>

<!-- middle container -->

<div class="">
    <!-- tagline -->
    <div
        class=" flex flex-col items-center  mt-10 md:flex-row md:justify-center w-full  "
    >
        <div class="flex-1 flex  flex-col md:w-1/2 ">
            <Heading
                customSize="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold "
                class=" mb-5 "
                >Learn

                {#if SubjectList.length != 0}
                    <span
                        bind:this={TypewriterText}
                        class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400"
                    >
                        {SubjectList[0]}
                    </span>
                    <div
                        class="blink_me -ml-1 md:-ml-2 h-6 md:h-10 lg:h-12 inline-block w-[2px] md:w-1 bg-gray-600"
                    />
                {/if}

                anytime, anywhere with just a click.</Heading
            >

            <p
                class="text-base sm:text-xl font-normal text-gray-500  dark:text-gray-400"
            >
                Unlock your potential with our interactive online courses and
                take your learning to the next level!
            </p>
            <div class="flex w-full mt-12 justify-start">
                <a href="#start">
                    <button
                        class="border-2 text-xl font-bold bg-black text-white border-black rounded-2xl py-2 px-8 transition ease-in-out duration-300 hover:bg-white hover:text-black hover:scale-110"
                        >Get Started</button
                    >
                </a>
            </div>
        </div>
        <div class="w-full flex-1 flex justify-center ">
            <!-- <TaglineImg /> -->
            <img class="flex-1" src="/front.svg" alt="" />
        </div>
    </div>

    <!-- tagline -->
    <hr
        class="h-px mt-8 mb-10 bg-gray-200 border-0 dark:bg-gray-700"
        id="start"
    />
    <!-- choose what to learn -->
    <div class="mb-16 ">
        <Heading
            customSize="text-3xl sm:text-6xl text-center font-extrabold "
            class=" mb-5 "
            >Choose what to <span
                class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400"
                >{"<Learn/>"}</span
            >
        </Heading>
    </div>
    <div class="flex justify-center gap-5 mb-20">
        <div class="flex-[4] lg:flex lg:items-center hidden ">
            <img class="" src="/Choose.svg" alt="" />
        </div>
        <div class="flex-[6] flex flex-col   ">
            {#if SubjectList}
                <div class="option-container">
                    {#each SubjectList as Subject}
                        <a
                            href={Subject.replace(/ /g, "-")}
                            class=" rounded-md shadow-md hover:shadow-xl flex items-center border-2 p-5   transition hover:scale-110   "
                        >
                            <div>
                                <img
                                    class="flex-1 w-12"
                                    src={`/${Subject}.svg`}
                                    alt=""
                                />
                            </div>
                            <div class="flex-[3] ml-2">
                                <h1>Learn {Subject}</h1>
                            </div>
                        </a>
                    {/each}
                </div>
            {:else}
                <div class="flex h-full justify-center items-center">
                    <Spinner color="green" size={8} /><span
                        class="ml-2 text-xl font-bold">Loading...</span
                    >
                </div>
            {/if}
        </div>
    </div>
    <!-- choose what to learn -->
</div>

<style>
    .blink_me {
        animation: blinker 0.7s linear infinite;
    }
    @keyframes blinker {
        50% {
            opacity: 0;
        }
    }
    .option-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
        gap: 20px;
    }
</style>
