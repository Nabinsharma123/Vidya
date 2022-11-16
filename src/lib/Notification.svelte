<script>
    import { fade, fly } from "svelte/transition";
    import { createEventDispatcher, onMount } from "svelte";
    const dispatch=createEventDispatcher();

    onMount(()=>{
        setTimeout(()=>{
            dispatch("close")
        },3000)
    })
    export var color="#17c21d";
    export var symbol="correct";
    export var text="1234567";
</script>

<div
        transition:fly={{ y: -30, duration: 500 }}
        class="fixed top-10 z-50 pointer-events-none flex justify-center w-full"
    >
        <div
            class="bg-white border-2 rounded-lg shadow-md py-3 items-center flex px-5"
            style={`border-color:${color} ;`}
        >
            <div class="h-[28px] w-[28px] flex justify-center items-center ">
                <img class="mr-2" src={`/${symbol}.svg`} alt="" />
            </div>
            <h1 class="font-bold">{text}</h1>
        </div>
    </div>