"use client"
import toast from "react-hot-toast";
export default function Home() {
  return (
   <div>
    <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold md:font-black text-center text-primary">Hello from Home page.</h1>
      <>
        Not signed in <br />
        <button onClick={() => {
          toast.success("Button clicked");
        }}>Sign in</button>
      </>
   </div>
  );
}
