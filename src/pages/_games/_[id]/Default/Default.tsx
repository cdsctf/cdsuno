import { useParams } from "react-router";

export function Default() {
    const { id } = useParams();

    return (
        <div>
            <h1>Game: {id}</h1>
            <p>Game details here...</p>
        </div>
    );
}
