'use client';
import { useState } from 'react';

export default function Register() {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('미정');
  const [year, setYear] = useState('--');
  const [month, setMonth] = useState('--');
  const [day, setDay] = useState('--');
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
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    const birthday = (year === '--' || month === '--' || day === '--')
      ? '미정'
      : `${year}-${month}-${day}`;

    const response = await fetch('/api/post/signup', {
      method: 'POST',
      body: JSON.stringify({
        nickname,
        email,
        password,
        gender,
        address,
        birthday, // 생년월일 추가
        signupDate: new Date().toISOString(),
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      window.location.href = '/';
    } else {
      const result = await response.json();
      setError(result.message || '회원가입에 실패했습니다.');
    }
  };

  // 연도 선택 범위 생성
  const years = Array.from(new Array(100), (_, index) => new Date().getFullYear() - index);
  const months = Array.from({ length: 12 }, (_, index) => String(index + 1).padStart(2, '0'));
  const days = Array.from({ length: 31 }, (_, index) => String(index + 1).padStart(2, '0'));

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-lg">
      <h4 className="text-2xl font-bold mb-4">회원가입</h4>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        {/* 이메일 입력 */}
        <input name="email" type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} required className="p-2 border border-gray-300 rounded" />

        {/* 비밀번호 및 비밀번호 확인 */}
        <input name="password" type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} required className="p-2 border border-gray-300 rounded" />
        <input name="confirmPassword" type="password" placeholder="비밀번호 확인" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="p-2 border border-gray-300 rounded" />
        {password !== confirmPassword && confirmPassword && (
          <p className="text-red-500">비밀번호가 일치하지 않습니다.</p>
        )}

        {/* 닉네임 입력 */}
        <input name="nickname" type="text" placeholder="닉네임" value={nickname} onChange={(e) => setNickname(e.target.value)} required className="p-2 border border-gray-300 rounded" />

        {/* 성별 선택 */}
        <div>
          <label className="mr-4">
            <input type="radio" value="남" checked={gender === '남'} onChange={(e) => setGender(e.target.value)} />{' '} 남 </label>
          <label className="mr-4">
            <input type="radio" value="여" checked={gender === '여'} onChange={(e) => setGender(e.target.value)} />{' '} 여 </label>
          <label>
            <input type="radio" value="미정" checked={gender === '미정'} onChange={(e) => setGender(e.target.value)} />{' '} 미정 </label>
        </div>

        {/* 생년월일 선택 */}
        <div className="flex space-x-2">
          <select value={year} onChange={(e) => setYear(e.target.value)} className="p-2 border border-gray-300 rounded">
            <option value="--">--년</option>
            {years.map((yearOption) => (
              <option key={yearOption} value={yearOption}> {yearOption}년 </option>
            ))}
          </select>

          <select value={month} onChange={(e) => setMonth(e.target.value)} className="p-2 border border-gray-300 rounded">
            <option value="--">--월</option>
            {months.map((monthOption) => (
              <option key={monthOption} value={monthOption}> {monthOption}월 </option>
            ))}
          </select>

          <select value={day} onChange={(e) => setDay(e.target.value)} className="p-2 border border-gray-300 rounded">
            <option value="--">--일</option>
            {days.map((dayOption) => (
              <option key={dayOption} value={dayOption}> {dayOption}일 </option>
            ))}
          </select>
        </div>

        {/* 주소 입력 (선택 사항) */}
        <input name="address" type="text" placeholder="주소 (선택사항)" value={address} onChange={(e) => setAddress(e.target.value)} className="p-2 border border-gray-300 rounded" />

        <button type="submit" className="p-2 bg-blue-500 text-white rounded"> 회원가입 </button>
      </form>
    </div>
  );
}
