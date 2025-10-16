import React from 'react';
import { useForm } from '@inertiajs/react';

const Test = () => {
  const { data, setData, post, progress, processing, errors, reset } = useForm({
    name: '',
    avatar: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    post(('test'), {
      onSuccess: () => reset(), // Reset form after successful upload
    });
  };

  return (
    <div className="p-3">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Name Input */}
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
          />
          {errors.name && <div className="text-danger">{errors.name}</div>}
        </div>

        {/* File Upload */}
        <div className="mb-3">
          <label className="form-label">Avatar</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setData('avatar', e.target.files[0])}
          />
          {errors.avatar && <div className="text-danger">{errors.avatar}</div>}
        </div>

        {/* Upload Progress */}
        {progress && (
          <div className="mb-3">
            <progress
              value={progress.percentage}
              max="100"
              className="w-100"
            >
              {progress.percentage}%
            </progress>
          </div>
        )}

        <button
          type="submit"
          className="btn btn-primary"
          disabled={processing}
        >
          {processing ? 'Uploading...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default Test;


