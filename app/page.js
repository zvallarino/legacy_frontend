import Mainpage from "@/components/Mainpage";
import Toolbar from "@/components/scrapper/Toolbar";


export default function Home() {
  
  return (
<div className="flex h-screen w-screen bg-white ">
          <Toolbar />        
          <Mainpage />  
</div>
  )
}
