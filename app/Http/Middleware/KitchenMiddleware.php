<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class KitchenMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Check if user is authenticated with kitchen guard
        if (!auth('kitchen')->check()) {
            return redirect()->route('kitchen.auth.login');
        }

        // Check if authenticated user has kitchen role
        $user = auth('kitchen')->user();
        
        if (!$user->hasRole('kitchen')) {
            auth('kitchen')->logout();
            return redirect()->route('kitchen.auth.login')
                ->withErrors(['error' => 'Anda tidak memiliki akses sebagai kitchen.']);
        }

        return $next($request);
    }
}