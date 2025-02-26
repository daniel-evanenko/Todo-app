export function ProgressBar({ progress }) {
    return (
        <div>
            <progress value={progress} max="100"></progress>
            <p>{Math.round(progress)}% Completed</p>
        </div>
    )
}