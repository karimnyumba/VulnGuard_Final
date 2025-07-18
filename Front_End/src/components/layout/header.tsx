import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarIcon, DownloadIcon, PersonIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { AuthService } from "@/services/authService";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";

interface HeaderProps {
  date: Date;
  setDate: (date: Date) => void;
  Title?: string;
}

interface User {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

const Header: React.FC<HeaderProps> = ({ date, setDate, Title = "VulnGuard" }) => {
  const navigate = useNavigate();
  
  const { data: userData } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await axiosInstance.get('/auth/me');
      return response.data.user as User;
    }
  });

  const handleLogout = async () => {
    try {
      await AuthService.logout();
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
      navigate('/login');
    }
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b mb-4 bg-white px-6">
      <div className="flex-1">
        <h1 className="text-xl font-semibold">{Title}</h1>
      </div>
      <div className="flex items-center gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar  mode="single" selected={date} onSelect={setDate} initialFocus />
          </PopoverContent>
        </Popover>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={`https://ui-avatars.com/api/?name=${userData?.email}&background=0D8ABC&color=fff`} alt={userData?.email} />
                <AvatarFallback>
                  <PersonIcon className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{userData?.email}</p>
                <p className="text-xs leading-none text-muted-foreground">Security Analyst</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
