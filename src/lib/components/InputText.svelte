<script lang="ts">
    let {
        name,
        placeholder='',
        value = $bindable(''),
        children=null,
        style='',
        type='text',
        classNames='',
    } = $props()

</script>

<div class="w-full relative">
    <input {name} {placeholder} {style} {type} {classNames} bind:value={value}/>
    {#if children}
       <div class="absoulute top-2 right-2 opacity-60">
             {@render children() }
       </div>
    {/if}
</div>

<style>
    input {
        background-color: white;
        border: 1px solid #d1d5dc;
        display: block;
        border-radius: 4px;
        padding: 6px;
        height: 40px;
        width: 100%;
    }

    input::placeholder{
        color: #a5a8af;
    }
</style>