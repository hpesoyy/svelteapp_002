<script lang="ts">
    let {
        text,
        style='',
        type='button',
        children=null,
        disabled=false
    } = $props()

</script>

<div style="position:relative;">
    <button {type} {style} {disabled}> {text}</button>
    {#if children}
       <div class="absoulute top-2 right-2 opacity-60">
             {@render children() }
       </div>
    {/if}
</div>

<style>
    button {
        background-color: #356ef0;
        color: white;
        border: 0;
        display: block;
        border-radius: 4px;
        padding: 9px;
        height: 46px;
        width: 100%;
    }

    button::disabled{
        opacity: 0.5;
    }
</style>