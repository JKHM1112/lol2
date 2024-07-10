'use client'

import { Button } from "@/components/ui/button";

export default function ReloadButton() {

    return (
        <div>
            <Button onClick={() => window.location.reload()}>새로 고침</Button>
        </div>
    );
}
