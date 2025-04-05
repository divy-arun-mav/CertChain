/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface LeaderboardEntry {
    name: string;
    email: string;
    points: number;
    badge: string;
}

const Leaderboard: React.FC = () => {
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const fetchLeaderboard = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await fetch("http://localhost:5000/api/leaderboard");
            if (!res.ok) throw new Error("Failed to fetch leaderboard");

            const data = await res.json();
            setLeaderboard(data);
        } catch (err: any) {
            setError(err.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeaderboard();
    }, []);

    return (
        <div className="w-screen p-6 text-white min-h-screen bg-black">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Leaderboard</h1>
                <Button onClick={fetchLeaderboard} className="bg-blue-600 hover:bg-blue-700">
                    Refresh
                </Button>
            </div>

            {loading ? (
                <p className="text-center text-xl">Loading...</p>
            ) : error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : (
                <div className="overflow-x-auto">
                    <Table className="min-w-full">
                        <TableHeader>
                            <TableRow className="border-t border-t-blue-400 border-b border-blue-400">
                                <TableHead className="text-center text-white">Rank</TableHead>
                                <TableHead className="text-center text-white">Name</TableHead>
                                <TableHead className="text-center text-white">Points</TableHead>
                                <TableHead className="text-center text-white">Badge</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="border-b border-b-blue-400">
                            {leaderboard.map((user, index) => (
                                <TableRow key={index} className="border-b border-blue-400">
                                    <TableCell className="text-center">{index + 1}</TableCell>
                                    <TableCell className="text-center">{user.name}</TableCell>
                                    <TableCell className="text-center">{user.points}</TableCell>
                                    <TableCell className="flex flex-col items-center text-center">
                                        {user.badge && <img className="w-10 h-10 rounded-full" src={`/${user.badge}.png`} alt={user.badge} />}
                                        <span>{user.badge}</span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    );
};

export default Leaderboard;