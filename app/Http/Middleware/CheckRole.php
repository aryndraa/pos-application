<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     * @param  string  $guard
     * @param  string  ...$roles
     */
    public function handle(Request $request, Closure $next, string $guard, ...$roles): Response
    {
        // Check if user is authenticated with the specified guard
        if (!Auth::guard($guard)->check()) {
            return redirect()->route("{$guard}.auth.login");
        }

        $user = Auth::guard($guard)->user();

        // If no roles specified, just check authentication
        if (empty($roles)) {
            return $next($request);
        }

        // Check if user has any of the specified roles using the correct guard
        foreach ($roles as $role) {
            if ($user->hasRole($role, $guard)) {
                return $next($request);
            }
        }

        // User doesn't have required role
        Auth::guard($guard)->logout();
        
        return redirect()
            ->route("{$guard}.auth.login")
            ->withErrors(['error' => 'Anda tidak memiliki akses yang diperlukan.']);
    }
}