export declare type IconTheme = 'outline' | 'solid' | 'mini' | 'micro';

export interface IconProps {
	theme?: IconTheme;

	/**
	 * CSS class(es) to apply to the SVG.
	 */
	class?: string;

	/**
	 * CSS style(s) to apply to the SVG.
	 */
	style?: string;
}
