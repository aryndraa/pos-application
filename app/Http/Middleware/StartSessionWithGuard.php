<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Session\Middleware\StartSession;

class StartSessionWithGuard extends StartSession
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $cookieName = $this->getCookieNameForPath($request->path());
        
        config(['session.cookie' => $cookieName]);

        return parent::handle($request, $next);
    }

    /**
     * Get cookie name based on request path
     *
     * @param string $path
     * @return string
     */
    protected function getCookieNameForPath(string $path): string
    {
        $appName = str_replace(' ', '_', config('app.name', 'laravel'));
        
        if (str_starts_with($path, 'cashier')) {
            return $appName . '_cashier_session';
        }
        
        if (str_starts_with($path, 'kitchen')) {
            return $appName . '_kitchen_session';
        }

        if (str_starts_with($path, 'admin') || str_starts_with($path, 'filament')) {
            return $appName . '_session';
        }
        
        return $appName . '_session';
    }
}