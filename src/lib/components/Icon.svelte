<script lang="ts">
    let {children, onClick} = $props()
</script>

<!-- <div class="w-11 h-11 rounded-[44px] bg-cover bg-center bg-[url('background.jpg')] relative">

    {@render children()}

</div> -->

 <button type="button" {onClick} class="w-11 h-11 rounded-[44px] bg-gray-200 flex items-center justify-center cursor-pointer">
         {@render children()}      
 </button> 