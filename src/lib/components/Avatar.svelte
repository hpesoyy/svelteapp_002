<script lang="ts">
 let {user_id, size=11, onClick} = $props()
 //stream image from server
</script>


<!-- svelte-ignore a11y_consider_explicit_label -->
<button type="button" aria-label="avatar" {onClick} class="w-{size} h-{size} rounded-[{size*4}px] bg-cover bg-center cursor-pointer" style="background-image: url('/photos/{user_id}');">

</button>