"use client";
import { useSession } from "next-auth/react";
import  type ICustomSession  from '@/interfaces/ICustomSession';
import { useRouter } from "next/navigation";

const AdminLayout = () => {
  const { data: session } = useSession({
    required: true,
  }) as unknown as { data: ICustomSession }; // Cast the session to your custom session type

  if (!session) {
    return <p>Loading...</p>;
  }
  const router = useRouter()
  const { user, token } = session;
  const { id, email, name, roles } = user;

  if (!roles.find((role)=>role==="admin")){
    router.push("/home")
    return <p className="text-2xl text-center p-10">Not Authorized</p>
  }


  return (
    <>
      <p>Hello {name}</p>
      <div>
        <p><strong>User ID:</strong> {id}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Roles:</strong> {roles.join(", ")}</p>
        <p><strong>Access Token:</strong> {token}</p>
      </div>
    </>
  );
};

export default AdminLayout;
