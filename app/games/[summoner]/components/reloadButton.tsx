'use client'

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function ReloadButton() {
    const router = useRouter();

    return (
        <div>
            <Button onClick={() => router.refresh()}>전적 갱신</Button>
        </div>
    );
}
