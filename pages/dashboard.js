import Layout from '@/components/layout/Layout';
import React,{ useEffect } from 'react'; 
import { useCurrentUser } from "@/hooks/index";
import { useRouter } from "next/router";

const Dashboard = () => {
  const router = useRouter();

  const [user, { mutate }] = useCurrentUser();

  useEffect(() => {
    // redirect to home if user is not authenticated
    if (user === null) router.push("/");
  }, [user]);


  return (
    <Layout>
      Dashboard
    </Layout>
  )
}

export default Dashboard;