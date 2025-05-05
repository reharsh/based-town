import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Mail, Lock, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";
import { signIn, signOut } from "next-auth/react";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  rememberMe: z.boolean().default(false).optional(),
});

type FormValues = z.infer<typeof formSchema>;

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = (values: FormValues) => {
    console.log(values);
    toast("Sign in attempted", {
        description: "This is a demo. Authentication is not yet implemented.",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      })
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <FormControl>
                  <Input 
                    placeholder="Email" 
                    className="pl-10" 
                    {...field} 
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <FormControl>
                  <Input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Password" 
                    className="pl-10" 
                    {...field} 
                  />
                </FormControl>
                <button
                  type="button"
                  className="absolute right-1 top-1.5 h-7 aspect-square flex justify-center items-center text-gray-400 bg-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 
                    <EyeOff className="h-5 w-5" /> : 
                    <Eye className="h-5 w-5" />
                  }
                </button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex items-center justify-between">
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2 space-y-0">
                <FormControl>
                  <Checkbox 
                    checked={field.value} 
                    onCheckedChange={field.onChange} 
                  />
                </FormControl>
                <label 
                  htmlFor="rememberMe" 
                  className="text-sm text-gray-600 cursor-pointer"
                >
                  Remember me
                </label>
              </FormItem>
            )}
          />
          
          <a 
            href="#" 
            className="text-sm text-town-green hover:underline"
          >
            Forgot password?
          </a>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-town-green hover:bg-town-green/90"
        >
          <LogIn className="mr-2 h-4 w-4" /> Sign In
        </Button>
        <Button 
        onClick={()=> {
            signIn('google')
          }}
          className="w-full bg-town-green hover:bg-town-green/90"
        >Continue with <FcGoogle></FcGoogle>
        </Button>
      </form>
    </Form>
  );
};

export default SignInForm;