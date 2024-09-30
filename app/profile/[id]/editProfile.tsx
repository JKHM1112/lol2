'use client';
import { useState } from 'react';

interface UserProfile {
    _id: string;
    name: string;
    email: string;
    favorites: string[];
    recently: string[];
    address: string;
    birthday: string;
    gender: string;
    signupDate: string;
}

export default function EditProfile({ profileInformation }: { profileInformation: UserProfile }) {
    const [name, setName] = useState(profileInformation.name);
    const [address, setAddress] = useState(profileInformation.address);
    const [birthday, setBirthday] = useState(profileInformation.birthday);
    const [gender, setGender] = useState(profileInformation.gender);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleProfileSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch(`/api/post/updateProfile`, {
            method: 'POST',
            body: JSON.stringify({
                _id: profileInformation._id,
                name,
                address,
                birthday,
                gender,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            setSuccess('프로필이 성공적으로 업데이트되었습니다.');
            setError('');
        } else {
            setError('프로필 업데이트에 실패했습니다.');
            setSuccess('');
        }
    };

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setError('새 비밀번호가 일치하지 않습니다.');
            return;
        }

        const response = await fetch(`/api/post/changePassword`, {
            method: 'POST',
            body: JSON.stringify({
                _id: profileInformation._id,
                currentPassword,
                newPassword,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            setSuccess('비밀번호가 성공적으로 변경되었습니다.');
            setError('');
        } else {
            const result = await response.json();
            setError(result.message || '비밀번호 변경에 실패했습니다.');
            setSuccess('');
        }
    };

    return (
        <div className="max-w-[800px] bg-white mx-auto p-6 border border-gray-300 rounded-lg shadow-lg">
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {success && <p className="text-green-500 mb-4">{success}</p>}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h3 className="text-xl font-semibold mb-2">비밀번호 수정</h3>
                    <form onSubmit={handlePasswordSubmit} className="space-y-4">
                        <div>
                            <label className="font-bold">현재 비밀번호</label>
                            <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="p-2 w-full border border-gray-300 rounded" required />
                        </div>

                        <div>
                            <label className="font-bold">새 비밀번호</label>
                            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="p-2 w-full border border-gray-300 rounded" required />
                        </div>

                        <div>
                            <label className="font-bold">새 비밀번호 확인</label>
                            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="p-2 w-full border border-gray-300 rounded" required />
                        </div>

                        <button type="submit" className="p-2 bg-blue-500 text-white rounded w-full">
                            비밀번호 변경
                        </button>
                    </form>
                </div>

                <div>
                    <h3 className="text-xl font-semibold mb-2">프로필 정보 수정</h3>
                    <form onSubmit={handleProfileSubmit} className="space-y-4">
                        <div>
                            <label className="font-bold">닉네임</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="p-2 w-full border border-gray-300 rounded" required />
                        </div>

                        <div>
                            <label className="font-bold">주소</label>
                            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="p-2 w-full border border-gray-300 rounded" />
                        </div>

                        <div>
                            <label className="font-bold">생년월일</label>
                            <input type="text" value={birthday} onChange={(e) => setBirthday(e.target.value)} className="p-2 w-full border border-gray-300 rounded" />
                        </div>

                        <div>
                            <label className="font-bold">성별</label>
                            <select value={gender} onChange={(e) => setGender(e.target.value)} className="p-2 w-full border border-gray-300 rounded">
                                <option value="남">남</option>
                                <option value="여">여</option>
                                <option value="미정">미정</option>
                            </select>
                        </div>

                        <button type="submit" className="p-2 bg-blue-500 text-white rounded w-full">
                            프로필 저장
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
