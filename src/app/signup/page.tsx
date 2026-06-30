import { redirect } from "next/navigation";

export default function SignupPage() {
  // We have unified the Sign In and Sign Up flows onto a single beautiful page at /login.
  // This redirect safely catches any old links pointing to /signup and forwards them to the new page.
  redirect("/login");
}
