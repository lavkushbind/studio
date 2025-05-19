
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BookMarked, LogIn, UserPlus, Users } from 'lucide-react'; // Using BookMarked for logo

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <BookMarked className="h-6 w-6 text-primary" />
            <span className="font-bold sm:inline-block">
              Blanklearn
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-4 text-sm font-medium">
            <Link href="/#find-teachers" className="text-muted-foreground hover:text-primary transition-colors">
                Find Teachers
            </Link>
            {/* <Link href="/how-it-works" className="text-muted-foreground hover:text-primary transition-colors">
                How It Works
            </Link> */}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
           {/* Placeholder for Auth buttons */}
           <Button variant="ghost" size="sm">
               <LogIn className="mr-2 h-4 w-4"/>
               Log In
           </Button>
            <Button size="sm">
               <UserPlus className="mr-2 h-4 w-4"/>
               Sign Up
           </Button>
        </div>
      </div>
    </header>
  );
}
