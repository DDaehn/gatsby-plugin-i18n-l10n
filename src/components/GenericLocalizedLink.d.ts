/// <reference types="react" />
type LinkProps = {
    className?: string;
    to: string;
    activeClassName?: string;
    activeStyle?: object;
    partiallyActive?: boolean;
    replace?: boolean;
    onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};
type LocalizedLinkProps = {
    children: (args: LinkProps) => JSX.Element;
} & LinkProps;
export default function GenericLocalizedLink({ to, children, className, activeClassName, activeStyle, partiallyActive, replace, onClick, }: LocalizedLinkProps): JSX.Element;
export {};
