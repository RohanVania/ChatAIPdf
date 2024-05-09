
import {authOptions} from "@/app/api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth"

export default async  function Page() {
    const session=await getServerSession(authOptions);
    console.log(session);
    return (
    <>
      <h1>Protected Page</h1>
      <p>You can view this page because you are signed in.</p>
    </>
  )
}
