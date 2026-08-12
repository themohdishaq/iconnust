'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';

type Source = 'home' | 'industry-services' | 'innovation-collaboration';

type Values = {
  name: string;
  organization: string;
  industry: string;
  phoneNumber: string;
  email: string;
  province: string;
  address: string;
  briefAboutCompany: string;
  domain: string;
  message: string;
  website: string; // honeypot — must stay empty
};

const initialValues: Values = {
  name: '',
  organization: '',
  industry: '',
  phoneNumber: '',
  email: '',
  province: '',
  address: '',
  briefAboutCompany: '',
  domain: '',
  message: '',
  website: '',
};

export function useInquiryForm(source: Source) {
  const [values, setValues] = useState<Values>(initialValues);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const setField =
    (key: keyof Values) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setValues((v) => ({ ...v, [key]: e.target.value }));
    };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    setError('');

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source, ...values }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }

      setStatus('success');
      setValues(initialValues);
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  }

  return { values, setField, status, error, handleSubmit };
}
