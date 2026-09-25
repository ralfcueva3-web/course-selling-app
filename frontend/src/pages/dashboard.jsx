import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../api/axios";

import RecommendedCourses from "../components/recommendedCourses";

import { Button } from "@/components/ui/button";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";


function Dashboard() {

    const [purchases, setPurchases] = useState([]);

    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();


    // ─── LOGOUT ───────────────────────────────────────────

    const handleLogout = async () => {
        try {

            await API.post("/user/logout");

            navigate("/login");

        } catch (err) {

            console.error("Logout failed:", err);

        }
    };


    // ─── FETCH PURCHASES ─────────────────────────────────

    useEffect(() => {

        const fetchPurchases = async () => {

            try {

                const res = await API.get("/user/purchases");

                setPurchases(res.data.purchases);

            } catch (err) {

                if (err.response?.status === 401) {

                    navigate("/login");

                }

                console.error(err);

            } finally {

                setLoading(false);

            }

        };

        fetchPurchases();

    }, [navigate]);


    return (

        <div className="min-h-screen bg-background text-foreground">


            {/* ─── Navbar ───────────────────────────────── */}

            <nav className="border-b">

                <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

                    {/* Logo */}

                    <button
                        onClick={() => navigate("/")}
                        className="text-lg font-medium transition-opacity hover:opacity-80"
                    >
                        ⚡ LearnFlow
                    </button>


                    {/* Navbar Buttons */}

                    <div className="flex items-center gap-2">

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate("/")}
                        >
                            Browse courses
                        </Button>


                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>

                    </div>

                </div>

            </nav>


            {/* ─── Dashboard Content ────────────────────── */}

            <main className="mx-auto max-w-5xl px-6 py-10">


                {/* Heading */}

                <div className="mb-8">

                    <h1 className="text-3xl font-semibold tracking-tight">
                        My courses
                    </h1>

                    <p className="mt-2 text-sm text-muted-foreground">
                        Continue learning where you left off.
                    </p>

                </div>


                {/* ─── Loading ──────────────────────────── */}

                {loading ? (

                    <div className="flex min-h-40 items-center justify-center">

                        <p className="text-sm text-muted-foreground">
                            Loading your courses...
                        </p>

                    </div>

                ) : purchases && purchases.length > 0 ? (

                    <div className="space-y-4">

                        {purchases.map((purchase) => (

                            <Card key={purchase._id}>

                                <CardContent className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center">


                                    {/* Course Icon */}

                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-2xl">

                                        📚

                                    </div>


                                    {/* Course Info */}

                                    <div className="min-w-0 flex-1">

                                        <h2 className="truncate text-base font-medium">

                                            {purchase.courseId?.title || "Course"}

                                        </h2>


                                        <p className="mt-1 text-xs text-muted-foreground">

                                            Purchased on{" "}

                                            {new Date(
                                                purchase.createdAt
                                            ).toLocaleDateString()}

                                        </p>


                                        {/* Progress */}

                                        <div className="mt-4">

                                            <div className="mb-2 flex items-center justify-between">

                                                <span className="text-xs text-muted-foreground">
                                                    Progress
                                                </span>

                                                <span className="text-xs font-medium">
                                                    0%
                                                </span>

                                            </div>


                                            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">

                                                <div
                                                    className="h-full rounded-full bg-primary transition-all"
                                                    style={{ width: "0%" }}
                                                />

                                            </div>

                                        </div>

                                    </div>


                                    {/* Continue */}

                                    <Button
                                        className="w-full sm:w-auto"
                                        onClick={() =>
                                            navigate(
                                                `/course/${purchase.courseId?._id}`
                                            )
                                        }
                                    >
                                        Continue
                                    </Button>


                                </CardContent>

                            </Card>

                        ))}

                    </div>

                ) : (


                    /* ─── Empty State ──────────────────── */

                    <Card className="border-dashed">

                        <CardHeader className="text-center">

                            <CardTitle>
                                No courses yet
                            </CardTitle>

                        </CardHeader>


                        <CardContent className="text-center">

                            <p className="text-sm text-muted-foreground">

                                You haven't purchased any courses yet.

                            </p>

                        </CardContent>


                        <CardFooter className="justify-center">

                            <Button onClick={() => navigate("/")}>

                                Browse courses

                            </Button>

                        </CardFooter>

                    </Card>

                )}


                {/* ─── Recommended Courses ────────────── */}

                <section className="mt-14">

                    <RecommendedCourses />

                </section>


            </main>

        </div>

    );

}


export default Dashboard;