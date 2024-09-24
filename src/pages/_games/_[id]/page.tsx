import { useParams } from "react-router-dom";

export function Page() {
    const { id } = useParams();

    return (
        <div>
            <h1>Game: {id}</h1>
            <p>Game details here...</p>
        </div>
    );
}
