import dynamicIconImports from "lucide-react/dynamicIconImports";

export type sidebarNavItemType = {
    title: string;
    href: string;
    icon: keyof typeof dynamicIconImports;
    };