import React from "react"

export default function Test() {
    return (
        <div>
            <form method="POST" action="/api/post/search">
                <input name="summonerName"></input>
                <button type="submit">버튼</button>
            </form>
        </div >
    )
}