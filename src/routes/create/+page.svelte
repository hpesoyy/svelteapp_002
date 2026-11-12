<script lang="ts">
    import Button from "#lib/components/Button.svelte";
    import InputText from "#lib/components/InputText.svelte";
    import { enhance } from "$app/forms";

    let {form } = $props()

    let files:FileList | undefined = $state()
    let backgroundImage = $state('')
   $effect(() => {
        if(files && files[0]){
            const reader = new FileReader()
            reader.addEventListener('load',()=>{
                backgroundImage = `background-image:url(`+reader.result?.toString()+`)`
            })

            reader.readAsDataURL(files[0])
        }else{
            backgroundImage=''
        }
   }) 
</script>

<form action="?/create" method="post" use:enhance enctype="multipart/form-data">
<div class="flex flex-col gap-3">
    {#if form?.message}
        <div class="bg-red-200 text-red-400 p-2 rounded-md">{form.message}</div>
    {/if}

    <div class="text-2xl font-semibold">Create New account</div>
    <InputText name="name" placeholder="Full name"/>
    <div class="flex gap-3 ">
        <InputText classNames="basis-1/2" name="location" placeholder="City, state"/>
        <InputText classNames="basis-1/2" name="occupation" placeholder="Occupation"/>
    </div>

    <div class="flex gap-3 ">
        <InputText classNames="basis-1/2" name="email" placeholder="Email"/>
        <InputText classNames="basis-1/2" name="password" placeholder="Password"/>
    </div>

    <div class="flex items-center gap-3">
        <div class="rounded-[100px] h-[100px] w-[100px] min-w[100px] bg-gray-400 flex items-center justify-center bg-cover bg-center style={backgroundImage}">
        {#if backgroundImage === ''}
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="text-white">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
            <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
           </svg>
        {/if}
        </div>
        <input bind:files type="file" accept="image/png;image/jpeg" name="avatar" class="cursor-pointer text-sm">
        </div>
        <Button text="Sign Up" type="submit"></Button>
        <div class="flex items-center gap-2">
            <!-- <input type="checkbox"/> Remember password -->
        </div>

            <div class="flex items-center gap-2 justify-center text-gray-400">
                <a href="/login"> Already have account?</a>
            </div>
        </div>
</form>
