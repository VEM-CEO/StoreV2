import { useState, useEffect } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useSetUser } from "../context/UserContext";
import { AppShell, LoadingOverlay } from "@mantine/core";
import Navbar from "../components/Navbar/Navbar";
import CertificateList from "../components/UserButton/CertificateList";
import HeaderSearch from "../components/Header/HeaderSearch";



export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState("REC Inventory");
  const setUser = useSetUser();
 

  useEffect(() => {
    (async () => {
      const getUser = await fetch("/api/user");
      const getUserJson = await getUser.json();
      setUser(getUserJson)
      



      setIsLoading(false);
    })();
  },);

  return (
    <AppShell
      header={<HeaderSearch  />}
      navbar={<Navbar page={page} setPage={setPage} />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <LoadingOverlay visible={isLoading} />
     <CertificateList/>
      
    </AppShell>
  );
}

export const getServerSideProps = withPageAuthRequired();
