<script>
    import "../app.css";
    import Navbar from "../lib/Navbar.svelte";
    import { fade, fly } from "svelte/transition";
    import { onMount } from "svelte";
    import Notification from "../lib/Notification.svelte";
    import { notification,authStatus, userAuthData } from "./store";
    import { getAuth,onAuthStateChanged } from "firebase/auth";

    var mounted = false;
    onMount(() => {
        mounted = true;
    });
const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
  if (user) {

    
    console.log(user);
    $authStatus=true;
    $userAuthData=user;

  } else {
    $authStatus=false;

  }
});
</script>

{#if mounted}
    <!-- whole container -->
    <div class="font-mono ">
        <!-- nav bar -->
        <div
            class="sticky top-0 z-20"
            transition:fly={{ y: -100, duration: 500 }}
        >
            <Navbar />
        </div>
        <!-- nav bar -->
        <!-- middle content -->
        <div transition:fly={{ y: 100, duration: 500 }} class=" mx-24">
            <slot />
        </div>
    </div>
{/if}

{#if $notification}
    <Notification color={$notification.color} symbol={$notification.symbol} text={$notification.text} on:close={()=>{
        $notification=false;
    }}/>
{/if}
<style>
    :global(*) {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
</style>
