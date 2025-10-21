import SettingsForm from '@/components/backend/settings/SettingsForm';
import AppLayout from '@/layouts/app-layout';
import { edit as editAppearance } from '@/routes/appearance';
import { type BreadcrumbItem } from '@/types';
import type { SiteSetting } from '@/types/site-setting'; // import your interface
import { Head } from '@inertiajs/react';
import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { toast } from 'react-toastify';

interface SettingsPageProps {
    settings: SiteSetting; // strongly type the settings prop
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Site Settings',
        href: editAppearance().url,
    },
];

const Settings: React.FC<SettingsPageProps> = ({ settings }) => {
    const { props } = usePage();

    useEffect(() => {
        // Inertia may expose flash messages under props.flash or directly on props
        const p = props as Record<string, unknown>;
        const flash = (p['flash'] as Record<string, unknown> | undefined) ?? p;
        const maybeMessage = (flash && typeof flash === 'object') ? (flash['success'] ?? flash['message']) : null;
        if (typeof maybeMessage === 'string' && maybeMessage.length > 0) {
            toast.success(maybeMessage);
        }
    }, [props]);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Settings" />
            <div className="container mx-auto py-2 px-4">
                <h1 className="text-2xl font-semibold mb-6">Appearance Settings</h1>

                <div className="w-full max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-6xl mx-auto  rounded-lg shadow-md p-4 sm:p-6 md:p-8">
                    <section className="space-y-8">
                        <SettingsForm settings={settings} />
                    </section>
                </div>
            </div>
        </AppLayout>
    );
};

export default Settings;
