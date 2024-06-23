export default function characterInformation(props: any) {
    const { params } = props;
    const result = params;
    return (
        <div>
            {result.charName}
        </div>
    )
}