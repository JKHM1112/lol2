'use client'
import { useState } from 'react';

export default function Register() {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const validatePassword = (password: string) => {
    const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePassword(password)) {
      setError('비밀번호는 영문, 숫자, 특수문자를 조합한 8~20자리여야 합니다.');
      return;
    }
    if (password !== confirmPassword) {
      setError('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    // Form submission logic here
    const response = await fetch('/api/post/signup', {
      method: 'POST',
      body: JSON.stringify({ nickname, email, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      window.location.href = '/';
    } else {
      const result = await response.json();
      setError(result.message || '회원가입에 실패했습니다.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-lg">
      <h4 className="text-2xl font-bold mb-4">회원가입</h4>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input name="nickname" type="text" placeholder="닉네임" value={nickname} onChange={(e) => setNickname(e.target.value)} required className="p-2 border border-gray-300 rounded" />
        <input name="email" type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} required className="p-2 border border-gray-300 rounded" />
        <input name="password" type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} required className="p-2 border border-gray-300 rounded" />
        <input name="confirmPassword" type="password" placeholder="비밀번호 확인" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="p-2 border border-gray-300 rounded" />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">회원가입</button>
      </form>
    </div>
  );
}
