import React from 'react';
import { useForm } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import InputError from '@/components/input-error';
import { Transition } from '@headlessui/react';
import SmtpSettingsController from '@/actions/App/Http/Controllers/Backend/SettingsController';


interface SmtpSetting {
  id?: number;
  mailer: string;
  host: string;
  port: number;
  username: string;
  password: string;
  encryption: string;
  from_name: string;
  from_address: string;
}

interface SmtpSettingsFormProps {
  settings: SmtpSetting;
}

const SmtpSettingsForm: React.FC<SmtpSettingsFormProps> = ({ settings }) => {
  const { data, setData, post, processing, errors, recentlySuccessful } = useForm<SmtpSetting>({
    mailer: settings.mailer || '',
    host: settings.host || '',
    port: settings.port || 587,
    username: settings.username || '',
    password: settings.password || '',
    encryption: settings.encryption || 'tls',
    from_name: settings.from_name || '',
    from_address: settings.from_address || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(SmtpSettingsController.UpdateSmtpSetting.url(), {
       method: 'patch',
      preserveScroll: true,
      onSuccess: () => {
        // You could display a toast or notification
        console.log('SMTP settings saved successfully');
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-lg font-medium">SMTP Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="grid gap-2">
            <Label htmlFor="mailer">Mailer</Label>
            <Input
              id="mailer"
              name="mailer"
              value={data.mailer}
              onChange={(e) => setData('mailer', e.target.value)}
              placeholder="smtp"
            />
            <InputError message={errors.mailer} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="host">Host</Label>
            <Input
              id="host"
              name="host"
              value={data.host}
              onChange={(e) => setData('host', e.target.value)}
              placeholder="smtp.mailtrap.io"
            />
            <InputError message={errors.host} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="port">Port</Label>
            <Input
              id="port"
              type="number"
              name="port"
              value={data.port}
              onChange={(e) => setData('port', parseInt(e.target.value))}
              placeholder="587"
            />
            <InputError message={errors.port} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="encryption">Encryption</Label>
            <Input
              id="encryption"
              name="encryption"
              value={data.encryption}
              onChange={(e) => setData('encryption', e.target.value)}
              placeholder="tls"
            />
            <InputError message={errors.encryption} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              value={data.username}
              onChange={(e) => setData('username', e.target.value)}
              placeholder="user@example.com"
            />
            <InputError message={errors.username} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              placeholder="••••••••"
            />
            <InputError message={errors.password} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="from_name">From Name</Label>
            <Input
              id="from_name"
              name="from_name"
              value={data.from_name}
              onChange={(e) => setData('from_name', e.target.value)}
              placeholder="My App"
            />
            <InputError message={errors.from_name} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="from_address">From Address</Label>
            <Input
              id="from_address"
              type="email"
              name="from_address"
              value={data.from_address}
              onChange={(e) => setData('from_address', e.target.value)}
              placeholder="no-reply@example.com"
            />
            <InputError message={errors.from_address} />
          </div>
        </div>
      </section>

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

export default SmtpSettingsForm;
