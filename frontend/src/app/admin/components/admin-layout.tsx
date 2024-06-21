import { useSession } from "next-auth/react";
import  type ICustomSession  from '@/interfaces/ICustomSession';

const AdminLayout = () => {
  const { data: session } = useSession({
    required: true,
  }) as unknown as { data: ICustomSession }; // Cast the session to your custom session type

  if (!session)
    return <p>Loading...</p>;
  

  const { user, token } = session;
  const { id, email, name, roles } = user;

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
