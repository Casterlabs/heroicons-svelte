# HeroIcons for Svelte

A collection of Svelte components for Heroicons, a set of free MIT-licensed high-quality SVG icons by TailwindLabs https://github.com/tailwindlabs/heroicons

## Installation

```bash
npm install casterlabs-heroicons-svelte
```

## Usage

```javascript
<script>
    import IconAcademicCap from 'casterlabs-heroicons-svelte';
</script>

<IconAcademicCap theme="outline" />
<IconAcademicCap theme="solid" />
<IconAcademicCap theme="mini" />
<IconAcademicCap theme="micro" />
```

And that's it!

## Customization

Each SVG has already been rewritten to use `currentColor` for their fill/stroke. You can target an icon using the following CSS:

```css
svg[data-icon='academic-cap'] {
	/* Custom CSS here! */
}
```

The following attributes are available:

- `[data-type="svelte-heroicons"]`
- `[data-icon="NAME"]`
- `[data-theme="THEME"]`
