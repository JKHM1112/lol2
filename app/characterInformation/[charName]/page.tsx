export default function characterInformation(props: any) {
    const { params } = props;
    const result = params;
    console.log(result)
    return (
        <div>
            {result.charName}
        </div>
    )
}