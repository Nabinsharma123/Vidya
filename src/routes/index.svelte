<script>
  import { options } from "./store";
</script>

<!-- middle container -->

<div class="">
  <!-- tagline -->
  <div
    class=" flex flex-col items-center mt-10 md:mt-0 md:flex-row md:justify-center w-full mb-24 "
  >
    <div class="flex-1 flex justify-center items-center flex-col md:w-1/2 ">
      <h1 class="text-5xl mb-5 ">Tomorrow Starts Here</h1>
      <p>
        Learn to code with our beginner-friendly tutorials and examples. Read
        tutorials and examples, write programs, run code and learn to code.
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
      <img class="w-full max-w-[400px] md:max-w-none" src="/front.svg" alt="" />
    </div>
  </div>

  <!-- tagline -->
  <!-- choose what to learn -->

  <div class="flex justify-center gap-5" id="start">
    <div class="flex-1 lg:flex lg:items-center hidden ">
      <img class="" src="/choose.png" alt="" />
    </div>
    <div class="flex-[3] flex flex-col  ">
      <div class="">
        <h1 class="text-center text-3xl mb-4 ">Just Choose What To Learn!!</h1>
      </div>
      <div class="option-container">
        {#each $options as { name, endpoint }}
          <a
            href={endpoint}
            class=" rounded-md shadow-md hover:shadow-xl flex items-center border-2 p-5   transition hover:scale-110   "
          >
            <div>
              <img class="flex-1 w-12" src={`/${endpoint.slice(1)}.svg`} alt="" />
            </div>
            <div class="flex-[3] ml-2">
              <h1>Learn {name}</h1>
            </div>
          </a>
        {/each}
      </div>
    </div>
  </div>
  <!-- choose what to learn -->
</div>

<style>
  .option-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
    gap: 20px;
  }
</style>
