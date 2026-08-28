import { useState, FormEvent } from 'react';
import { supabase } from '@/lib/supabase';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function App() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setStatus('error');
      setErrorMsg('이름과 전화번호를 모두 입력해주세요.');
      return;
    }

    setStatus('submitting');
    setErrorMsg('');

    const { error } = await supabase
      .from('event_registrations')
      .insert({ name: name.trim(), phone: phone.trim() });

    if (error) {
      setStatus('error');
      setErrorMsg('신청 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    setStatus('success');
    setName('');
    setPhone('');
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Wireframe-style header */}
        <div className="border-2 border-black rounded-lg p-8">
          <div className="mb-6">
            <div className="h-3 w-16 bg-gray-200 rounded mb-3" />
            <h1 className="text-2xl font-bold text-black tracking-tight">
              이벤트 신청서
            </h1>
            <div className="h-1 w-full bg-gray-100 rounded mt-4" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-black mb-2"
              >
                이름
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="홍길동"
                disabled={status === 'submitting'}
                className="w-full border-2 border-black rounded-lg px-4 py-3 text-black placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:opacity-50"
              />
            </div>

            {/* Phone field */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-black mb-2"
              >
                전화번호
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="010-0000-0000"
                disabled={status === 'submitting'}
                className="w-full border-2 border-black rounded-lg px-4 py-3 text-black placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:opacity-50"
              />
            </div>

            {/* Submit button — the one element that stands out */}
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full bg-black text-white font-semibold py-3 rounded-lg transition-all hover:bg-gray-800 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'submitting' ? '신청 중...' : '신청하기'}
            </button>
          </form>

          {/* Status messages */}
          {status === 'success' && (
            <div className="mt-5 border-2 border-black rounded-lg p-4 text-center">
              <p className="text-sm font-medium text-black">
                신청이 완료되었습니다.
              </p>
            </div>
          )}

          {status === 'error' && (
            <div className="mt-5 border-2 border-black bg-gray-100 rounded-lg p-4 text-center">
              <p className="text-sm font-medium text-black">{errorMsg}</p>
            </div>
          )}
        </div>

        {/* Wireframe footer note */}
        <p className="text-center text-xs text-gray-300 mt-6">
          개인정보는 이벤트 운영 목적으로만 사용됩니다.
        </p>
      </div>
    </div>
  );
}
