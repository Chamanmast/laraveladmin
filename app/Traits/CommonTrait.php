<?php

namespace App\Traits;

use Exception;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;

trait CommonTrait
{
    /**
     * Universal try/catch wrapper for database mutation with notification.
     */
    public function executeWithNotification(callable $callback, $successMsg = '', $errorMsg = '', $redirectBack = true)
    {
        try {
            $result = $callback();

            if ($successMsg) {
                $notification = [
                    'message' => $successMsg,
                    'alert-type' => 'success',
                ];
                if ($redirectBack) {
                    return redirect()->back()->with('notification',$notification);
                }
            }

            return $result;
        } catch (QueryException|Exception $e) {
            $notification = [
                'message' => $errorMsg.' '.$e->getMessage(),
                'alert-type' => 'error',
            ];

            return redirect()->back()->with($notification);
        }
    }

    public function StatusUpdate(Request $request)
    {
        return $this->executeWithNotification(function () use ($request) {
            $modelClass = 'App\\Models\\'.$request->table;
            $record = $modelClass::find($request->id);
            if (! $record) {
                throw new Exception('Record not found');
            }
            $record->update([
                'status' => ($record->status == 1) ? 0 : 1,
            ]);

            return ($record->status == 0) ? 'active' : 'deactive';
        }, '', 'Status update failed');
    }

    public function delete(Request $request)
    {
        return $this->executeWithNotification(function () use ($request) {
            $modelClass = 'App\\Models\\'.$request->table;
            $notificationMsg = ucfirst($request->table).' Record Deleted successfully';

            if (is_array($request->id)) {
                $records = $modelClass::whereIn('id', $request->id)->get();
                foreach ($records as $record) {
                    $record->delete();
                }
            } else {
                $record = $modelClass::find($request->id);
                if ($record) {
                    $record->delete();
                } else {
                    throw new Exception('Record not found');
                }
            }
              $notification = [
                    'message' => $notificationMsg,
                    'alert-type' => 'success',
                ];
            return redirect()->back()->with('notification',$notification);
        }, '', 'Deletion failed');
    }

    /**
     * Remove the specified resource and its images from storage.
     */
    public function deletewithImage(Request $request)
    {
        return $this->executeWithNotification(function () use ($request) {
            $modelClass = 'App\\Models\\'.$request->table;
            $presetName = isset($this->image_preset[0]) ? $this->image_preset[0]->name : null;

            if (is_array($request->id)) {
                $items = $modelClass::whereIn('id', $request->id)->get();
            } else {
                $items = collect([$modelClass::find($request->id)]);
            }

            foreach ($items as $item) {
                if ($item && ! empty($item->image) && file_exists($item->image)) {
                    $img = explode('.', $item->image);
                    if (count($img) === 2 && $presetName) {
                        $smallImg = $img[0].'_'.$presetName.'.'.$img[1];
                        if (file_exists($smallImg)) {
                            unlink($smallImg);
                        }
                    }
                    unlink($item->image);
                }
                if ($item) {
                    $item->delete();
                }
            }

            $cat = (isset($item) && $item->type == 1) ? 'Category' : 'Service';
                $notification = [
                    'message' => $cat.' Deleted successfully',
                    'alert-type' => 'success',
                ];
            return redirect()->back()->with('notification',$notification);
        }, '', 'Deletion with image failed');
    }
}
