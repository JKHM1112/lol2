'use client';
import RegistrationButton, { NicknameTag } from "./registrationButton";
import { useState } from "react";

interface UserSession {
    user: {
        name: string;
        email: string;
    };
}

interface CheckNicknameProps {
    saveNickname: NicknameTag[];
    session: UserSession;
}

export default function CheckNickname({ saveNickname, session }: CheckNicknameProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const totalPages = Math.ceil(saveNickname.length / itemsPerPage);

    const currentNicknames = saveNickname.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const generatePageButtons = () => {
        const buttons = [];

        buttons.push(
            <button
                key="left"
                onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                className={`p-2 mx-1 ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gray-200 text-black'}`}
                disabled={currentPage === 1}
            >
                &lt;
            </button>
        );

        buttons.push(
            <button
                key={1}
                onClick={() => setCurrentPage(1)}
                className={`p-2 mx-1 ${currentPage === 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
            >
                1
            </button>
        );

        if (currentPage > 3) {
            buttons.push(
                <span key="dots-left" className="p-2 mx-1">...</span>
            );
        }

        for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
            buttons.push(
                <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`p-2 mx-1 ${currentPage === i ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
                >
                    {i}
                </button>
            );
        }

        if (currentPage < totalPages - 2) {
            buttons.push(
                <span key="dots-right" className="p-2 mx-1">...</span>
            );
        }

        buttons.push(
            <button
                key={totalPages}
                onClick={() => setCurrentPage(totalPages)}
                className={`p-2 mx-1 ${currentPage === totalPages ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
            >
                {totalPages}
            </button>
        );

        buttons.push(
            <button
                key="right"
                onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                className={`p-2 mx-1 ${currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gray-200 text-black'}`}
                disabled={currentPage === totalPages}
            >
                &gt;
            </button>
        );

        return buttons;
    };

    return (
        <div className="mt-10 p-6 border border-gray-200 rounded-md shadow-md">
            <div className="flex gap-2">
                <h4 className="text-2xl font-bold mb-4">등록된 닉네임과 태그</h4>
                {session?.user.email == "admin" ? (
                    <RegistrationButton saveNickname={saveNickname} session={session} />
                ) : (
                    <></>
                )}
            </div>
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
            <div className="mt-4 flex justify-center">
                {generatePageButtons()}
            </div>
        </div>
    );
}
