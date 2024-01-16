import { PropsWithChildren } from 'react';
type LocalizedLinkProps = PropsWithChildren<{
    className?: string;
    to: string;
    activeClassName?: string;
    activeStyle?: object;
    partiallyActive?: boolean;
    replace?: boolean;
    onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}>;
export default function LocalizedLink({ to, children, className, activeClassName, activeStyle, partiallyActive, replace, onClick, }: LocalizedLinkProps): JSX.Element;
export {};
