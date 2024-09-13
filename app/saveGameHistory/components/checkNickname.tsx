'use client'
import RegistrationButton, { NicknameTag } from "./registrationButton";
import { useState } from "react";

interface UserSession {
    user: {
        name: string;
        email: string;
    }
}

interface CheckNicknameProps {
    saveNickname: NicknameTag[];
    session: UserSession;
}

export default function CheckNickname({ saveNickname, session }: CheckNicknameProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(saveNickname.length / itemsPerPage);

    const currentNicknames = saveNickname.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-lg">
            <h4 className="text-2xl font-bold mb-4">등록된 닉네임과 태그</h4>
            <RegistrationButton saveNickname={currentNicknames} session={session} />
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2">Nickname</th>
                        <th className="py-2">Tag</th>
                    </tr>
                </thead>
                <tbody>
                    {currentNicknames.map((item, index) => (
                        <tr key={index}>
                            <td className="border px-4 py-2">{item.nickname}</td>
                            <td className="border px-4 py-2">{item.tag}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="mt-4">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`p-2 mx-1 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}
