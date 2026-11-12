<script>
    import Button from "#lib/components/Button.svelte";
    import InputText from "#lib/components/InputText.svelte";
    import NavBar from "#lib/components/NavBar.svelte";

</script>
<NavBar/>

<div class="flex flex-col gap-3">
    <InputText name="email" placeholder="Email">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-user">
	<path stroke="none" d="M0 0h24v24H0z" fill="none" />
	<path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
	<path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
    </svg>
</InputText>

<InputText name="password" placeholder="Password">
 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-lock-open"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2l0 -6" /><path d="M11 16a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M8 11v-5a4 4 0 0 1 8 0" /></svg>
</InputText>


<div class="flex items-center gap-2">
    <input type="checkbox"/> Remember password
</div>

<Button text="Log In"></Button>
<div class="flex items-center gap-2 justify-center text-gray-400">
    <a href="/forgot"> Forgot Password?</a>
    <a href="/create"> Create an account</a>
</div>
</div>