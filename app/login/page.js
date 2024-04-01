import Link from "next/link";

export default function Login() {
    return (
        <div>
            <form action="/" method="POST">
                <h4>아이디</h4>
                <input name="" placeholder="아이디"></input>
                <h4>비번</h4>
                <input name="" placeholder="비번"></input>
                <Link href="/">
                    <button type="submit">슛</button>
                </Link>
            </form>
        </div>
    )
}