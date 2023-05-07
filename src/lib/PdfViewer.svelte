<script>
    import { clickOutside } from "./click_outside.js";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    import { Button } from "flowbite-svelte";

    export var year;
    $: console.log(myState);

    var myState = {
        pdf: null,
        currentPage: 1,
        zoom: 0.7,
    };

    pdfjsLib.getDocument(`/${year}.pdf`).then((pdf) => {
        myState.pdf = pdf;
        console.log(pdf);
        render();
    });
    function render() {
        myState.pdf.getPage(myState.currentPage).then((page) => {
            var canvas = document.getElementById("pdf_renderer");
            var ctx = canvas.getContext("2d");

            var viewport = page.getViewport(myState.zoom);
            canvas.width = viewport.width;
            canvas.height = viewport.height;

            page.render({
                canvasContext: ctx,
                viewport: viewport,
            });
        });
    }
</script>

<div
    class="z-50 fixed flex justify-center bg-black/30 w-screen p-4 overflow-auto h-screen top-0 left-0"
>
    <div use:clickOutside on:outclick={() => dispatch("close")} class="mainpdf">
        <div class="sticky flex justify-end top-4 w-full">
            <button
                on:click={() => {
                    dispatch("close");
                }}
                class="rounded-full py-1 px-2 border border-black bg-white"
            >
                <i class="fa-solid fa-xmark fa-xl" />
            </button>
        </div>
        <div class="py-4">
            <canvas id="pdf_renderer" />
        </div>
        <div
            class="controlbuttons hidden justify-around w-full sticky bottom-4"
        >
            <Button
                on:click={() => {
                    if (myState.currentPage > 1) {
                        myState.currentPage--;
                        render();
                    }
                }}
                color="green"
            >
                <i
                    class="fa-solid fa-chevron-up"
                    style="rotate: -90deg; margin-right: 5px;"
                /> Previous page</Button
            >
            <Button
                color="green"
                on:click={() => {
                    if (myState.zoom <= 1.5) {
                        myState.zoom += 0.5;
                        render();
                    }
                }}><i class="fa-solid fa-magnifying-glass-plus" /></Button
            >
            <Button
                color="green"
                on:click={() => {
                    if (myState.zoom > 0.7) {
                        myState.zoom -= 0.5;
                        render();
                    }
                }}><i class="fa-solid fa-magnifying-glass-minus" /></Button
            >
            <Button
                on:click={() => {
                    if (myState.currentPage < myState.pdf._pdfInfo.numPages) {
                        myState.currentPage++;
                        render();
                    }
                }}
                color="green"
            >
                Next page
                <i
                    class="fa-solid fa-chevron-up"
                    style="rotate: 90deg; margin-left: 5px;"
                />
            </Button>
        </div>
    </div>
</div>

<style>
    .mainpdf:hover .controlbuttons {
        display: flex;
    }
</style>
