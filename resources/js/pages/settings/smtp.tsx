import SmtpSettingsForm from '@/components/backend/settings/SmtpForm';
import AppLayout from '@/layouts/app-layout';
import { edit as editAppearance } from '@/routes/appearance';
import { type BreadcrumbItem } from '@/types';
import type { SmtpSetting } from '@/types/site-setting'; // import your interface
import { Head } from '@inertiajs/react';

interface SettingsPageProps {
    settings: SmtpSetting; // strongly type the settings prop
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Site Settings',
        href: editAppearance().url,
    },
];

const Smtp: React.FC<SettingsPageProps> = ({ settings }) => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Settings" />
            <div className="container mx-auto py-2 px-4">
                <h1 className="text-2xl font-semibold mb-6">Appearance Settings</h1>

                <div className="w-full max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-6xl mx-auto  rounded-lg shadow-md p-4 sm:p-6 md:p-8">
                    <section className="space-y-8">
                        <SmtpSettingsForm settings={settings} />
                    </section>
                </div>
            </div>
        </AppLayout>
    );
};

export default Smtp;
