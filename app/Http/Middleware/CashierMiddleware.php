<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CashierMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Check if user is authenticated with cashier guard
        if (!auth('cashier')->check()) {
            return redirect()->route('cashier.auth.login');
        }

        // Check if authenticated user has cashier role
        $user = auth('cashier')->user();
        
        if (!$user->hasRole('cashier')) {
            auth('cashier')->logout();
            return redirect()->route('cashier.auth.login')
                ->withErrors(['error' => 'Anda tidak memiliki akses sebagai kasir.']);
        }

        return $next($request);
    }
}