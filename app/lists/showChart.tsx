export default function ShowChart({ chartData }: { chartData: any[] }) {
    if (!chartData || chartData.length === 0) {
        // chartData가 없거나 빈 배열일 경우에는 아무것도 렌더링하지 않음
        return null;
    }

    return (
        <div>
            {chartData.map((data: any, index: number) => (
                <div key={index}>
                    <p>Champion: {data.chams[0]}</p> {/* 데이터를 원하는 형태로 표시 */}
                </div>
            ))}
        </div>
    );
}
