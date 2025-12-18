import LoginPage from "./login/page";

 const bgUrl =
    "https://images.axios.com/av-JKMA0vCqjIWr6P53d7-XOA-c=/1920x1080/smart/2024/01/06/1704507026666.webp";


export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black"
     style={{
        backgroundImage: `url(${bgUrl})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "1920px 1080px",
      }}
    >
      <LoginPage />
    </div>
  );
}
