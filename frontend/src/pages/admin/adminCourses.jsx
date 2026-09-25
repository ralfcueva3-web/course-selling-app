import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../../api/axios";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

function AdminCourses() {
    const navigate = useNavigate();

    const [courses, setCourses] = useState([]);

    const [form, setForm] = useState({
        title: "",
        description: "",
        price: "",
        thumbnail: "",
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);
    const [fetchingCourses, setFetchingCourses] = useState(true);
    const [editingCourseId, setEditingCourseId] = useState(null);

    // ---------------- FETCH COURSES ----------------

    const fetchCourses = async () => {
        try {
            setFetchingCourses(true);

            const res = await API.get("/admin/courses");

            setCourses(res.data.courses || []);

        } catch (err) {
            setError(
                err.response?.data?.msg ||
                "Failed to fetch courses"
            );
        } finally {
            setFetchingCourses(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    // ---------------- HANDLE INPUT ----------------

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    // ---------------- CREATE COURSE ----------------

    const handleCreateCourse = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");
        setLoading(true);

        try {
            await API.post("/admin/course", {
                title: form.title,
                description: form.description,
                price: Number(form.price),
                thumbnail: form.thumbnail,
            });

            setMessage("Course created successfully.");

            setForm({
                title: "",
                description: "",
                price: "",
                thumbnail: "",
            });

            // Refresh course list
            await fetchCourses();

        } catch (err) {
            setError(
                err.response?.data?.msg ||
                "Failed to create course"
            );
        } finally {
            setLoading(false);
        }
    };

    // ---------------- UPDATE COURSE ----------------

    const handleUpdateCourse = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");
        setLoading(true);

        try {
            await API.put(`/admin/course/${editingCourseId}`, {
                title: form.title,
                description: form.description,
                price: Number(form.price),
                thumbnail: form.thumbnail,
            });

            setMessage("Course updated successfully.");

            setForm({
                title: "",
                description: "",
                price: "",
                thumbnail: "",
            });

            setEditingCourseId(null);

            await fetchCourses();

        } catch (err) {
            setError(
                err.response?.data?.msg ||
                "Failed to update course"
            );
        } finally {
            setLoading(false);
        }
    };

    // ---------------- START EDIT ----------------

    const handleEditCourse = (course) => {
        setEditingCourseId(course._id);

        setForm({
            title: course.title || "",
            description: course.description || "",
            price: course.price || "",
            thumbnail: course.thumbnail || "",
        });

        setMessage("");
        setError("");
    };

    // ---------------- CANCEL EDIT ----------------

    const handleCancelEdit = () => {
        setEditingCourseId(null);

        setForm({
            title: "",
            description: "",
            price: "",
            thumbnail: "",
        });

        setMessage("");
        setError("");
    };

    // ---------------- DELETE COURSE ----------------

    const handleDeleteCourse = async (courseId) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this course?"
        );

        if (!confirmed) {
            return;
        }

        setError("");
        setMessage("");

        try {
            await API.delete(`/admin/course/${courseId}`);

            setMessage("Course deleted successfully.");

            await fetchCourses();

        } catch (err) {
            setError(
                err.response?.data?.msg ||
                "Failed to delete course"
            );
        }
    };

    return (
        <div className="min-h-screen bg-background">

            {/* Header */}

            <header className="flex items-center justify-between border-b px-6 py-4">

                <div>
                    <h1 className="text-xl font-semibold">
                        Course Management
                    </h1>

                    <p className="text-sm text-muted-foreground">
                        Create and manage courses
                    </p>
                </div>

                <Button
                    variant="outline"
                    onClick={() => navigate("/admin/dashboard")}
                >
                    Dashboard
                </Button>

            </header>


            {/* Main */}

            <main className="mx-auto max-w-6xl px-6 py-10">

                {/* Global messages */}

                {message && (
                    <div className="mb-6 rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                        {message}
                    </div>
                )}

                {error && (
                    <div className="mb-6 rounded-md border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                        {error}
                    </div>
                )}


                <div className="grid gap-8 lg:grid-cols-[420px_1fr]">

                    {/* ================= CREATE COURSE ================= */}

                    <Card>

                        <CardHeader>

                            <CardTitle>
                                {editingCourseId
                                    ? "Edit Course"
                                    : "Create Course"}
                            </CardTitle>

                            <CardDescription>
                                {editingCourseId
                                    ? "Update the course details."
                                    : "Add a new course to LearnFlow."}
                            </CardDescription>

                        </CardHeader>


                        <CardContent>

                            <form
                                onSubmit={
                                    editingCourseId
                                        ? handleUpdateCourse
                                        : handleCreateCourse
                                }
                                className="space-y-5"
                            >

                                {/* Title */}

                                <div className="space-y-2">

                                    <Label htmlFor="title">
                                        Course title
                                    </Label>

                                    <Input
                                        id="title"
                                        name="title"
                                        placeholder="Full Stack Web Development"
                                        value={form.title}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>


                                {/* Description */}

                                <div className="space-y-2">

                                    <Label htmlFor="description">
                                        Description
                                    </Label>

                                    <textarea
                                        id="description"
                                        name="description"
                                        placeholder="Course description..."
                                        value={form.description}
                                        onChange={handleChange}
                                        required
                                        className="min-h-28 w-full rounded-md border bg-background px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
                                    />

                                </div>


                                {/* Price */}

                                <div className="space-y-2">

                                    <Label htmlFor="price">
                                        Price
                                    </Label>

                                    <Input
                                        id="price"
                                        name="price"
                                        type="number"
                                        min="0"
                                        placeholder="999"
                                        value={form.price}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>


                                {/* Thumbnail */}

                                <div className="space-y-2">

                                    <Label htmlFor="thumbnail">
                                        Thumbnail URL
                                    </Label>

                                    <Input
                                        id="thumbnail"
                                        name="thumbnail"
                                        placeholder="https://..."
                                        value={form.thumbnail}
                                        onChange={handleChange}
                                    />

                                </div>


                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={loading}
                                >
                                    {loading
                                        ? editingCourseId
                                            ? "Updating..."
                                            : "Creating..."
                                        : editingCourseId
                                            ? "Update course"
                                            : "Create course"}
                                </Button>

                                {editingCourseId && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="w-full"
                                        onClick={handleCancelEdit}
                                    >
                                        Cancel edit
                                    </Button>
                                )}

                            </form>

                        </CardContent>

                    </Card>


                    {/* ================= COURSE LIST ================= */}

                    <Card>

                        <CardHeader>

                            <CardTitle>
                                Courses
                            </CardTitle>

                            <CardDescription>
                                Manage your existing courses.
                            </CardDescription>

                        </CardHeader>


                        <CardContent>

                            {fetchingCourses ? (

                                <div className="flex min-h-40 items-center justify-center">

                                    <p className="text-sm text-muted-foreground">
                                        Loading courses...
                                    </p>

                                </div>

                            ) : courses.length === 0 ? (

                                <div className="flex min-h-40 items-center justify-center rounded-lg border border-dashed">

                                    <p className="text-sm text-muted-foreground">
                                        No courses available.
                                    </p>

                                </div>

                            ) : (

                                <div className="space-y-4">

                                    {courses.map((course) => (

                                        <div
                                            key={course._id}
                                            className="rounded-lg border p-4"
                                        >

                                            <div className="flex items-start justify-between gap-4">

                                                <div className="min-w-0">

                                                    <h3 className="font-semibold">
                                                        {course.title}
                                                    </h3>

                                                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                                                        {course.description}
                                                    </p>

                                                    <p className="mt-2 text-sm font-semibold text-primary">
                                                        ₹{course.price}
                                                    </p>

                                                </div>


                                                <div className="flex shrink-0 gap-2">

                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleEditCourse(course)}
                                                    >
                                                        Edit
                                                    </Button>

                                                    <Button
                                                        variant="destructive"
                                                        size="sm"
                                                        onClick={() =>
                                                            handleDeleteCourse(course._id)
                                                        }
                                                    >
                                                        Delete
                                                    </Button>

                                                </div>

                                            </div>

                                        </div>

                                    ))}

                                </div>

                            )}

                        </CardContent>

                    </Card>

                </div>

            </main>

        </div>
    );
}

export default AdminCourses;