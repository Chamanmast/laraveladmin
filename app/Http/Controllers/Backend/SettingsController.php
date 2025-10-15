<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Sitesetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SettingsController extends Controller
{
    public function index()
    {
        $settings = Sitesetting::first();

        return inertia('settings/settings', ['settings' => $settings]);
    }

    public function update(Request $request)
    {
       $siteSetting = Sitesetting::first() ?? new Sitesetting;

    $validated = $request->validate([
        'site_title' => ['required','string','max:50'],
        'app_name' => ['nullable','string','max:50'],

        'logo' => ['nullable','image','mimes:jpeg,jpg,png,webp,svg','max:2048'],
        // favicon often is .ico or .svg; do not use 'image' rule here
        'favicon' => ['nullable','mimes:ico,png,svg,webp','max:1024'],
    ]);

    $logoPath = $siteSetting->logo;
    if ($request->hasFile('logo')) {
        if ($logoPath && Storage::disk('public')->exists($logoPath)) {
            Storage::disk('public')->delete($logoPath);
        }
        $logoPath = $request->file('logo')->store('settings', 'public');
    }

    $faviconPath = $siteSetting->favicon;
    if ($request->hasFile('favicon')) {
        if ($faviconPath && Storage::disk('public')->exists($faviconPath)) {
            Storage::disk('public')->delete($faviconPath);
        }
        $faviconPath = $request->file('favicon')->store('settings', 'public');
    }

    // Persist all validated scalar fields
    $siteSetting->fill($validated);
    // Persist file paths
    $siteSetting->logo = $logoPath;
    $siteSetting->favicon = $faviconPath;

    $siteSetting->save();

    return back()->with('success', 'Site Settings Updated Successfully');
    }
}
