// import { columns } from "./columns";
import { User } from "@/models/user";

async function getData(): Promise<User[]> {
    return [
        {
            id: 1,
            username: "admin",
            nickname: "Administrator",
            email: "admin@admin.com",
            group: 3,
            created_at: "1732254453",
            teams: [],
        },
        {
            id: 2,
            username: "jsmith",
            nickname: "John Smith",
            email: "john.smith@example.com",
            group: 2,
            created_at: "1731254453",
            teams: [{ name: "Engineering" }, { name: "Frontend" }],
        },
        {
            id: 3,
            username: "mjohnson",
            nickname: "Maria Johnson",
            email: "maria.j@example.com",
            group: 2,
            created_at: "1730354453",
            teams: [{ name: "Engineering" }, { name: "Frontend" }],
        },
        {
            id: 4,
            username: "alee",
            nickname: "Amy Lee",
            email: "amy.lee@example.com",
            group: 2,
            created_at: "1729454453",
            teams: [{ name: "Engineering" }, { name: "Frontend" }],
        },
        {
            id: 5,
            username: "rwilson",
            nickname: "Robert Wilson",
            email: "robert.w@example.com",
            group: 1,
            created_at: "1728554453",
            teams: [{ name: "Engineering" }, { name: "Frontend" }],
        },
        {
            id: 6,
            username: "jgarcia",
            nickname: "Jennifer Garcia",
            email: "jennifer.g@example.com",
            group: 2,
            created_at: "1727654453",
            teams: [{ name: "Engineering" }, { name: "Frontend" }],
        },
        {
            id: 7,
            username: "dthomas",
            nickname: "David Thomas",
            email: "david.t@example.com",
            group: 1,
            created_at: "1726754453",
            teams: [{ name: "Engineering" }, { name: "Frontend" }],
        },
        {
            id: 8,
            username: "sbrown",
            nickname: "Sarah Brown",
            email: "sarah.b@example.com",
            group: 2,
            created_at: "1725854453",
            teams: [{ name: "Engineering" }, { name: "Frontend" }],
        },
        {
            id: 9,
            username: "jtaylor",
            nickname: "James Taylor",
            email: "james.t@example.com",
            group: 1,
            created_at: "1724954453",
            teams: [{ name: "Engineering" }, { name: "Frontend" }],
        },
        {
            id: 10,
            username: "lmiller",
            nickname: "Lisa Miller",
            email: "lisa.m@example.com",
            group: 2,
            created_at: "1724054453",
            teams: [{ name: "Engineering" }, { name: "Frontend" }],
        },
        {
            id: 11,
            username: "mwilliams",
            nickname: "Michael Williams",
            email: "michael.w@example.com",
            group: 2,
            created_at: "1723154453",
            teams: [{ name: "Engineering" }, { name: "Frontend" }],
        },
        {
            id: 12,
            username: "eanderson",
            nickname: "Emma Anderson",
            email: "emma.a@example.com",
            group: 1,
            created_at: "1722254453",
            teams: [{ name: "Engineering" }, { name: "Frontend" }],
        },
        {
            id: 13,
            username: "cmartin",
            nickname: "Chris Martin",
            email: "chris.m@example.com",
            group: 1,
            created_at: "1721354453",
            teams: [{ name: "Engineering" }, { name: "Frontend" }],
        },
        {
            id: 14,
            username: "owhite",
            nickname: "Olivia White",
            email: "olivia.w@example.com",
            group: 2,
            created_at: "1720454453",
            teams: [{ name: "Engineering" }, { name: "Frontend" }],
        },
        {
            id: 15,
            username: "kclark",
            nickname: "Kevin Clark",
            email: "kevin.c@example.com",
            group: 1,
            created_at: "1719554453",
            teams: [{ name: "Engineering" }, { name: "Frontend" }],
        },
        {
            id: 16,
            username: "lharris",
            nickname: "Laura Harris",
            email: "laura.h@example.com",
            group: 2,
            created_at: "1718654453",
            teams: [{ name: "Engineering" }, { name: "Frontend" }],
        },
        {
            id: 17,
            username: "bking",
            nickname: "Brian King",
            email: "brian.k@example.com",
            group: 1,
            created_at: "1717754453",
            teams: [{ name: "Engineering" }, { name: "Frontend" }],
        },
        {
            id: 18,
            username: "sneison",
            nickname: "Sophia Nelson",
            email: "sophia.n@example.com",
            group: 2,
            created_at: "1716854453",
            teams: [{ name: "Engineering" }, { name: "Frontend" }],
        },
        {
            id: 19,
            username: "dwright",
            nickname: "Daniel Wright",
            email: "daniel.w@example.com",
            group: 1,
            created_at: "1715954453",
            teams: [{ name: "Engineering" }, { name: "Frontend" }],
        },
        {
            id: 20,
            username: "palexander",
            nickname: "Patricia Alexander",
            email: "patricia.a@example.com",
            group: 2,
            created_at: "1715054453",
            teams: [{ name: "Engineering" }, { name: "Frontend" }],
        },
    ];
}

export default async function Index() {
    const data = await getData();

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-2xl font-bold mb-5">Users</h1>

            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">User Management</h2>
            </div>

            {/* <DataTable columns={columns} data={data}>
                <div className="flex justify-between flex-wrap gap-4 mb-4"></div>
            </DataTable> */}
        </div>
    );
}
