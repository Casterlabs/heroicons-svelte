# HeroIcons for Svelte

A collection of Svelte components for Heroicons, a set of free MIT-licensed high-quality SVG icons by TailwindLabs https://github.com/tailwindlabs/heroicons

## Installation

```bash
npm install @casterlabs/heroicons-svelte
```

## Usage

```javascript
<script>
    import IconAcademicCap from '@casterlabs/heroicons-svelte';
</script>

<IconAcademicCap theme="outline" />
<IconAcademicCap theme="solid" />
<IconAcademicCap theme="mini" />
<IconAcademicCap theme="micro" />
```

And that's it!

You can also lookup the component in a map:

```javascript
<script lang="ts">
	import { ICONS } from '$lib/index.js';

	const ChosenIcon = ICONS['academic-cap'];
</script>

<ChosenIcon theme="outline" />
```

This is useful for dynamic UIs where it's not feasible to pass a reference to a component.

## Customization

Each SVG has already been rewritten to use `currentColor` for their fill/stroke. You can target an icon using the following CSS:

```css
svg[data-icon='academic-cap'] {
	/* Custom CSS here! */
}
```

Or, you can use the `class` and `style` attributes:

```javascript
<script>
    import IconAcademicCap from '@casterlabs/heroicons-svelte';
</script>

<IconAcademicCap theme="micro" class="my-custom-class" style="transform: rotate(45deg);" />
```

The following attributes are available:

- `[data-type="svelte-heroicons"]`
- `[data-icon="NAME"]`
- `[data-theme="THEME"]`
