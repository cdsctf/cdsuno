import { Outlet, useParams } from "react-router";
import { Context } from "./context";
import { useEffect, useState } from "react";
import { Challenge } from "@/models/challenge";
import { getChallenges } from "@/api/challenge";

export default function Layout() {
    const { challenge_id } = useParams<{ challenge_id: string }>();
    const [challenge, setChallenge] = useState<Challenge>();

    useEffect(() => {
        getChallenges({
            id: challenge_id,
        }).then((res) => {
            setChallenge(res.data?.[0]);
        });
    }, []);

    return (
        <Context.Provider value={{ challenge }}>
            <Outlet />
        </Context.Provider>
    );
}
