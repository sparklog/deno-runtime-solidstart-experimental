import { createAsync } from "@solidjs/router";
import { getKvUser, setKvUser } from "~/api";

export default function Home() {
  const user = createAsync(() => getKvUser());
  return (
    <main>
      <h1>Hello world!</h1>
      <p>
        this is an experimental project for testing Deno Deploy features in
        SolidStart
      </p>
      <p>user email: {user()?.email}</p>
      <form method="post" action={setKvUser}>
        <input type="text" name="email" />
        <input type="password" name="password" />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}
