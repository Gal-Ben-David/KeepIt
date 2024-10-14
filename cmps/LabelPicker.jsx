export function LabelPicker({ labels }) {
    return (
        <ul className="labels">
            {labels.map((label, i) =>
                <li key={i}>{label}</li>
            )}
        </ul>
    )

}