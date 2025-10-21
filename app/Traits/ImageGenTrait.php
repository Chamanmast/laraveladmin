<?php

namespace App\Traits;

use Illuminate\Http\Request;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

trait ImageGenTrait
{
    /**
     * @param  Request  $request
     * @return $this|false|string
     */
    public function imageGenrator($image, $imgMain, $imageSizes, $path)
    {

        $code = hexdec(uniqid());
        $name_gen = $code.'.'.$image->getClientOriginalExtension();

        // Create an image manager instance with default driver (e.g., GD or Imagick)
        $manager = new ImageManager(Driver::class);

        $width = ($imgMain->width == 0) ? null : $imgMain->width;
        $height = ($imgMain->height == 0) ? null : $imgMain->height;

        $img = $manager->read($image);

        if ($width !== null && $height !== null) {
            $img->resize($width, $height);
        }

        $img->save($path.$name_gen);
        $save_url = $path.$name_gen;

        // Save resized versions
        foreach ($imageSizes as $imgSize) {
            $resized_name = $code.'_'.strtolower($imgSize->name).'.'.$image->getClientOriginalExtension();

            $resized = $manager->read($image)
                ->resize($imgSize->width, $imgSize->height, function ($constraint) {
                    $constraint->aspectRatio(); // Maintain aspect ratio
                    $constraint->upsize();      // Prevent enlarging small images
                })
                ->sharpen(10); // Optional: slightly sharpen resized image

            $resized->save($path.$resized_name, 90); // 90 is quality for JPEG
        }

        return $save_url;
    }

    public function imageRemove($image = null, $imageSizes = [])
    {
        if (! empty($image)) {
            if (file_exists($image)) {
                unlink($image);
            }
            foreach ($imageSizes as $img) {

                $upload_img = explode('.', $image);

                $imgRemove = $upload_img[0].'_'.strtolower($img->name).'.'.$upload_img[1];
                if (file_exists($imgRemove)) {
                    unlink($imgRemove);
                }
            }
        }
    }
}
