<script lang="ts">
	import { ICONS, type IconTheme } from '$lib/index.js';

	let theme: IconTheme = $state('outline');
	let customColor = $state('#000000');
	let customStyle = $state('');
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
Custom Style: <input type="input" bind:value={customStyle} />

<br />
<br />
<br />

<div style:color={customColor}>
	{#each Object.values(ICONS) as Icon}
		<Icon {theme} style={customStyle} />
	{/each}
</div>
