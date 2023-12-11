import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import React from 'react'
import {cookies} from 'next/headers'
import { getFolders, getUserSubscriptionStatus } from '@/lib/supabase/queries';
import { redirect } from 'next/navigation';
interface SidebarProps {
    params: {workspaceId: string};
    className?: string;
}

const Sidebar:React.FC<SidebarProps> = async({params,className}) => {
    const supabase=createServerComponentClient({cookies})
    //what we have to check:
    //1. if user is logged in
    //2. if user has a subscription
    //3. folders
    //4. errors
    //get all the different workspaces (private,collaborating,shared)
    const {data:{user},}=await supabase.auth.getUser(); //user and data are destructured from the response ,not we are defining as a random variable.  
    // console.log('this is user',user); 
    // console.log('this is data',data); why data is not defined but user is? ans:  
    if(!user) return;
    //subscription check
    const {data:subscriptionData,error: subscriptionError}=await getUserSubscriptionStatus(user.id); //rightSide destructuring can be any name 
    //folders
    // console.log('params is this',params);
    const {data:workspaceFolderData,error:foldersError}=await getFolders(params.workspaceId);
    //errors
    if(subscriptionError || foldersError) redirect('/dashboard');

  return (
    <div>sidebar</div>
  )
}

export default Sidebar