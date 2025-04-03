<script lang="ts">
	import type { IconTheme, IconProps } from '$lib/types.js';

	let { theme = 'outline' }: IconProps = $props();

	export const NAME = `%NAME%`;

	const SVGS: Record<IconTheme, string> = {
		outline: `%OUTLINE_SVG%`,
		solid: `%SOLID_SVG%`,
		mini: `%MINI_SVG%`,
		micro: `%MICRO_SVG%`
	};
</script>

{@html SVGS[theme]}
