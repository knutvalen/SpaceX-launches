export default function NextLaunchPreview({ countdown, launch }) {
    return (
        <div>
            {countdown && (
                <div>{countdown}</div>
            )}
            {launch && (
                <div>{launch.name}</div>
            )}
        </div>
    );
};