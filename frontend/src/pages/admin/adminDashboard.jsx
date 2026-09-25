import { useNavigate } from "react-router-dom";

import API from "../../api/axios";

import { Button } from "@/components/ui/button";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";


function AdminDashboard() {

    const navigate = useNavigate();


    // ─── LOGOUT ───────────────────────────────────────────

    const handleLogout = async () => {
        try {

            await API.post("/admin/logout");

            navigate("/admin/login");

        } catch (err) {

            console.error("Logout failed:", err);

        }
    };


    return (

        <div className="min-h-screen bg-background">


            {/* ─── Header ───────────────────────────────── */}

            <header className="flex items-center justify-between border-b px-6 py-4">

                <div>

                    <h1 className="text-xl font-semibold">
                        LearnFlow Admin
                    </h1>

                    <p className="text-sm text-muted-foreground">
                        Manage your platform
                    </p>

                </div>


                <div className="flex items-center gap-2">

                    <Button
                        variant="outline"
                        onClick={() => navigate("/admin/courses")}
                    >
                        Manage Courses
                    </Button>

                    <Button
                        variant="destructive"
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>

                </div>

            </header>


            {/* ─── Main ─────────────────────────────────── */}

            <main className="mx-auto max-w-6xl px-6 py-10">


                <div className="mb-8">

                    <h2 className="text-3xl font-semibold tracking-tight">
                        Dashboard
                    </h2>

                    <p className="mt-2 text-muted-foreground">
                        Welcome back, Admin.
                    </p>

                </div>


                {/* ─── Stats ─────────────────────────────── */}

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">


                    {/* Courses */}

                    <Card>

                        <CardHeader>

                            <CardTitle className="text-sm font-medium">
                                Courses
                            </CardTitle>

                        </CardHeader>

                        <CardContent>

                            <p className="text-3xl font-bold">
                                —
                            </p>

                            <p className="mt-1 text-sm text-muted-foreground">
                                Connect course statistics
                            </p>

                        </CardContent>

                    </Card>


                    {/* Students */}

                    <Card>

                        <CardHeader>

                            <CardTitle className="text-sm font-medium">
                                Students
                            </CardTitle>

                        </CardHeader>

                        <CardContent>

                            <p className="text-3xl font-bold">
                                —
                            </p>

                            <p className="mt-1 text-sm text-muted-foreground">
                                Student statistics coming later
                            </p>

                        </CardContent>

                    </Card>


                    {/* Revenue */}

                    <Card>

                        <CardHeader>

                            <CardTitle className="text-sm font-medium">
                                Revenue
                            </CardTitle>

                        </CardHeader>

                        <CardContent>

                            <p className="text-3xl font-bold">
                                ₹—
                            </p>

                            <p className="mt-1 text-sm text-muted-foreground">
                                Revenue statistics coming later
                            </p>

                        </CardContent>

                    </Card>

                </div>


                {/* ─── Quick Actions ─────────────────────── */}

                <section className="mt-10">

                    <h3 className="mb-4 text-xl font-semibold">
                        Quick actions
                    </h3>


                    <div className="grid gap-4 sm:grid-cols-2">

                        <Card
                            className="cursor-pointer transition-shadow hover:shadow-md"
                            onClick={() => navigate("/admin/courses")}
                        >

                            <CardContent className="p-6">

                                <h4 className="font-semibold">
                                    Manage Courses
                                </h4>

                                <p className="mt-1 text-sm text-muted-foreground">
                                    Create, update and delete courses.
                                </p>

                            </CardContent>

                        </Card>

                    </div>

                </section>


            </main>

        </div>

    );

}


export default AdminDashboard;