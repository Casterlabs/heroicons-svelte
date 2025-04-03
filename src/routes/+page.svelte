<script lang="ts">
	import { ICONS, type IconTheme } from '$lib/index.js';

	let theme: IconTheme = $state('outline');
	let customColor = $state('#000000');
</script>

Theme: <select bind:value={theme}>
	<option value="outline">Outline</option>
	<option value="solid">Solid</option>
	<option value="mini">Mini</option>
	<option value="micro">Micro</option>
</select>
<br />
Custom Color: <input type="color" bind:value={customColor} />

<br />
<br />
<br />

<div style:color={customColor}>
	{#each ICONS as icon}
		{#await import(`$lib/heroicons/${icon}.svelte`) then imported}
			<imported.default {theme} />
		{/await}
	{/each}
</div>
