'use client'

import { Button } from "@/components/ui/button"

export default function ReloadButton() {
    return (
        <div>
            <Button onClick={() => window.location.reload()}>전적 갱신1</Button>
        </div>
    )
}