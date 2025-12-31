import { Switch, Route } from "wouter";


import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";


function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
    </Switch>
  );
}

function App() {
  return (
 
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
  
  );
}

export default App;
