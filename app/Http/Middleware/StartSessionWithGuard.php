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
        // Tentukan nama cookie berdasarkan path
        $cookieName = $this->getCookieNameForPath($request->path());
        
        // Set cookie name secara dinamis
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
        
        return $appName . '_session';
    }
}