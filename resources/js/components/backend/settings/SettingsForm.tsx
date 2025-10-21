import SettingsController from '@/actions/App/Http/Controllers/Backend/SettingsController';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SettingsFormData, SiteSetting } from '@/types/site-setting';
import { mapSiteSettingToFormData } from '@/utils/settings';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import React, { useEffect, useRef, useState } from 'react';

interface SettingsFormProps {
    settings: SiteSetting;
}

const SettingsForm: React.FC<SettingsFormProps> = ({ settings }) => {
    const {
        data,
        setData,
        post,
        processing,
        errors,
        recentlySuccessful,
        clearErrors,
    } = useForm<SettingsFormData>(mapSiteSettingToFormData(settings));
    const handleFile =
        (name: 'logo' | 'favicon') =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0] ?? null;
            setData(name, file);
            // clear prior validation error when user selects a new file
            if (errors[name]) clearErrors(name);
            // update preview URL handled by useEffect below
        };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(SettingsController.update.url(), {
            method: 'patch',
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                setData('logo', null);
                setData('favicon', null);
                if (logoInputRef.current) logoInputRef.current.value = '';
                if (faviconInputRef.current) faviconInputRef.current.value = '';
                setLogoPreview(settings.logo ?? null);
                setFaviconPreview(settings.favicon ?? null);
            },
        });
    };

    // Refs to clear file inputs programmatically
    const logoInputRef = useRef<HTMLInputElement | null>(null);
    const faviconInputRef = useRef<HTMLInputElement | null>(null);

    // Local preview state for existing or selected images
    const [logoPreview, setLogoPreview] = useState<string | null>(
        settings.logo ?? null,
    );
    const [faviconPreview, setFaviconPreview] = useState<string | null>(
        settings.favicon ?? null,
    );

    // When data.logo/data.favicon change to a File, create object URLs for preview
    useEffect(() => {
        let url: string | null = null;
        if (data.logo instanceof File) {
            url = URL.createObjectURL(data.logo);
            setLogoPreview(url);
        } else if (data.logo === null) {
            setLogoPreview(settings.logo ?? null);
        }
        return () => {
            if (url) URL.revokeObjectURL(url);
        };
    }, [data.logo, settings.logo]);

    useEffect(() => {
        let url: string | null = null;
        if (data.favicon instanceof File) {
            url = URL.createObjectURL(data.favicon);
            setFaviconPreview(url);
        } else if (data.favicon === null) {
            setFaviconPreview(settings.favicon ?? null);
        }
        return () => {
            if (url) URL.revokeObjectURL(url);
        };
    }, [data.favicon, settings.favicon]);

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-8"
            encType="multipart/form-data"
        >
            {/* Logo upload */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Branding</h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="grid gap-2">
                        <Label htmlFor="logo">Logo</Label>
                        <input
                            id="logo"
                            name="logo"
                            ref={logoInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFile('logo')}
                            className="h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30"
                        />
                        <InputError
                            message={errors.logo as unknown as string}
                        />
                        {logoPreview ? (
                            <img
                                src={logoPreview}
                                alt="logo preview"
                                className="mt-2 h-12 w-auto object-contain"
                            />
                        ) : null}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="favicon">Favicon</Label>
                        <input
                            id="favicon"
                            name="favicon"
                            ref={faviconInputRef}
                            type="file"
                            accept="image/x-icon,image/png,image/svg+xml,image/*"
                            onChange={handleFile('favicon')}
                            className="h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30"
                        />
                        <InputError
                            message={errors.favicon as unknown as string}
                        />
                        {faviconPreview ? (
                            <img
                                src={faviconPreview}
                                alt="favicon preview"
                                className="mt-2 h-6 w-6 object-contain"
                            />
                        ) : null}
                    </div>
                </div>
            </section>
            {/* General Info */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">General Info</h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="grid gap-2">
                        <Label htmlFor="site_title">Site Title</Label>
                        <Input
                            id="site_title"
                            name="site_title"
                            value={data.site_title}
                            onChange={(e) =>
                                setData('site_title', e.target.value)
                            }
                            placeholder="My Website"
                            required
                        />
                        <InputError message={errors.site_title} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="app_name">App Name</Label>
                        <Input
                            id="app_name"
                            name="app_name"
                            value={data.app_name}
                            onChange={(e) =>
                                setData('app_name', e.target.value)
                            }
                            placeholder="My App"
                        />
                        <InputError message={errors.app_name} />
                    </div>

                    <div className="grid gap-2 md:col-span-2">
                        <Label htmlFor="meta_description">
                            Meta Description
                        </Label>
                        <Input
                            id="meta_description"
                            name="meta_description"
                            value={data.meta_description}
                            onChange={(e) =>
                                setData('meta_description', e.target.value)
                            }
                            placeholder="Describe your site..."
                        />
                        <InputError message={errors.meta_description} />
                    </div>

                    <div className="grid gap-2 md:col-span-2">
                        <Label htmlFor="meta_keywords">Meta Keywords</Label>
                        <Input
                            id="meta_keywords"
                            name="meta_keywords"
                            value={data.meta_keywords}
                            onChange={(e) =>
                                setData('meta_keywords', e.target.value)
                            }
                            placeholder="keyword1, keyword2, keyword3"
                        />
                        <InputError message={errors.meta_keywords} />
                    </div>
                </div>
            </section>

            {/* Contact Info */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Contact Info</h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="info@example.com"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                            id="phone"
                            name="phone"
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                            placeholder="+1 234 567 890"
                        />
                        <InputError message={errors.phone} />
                    </div>

                    <div className="grid gap-2 md:col-span-2">
                        <Label htmlFor="address">Address</Label>
                        <Input
                            id="address"
                            name="address"
                            value={data.address}
                            onChange={(e) => setData('address', e.target.value)}
                            placeholder="123 Street, City, Country"
                        />
                        <InputError message={errors.address} />
                    </div>

                    <div className="grid gap-2 md:col-span-2">
                        <Label htmlFor="about">About</Label>
                        <Input
                            id="about"
                            name="about"
                            value={data.about}
                            onChange={(e) => setData('about', e.target.value)}
                            placeholder="About your site"
                        />
                        <InputError message={errors.about} />
                    </div>
                </div>
            </section>

            {/* Social Links */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Social Links</h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {[
                        'facebook',
                        'twitter',
                        'pinterest',
                        'instagram',
                        'youtube',
                    ].map((network) => {
                        const key = network as keyof SettingsFormData;
                        const value = data[key];
                        const stringValue =
                            typeof value === 'string' ||
                            typeof value === 'number'
                                ? String(value)
                                : '';
                        return (
                            <div key={network} className="grid gap-2">
                                <Label htmlFor={network}>
                                    {network.charAt(0).toUpperCase() +
                                        network.slice(1)}
                                </Label>
                                <Input
                                    id={network}
                                    name={network}
                                    value={stringValue}
                                    onChange={(e) =>
                                        setData(key, e.target.value)
                                    }
                                    placeholder={`https://${network}.com/yourpage`}
                                />
                                <InputError message={errors[key]} />
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Other Settings */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Other Settings</h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="grid gap-2">
                        <Label htmlFor="pagination">Pagination</Label>
                        <Input
                            id="pagination"
                            type="number"
                            name="pagination"
                            value={data.pagination}
                            onChange={(e) =>
                                setData('pagination', parseInt(e.target.value))
                            }
                            placeholder="6"
                        />
                        <InputError message={errors.pagination} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="style">Style</Label>
                        <Input
                            id="style"
                            name="style"
                            value={data.style}
                            onChange={(e) => setData('style', e.target.value)}
                            placeholder="default"
                        />
                        <InputError message={errors.style} />
                    </div>
                </div>
            </section>

            {/* Submit Button */}
            <div className="flex items-center gap-4">
                <Button type="submit" disabled={processing}>
                    Update
                </Button>

                <Transition
                    show={recentlySuccessful}
                    enter="transition ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition ease-in-out duration-300"
                    leaveTo="opacity-0"
                >
                    <p className="text-sm text-green-600">Saved</p>
                </Transition>
            </div>
        </form>
    );
};

export default SettingsForm;
