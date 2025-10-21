<?php

use App\Models\Menu;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Str;

const BADGE = ['success', 'secondary', 'warning', 'primary'];
const MENUTYPE = ['Page', 'Url', 'External Page', 'Category'];
const TYPE = ['Services', 'Partner/Brands', 'Gallery'];
const LOADER = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-loader spin ms-2">
                                        <line x1="12" y1="2" x2="12" y2="6"></line>
                                        <line x1="12" y1="18" x2="12" y2="22"></line>
                                        <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                                        <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                                        <line x1="2" y1="12" x2="6" y2="12"></line>
                                        <line x1="18" y1="12" x2="22" y2="12"></line>
                                        <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                                        <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                                    </svg>';

const PERMISSIONS = [
    'menus' => 'Menu',
    'menugroup' => 'Menu Group',
    'megamenu' => 'Mega Menu ',
    'pages' => 'Pages',
    'module' => 'Module',
    'blogcategory' => 'Blog Category',
    'blog' => 'Blog Post',
    'tag' => 'Blog Tag',
    'admin' => 'Admin',
    'image_preset' => 'Image Preset',
    'smtp' => 'SMTP Setting',
    'site' => 'Site Setting',
    'role' => 'Role & Permission',
];

function active_class($path)
{
    $currentRoute = Route::getCurrentRoute();

    if ($currentRoute) {
        return ($currentRoute->uri == $path) ? 'active' : '';
    } else {
    }
}
function active_class_menu($path)
{
    $currentRoute = Route::getCurrentRoute();

    if ($currentRoute) {
        return ($currentRoute->uri == $path) ? 'mm-selected' : '';
    } else {
    }
}

function is_active_route($path)
{
    // dd(Route::getCurrentRoute()->uri);
    return (Str::contains(Route::getCurrentRoute()->uri, $path)) ? 'true' : 'false';
}

function show_class($path)
{
    return (Str::contains(Route::getCurrentRoute()->uri, $path)) ? 'show' : '';
}
function rolecheck($id)
{
    $i = 0;
    $result = DB::table('roles')
        ->selectRaw('ROW_NUMBER() OVER (ORDER BY id) AS rid,id')
        ->get();
    // dd($result);
    while ($i != count($result)) {
        if ($result[$i]->id == $id) {
            $re = $result[$i]->rid;
        }
        $i++;
    }
    // dd($result[0]->rid);
    $roles = ['bg-info', 'bg-danger', 'bg-warning', 'bg-info', 'bg-primary'];

    // echo $id;
    return $roles[$re];
}
function breadcrumb()
{

    if (Route::getCurrentRoute()->uri == 'admin/dashboard') {
        $url = 'Home';
    } else {
        $n = explode('/', Route::getCurrentRoute()->uri);
        // dd($n );
        if (count($n) == 2) {
            $url = 'Show ' . ucfirst(Str::headline(ucfirst($n[1])));
        } elseif (count($n) == 3 || count($n) == 5) {
            $url = ucfirst($n[2]) . ' ' . ucfirst(Str::headline(ucfirst($n[1])));
        } else {
            if ($n[2] === 'admin') {
                $url = ucfirst($n[1]) . ' ' . ucfirst(Str::headline(ucfirst($n[2])));
            } else {

                if ($n[2] === 'branddetails') {
                    $url = ucfirst($n[2]) . ' ' . ucfirst(Str::headline(ucfirst($n[1])));
                } else {
                    $url = ucfirst($n[3]) . ' ' . ucfirst(Str::headline(ucfirst($n[1])));
                }
            }
        }
    }

    return $url;
}

function urlgen($id)
{
    $x = Menu::select('id', 'type', 'url')->find($id);

    return $x->url;
}

function checkarr($id, $array)
{
    return in_array($id, $array) ? 'checked' : '';
}

function generateCaptcha()
{
    $num1 = rand(1, 9);
    $num2 = rand(1, 9);
    $answer = $num1 + $num2;

    Session::put('captcha_answer', $answer);

    return "$num1 + $num2 = ?";
}

function validateCaptcha($input)
{
    return Session::get('captcha_answer') == $input;
}
