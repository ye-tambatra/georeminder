import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { Github, MapPin } from "lucide-react";
import HomeBg from "@/assets/home_bg.jpeg";
import Google from "@/components/icons/Google";

const HomePage = () => {
   return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4 relative">
         <div className="absolute inset-0 z-2 w-full h-full">
            <img
               src={HomeBg}
               alt="Map Anatananarivo"
               className="object-cover blur-[1px] w-full h-full bg-red-500"
               aria-hidden="true"
            />
         </div>
         <div className="w-full max-w-xl z-5">
            <Card className="w-full border-none sm:p-8">
               <div className="flex flex-col items-center space-y-8 text-center">
                  <div className="space-y-2">
                     <div className="flex items-center justify-center">
                        <MapPin className="mr-2 h-6 w-6 text-primary" />
                        <h1 className="text-4xl font-bold tracking-tight sm:text-4xl">GeoReminder</h1>
                     </div>
                     <p className="text-xl font-medium text-muted-foreground">Smart reminders triggered by location</p>
                  </div>

                  <div className="space-y-4 py-4">
                     <p className="text-muted-foreground">
                        Never forget a task again. GeoReminder notifies you about important tasks when you arrive at or
                        leave specific locations. Perfect for shopping lists, errands, and location-based reminders.
                     </p>
                  </div>

                  <div className="flex w-full flex-col gap-2 sm:flex-row sm:justify-center">
                     <Button className="gap-2 cursor-pointer">
                        <Google />
                        Sign in with Google
                     </Button>
                     <Button variant="outline" className="gap-2 cursor-pointer">
                        <Github className="h-4 w-4" />
                        Sign in with GitHub
                     </Button>
                  </div>
               </div>
               <CardFooter>
                  <footer className="mt-8 text-center text-sm text-muted-foreground w-full">
                     <p>© {new Date().getFullYear()} GeoReminder. All rights reserved.</p>
                  </footer>
               </CardFooter>
            </Card>
         </div>
      </div>
   );
};

export default HomePage;
