import fs from 'node:fs';
import { execSync } from 'node:child_process';

const TYPES_TO_EXPORT = ['IconTheme', 'IconProps'];

const ICON_TEMPLATE_PATH = './src/lib/__template.svelte';
const ICON_SVELTE_PATH = './src/lib/heroicons';
const INDEX_PATH = './src/lib/index.ts';

const GIT_REPO = 'https://github.com/tailwindlabs/heroicons';
const GIT_TAG = 'v2.2.0';

const GIT_FOLDER = './heroicons';

const ICONS_SRC_PATHS = {
	micro: GIT_FOLDER + '/src/16/solid',
	mini: GIT_FOLDER + '/src/20/solid',
	solid: GIT_FOLDER + '/src/24/solid',
	outline: GIT_FOLDER + '/src/24/outline'
};

if (fs.existsSync(GIT_FOLDER)) {
	fs.rmSync(GIT_FOLDER, { recursive: true });
}

if (fs.existsSync(ICON_SVELTE_PATH)) {
	fs.rmSync(ICON_SVELTE_PATH, { recursive: true });
}
fs.mkdirSync(ICON_SVELTE_PATH);

if (fs.existsSync(INDEX_PATH)) {
	fs.rmSync(INDEX_PATH);
}

execSync(`git clone --depth 1 --branch ${GIT_TAG} ${GIT_REPO} ${GIT_FOLDER}`);

let iconData = {
	/*
    filename: {
        outline: '',
        // etc
    },
    */
};

for (const [theme, path] of Object.entries(ICONS_SRC_PATHS)) {
	if (!fs.existsSync(path)) {
		console.warn('Could not find source folder:', path, 'ignoring...');
		continue;
	}

	const files = fs.readdirSync(path);
	for (const filename of files) {
		if (!filename.endsWith('.svg')) continue;

		if (!iconData[filename]) {
			iconData[filename] = {
				outline: null,
				solid: null,
				mini: null,
				micro: null
			};
		}

		const icon = fs.readFileSync(`${path}/${filename}`, 'utf8');

		iconData[filename][theme] = icon;
	}
}

const TEMPLATE = fs.readFileSync(ICON_TEMPLATE_PATH, 'utf8');

const iconNames = [];

for (const [filename, icon] of Object.entries(iconData)) {
	const name =
		'Icon' +
		filename
			.replace('.svg', '')
			.split('-')
			.map((word) => word[0].toUpperCase() + word.slice(1))
			.join('');

	let iconSvelte = TEMPLATE.replace('%NAME%', name);
	for (const [theme, svg] of Object.entries(icon)) {
		if (!svg) {
			iconSvelte = iconSvelte.replace(`%${theme.toUpperCase()}_SVG%`, '<!-- Missing Icon -->');
			continue;
		}

		const propertyString = Object.entries({
			'data-type': 'svelte-heroicons',
			'data-icon': name,
			'data-theme': theme,
			'aria-hidden': 'true'
		})
			.map(([key, value]) => `${key}="${value}"`)
			.join(' ');

		const rewrittenSvg = svg //
			.replace(/<svg /, `<svg ${propertyString} `)
			.replaceAll(/black/g, 'currentColor')
			.replaceAll(/#0F172A/g, 'currentColor')
			.replaceAll(/#09090B/g, 'currentColor')
			.replaceAll(/#333333/g, 'currentColor');

		iconSvelte = iconSvelte.replace(`%${theme.toUpperCase()}_SVG%`, rewrittenSvg);
	}

	iconNames.push(name);
	fs.writeFileSync(`${ICON_SVELTE_PATH}/${name}.svelte`, iconSvelte);
}

console.log('Wrote', iconNames.length, 'icons');

fs.writeFileSync(
	INDEX_PATH,
	[
		`export const ICONS = ${JSON.stringify(iconNames)};`,
		TYPES_TO_EXPORT.map((name) => `export type { ${name} } from '$lib/types.js';`).join('\n'),
		iconNames
			.map((name) => `export { default as ${name} } from '$lib/heroicons/${name}.svelte';`)
			.join('\n')
	].join('\n\n')
);

console.log('Generated index.ts');
