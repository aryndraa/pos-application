import { useAuth } from '@/hooks/useAuth';
import { Permission, Role } from '@/types';
import { router } from '@inertiajs/react';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
    children: ReactNode;
    roles?: Role[];
    permissions?: Permission[];
    requireAll?: boolean;
    fallback?: ReactNode;
    redirectTo?: string;
}

export default function ProtectedRoute({
    children,
    roles,
    permissions,
    requireAll = false,
    fallback,
    redirectTo = '/login',
}: ProtectedRouteProps) {
    const { isAuthenticated, hasRole, hasPermission } = useAuth();

    if (!isAuthenticated) {
        router.visit(redirectTo);
        return null;
    }

    let hasAccess = true;

    if (roles && roles.length > 0) {
        if (requireAll) {
            hasAccess = roles.every((role) => hasRole(role));
        } else {
            hasAccess = hasRole(roles);
        }
    }

    if (hasAccess && permissions && permissions.length > 0) {
        if (requireAll) {
            hasAccess = permissions.every((permission) =>
                hasPermission(permission),
            );
        } else {
            hasAccess = hasPermission(permissions);
        }
    }

    if (!hasAccess) {
        if (fallback) {
            return <>{fallback}</>;
        }
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <h1 className="mb-4 text-4xl font-bold text-gray-800">
                        403
                    </h1>
                    <p className="mb-4 text-gray-600">Unauthorized Access</p>
                    <button
                        onClick={() => router.visit('/')}
                        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    >
                        Go Home
                    </button>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
