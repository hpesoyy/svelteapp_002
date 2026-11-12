<script lang="ts">
	import './layout.css';
	import type { LayoutProps } from './$types';

	let { children } = $props();
</script>
<Loader/>
<Notification/>

<div class="bg-[url('background.jpg')] h-svh w-full bg-cover bg-center flex items-center justify-center">
	<div class="w-full max-w-[600px] max-h-[calc(100svh-100px)]">
		<div class="!text-[#356ef0] text-4xl font-bold h-[60px] flex items-center justify-center">
			basefoot
		</div>
	</div>
	<div class="bg-white w-full max-w-[600px] p-6 rounded-lg {page.url.pathname ==='/' ? 'h-[calc(100svh-160px)]':'max-h[calc(100svh-160px)]'} relative overflow-hidden">
	
		{@render children()}
		
		
	</div>

</div>

