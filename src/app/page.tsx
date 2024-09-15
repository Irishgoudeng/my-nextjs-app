import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to User Management</h1>
      <p className="mb-4">Manage your users easily with our tool.</p>
      <div className="flex gap-4">
        <Link href="/login">
          <a className="btn btn-primary">Login</a>
        </Link>
        <Link href="/signup">
          <a className="btn btn-secondary">Signup</a>
        </Link>
      </div>
    </div>
  );
}
