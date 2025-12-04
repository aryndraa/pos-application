import { PageProps, Permission, Role } from '@/types';
import { usePage } from '@inertiajs/react';

export function useAuth() {
    const { auth } = usePage<PageProps>().props;

    const hasRole = (role: Role | Role[]): boolean => {
        if (!auth.user) return false;

        const roles = Array.isArray(role) ? role : [role];
        return roles.some((r) => auth.user!.roles.includes(r));
    };

    const hasPermission = (permission: Permission | Permission[]): boolean => {
        if (!auth.user) return false;

        const permissions = Array.isArray(permission)
            ? permission
            : [permission];
        return permissions.some((p) => auth.user!.permissions.includes(p));
    };

    const hasAnyRole = (roles: Role[]): boolean => {
        return hasRole(roles);
    };

    const hasAllRoles = (roles: Role[]): boolean => {
        if (!auth.user) return false;
        return roles.every((role) => auth.user!.roles.includes(role));
    };

    const isCashier = (): boolean => hasRole('cashier');
    const isKitchen = (): boolean => hasRole('kitchen');
    const isAdmin = (): boolean => hasRole('admin');

    return {
        user: auth.user,
        isAuthenticated: !!auth.user,
        hasRole,
        hasPermission,
        hasAnyRole,
        hasAllRoles,
        isCashier,
        isKitchen,
        isAdmin,
    };
}
