export default function NextLaunchPreview({ countdown, launch }) {
    return (
        <div>
            <div>{countdown}</div>
            <div>{launch.name}</div>
        </div>
    );
};