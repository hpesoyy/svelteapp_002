<script lang="ts">
    import Avatar from "#lib/components/Avatar.svelte";
    import Button from "#lib/components/Button.svelte";
    import Icon from "#lib/components/Icon.svelte";
    import InputText from "#lib/components/InputText.svelte";
    import { loader } from "#lib/stores/loader.svelte.js";
    import { toast } from "#lib/stores/toast.svelte.js";
    import { enhance } from "$app/forms";
    import { fly } from "svelte/transition";

	let {form,data} = $props()

    let files:FileList | undefined = $state()
    let backgroundImage = $derived(`background-image:url('/photos/`+data.user.id+`')`)
   $effect(() => {
        if(files && files[0]){
            const reader = new FileReader()
            reader.addEventListener('load',()=>{
                backgroundImage = `background-image:url(`+reader.result?.toString()+`)`
            })

            reader.readAsDataURL(files[0])
        }else{
            backgroundImage= `background-image:url('/photos/`+data.user.id+`')`
        }
		
		if(form?.success){
			toast.color = 'green'
			toast.text = 'saved!'
			loader.show = false
		}else if(form?.message){
			loader.show = false
		}
	}) 
   
    let menuOpen = $state(false)
    const toggleMenu = () =>{
        menuOpen = !menuOpen
    }
</script>

<div class="flex items-center justify-between">
	<div class="flex gap-2 items-center">
		<img src="b.png" alt="logo" class="h-11 w-11"/>
		
		    <!-- search bar -->
     <InputText name="search" classNames="max-w-[240px]">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-search"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
    </InputText> 
	</div>
	
	
    <!-- menu button  -->

    <div class="flex gap-2">
            <!-- notification -->
            <!-- <div class="w-11 h-11 rounded-[44px] bg-gray-200 flex items-center justify-center cursor-pointer">
               
            </div> -->
            <div>
             <Icon onClick={()=>{}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-bell"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" /><path d="M9 17v1a3 3 0 0 0 6 0v-1" /></svg>
           
            </Icon>

            </div>
  
            <!-- avatar -->
            <Avatar user_id={data.user.id} onClick={toggleMenu}/>
    </div>

</div>

<!-- menu button sliders a new page over -->
{#if !menuOpen}
    <div class="bg-red-200 absolute right-6 left-6 top-22" out:fly={{x:200, duration:400}} in:fly={{x:200, duration:400}}>
            <div class="text-2xl font-semibold"> news feed</div>
    </div>

{:else}
    <div class="bg-green-100 absolute right-6 left-6 top-22" in:fly={{x:200, duration:700}} out:fly={{x:200, duration:700}}>
          <div class="text-2xl font-semibold"> Settings</div>
       

	   <form action="?/update" method="post" use:enhance enctype="multipart/form-data" onsubmit={()=>{loader.show=true}}>
<div class="flex flex-col gap-3">
    {#if form?.message}
        <div class="bg-red-200 text-red-400 p-2 rounded-md">{form.message}</div>
    {/if}
	
    <InputText name="name" placeholder="Full name" value={data.user.name}/>
	<InputText name="email" placeholder="Email" value={data.user.email}/>
    <div class="flex gap-3 ">	   
        <InputText classNames="basis-1/2" name="location" placeholder="City, state" value={data.user.location}/>
        <InputText classNames="basis-1/2" name="occupation" placeholder="Occupation" value={data.user.occupation}/>
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
        <Button text="save changes" type="submit"></Button>
        <div class="flex items-center gap-2 justify-center text-gray-400">
           
        </div>

        </div>
</form>
		
		 <a class="flex items-center gap-3 font-bold curosr-pointer p-2 rounded-lg hover: bg-gray-100" href="/change">
            
            <Icon onClick={()=>{}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-lock-2"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2" /><path d="M3 12h13l-3 -3" /><path d="M13 15l3 -3" /></svg>
            </Icon>
			Change Password
        </a>
		
		
		
      <a class="flex items-center gap-3 font-bold curosr-pointer p-2 rounded-lg hover: bg-gray-100" href="/logout">
            
            <Icon onClick={()=>{}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-login-2"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2" /><path d="M3 12h13l-3 -3" /><path d="M13 15l3 -3" /></svg>
            </Icon>
			Log Out
        </a>
    </div>
{/if}

