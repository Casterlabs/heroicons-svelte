export declare type Theme = 'outline' | 'solid' | 'mini' | 'micro';

export interface IconProps {
	theme?: Theme;
	additionalProperties?: Record<string, any>;
}
