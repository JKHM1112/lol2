import RegistrationButton, { NicknameTag } from "./registrationButton";

interface UserSession {
    user: {
        name: string;
        email: string;
    }
}


export default function CheckNickname({ saveNickname, session }: { saveNickname: NicknameTag[], session: UserSession }) {
    return (
        <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-lg">
            <h4 className="text-2xl font-bold mb-4">등록된 닉네임과 태그</h4>
            <RegistrationButton saveNickname={saveNickname} session={session} />
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2">Nickname</th>
                        <th className="py-2">Tag</th>
                    </tr>
                </thead>
                <tbody>
                    {saveNickname.map((item: any, index: number) => (
                        <tr key={index}>
                            <td className="border px-4 py-2">{item.nickname}</td>
                            <td className="border px-4 py-2">{item.tag}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}