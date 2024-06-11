'use client'
import { Button } from "@/components/ui/button";

interface DeleteButtonProps {
    result: any;
    note: any;
}

export default function DeleteButton({ result, note }: DeleteButtonProps) {
    const handleDelete = async () => {
        const response = await fetch('/api/post/patchDelete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ _id: note._id })
        });

        if (response.ok) {
            window.location.reload();
        } else {
            alert('패치노트 삭제에 실패했습니다.');
        }
    };

    return (
        <div>
            {result && result.name === 'admin' && (
                <div className="text-right">
                    <Button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded mt-2">
                        삭제
                    </Button>
                </div>
            )}
        </div>
    );
}
