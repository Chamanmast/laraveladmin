<?php
namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Sitesetting;
use App\Models\SmtpSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SettingsController extends Controller
{
    public function index()
    {
        $settings = Sitesetting::first();

        $settings->logo =$this->backchecker($settings->logo);
        $settings->favicon =$this->backchecker($settings->favicon);
        return inertia('settings/settings', ['settings' => $settings]);
    }

    public function update(Request $request)
    {

        $siteSetting = Sitesetting::first() ?? new Sitesetting;

        $validated = $request->validate([
            'site_title'       => ['required', 'string', 'max:50'],
            'app_name'         => ['nullable', 'string', 'max:50'],
            'logo'             => ['nullable', 'image', 'mimes:jpeg,jpg,png,webp,svg', 'max:2048'],
            // favicon often is .ico or .svg; do not use 'image' rule here
            'favicon'          => ['nullable', 'mimes:ico,png,svg,webp', 'max:1024'],
            'meta_description' => ['nullable', 'string'],
            'meta_keywords'    => ['nullable', 'string'],
            'about'            => ['nullable', 'string'],
            'email'            => ['nullable', 'email'],
            'facebook'         => ['nullable', 'string'],
            'twitter'          => ['nullable', 'string'],
            'pinterest'        => ['nullable', 'string'],
            'instagram'        => ['nullable', 'string'],
            'youtube'          => ['nullable', 'string'],
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
        $siteSetting->logo    = $logoPath;
        $siteSetting->favicon = $faviconPath;

        $siteSetting->update([
            'site_title' => $request->site_title,
            'app_name' => $request->app_name,
            'meta_description' => $request->meta_description,
            'meta_keywords'    => $request->meta_keywords,
            'about'            => $request->about,
            'phone'            => $request->phone,
            'address'          => $request->address,
            'email'            => $request->email,
            'facebook'         => $request->facebook,
            'twitter'          => $request->twitter,
            'pinterest'        => $request->pinterest,
            'instagram'        => $request->instagram,
            'youtube'          => $request->youtube,
            'pagination'       => $request->pagination,
            'style'            => $request->style,
            'logo'             => $logoPath,
            'favicon'          => $faviconPath,
        ]);
        return back()->with('success', 'Site Settings Updated Successfully');
    }

    public function backchecker(string $path)
    {
        if (str_starts_with($path, '/')) {
            return $path;
        } else {
            return '/' . $path;
        }

    }

    public function SmtpSetting()
    {
        $setting = SmtpSetting::first();
        return inertia('settings/smtp', ['settings' => $setting]);
    } // End Method
    public function UpdateSmtpSetting(Request $request)
    {
        $siteSetting = SmtpSetting::first() ?? new SmtpSetting;
        $siteSetting->update([
            'mailer' => $request->mailer,
            'host' => $request->host,
            'port' => $request->port,
            'username' => $request->username,
            'password' => $request->password,
            'encryption' => $request->encryption,
            'from_name' => $request->from_name,
            'from_address' => $request->from_address,
        ]);


        $notification = array(
            'message' => 'Smtp Setting Updated Successfully',
            'alert-type' => 'success'
        );

        return redirect()->back()->with($notification);
    }

}
