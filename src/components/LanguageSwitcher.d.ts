/// <reference types="react" />
type LanguageSwitcherProps = {
    className?: string;
    resolveLanguageName: (locale: string) => string;
};
export default function LanguageSwitcher({ className, resolveLanguageName }: LanguageSwitcherProps): JSX.Element;
export {};
