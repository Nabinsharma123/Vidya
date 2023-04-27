<script>
    import { userAuthData } from "../store";
    import { doc, getDoc } from "firebase/firestore";
    import { db } from "../firebaseConfig";
    import { Spinner } from "flowbite-svelte";

    var isAdmin = false;

    fetchdata();
    async function fetchdata() {
        var res = await getDoc(doc(db, "admins", $userAuthData.uid));
        if (res.exists()) isAdmin = true;
        else {
            isAdmin = false;
            window.history.back();
        }
    }
</script>

{#if isAdmin}
    <div class="mt-5">
        <slot />
    </div>
{:else}
    <Spinner />
{/if}
